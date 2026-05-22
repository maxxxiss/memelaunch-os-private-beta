interface DashboardMetricsProps {
  launchReadiness: number;
  activeProject: { name: string; ticker: string } | null;
  checklistProgress: { completed: number; total: number };
  openTasksCount: number;
  scheduledContentCount: number;
}

export function DashboardMetrics({
  launchReadiness,
  activeProject,
  checklistProgress,
  openTasksCount,
  scheduledContentCount,
}: DashboardMetricsProps) {
  return (
    <>
      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="font-semibold text-white mb-3">Launch Readiness</h3>
        <div className="text-3xl font-bold text-blue-500 mb-2">{launchReadiness}%</div>
        <div className="w-full bg-[#0b1020] rounded-full h-2 mb-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${launchReadiness}%` }}
          />
        </div>
        <p className="text-sm text-slate-300">Pre-launch checklist</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="font-semibold text-white mb-3">Active Project</h3>
        <div className="text-lg font-medium text-white mb-1">
          {activeProject ? activeProject.name : "None"}
        </div>
        <p className="text-sm text-slate-300">
          {activeProject ? activeProject.ticker : "Create your first launch project"}
        </p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="font-semibold text-white mb-3">Checklist Progress</h3>
        <div className="text-3xl font-bold text-white mb-2">
          {checklistProgress.completed}/{checklistProgress.total}
        </div>
        <div className="w-full bg-[#0b1020] rounded-full h-2 mb-2">
          <div
            className="bg-white h-2 rounded-full transition-all"
            style={{ width: `${checklistProgress.total > 0 ? (checklistProgress.completed / checklistProgress.total) * 100 : 0}%` }}
          />
        </div>
        <p className="text-sm text-slate-300">Tasks completed</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="font-semibold text-white mb-3">Open Tasks</h3>
        <div className="text-3xl font-bold text-white mb-2">{openTasksCount}</div>
        <p className="text-sm text-slate-300">Tasks to complete</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="font-semibold text-white mb-3">Scheduled Content</h3>
        <div className="text-3xl font-bold text-white mb-2">{scheduledContentCount}</div>
        <p className="text-sm text-slate-300">Content items scheduled</p>
      </div>

      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="font-semibold text-white mb-3">Community Ops</h3>
        <div className="text-lg font-medium text-white mb-1">Not configured</div>
        <p className="text-sm text-slate-300">Set up community channels</p>
      </div>
    </>
  );
}
