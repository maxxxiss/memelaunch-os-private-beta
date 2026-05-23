import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getWorkspaceLaunchProjects } from "@/lib/actions/launch-project";
import { getWorkspaceTasks } from "@/lib/actions/task";
import { getWorkspaceContentItems } from "@/lib/actions/content";
import { getProjectLinks } from "@/lib/actions/project-link";
import { calculateReadinessScore } from "@/lib/utils/readiness";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import { LaunchReadinessHero } from "@/components/dashboard/LaunchReadinessHero";
import { DashboardProjectsGrid } from "@/components/dashboard/DashboardProjectsGrid";
import { NextActionsPanel } from "@/components/dashboard/NextActionsPanel";
import { CheckoutSuccessMessage } from "../CheckoutSuccessMessage";
import { syncUserSubscriptionToWorkspace, getEffectiveWorkspacePlan } from "@/lib/actions/subscription";
import { PlanBadge } from "@/components/dashboard/PlanBadge";

export default async function WorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { slug } = await params;
  const { checkout } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!workspace) {
    redirect("/app");
  }

  const { data: member } = await supabase
    .from("workspace_members")
    .select("*")
    .eq("workspace_id", workspace.id)
    .eq("user_id", user.id)
    .single();

  if (!member) {
    redirect("/app");
  }

  await syncUserSubscriptionToWorkspace(user.id, workspace.id);
  const effectivePlan = await getEffectiveWorkspacePlan(user.id, workspace.id);

  const projects = await getWorkspaceLaunchProjects(workspace.id);
  const activeProject = projects?.[0] || null;
  const tasks = await getWorkspaceTasks(workspace.id);
  const contentItems = await getWorkspaceContentItems(workspace.id);

  let launchReadiness = 0;
  let checklistProgress = { completed: 0, total: 0 };
  const openTasksCount = tasks.filter((t) => t.status !== "done").length;
  const scheduledContentCount = contentItems.filter((c) => c.status === "scheduled").length;

  if (activeProject) {
    const { data: checklist } = await supabase
      .from("launch_checklist_items")
      .select("*")
      .eq("project_id", activeProject.id);

    const links = await getProjectLinks(activeProject.id);
    const projectTasks = await getWorkspaceTasks(workspace.id);
    const projectContent = await getWorkspaceContentItems(workspace.id);

    const completed = checklist?.filter((item) => item.completed).length || 0;
    const total = checklist?.length || 0;
    checklistProgress = { completed, total };

    const hasLaunchDate = !!activeProject.launch_date;
    const hasXLink = links.some((l) => l.type === "x");
    const hasTelegramLink = links.some((l) => l.type === "telegram");
    const tasksCompleted = projectTasks.filter((t) => t.status === "done").length;
    const tasksTotal = projectTasks.length;
    const contentScheduledPublished = projectContent.filter((c) => c.status === "scheduled" || c.status === "published").length;
    const contentTotal = projectContent.length;

    const readiness = calculateReadinessScore(
      completed,
      total,
      hasLaunchDate,
      hasXLink,
      hasTelegramLink,
      tasksCompleted,
      tasksTotal,
      contentScheduledPublished,
      contentTotal
    );
    launchReadiness = readiness.totalScore;
  }

  return (
    <div className="min-h-screen bg-[#05070d] flex">
      <DashboardSidebar workspaceSlug={workspace.slug} />

      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-[#05070d]/90 backdrop-blur-sm border-b border-white/8 px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-500">{workspace.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <PlanBadge plan={effectivePlan} />
            <DashboardMobileNav workspaceSlug={workspace.slug} />
          </div>
        </header>

        <div className="px-8 py-8">
          {checkout === "success" && <CheckoutSuccessMessage />}
          <LaunchReadinessHero
            score={launchReadiness}
            activeProject={activeProject}
            checklistProgress={checklistProgress}
            openTasksCount={openTasksCount}
            scheduledContentCount={scheduledContentCount}
            slug={slug}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <DashboardProjectsGrid projects={projects} slug={slug} />
            <NextActionsPanel
              slug={slug}
              effectivePlan={effectivePlan}
              hasActiveProject={!!activeProject}
              openTasksCount={openTasksCount}
              scheduledContentCount={scheduledContentCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
