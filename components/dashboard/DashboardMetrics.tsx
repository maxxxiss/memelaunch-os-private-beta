interface DashboardMetricsProps {
  launchReadiness: number;
  activeProject: { name: string; ticker: string } | null;
  checklistProgress: { completed: number; total: number };
  openTasksCount: number;
  scheduledContentCount: number;
}

const readinessColor = (score: number) =>
  score >= 75 ? "bg-emerald-500" : score >= 40 ? "bg-blue-500" : "bg-slate-600";

export function DashboardMetrics({
  launchReadiness,
  activeProject,
  checklistProgress,
  openTasksCount,
  scheduledContentCount,
}: DashboardMetricsProps) {
  const checklistPct =
    checklistProgress.total > 0
      ? Math.round((checklistProgress.completed / checklistProgress.total) * 100)
      : 0;

  return (
    <>
      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">Launch Readiness</p>
        <div className="text-4xl font-bold text-white mb-2">{launchReadiness}<span className="text-xl text-slate-500">%</span></div>
        <div className="w-full bg-[#0b1020] rounded-full h-1.5 mb-2">
          <div className={`${readinessColor(launchReadiness)} h-1.5 rounded-full transition-all`} style={{ width: `${launchReadiness}%` }} />
        </div>
        <p className="text-xs text-slate-500">Based on checklist, tasks, content</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">Active Project</p>
        {activeProject ? (
          <>
            <div className="text-base font-semibold text-white mb-1 truncate">{activeProject.name}</div>
            <div className="inline-flex items-center px-2 py-0.5 bg-blue-500/15 border border-blue-500/20 rounded text-xs text-blue-400 font-mono">
              ${activeProject.ticker}
            </div>
          </>
        ) : (
          <p className="text-sm text-slate-500">No active project yet. Create one to start tracking readiness.</p>
        )}
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">Checklist</p>
        <div className="text-4xl font-bold text-white mb-2">
          {checklistProgress.completed}<span className="text-xl text-slate-500">/{checklistProgress.total}</span>
        </div>
        <div className="w-full bg-[#0b1020] rounded-full h-1.5 mb-2">
          <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${checklistPct}%` }} />
        </div>
        <p className="text-xs text-slate-500">{checklistPct}% complete</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">Open Tasks</p>
        <div className="text-4xl font-bold text-white mb-2">{openTasksCount}</div>
        <p className="text-xs text-slate-500">
          {openTasksCount === 0 ? "No open tasks — all clear" : "Tasks awaiting completion"}
        </p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">Scheduled Content</p>
        <div className="text-4xl font-bold text-white mb-2">{scheduledContentCount}</div>
        <p className="text-xs text-slate-500">
          {scheduledContentCount === 0 ? "No content scheduled yet" : "Items in content calendar"}
        </p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-medium">Community Ops</p>
        <p className="text-sm text-slate-500">Add your Telegram, Discord, and X links to your project workspace.</p>
      </div>
    </>
  );
}
