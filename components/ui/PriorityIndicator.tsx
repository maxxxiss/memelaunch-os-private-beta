interface PriorityIndicatorProps {
  priority: "urgent" | "high" | "medium" | "low";
  variant?: "dot" | "bar";
}

const priorityConfig = {
  urgent: { color: "bg-rose-500", border: "border-rose-500/30" },
  high: { color: "bg-amber-500", border: "border-amber-500/30" },
  medium: { color: "bg-blue-500", border: "border-blue-500/30" },
  low: { color: "bg-slate-500", border: "border-slate-500/30" },
};

export function PriorityIndicator({ priority, variant = "dot" }: PriorityIndicatorProps) {
  const config = priorityConfig[priority];

  if (variant === "bar") {
    return (
      <div className={`h-full w-1 rounded-r-full ${config.color}`} />
    );
  }

  return (
    <div className={`h-2 w-2 rounded-full ${config.color}`} />
  );
}
