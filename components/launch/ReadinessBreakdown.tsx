import type { ReadinessBreakdown } from "@/lib/utils/readiness";

interface ReadinessBreakdownProps {
  breakdown: ReadinessBreakdown;
}

export function ReadinessBreakdown({ breakdown }: ReadinessBreakdownProps) {
  const items = [
    { label: "Checklist completion", score: breakdown.checklistScore, max: 50 },
    { label: "Launch date set", score: breakdown.launchDateScore, max: 15 },
    { label: "Required links (X + Telegram)", score: breakdown.requiredLinksScore, max: 15 },
    { label: "Tasks completed", score: breakdown.tasksScore, max: 10 },
    { label: "Content scheduled/published", score: breakdown.contentScore, max: 10 },
  ];

  return (
    <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-6">
      <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-4">Readiness Breakdown</p>
      <div className="space-y-4">
        {items.map((item) => {
          const pct = Math.round((item.score / item.max) * 100);
          const full = item.score === item.max;
          return (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className={full ? "text-slate-300" : "text-slate-500"}>{item.label}</span>
                <span className={full ? "text-emerald-400 font-medium" : "text-slate-500"}>{item.score}/{item.max}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${full ? "bg-emerald-500" : "bg-blue-500"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
