interface LaunchReadinessHeroProps {
  score: number;
  activeProject: { name: string; ticker: string } | null;
  checklistProgress: { completed: number; total: number };
  openTasksCount: number;
  scheduledContentCount: number;
}

function KpiTile({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-white/4 border border-white/6 rounded-xl p-3.5">
      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-medium mb-1.5">{label}</p>
      <p className="text-sm font-bold text-white truncate">{value}</p>
      <p className="text-[10px] text-slate-600 truncate mt-0.5">{sub}</p>
    </div>
  );
}

const scoreAccent = (s: number) =>
  s >= 75 ? "text-emerald-400" : s >= 40 ? "text-blue-400" : "text-slate-400";

const scoreBar = (s: number) =>
  s >= 75 ? "bg-emerald-500" : s >= 40 ? "bg-blue-500" : "bg-slate-600";

const scoreLabel = (s: number) =>
  s >= 80 ? "Ready to launch" : s >= 50 ? "Getting closer" : s >= 25 ? "In progress" : "Just getting started";

export function LaunchReadinessHero({
  score,
  activeProject,
  checklistProgress,
  openTasksCount,
  scheduledContentCount,
}: LaunchReadinessHeroProps) {
  const checklistPct =
    checklistProgress.total > 0
      ? Math.round((checklistProgress.completed / checklistProgress.total) * 100)
      : 0;

  return (
    <div className="relative overflow-hidden bg-[#080d18] border border-blue-500/12 rounded-2xl p-7 mb-5">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/7 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-52 h-52 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-7">
        {/* Score */}
        <div className="shrink-0">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-semibold mb-2">Launch Readiness</p>
          <div className="flex items-end gap-2 mb-3">
            <span className={`text-6xl font-bold leading-none tabular-nums ${scoreAccent(score)}`}>{score}</span>
            <span className="text-2xl text-slate-500 mb-1">%</span>
          </div>
          <div className="w-48 bg-white/5 rounded-full h-1.5 mb-2">
            <div className={`h-1.5 rounded-full transition-all ${scoreBar(score)}`} style={{ width: `${score}%` }} />
          </div>
          <p className="text-xs text-slate-500">{scoreLabel(score)}</p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-20 bg-white/8 shrink-0" />

        {/* KPI tiles */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiTile
            label="Active Project"
            value={activeProject?.name ?? "—"}
            sub={activeProject ? `$${activeProject.ticker}` : "No project yet"}
          />
          <KpiTile
            label="Checklist"
            value={`${checklistProgress.completed}/${checklistProgress.total}`}
            sub={`${checklistPct}% complete`}
          />
          <KpiTile
            label="Open Tasks"
            value={String(openTasksCount)}
            sub={openTasksCount === 0 ? "All clear" : "Need attention"}
          />
          <KpiTile
            label="Scheduled Content"
            value={String(scheduledContentCount)}
            sub={scheduledContentCount === 0 ? "None planned" : "Items in calendar"}
          />
        </div>
      </div>
    </div>
  );
}
