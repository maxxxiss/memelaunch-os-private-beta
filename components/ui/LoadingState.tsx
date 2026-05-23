import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function LoadingState({ message, size = "md" }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className={`${sizeStyles[size]} text-blue-500 animate-spin mb-4`} />
      {message && <p className="text-sm text-slate-400">{message}</p>}
    </div>
  );
}
