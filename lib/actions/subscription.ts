"use server";

import { createClient } from "@/lib/supabase/server";

export async function syncUserSubscriptionToWorkspace(
  userId: string,
  workspaceId: string
): Promise<{ plan: string; synced: boolean }> {
  const supabase = await createClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .is("workspace_id", null)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  console.log("syncUserSubscriptionToWorkspace", {
    userId,
    workspaceId,
    foundUserLevelSubscription: !!subscription,
  });

  if (!subscription) {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("plan")
      .eq("id", workspaceId)
      .single();

    return { plan: workspace?.plan || "free", synced: false };
  }

  const { error: subError } = await supabase
    .from("subscriptions")
    .update({ workspace_id: workspaceId })
    .eq("id", subscription.id);

  if (subError) {
    console.error("Failed to update subscription workspace_id:", subError);
    return { plan: subscription.plan_type, synced: false };
  }

  const { error: workspaceError } = await supabase
    .from("workspaces")
    .update({ plan: subscription.plan_type })
    .eq("id", workspaceId);

  if (workspaceError) {
    console.error("Failed to update workspace plan:", workspaceError);
  }

  return { plan: subscription.plan_type, synced: true };
}

export async function getEffectiveWorkspacePlan(
  userId: string,
  workspaceId: string
): Promise<string> {
  const supabase = await createClient();

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("plan")
    .eq("id", workspaceId)
    .single();

  let foundWorkspaceSubscription = false;
  let foundUserLevelSubscription = false;
  let effectivePlan = workspace?.plan || "free";

  const { data: workspaceSubscription } = await supabase
    .from("subscriptions")
    .select("plan_type")
    .eq("workspace_id", workspaceId)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (workspaceSubscription) {
    foundWorkspaceSubscription = true;
    effectivePlan = workspaceSubscription.plan_type;
  }

  if (!workspaceSubscription) {
    const { data: userSubscription } = await supabase
      .from("subscriptions")
      .select("plan_type")
      .eq("user_id", userId)
      .is("workspace_id", null)
      .in("status", ["active", "trialing"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (userSubscription) {
      foundUserLevelSubscription = true;
      effectivePlan = userSubscription.plan_type;
    }
  }

  console.log("getEffectiveWorkspacePlan", {
    userId,
    workspaceId,
    foundWorkspaceSubscription,
    foundUserLevelSubscription,
    effectivePlan,
    workspacePlan: workspace?.plan,
  });

  return effectivePlan;
}

