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
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import Link from "next/link";

const STATUS_LABEL: Record<string, string> = {
  pre_launch: "Pre-launch", live: "Live", paused: "Paused", cancelled: "Cancelled",
};
const STATUS_STYLE: Record<string, string> = {
  pre_launch: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  live: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  paused: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  cancelled: "bg-red-500/10 border-red-500/20 text-red-400",
};
const barColor = (s: number) => s >= 75 ? "bg-emerald-500" : s >= 40 ? "bg-blue-500" : s >= 20 ? "bg-amber-500" : "bg-red-400/70";
const scoreColor = (s: number) => s >= 75 ? "text-emerald-400" : s >= 40 ? "text-blue-400" : s >= 20 ? "text-amber-400" : "text-red-400";

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
        <header className="sticky top-0 z-10 bg-[#05070d]/85 backdrop-blur-xl border-b border-white/10 px-5 py-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/app/${slug}`} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">← Dashboard</Link>
            <span className="text-slate-700">/</span>
            <h1 className="text-sm font-semibold text-white">{project.name}</h1>
            <span className={`px-2 py-0.5 border rounded text-[10px] font-medium ${STATUS_STYLE[project.status] ?? "bg-white/5 border-white/8 text-slate-500"}`}>
              {STATUS_LABEL[project.status] ?? project.status.replace("_", " ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-blue-400 hidden sm:block">${project.ticker}</span>
            <DashboardMobileNav workspaceSlug={slug} projectId={projectId} projectName={project.name} />
          </div>
        </header>

        <div className="px-5 py-6 md:px-8 md:py-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-[#0d1117] to-violet-500/10 border border-blue-400/20 rounded-3xl p-6 md:col-span-2 shadow-2xl shadow-blue-500/10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 font-bold mb-3">Launch room</p>
                  <h2 className="text-3xl font-black tracking-[-0.04em] text-white mb-1">{project.name}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-blue-400">${project.ticker}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-500">{project.chain}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Readiness</p>
                  <p className={`text-2xl font-bold ${scoreColor(readiness.totalScore)}`}>{readiness.totalScore}%</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Launch Date</p>
                  <p className="text-sm font-semibold text-white">{project.launch_date ? new Date(project.launch_date).toLocaleDateString() : <span className="text-slate-600">Not set</span>}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Tasks Done</p>
                  <p className="text-sm font-semibold text-white">{tasksCompleted}/{tasksTotal}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Checklist</p>
                <p className="text-xl font-bold text-white">{completed}<span className="text-sm text-slate-500">/{total}</span></p>
                <div className="w-full bg-white/5 rounded-full h-1 mt-2">
                  <div className={`${barColor(readinessPct)} h-1 rounded-full`} style={{ width: `${readinessPct}%` }} />
                </div>
              </div>
              <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-4">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Launch Date</p>
                <p className="text-sm font-semibold text-white">{project.launch_date ? new Date(project.launch_date).toLocaleDateString() : <span className="text-slate-600">Not set</span>}</p>
              </div>
            </div>
          </div>

          {project.description && (
            <div className="bg-[#0d1117] border border-white/8 rounded-3xl p-6 mb-8">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">About</p>
              <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
            </div>
          )}

          <div id="checklist" className="bg-[#0d1117] border border-white/8 rounded-3xl p-5 md:p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-white">Launch Checklist</h2>
                <p className="text-xs text-slate-500 mt-0.5">{completed} of {total} items completed</p>
              </div>
              <span className="text-sm font-bold text-white">{readinessPct}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-6">
              <div className={`${barColor(readinessPct)} h-1.5 rounded-full transition-all`} style={{ width: `${readinessPct}%` }} />
            </div>
            <ProjectChecklist projectId={projectId} items={checklist} />
          </div>

          <div id="tasks" className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="bg-[#0d1117] border border-white/8 rounded-3xl p-5 md:p-6">
              <h2 className="font-semibold text-white mb-4">Tasks</h2>
              <TaskList tasks={tasks} />
              <div className="mt-5 pt-5 border-t border-white/8">
                <CreateTaskForm workspaceId={workspace.id} workspaceSlug={workspace.slug} projectId={projectId} />
              </div>
            </div>
            <div id="content" className="bg-[#0d1117] border border-white/8 rounded-3xl p-5 md:p-6">
              <h2 className="font-semibold text-white mb-4">Content Plan</h2>
              <ContentList items={contentItems} />
              <div className="mt-5 pt-5 border-t border-white/8">
                <CreateContentForm workspaceId={workspace.id} workspaceSlug={workspace.slug} projectId={projectId} />
              </div>
            </div>
          </div>

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
