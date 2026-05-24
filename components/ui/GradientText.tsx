import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  from?: string;
  to?: string;
  className?: string;
}

export function GradientText({ children, from = "from-white", to = "to-blue-200", className = "" }: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}
