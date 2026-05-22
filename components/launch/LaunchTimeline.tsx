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

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Launch Timeline</h3>
      <div className="space-y-3">
        {timelineItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-[#0b1020] rounded-lg border border-white/10">
            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium text-white">{item.title}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {item.type === "content" && item.platform ? `${item.platform} • ` : ""}
                    {item.type === "task" ? "Task" : "Content"}
                  </div>
                </div>
                {item.date && (
                  <div className="text-xs text-slate-300">
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
