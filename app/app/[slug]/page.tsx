import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { getWorkspaceLaunchProjects } from "@/lib/actions/launch-project";
import { getWorkspaceTasks } from "@/lib/actions/task";
import { getWorkspaceContentItems } from "@/lib/actions/content";
import { getProjectLinks } from "@/lib/actions/project-link";
import { calculateReadinessScore } from "@/lib/utils/readiness";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import Link from "next/link";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
    const hasTasks = projectTasks.length > 0;
    const hasContent = projectContent.length > 0;

    const readiness = calculateReadinessScore(
      completed,
      total,
      hasLaunchDate,
      hasXLink,
      hasTelegramLink,
      hasTasks,
      hasContent
    );
    launchReadiness = readiness.totalScore;
  }

  return (
    <div className="min-h-screen bg-[#05070d] flex">
      <DashboardSidebar workspaceSlug={workspace.slug} />

      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
            <p className="text-slate-300 text-sm">Launch command center</p>
          </div>
          <SignOutButton />
        </header>

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
                    className="block p-4 bg-[#0b1020] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-white mb-1">{project.name}</div>
                        <div className="text-sm text-slate-300">{project.ticker}</div>
                      </div>
                      <span className="px-2 py-1 bg-[#111827] border border-white/10 rounded text-xs text-slate-300 capitalize">
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {project.chain}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-slate-300 mb-2">No launch projects yet</p>
                <p className="text-xs text-slate-400">Create your first project to get started</p>
              </div>
            )}
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 md:col-span-2 lg:col-span-3">
            <h3 className="font-semibold text-white mb-2">Metrics</h3>
            <p className="text-sm text-slate-300">
              Token metrics coming soon. Connect your token to track holder count, volume, and community growth.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
