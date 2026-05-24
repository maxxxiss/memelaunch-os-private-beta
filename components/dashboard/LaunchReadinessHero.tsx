import { Rocket } from "lucide-react";
import { GlowCard, PremiumCTA, ReadinessGauge } from "@/components/ui/premium";
import { KpiTile } from "@/components/ui/KpiTile";

interface LaunchReadinessHeroProps {
  score: number;
  activeProject: { name: string; ticker: string } | null;
  checklistProgress: { completed: number; total: number };
  openTasksCount: number;
  scheduledContentCount: number;
  slug: string;
}

const scoreLabel = (s: number) =>
  s >= 80 ? "Ready to launch" : s >= 50 ? "Getting closer" : s >= 25 ? "In progress" : "Just getting started";

export function LaunchReadinessHero({ score, activeProject, checklistProgress, openTasksCount, scheduledContentCount, slug }: LaunchReadinessHeroProps) {
  const checklistPct = checklistProgress.total > 0 ? Math.round((checklistProgress.completed / checklistProgress.total) * 100) : 0;

  if (!activeProject) {
    return (
      <GlowCard className="mb-5 p-8 text-center md:p-12">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-blue-400/25 bg-blue-500/15">
          <Rocket className="h-6 w-6 text-blue-300" />
        </div>
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white">Create your first launch project</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">Turn your workspace into a launch command center with a checklist, tasks, content schedule, links, and readiness score.</p>
        <div className="mt-7"><PremiumCTA href={`/app/${slug}/new-project`}>Create first project</PremiumCTA></div>
      </GlowCard>
    );
  }

  return (
    <GlowCard className="mb-5 p-6 md:p-8">
      <div className="grid gap-7 lg:grid-cols-[180px_1fr] lg:items-center">
        <div className="flex flex-col items-center lg:items-start">
          <ReadinessGauge score={score} />
          <p className="mt-4 text-sm font-semibold text-white">{scoreLabel(score)}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Launch command status</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">{activeProject.name}</h2>
          <p className="mt-1 font-mono text-sm text-blue-300">${activeProject.ticker}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <KpiTile label="Checklist" value={`${checklistProgress.completed}/${checklistProgress.total}`} sub={`${checklistPct}% complete`} tone="emerald" />
            <KpiTile label="Open Tasks" value={String(openTasksCount)} sub={openTasksCount === 0 ? "All clear" : "Need attention"} tone="cyan" />
            <KpiTile label="Scheduled" value={String(scheduledContentCount)} sub="Content items" tone="violet" />
            <KpiTile label="Next Step" value={openTasksCount > 0 ? "Tasks" : "Content"} sub="Recommended focus" tone="blue" />
          </div>
        </div>
      </div>
    </GlowCard>
  );
}
