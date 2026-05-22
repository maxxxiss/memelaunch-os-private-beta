"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createWorkspaceSchema } from "@/lib/validations/workspace";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createWorkspace(formData: FormData) {
  const result = createWorkspaceSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("create_workspace_with_owner", {
    workspace_name: result.data.name,
    workspace_slug: result.data.slug,
  });

  if (error) {
    return { error: error.message };
  }

  if (!data || data.error) {
    return { error: data?.error || "Failed to create workspace" };
  }

  revalidatePath("/app");
  redirect(`/app/${data.slug}`);
}

export async function getUserWorkspaces() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: workspaces } = await supabase
    .from("workspace_members")
    .select("workspaces(*)")
    .eq("user_id", user.id);

  return (
    workspaces?.map((wm) => wm.workspaces as unknown as { id: string; name: string; slug: string }) ||
    []
  );
}
