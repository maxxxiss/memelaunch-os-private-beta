import { ReactNode } from "react";
import Link from "next/link";

interface ShellProps {
  children: ReactNode;
  className?: string;
}

interface LabelProps {
  children: ReactNode;
  tone?: "blue" | "cyan" | "emerald" | "violet";
}

const toneStyles = {
  blue: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  cyan: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  violet: "border-violet-500/20 bg-violet-500/10 text-violet-300",
};

export function VisualShell({ children, className = "" }: ShellProps) {
  return (
    <div className={`relative overflow-hidden bg-[#05070d] text-white ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.14),transparent_30%),linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function GlowCard({ children, className = "" }: ShellProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/30 backdrop-blur ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

export function SectionLabel({ children, tone = "blue" }: LabelProps) {
  return (
    <div className={`mb-5 inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${toneStyles[tone]}`}>
      {children}
    </div>
  );
}

export function MetricPill({ label, value, tone = "blue" }: { label: string; value: string; tone?: LabelProps["tone"] }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneStyles[tone]}`}>
      <p className="text-[10px] uppercase tracking-widest opacity-80">{label}</p>
      <p className="mt-1 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

export function StatusChip({ children, tone = "blue" }: LabelProps) {
  return <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneStyles[tone]}`}>{children}</span>;
}

export function ReadinessGauge({ score }: { score: number }) {
  const color = score >= 75 ? "stroke-emerald-400" : score >= 40 ? "stroke-blue-400" : "stroke-amber-400";
  return (
    <div className="relative grid h-36 w-36 place-items-center rounded-full bg-blue-500/5">
      <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="48" className="stroke-white/10" strokeWidth="10" fill="none" />
        <circle cx="60" cy="60" r="48" className={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${score * 3.02} 302`} />
      </svg>
      <div className="text-center">
        <p className="text-4xl font-bold text-white">{score}<span className="text-base text-slate-500">%</span></p>
        <p className="text-[10px] uppercase tracking-widest text-slate-500">Ready</p>
      </div>
    </div>
  );
}

export function PremiumCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#05070d] shadow-lg shadow-blue-500/20 transition hover:bg-blue-50 hover:shadow-blue-400/30">
      {children}
    </Link>
  );
}
