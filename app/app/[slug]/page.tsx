import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getWorkspaceLaunchProjects } from "@/lib/actions/launch-project";
import { getWorkspaceTasks } from "@/lib/actions/task";
import { getWorkspaceContentItems } from "@/lib/actions/content";
import { getProjectLinks } from "@/lib/actions/project-link";
import { calculateReadinessScore } from "@/lib/utils/readiness";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LaunchReadinessHero } from "@/components/dashboard/LaunchReadinessHero";
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

          <LaunchReadinessHero
            score={launchReadiness}
            activeProject={activeProject}
            checklistProgress={checklistProgress}
            openTasksCount={openTasksCount}
            scheduledContentCount={scheduledContentCount}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Launch Projects */}
            <div className="lg:col-span-2 bg-[#0d1117] border border-white/8 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h3 className="font-semibold text-white text-sm">Launch Projects</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Your active launch workspaces</p>
                </div>
                <Link href={`/app/${slug}/new-project`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors">
                  New Project
                </Link>
              </div>
              {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.map((project) => (
                    <Link key={project.id} href={`/app/${slug}/projects/${project.id}`}
                      className="block p-4 bg-[#070b14] rounded-xl border border-white/6 hover:border-white/14 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm truncate mb-0.5">{project.name}</div>
                          <div className="text-[10px] text-blue-400 font-mono">${project.ticker}</div>
                        </div>
                        <span className="ml-2 px-2 py-0.5 bg-white/5 border border-white/8 rounded text-[10px] text-slate-500 capitalize shrink-0">
                          {project.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-600">{project.chain}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-white/8 rounded-xl">
                  <p className="text-sm font-medium text-slate-400 mb-1">No launch projects yet</p>
                  <p className="text-xs text-slate-500 mb-4">Create a project to start tracking readiness and tasks</p>
                  <Link href={`/app/${slug}/new-project`} className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors">
                    Create first project
                  </Link>
                </div>
              )}
            </div>

            {/* Quick status panel */}
            <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-6">
              <h3 className="font-semibold text-white text-sm mb-4">Quick Status</h3>
              <div className="space-y-3">
                {[
                  { label: "Plan", value: effectivePlan.charAt(0).toUpperCase() + effectivePlan.slice(1), dim: false },
                  { label: "Workspace", value: workspace.name, dim: false },
                  { label: "Projects", value: String(projects?.length ?? 0), dim: false },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-slate-500">{row.label}</span>
                    <span className="text-xs font-medium text-white">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="text-[10px] text-slate-600 mb-3 uppercase tracking-widest">Token Metrics</p>
                <p className="text-xs text-slate-600">Connect your token post-launch to track holders, volume, and growth.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
