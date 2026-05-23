import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: "default" | "premium" | "warning";
}

const variantStyles = {
  default: {
    container: "bg-[#0b1020] border border-white/8",
    icon: "text-slate-400",
    title: "text-white",
    description: "text-slate-400",
  },
  premium: {
    container: "bg-[#080d18] border border-blue-500/12",
    icon: "text-blue-400",
    title: "text-white",
    description: "text-slate-400",
  },
  warning: {
    container: "bg-yellow-500/5 border border-yellow-500/20",
    icon: "text-yellow-400",
    title: "text-white",
    description: "text-slate-400",
  },
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
}: EmptyStateProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.container} rounded-2xl p-8 text-center`}>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
          <Icon className={`w-5 h-5 ${styles.icon}`} />
        </div>
      )}
      <h3 className={`text-lg font-semibold ${styles.title} mb-2`}>{title}</h3>
      <p className={`text-sm ${styles.description} mb-6 max-w-sm mx-auto leading-relaxed`}>
        {description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {primaryAction && (
          primaryAction.href ? (
            <Link
              href={primaryAction.href}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {primaryAction.label}
            </Link>
          ) : (
            <button
              onClick={primaryAction.onClick}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {primaryAction.label}
            </button>
          )
        )}
        {secondaryAction && (
          secondaryAction.href ? (
            <Link
              href={secondaryAction.href}
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {secondaryAction.label}
            </Link>
          ) : (
            <button
              onClick={secondaryAction.onClick}
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {secondaryAction.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
