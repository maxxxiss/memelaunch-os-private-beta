import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  variant?: "default" | "warning";
}

const variantStyles = {
  default: {
    container: "bg-red-500/10 border border-red-500/30",
    icon: "text-red-400",
    title: "text-red-300",
    message: "text-red-400/90",
  },
  warning: {
    container: "bg-yellow-500/10 border border-yellow-500/30",
    icon: "text-yellow-400",
    title: "text-yellow-300",
    message: "text-yellow-400/90",
  },
};

export function ErrorMessage({ title, message, onRetry, variant = "default" }: ErrorMessageProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.container} rounded-xl p-4`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 ${styles.icon} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          {title && <h4 className={`text-sm font-semibold ${styles.title} mb-1`}>{title}</h4>}
          <p className={`text-sm ${styles.message} leading-relaxed`}>{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-white hover:text-slate-200 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
