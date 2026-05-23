import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getProjectChecklist } from "@/lib/actions/launch-project";
import { getProjectTasks } from "@/lib/actions/task";
import { getProjectContentItems } from "@/lib/actions/content";
import { getProjectLinks } from "@/lib/actions/project-link";
import { calculateReadinessScore } from "@/lib/utils/readiness";
import { ProjectChecklist } from "@/components/launch/ProjectChecklist";
import { TaskList } from "@/components/tasks/TaskList";
import { ContentList } from "@/components/content/ContentList";
import { CreateTaskForm } from "@/components/tasks/CreateTaskForm";
import { CreateContentForm } from "@/components/content/CreateContentForm";
import { ProjectSettingsForm } from "@/components/launch/ProjectSettingsForm";
import { ProjectLinks } from "@/components/launch/ProjectLinks";
import { ReadinessBreakdown } from "@/components/launch/ReadinessBreakdown";
import { LaunchTimeline } from "@/components/launch/LaunchTimeline";
import { LaunchPlanSummary } from "@/components/launch/LaunchPlanSummary";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; projectId: string }>;
}) {
  const { slug, projectId } = await params;
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

  const { data: project } = await supabase
    .from("launch_projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (!project) {
    redirect(`/app/${slug}`);
  }

  const checklist = await getProjectChecklist(projectId);
  const tasks = await getProjectTasks(projectId);
  const contentItems = await getProjectContentItems(projectId);
  const links = await getProjectLinks(projectId);

  const completed = checklist.filter((item) => item.completed).length;
  const total = checklist.length;
  const hasLaunchDate = !!project.launch_date;
  const hasXLink = links.some((l) => l.type === "x");
  const hasTelegramLink = links.some((l) => l.type === "telegram");
  const tasksCompleted = tasks.filter((t) => t.status === "done").length;
  const tasksTotal = tasks.length;
  const contentScheduledPublished = contentItems.filter((c) => c.status === "scheduled" || c.status === "published").length;
  const contentTotal = contentItems.length;

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

  const readinessPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#05070d] flex">
      <DashboardSidebar workspaceSlug={slug} projectId={projectId} projectName={project.name} />

      <main className="flex-1 overflow-auto">
        {/* Sticky header */}
        <header className="sticky top-0 z-10 bg-[#05070d]/90 backdrop-blur-sm border-b border-white/8 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/app/${slug}`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">← Dashboard</Link>
            <span className="text-slate-700">/</span>
            <h1 className="text-sm font-semibold text-white">{project.name}</h1>
            <span className="px-2 py-0.5 bg-[#0d1117] border border-white/8 rounded text-xs text-slate-400 capitalize">{project.status.replace("_", " ")}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-mono text-blue-400">${project.ticker}</span>
            <span>{project.chain}</span>
          </div>
        </header>

        <div className="px-8 py-8 max-w-5xl">
          {/* Hero stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-6 md:col-span-2">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-3">Launch Readiness</p>
              <div className="text-5xl font-bold text-white mb-3">{readiness.totalScore}<span className="text-2xl text-slate-500">%</span></div>
              <div className="w-full bg-white/5 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${readiness.totalScore}%` }} />
              </div>
              <p className="text-xs text-slate-600">Based on checklist, tasks, links, and content</p>
            </div>
            <div className="space-y-3">
              <div className="bg-[#0d1117] border border-white/8 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Checklist</p>
                <p className="text-xl font-bold text-white">{completed}<span className="text-sm text-slate-500">/{total}</span></p>
                <div className="w-full bg-white/5 rounded-full h-1 mt-2">
                  <div className="bg-white/40 h-1 rounded-full" style={{ width: `${readinessPct}%` }} />
                </div>
              </div>
              <div className="bg-[#0d1117] border border-white/8 rounded-xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Launch Date</p>
                <p className="text-sm font-semibold text-white">{project.launch_date ? new Date(project.launch_date).toLocaleDateString() : <span className="text-slate-600">Not set</span>}</p>
              </div>
            </div>
          </div>

          {project.description && (
            <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-6 mb-8">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">About</p>
              <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Checklist */}
          <div id="checklist" className="bg-[#0d1117] border border-white/8 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-white">Launch Checklist</h2>
                <p className="text-xs text-slate-500 mt-0.5">{completed} of {total} items completed</p>
              </div>
              <span className="text-sm font-bold text-white">{readinessPct}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-6">
              <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${readinessPct}%` }} />
            </div>
            <ProjectChecklist projectId={projectId} items={checklist} />
          </div>

          {/* Tasks + Content */}
          <div id="tasks" className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-4">Tasks</h2>
              <TaskList tasks={tasks} />
              <div className="mt-5 pt-5 border-t border-white/8">
                <CreateTaskForm workspaceId={workspace.id} workspaceSlug={workspace.slug} projectId={projectId} />
              </div>
            </div>
            <div id="content" className="bg-[#0d1117] border border-white/8 rounded-2xl p-6">
              <h2 className="font-semibold text-white mb-4">Content Plan</h2>
              <ContentList items={contentItems} />
              <div className="mt-5 pt-5 border-t border-white/8">
                <CreateContentForm workspaceId={workspace.id} workspaceSlug={workspace.slug} projectId={projectId} />
              </div>
            </div>
          </div>

          {/* Readiness + Links */}
          <div id="readiness" className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <ReadinessBreakdown breakdown={readiness} />
            <ProjectLinks projectId={projectId} workspaceId={workspace.id} workspaceSlug={workspace.slug} links={links} />
          </div>

          <div className="mb-6"><LaunchTimeline tasks={tasks} contentItems={contentItems} /></div>
          <div className="mb-6"><LaunchPlanSummary project={project} links={links} checklist={checklist} tasks={tasks} contentItems={contentItems} readiness={readiness} /></div>
          <div className="mb-8">
            <ProjectSettingsForm projectId={projectId} workspaceId={workspace.id} workspaceSlug={workspace.slug} initialData={{ name: project.name, ticker: project.ticker, chain: project.chain, launch_date: project.launch_date, status: project.status, description: project.description }} />
          </div>
        </div>
      </main>
    </div>
  );
}
