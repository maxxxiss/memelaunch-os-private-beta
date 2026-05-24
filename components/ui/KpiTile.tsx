import { LucideIcon } from "lucide-react";

interface KpiTileProps {
  label: string;
  value: string;
  sub: string;
  tone?: "blue" | "cyan" | "emerald" | "violet" | "amber";
  icon?: LucideIcon;
  className?: string;
}

const toneMap = {
  blue: "border-blue-500/18 bg-blue-500/8",
  cyan: "border-cyan-500/18 bg-cyan-500/8",
  emerald: "border-emerald-500/18 bg-emerald-500/8",
  violet: "border-violet-500/18 bg-violet-500/8",
  amber: "border-amber-500/18 bg-amber-500/8",
};

export function KpiTile({ label, value, sub, tone = "blue", icon: Icon, className = "" }: KpiTileProps) {
  return (
    <div className={`rounded-3xl border ${toneMap[tone]} p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-1.5">
        {Icon && <Icon className="h-4 w-4 opacity-60" />}
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      </div>
      <p className="mt-1.5 text-2xl font-black font-display text-white">{value}</p>
      <p className="mt-0.5 text-[11px] text-slate-500">{sub}</p>
    </div>
  );
}
