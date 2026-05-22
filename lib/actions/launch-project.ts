"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createLaunchProjectSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  ticker: z.string().min(1).max(20),
  chain: z.string().default("solana"),
  launchDate: z.string().optional(),
  status: z.enum(["draft", "pre_launch", "launching", "live", "post_launch"]).default("draft"),
  description: z.string().max(500).optional(),
});

const DEFAULT_CHECKLIST_ITEMS = [
  { section: "brand", title: "Define token name and ticker", description: "Finalize your memecoin identity" },
  { section: "brand", title: "Create logo and branding assets", description: "Design professional visuals" },
  { section: "community", title: "Set up Telegram group", description: "Create and configure your community channel" },
  { section: "community", title: "Set up Discord server", description: "Create your Discord community" },
  { section: "content", title: "Write launch announcement", description: "Prepare your X/Twitter launch thread" },
  { section: "content", title: "Create content calendar", description: "Plan your first week of posts" },
  { section: "technical", title: "Configure token metadata", description: "Set up token image and description" },
  { section: "technical", title: "Review liquidity pool strategy", description: "Plan your DEX launch" },
  { section: "post_launch", title: "Monitor holder growth", description: "Track early adoption" },
  { section: "post_launch", title: "Engage with community", description: "Respond to questions and feedback" },
];

export async function createLaunchProject(formData: FormData) {
  const result = createLaunchProjectSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    name: formData.get("name"),
    ticker: formData.get("ticker"),
    chain: formData.get("chain") || "solana",
    launchDate: formData.get("launchDate"),
    status: formData.get("status") || "draft",
    description: formData.get("description"),
  });

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const workspaceSlug = formData.get("workspaceSlug") as string;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
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

  const checklistItems = DEFAULT_CHECKLIST_ITEMS.map((item, index) => ({
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
