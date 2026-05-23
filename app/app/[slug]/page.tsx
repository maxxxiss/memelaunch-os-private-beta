import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getWorkspaceLaunchProjects } from "@/lib/actions/launch-project";
import { getWorkspaceTasks } from "@/lib/actions/task";
import { getWorkspaceContentItems } from "@/lib/actions/content";
import { getProjectLinks } from "@/lib/actions/project-link";
import { calculateReadinessScore } from "@/lib/utils/readiness";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import Link from "next/link";
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
          </div>
        </header>

        <div className="px-8 py-8">
        {checkout === "success" && <CheckoutSuccessMessage />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardMetrics
            launchReadiness={launchReadiness}
            activeProject={activeProject}
            checklistProgress={checklistProgress}
            openTasksCount={openTasksCount}
            scheduledContentCount={scheduledContentCount}
          />

          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 md:col-span-2 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">Launch Projects</h3>
              <Link
                href={`/app/${slug}/new-project`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                New Project
              </Link>
            </div>
            {projects && projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/app/${slug}/projects/${project.id}`}
                    className="block p-4 bg-[#0b1020] rounded-xl border border-white/8 hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white mb-1 truncate">{project.name}</div>
                        <div className="text-xs text-blue-400 font-mono">${project.ticker}</div>
                      </div>
                      <span className="ml-2 px-2 py-0.5 bg-[#111827] border border-white/10 rounded text-xs text-slate-400 capitalize shrink-0">
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{project.chain}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <p className="text-sm font-medium text-slate-400 mb-1">No launch projects yet</p>
                <p className="text-xs text-slate-500 mb-4">Create a project to start tracking readiness and tasks</p>
                <Link
                  href={`/app/${slug}/new-project`}
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  Create first project
                </Link>
              </div>
            )}
          </div>

          <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/8 md:col-span-2 lg:col-span-3">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-2">Token Metrics</p>
            <p className="text-sm text-slate-500">
              Connect your deployed token to track holder count, volume, and community growth post-launch.
            </p>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
