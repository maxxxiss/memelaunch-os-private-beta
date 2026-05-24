import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { GlowCard, PremiumCTA } from "./premium";

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
    tone: undefined as "blue" | "cyan" | "emerald" | "violet" | undefined,
    icon: "text-slate-400",
    title: "text-white",
    description: "text-slate-400",
  },
  premium: {
    tone: "blue" as const,
    icon: "text-blue-400",
    title: "text-white",
    description: "text-slate-400",
  },
  warning: {
    tone: undefined,
    icon: "text-amber-400",
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
    <GlowCard tone={styles.tone} className="p-8 text-center">
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
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
            <PremiumCTA href={primaryAction.href}>{primaryAction.label}</PremiumCTA>
          ) : (
            <button
              onClick={primaryAction.onClick}
              className="px-5 py-2.5 bg-white hover:bg-blue-50 text-[#05070d] rounded-xl font-bold text-sm transition-colors shadow-cta"
            >
              {primaryAction.label}
            </button>
          )
        )}
        {secondaryAction && (
          secondaryAction.href ? (
            <Link
              href={secondaryAction.href}
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium text-sm transition-colors"
            >
              {secondaryAction.label}
            </Link>
          ) : (
            <button
              onClick={secondaryAction.onClick}
              className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium text-sm transition-colors"
            >
              {secondaryAction.label}
            </button>
          )
        )}
      </div>
    </GlowCard>
  );
}
