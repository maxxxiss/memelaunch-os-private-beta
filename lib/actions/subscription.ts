"use server";

import { createServiceClient } from "@/lib/supabase/server";

function normalizePlan(plan: string | null | undefined): string {
  const p = plan?.toLowerCase();
  if (p === "pro" || p === "team") return p;
  return "free";
}

export async function getActiveSubscriptionForWorkspace(workspaceId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("id, plan_type, status, workspace_id, user_id")
    .eq("workspace_id", workspaceId)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function getActiveSubscriptionForUser(userId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("subscriptions")
    .select("id, plan_type, status, workspace_id, user_id")
    .eq("user_id", userId)
    .is("workspace_id", null)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function syncUserSubscriptionToWorkspace(
  userId: string,
  workspaceId: string
): Promise<{ plan: string; synced: boolean }> {
  const supabase = createServiceClient();

  const subscription = await getActiveSubscriptionForUser(userId);

  console.log("syncUserSubscriptionToWorkspace", {
    userId,
    workspaceId,
    foundUserLevelSubscription: !!subscription,
    subscriptionId: subscription?.id,
    subscriptionStatus: subscription?.status,
    subscriptionPlan: subscription?.plan_type,
  });

  if (!subscription) {
    const { data: workspace } = await supabase
      .from("workspaces")
      .select("plan")
      .eq("id", workspaceId)
      .single();
    return { plan: normalizePlan(workspace?.plan), synced: false };
  }

  const plan = normalizePlan(subscription.plan_type);

  const { error: subError } = await supabase
    .from("subscriptions")
    .update({ workspace_id: workspaceId })
    .eq("id", subscription.id);

  if (subError) {
    console.error("Failed to update subscription workspace_id:", subError.message);
    return { plan, synced: false };
  }

  const { error: workspaceError } = await supabase
    .from("workspaces")
    .update({ plan })
    .eq("id", workspaceId);

  if (workspaceError) {
    console.error("Failed to update workspace plan:", workspaceError.message);
  }

  return { plan, synced: true };
}

export async function getEffectiveWorkspacePlan(
  userId: string,
  workspaceId: string
): Promise<string> {
  const supabase = createServiceClient();

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("plan")
    .eq("id", workspaceId)
    .single();

  const workspaceSub = await getActiveSubscriptionForWorkspace(workspaceId);
  const userSub = workspaceSub ? null : await getActiveSubscriptionForUser(userId);

  const effectivePlan = normalizePlan(
    workspaceSub?.plan_type ?? userSub?.plan_type ?? workspace?.plan
  );

  console.log("getEffectiveWorkspacePlan", {
    userId,
    workspaceId,
    foundWorkspaceSubscription: !!workspaceSub,
    foundUserLevelSubscription: !!userSub,
    effectivePlan,
    workspacePlan: workspace?.plan,
  });

  return effectivePlan;
}
