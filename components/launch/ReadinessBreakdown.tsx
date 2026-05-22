import type { ReadinessBreakdown } from "@/lib/utils/readiness";

interface ReadinessBreakdownProps {
  breakdown: ReadinessBreakdown;
}

export function ReadinessBreakdown({ breakdown }: ReadinessBreakdownProps) {
  const items = [
    { label: "Checklist completion", score: breakdown.checklistScore, max: 50 },
    { label: "Launch date set", score: breakdown.launchDateScore, max: 15 },
    { label: "Required links (X + Telegram)", score: breakdown.requiredLinksScore, max: 15 },
    { label: "Tasks created", score: breakdown.tasksScore, max: 10 },
    { label: "Content planned", score: breakdown.contentScore, max: 10 },
  ];

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Launch Readiness</h3>
      <div className="mb-4">
        <div className="text-3xl font-bold text-blue-500 mb-2">{breakdown.totalScore}%</div>
        <div className="w-full bg-[#0b1020] rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${breakdown.totalScore}%` }}
          />
        </div>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300">{item.label}</span>
              <span className="text-white">{item.score}/{item.max}</span>
            </div>
            <div className="w-full bg-[#0b1020] rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${item.score === item.max ? 'bg-green-500' : 'bg-white'}`}
                style={{ width: `${(item.score / item.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
