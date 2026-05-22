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
  const hasTasks = tasks.length > 0;
  const hasContent = contentItems.length > 0;

  const readiness = calculateReadinessScore(
    completed,
    total,
    hasLaunchDate,
    hasXLink,
    hasTelegramLink,
    hasTasks,
    hasContent
  );

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href={`/app/${slug}`}
            className="text-sm text-slate-300 hover:text-white mb-4 inline-block"
          >
            ← Back to dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{project.name}</h1>
          <p className="text-slate-300">{project.ticker} · {project.chain}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Status</h3>
            <div className="text-lg font-medium text-white capitalize">
              {project.status.replace('_', ' ')}
            </div>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Readiness</h3>
            <div className="text-3xl font-bold text-blue-500 mb-1">{readiness.totalScore}%</div>
            <p className="text-sm text-slate-300">Launch readiness score</p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Launch Date</h3>
            <div className="text-lg font-medium text-white">
              {project.launch_date
                ? new Date(project.launch_date).toLocaleDateString()
                : "Not set"}
            </div>
          </div>
        </div>

        {project.description && (
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 mb-8">
            <h3 className="font-semibold text-white mb-2">Description</h3>
            <p className="text-slate-300">{project.description}</p>
          </div>
        )}

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Launch Checklist</h2>
            <div className="text-sm text-slate-300">{completed}/{total} completed</div>
          </div>
          <div className="w-full bg-[#0b1020] rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
            />
          </div>
          <ProjectChecklist projectId={projectId} items={checklist} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Tasks</h2>
            <TaskList tasks={tasks} />
            <div className="mt-4">
              <CreateTaskForm workspaceId={workspace.id} workspaceSlug={workspace.slug} projectId={projectId} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Content Plan</h2>
            <ContentList items={contentItems} />
            <div className="mt-4">
              <CreateContentForm workspaceId={workspace.id} workspaceSlug={workspace.slug} projectId={projectId} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ReadinessBreakdown breakdown={readiness} />
          <ProjectLinks
            projectId={projectId}
            workspaceId={workspace.id}
            workspaceSlug={workspace.slug}
            links={links}
          />
        </div>

        <div className="mb-8">
          <LaunchTimeline tasks={tasks} contentItems={contentItems} />
        </div>

        <div className="mb-8">
          <LaunchPlanSummary
            project={project}
            links={links}
            checklist={checklist}
            tasks={tasks}
            contentItems={contentItems}
            readiness={readiness}
          />
        </div>

        <div className="mb-8">
          <ProjectSettingsForm
            projectId={projectId}
            workspaceId={workspace.id}
            workspaceSlug={workspace.slug}
            initialData={{
              name: project.name,
              ticker: project.ticker,
              chain: project.chain,
              launch_date: project.launch_date,
              status: project.status,
              description: project.description,
            }}
          />
        </div>
      </div>
    </div>
  );
}
