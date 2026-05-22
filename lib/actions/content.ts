"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createContentItemSchema = z.object({
  workspaceId: z.string().uuid(),
  projectId: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  platform: z.enum(["x", "telegram", "discord", "website"]),
  scheduledAt: z.string().optional(),
  status: z.enum(["draft", "scheduled", "published"]).default("draft"),
  notes: z.string().max(1000).optional(),
});

export async function createContentItem(formData: FormData) {
  const result = createContentItemSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    projectId: formData.get("projectId") || undefined,
    title: formData.get("title"),
    platform: formData.get("platform"),
    scheduledAt: formData.get("scheduledAt"),
    status: formData.get("status") || "draft",
    notes: formData.get("notes"),
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
    .from("content_items")
    .insert({
      workspace_id: result.data.workspaceId,
      project_id: result.data.projectId,
      title: result.data.title,
      platform: result.data.platform,
      scheduled_at: result.data.scheduledAt ? new Date(result.data.scheduledAt).toISOString() : null,
      status: result.data.status,
      notes: result.data.notes,
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

export async function updateContentStatus(itemId: string, status: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: item } = await supabase
    .from("content_items")
    .select("workspace_id, project_id")
    .eq("id", itemId)
    .maybeSingle();

  if (!item) {
    return { error: "Content item not found" };
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("slug")
    .eq("id", item.workspace_id)
    .maybeSingle();

  if (!workspace) {
    return { error: "Workspace not found" };
  }

  const { error } = await supabase
    .from("content_items")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", itemId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${workspace.slug}`);
  if (item.project_id) {
    revalidatePath(`/app/${workspace.slug}/projects/${item.project_id}`);
  }

  return { success: true };
}

export async function getWorkspaceContentItems(workspaceId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("scheduled_at", { ascending: true, nullsFirst: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getProjectContentItems(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("project_id", projectId)
    .order("scheduled_at", { ascending: true, nullsFirst: false });

  if (error) {
    return [];
  }

  return data;
}
