import Link from "next/link";

const PLAN_CONFIG: Record<string, { label: string; className: string; paid: boolean }> = {
  pro: {
    label: "Pro Plan",
    className: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    paid: true,
  },
  team: {
    label: "Team Plan",
    className: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    paid: true,
  },
  free: {
    label: "Free Plan",
    className: "bg-slate-800/60 border-white/10 text-slate-400",
    paid: false,
  },
};

export function PlanBadge({ plan }: { plan: string }) {
  const normalized = plan?.toLowerCase();
  const config = PLAN_CONFIG[normalized] ?? PLAN_CONFIG.free;

  return (
    <div className="flex items-center gap-3">
      <span
        className={`px-3 py-1 border rounded-full text-xs font-medium tracking-wide ${config.className}`}
      >
        {config.label}
      </span>
      {!config.paid && (
        <Link
          href="/pricing"
          className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-slate-300 transition-colors"
        >
          Upgrade
        </Link>
      )}
    </div>
  );
}
