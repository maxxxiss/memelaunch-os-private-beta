"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  tone?: "blue" | "cyan" | "emerald" | "amber";
  animate?: boolean;
  height?: "thin" | "normal";
  showGlow?: boolean;
  className?: string;
}

const toneMap = {
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

const heightMap = {
  thin: "h-1",
  normal: "h-1.5",
};

export function ProgressBar({ value, tone = "blue", animate = true, height = "normal", showGlow = false, className = "" }: ProgressBarProps) {
  const fillClass = toneMap[tone];
  const heightClass = heightMap[height];
  const glowClass = showGlow ? "shadow-[0_0_8px_currentColor]" : "";

  return (
    <div className={`w-full bg-white/8 rounded-full overflow-hidden ${heightClass} ${className}`}>
      {animate ? (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`${fillClass} ${heightClass} ${glowClass}`}
        />
      ) : (
        <div className={`${fillClass} ${heightClass} ${glowClass}`} style={{ width: `${value}%` }} />
      )}
    </div>
  );
}
