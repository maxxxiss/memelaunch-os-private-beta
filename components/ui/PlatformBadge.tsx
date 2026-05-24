import { MessageCircle, Users, Globe, FileText, TrendingUp } from "lucide-react";

interface PlatformBadgeProps {
  platform: "x" | "telegram" | "discord" | "website" | "docs" | "chart";
  size?: "sm" | "md";
}

const platformConfig = {
  x: { icon: null, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", label: "X" },
  telegram: { icon: MessageCircle, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", label: "Telegram" },
  discord: { icon: Users, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", label: "Discord" },
  website: { icon: Globe, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", label: "Website" },
  docs: { icon: FileText, color: "text-slate-400", bg: "bg-slate-500/10 border-slate-500/20", label: "Docs" },
  chart: { icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", label: "Chart" },
};

const sizeMap = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function PlatformBadge({ platform, size = "md" }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;
  const sizeClass = sizeMap[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.color} ${sizeClass}`}>
      {Icon && <Icon className="h-3 w-3" />}
      <span className="font-medium">{config.label}</span>
    </span>
  );
}
