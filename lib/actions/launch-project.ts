"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { TEMPLATES } from "@/lib/templates/launch-templates";

const createLaunchProjectSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  ticker: z.string().min(1).max(20),
  chain: z.string().default("solana"),
  launchDate: z.string().optional(),
  status: z.enum(["draft", "pre_launch", "launching", "live", "post_launch"]).default("draft"),
  description: z.string().max(500).optional(),
  template: z.enum(["basic", "solana_meme", "community_first"]).default("basic"),
});

const updateLaunchProjectSchema = z.object({
  projectId: z.string().uuid(),
  name: z.string().min(1).max(100),
  ticker: z.string().min(1).max(20),
  chain: z.string().default("solana"),
  launchDate: z.string().optional(),
  status: z.enum(["draft", "pre_launch", "launching", "live", "post_launch"]),
  description: z.string().max(500).optional(),
  workspaceSlug: z.string(),
});


export async function createLaunchProject(formData: FormData) {
  const result = createLaunchProjectSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    name: formData.get("name"),
    ticker: formData.get("ticker"),
    chain: formData.get("chain") || "solana",
    launchDate: formData.get("launchDate"),
    status: formData.get("status") || "draft",
    description: formData.get("description"),
    template: formData.get("template") || "basic",
  });

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const workspaceSlug = formData.get("workspaceSlug") as string;
  const template = TEMPLATES[result.data.template];

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("plan")
    .eq("id", result.data.workspaceId)
    .single();

  if (workspace?.plan === "free") {
    const { count: projectCount } = await supabase
      .from("launch_projects")
      .select("*", { count: "exact", head: true })
      .eq("workspace_id", result.data.workspaceId);

    if (projectCount && projectCount >= 1) {
      return { error: "Free plan limited to 1 project per workspace. Upgrade to Pro for unlimited projects." };
    }
  }

  const { data: project, error: projectError } = await supabase
    .from("launch_projects")
    .insert({
      workspace_id: result.data.workspaceId,
      name: result.data.name,
      ticker: result.data.ticker,
      chain: result.data.chain,
      launch_date: result.data.launchDate ? new Date(result.data.launchDate).toISOString() : null,
      status: result.data.status,
      description: result.data.description,
    })
    .select()
    .single();

  if (projectError || !project) {
    return { error: projectError?.message || "Failed to create project" };
  }

  const checklistItems = template.checklist.map((item, index) => ({
    project_id: project.id,
    section: item.section,
    title: item.title,
    description: item.description,
    order_index: index,
  }));

  const { error: checklistError } = await supabase
    .from("launch_checklist_items")
    .insert(checklistItems);

  if (checklistError) {
    return { error: `Failed to create checklist items: ${checklistError.message}` };
  }

  const tasks = template.tasks.map((task) => ({
    workspace_id: result.data.workspaceId,
    project_id: project.id,
    title: task.title,
    status: "todo",
    priority: task.priority,
    description: task.description,
  }));

  const { error: tasksError } = await supabase
    .from("tasks")
    .insert(tasks);

  if (tasksError) {
    return { error: `Failed to create tasks: ${tasksError.message}` };
  }

  const contentItems = template.content.map((item) => ({
    workspace_id: result.data.workspaceId,
    project_id: project.id,
    title: item.title,
    platform: item.platform,
    status: "draft",
    notes: item.notes,
  }));

  const { error: contentError } = await supabase
    .from("content_items")
    .insert(contentItems);

  if (contentError) {
    return { error: `Failed to create content items: ${contentError.message}` };
  }

  redirect(`/app/${workspaceSlug}/projects/${project.id}`);
}

export async function toggleChecklistItem(itemId: string, completed: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: item } = await supabase
    .from("launch_checklist_items")
    .select("project_id")
    .eq("id", itemId)
    .single();

  if (!item) {
    return { error: "Checklist item not found" };
  }

  const { data: project } = await supabase
    .from("launch_projects")
    .select("workspace_id")
    .eq("id", item.project_id)
    .maybeSingle();

  if (!project) {
    return { error: "Project not found" };
  }

  const { error } = await supabase
    .from("launch_checklist_items")
    .update({ completed, updated_at: new Date().toISOString() })
    .eq("id", itemId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${project.workspace_id}`);
  revalidatePath(`/app/${project.workspace_id}/projects/${item.project_id}`);

  return { success: true };
}

export async function getWorkspaceLaunchProjects(workspaceId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("launch_projects")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getProjectChecklist(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("launch_checklist_items")
    .select("*")
    .eq("project_id", projectId)
    .order("order_index", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export async function updateLaunchProject(formData: FormData) {
  const result = updateLaunchProjectSchema.safeParse({
    projectId: formData.get("projectId"),
    name: formData.get("name"),
    ticker: formData.get("ticker"),
    chain: formData.get("chain") || "solana",
    launchDate: formData.get("launchDate"),
    status: formData.get("status"),
    description: formData.get("description"),
    workspaceSlug: formData.get("workspaceSlug"),
  });

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: project } = await supabase
    .from("launch_projects")
    .select("workspace_id")
    .eq("id", result.data.projectId)
    .maybeSingle();

  if (!project) {
    return { error: "Project not found" };
  }

  const { error } = await supabase
    .from("launch_projects")
    .update({
      name: result.data.name,
      ticker: result.data.ticker,
      chain: result.data.chain,
      launch_date: result.data.launchDate ? new Date(result.data.launchDate).toISOString() : null,
      status: result.data.status,
      description: result.data.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", result.data.projectId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${result.data.workspaceSlug}`);
  revalidatePath(`/app/${result.data.workspaceSlug}/projects/${result.data.projectId}`);

  return { success: true };
}
