"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createWorkspaceSchema } from "@/lib/validations/workspace";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { syncUserSubscriptionToWorkspace, getEffectiveWorkspacePlan } from "./subscription";

export async function createWorkspace(formData: FormData) {
  const result = createWorkspaceSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
  });

  if (!result.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: existingWorkspaces } = await supabase
    .from("workspace_members")
    .select("workspaces(*)")
    .eq("user_id", user.id);

  const workspaceCount = existingWorkspaces?.length || 0;

  if (workspaceCount >= 1) {
    const hasPaidPlan = await Promise.all(
      existingWorkspaces!.map(async (wm: any) => {
        const plan = await getEffectiveWorkspacePlan(user.id, wm.workspaces.id);
        return plan !== "free";
      })
    );

    if (!hasPaidPlan.some(Boolean)) {
      return { error: "Free plan limited to 1 workspace. Upgrade to Pro for unlimited workspaces." };
    }
  }

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

  await syncUserSubscriptionToWorkspace(user.id, data.id);

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
