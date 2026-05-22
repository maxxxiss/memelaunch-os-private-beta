"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createTaskSchema = z.object({
  workspaceId: z.string().uuid(),
  projectId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.string().optional(),
  assigneeName: z.string().max(100).optional(),
});

export async function createTask(formData: FormData) {
  const result = createTaskSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    projectId: formData.get("projectId") || undefined,
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status") || "todo",
    priority: formData.get("priority") || "medium",
    dueDate: formData.get("dueDate"),
    assigneeName: formData.get("assigneeName"),
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

  const { error } = await supabase
    .from("tasks")
    .insert({
      workspace_id: result.data.workspaceId,
      project_id: result.data.projectId,
      title: result.data.title,
      description: result.data.description,
      status: result.data.status,
      priority: result.data.priority,
      due_date: result.data.dueDate ? new Date(result.data.dueDate).toISOString() : null,
      assignee_name: result.data.assigneeName,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${workspaceSlug}`);
  if (result.data.projectId) {
    revalidatePath(`/app/${workspaceSlug}/projects/${result.data.projectId}`);
  }

  return { success: true };
}

export async function updateTaskStatus(taskId: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: task } = await supabase
    .from("tasks")
    .select("workspace_id, project_id")
    .eq("id", taskId)
    .maybeSingle();

  if (!task) {
    return { error: "Task not found" };
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("slug")
    .eq("id", task.workspace_id)
    .maybeSingle();

  if (!workspace) {
    return { error: "Workspace not found" };
  }

  const { error } = await supabase
    .from("tasks")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", taskId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${workspace.slug}`);
  if (task.project_id) {
    revalidatePath(`/app/${workspace.slug}/projects/${task.project_id}`);
  }

  return { success: true };
}

export async function getWorkspaceTasks(workspaceId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getProjectTasks(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}
