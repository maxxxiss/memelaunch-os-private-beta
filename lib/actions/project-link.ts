"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addProjectLinkSchema = z.object({
  workspaceId: z.string().uuid(),
  projectId: z.string().uuid(),
  type: z.enum(["website", "x", "telegram", "discord", "chart", "docs"]),
  url: z.string().url(),
  label: z.string().max(100).optional(),
  workspaceSlug: z.string(),
});

export async function addProjectLink(formData: FormData) {
  const result = addProjectLinkSchema.safeParse({
    workspaceId: formData.get("workspaceId"),
    projectId: formData.get("projectId"),
    type: formData.get("type"),
    url: formData.get("url"),
    label: formData.get("label"),
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

  const { error } = await supabase
    .from("project_links")
    .insert({
      workspace_id: result.data.workspaceId,
      project_id: result.data.projectId,
      type: result.data.type,
      url: result.data.url,
      label: result.data.label,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${result.data.workspaceSlug}`);
  revalidatePath(`/app/${result.data.workspaceSlug}/projects/${result.data.projectId}`);

  return { success: true };
}

export async function removeProjectLink(linkId: string, workspaceSlug: string, projectId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("project_links")
    .delete()
    .eq("id", linkId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/app/${workspaceSlug}`);
  revalidatePath(`/app/${workspaceSlug}/projects/${projectId}`);

  return { success: true };
}

export async function getProjectLinks(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("project_links")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}
