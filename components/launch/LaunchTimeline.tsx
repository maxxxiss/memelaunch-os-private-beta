interface Task {
  id: string;
  title: string;
  due_date: string | null;
  status: string;
}

interface ContentItem {
  id: string;
  title: string;
  scheduled_at: string | null;
  status: string;
  platform: string;
}

interface LaunchTimelineProps {
  tasks: Task[];
  contentItems: ContentItem[];
}

interface TimelineItem {
  id: string;
  type: "task" | "content";
  title: string;
  date: string | null;
  status: string;
  platform?: string;
}

export function LaunchTimeline({ tasks, contentItems }: LaunchTimelineProps) {
  const timelineItems: TimelineItem[] = [
    ...tasks.map((task) => ({
      id: task.id,
      type: "task" as const,
      title: task.title,
      date: task.due_date,
      status: task.status,
    })),
    ...contentItems.map((item) => ({
      id: item.id,
      type: "content" as const,
      title: item.title,
      date: item.scheduled_at,
      status: item.status,
      platform: item.platform,
    })),
  ].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (timelineItems.length === 0) {
    return (
      <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Launch Timeline</h3>
        <div className="text-center py-6">
          <p className="text-sm text-slate-300 mb-1">No timeline items yet</p>
          <p className="text-xs text-slate-400">Add tasks with due dates or scheduled content</p>
        </div>
      </div>
    );
  }

  const PLATFORM_COLORS: Record<string, string> = {
    x: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    telegram: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    discord: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    website: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  };

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Launch Timeline</h3>
      <div className="space-y-3">
        {timelineItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-4 bg-[#0b1020] rounded-xl border border-white/8 hover:border-white/12 transition-colors">
            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{item.title}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    {item.type === "content" && item.platform && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${PLATFORM_COLORS[item.platform] ?? PLATFORM_COLORS.website}`}>
                        {item.platform.toUpperCase()}
                      </span>
                    )}
                    <span className="text-xs text-slate-500">
                      {item.type === "task" ? "Task" : "Content"}
                    </span>
                  </div>
                </div>
                {item.date && (
                  <div className="text-xs text-slate-400 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
