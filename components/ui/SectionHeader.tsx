import { ReactNode } from "react";
import Link from "next/link";
import { SectionLabel } from "./premium";

interface SectionHeaderProps {
  label?: string;
  labelTone?: "blue" | "cyan" | "emerald" | "violet";
  title: string;
  subtitle?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}

export function SectionHeader({ label, labelTone = "blue", title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {label && <SectionLabel tone={labelTone}>{label}</SectionLabel>}
        <h2 className="text-4xl font-bold font-display tracking-[-0.04em] text-white mt-5">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-2 leading-6">{subtitle}</p>}
      </div>
      {action && (
        <div className="mt-6 md:mt-0">
          {action.href ? (
            <Link href={action.href} className="text-sm font-medium text-blue-400 hover:text-blue-300 transition">
              {action.label} →
            </Link>
          ) : (
            <button onClick={action.onClick} className="text-sm font-medium text-blue-400 hover:text-blue-300 transition">
              {action.label} →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
