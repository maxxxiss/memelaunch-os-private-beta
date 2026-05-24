import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { GlowCard, StatusChip } from "@/components/ui/premium";
import { Rocket } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  pre_launch: "Pre-launch",
  live: "Live",
  paused: "Paused",
  cancelled: "Cancelled",
};

const STATUS_TONE: Record<string, "blue" | "cyan" | "emerald" | "violet"> = {
  pre_launch: "blue",
  live: "emerald",
  paused: "violet",
  cancelled: "violet",
};

interface Project {
  id: string;
  name: string;
  ticker: string;
  status: string;
  chain: string;
}

interface DashboardProjectsGridProps {
  projects: Project[] | null;
  slug: string;
}

export function DashboardProjectsGrid({ projects, slug }: DashboardProjectsGridProps) {
  return (
    <GlowCard className="p-6 lg:col-span-2">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Launch rooms</p>
          <h3 className="mt-2 text-lg font-bold text-white">Active launch projects</h3>
        </div>
        <Link href={`/app/${slug}/new-project`} className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#05070d] transition hover:bg-blue-50 shadow-cta">New Project</Link>
      </div>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.id} href={`/app/${slug}/projects/${project.id}`} className="block rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a0f1e] to-[#060b18] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-glow-blue">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent rounded-t-3xl" />
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1"><div className="truncate text-base font-bold text-white">{project.name}</div><div className="mt-1 font-mono text-xs text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/10 inline-block">${project.ticker}</div></div>
                <StatusChip tone={STATUS_TONE[project.status] ?? "blue"}>{STATUS_LABEL[project.status] ?? project.status.replace("_", " ")}</StatusChip>
              </div>
              <div className="flex items-center justify-between border-t border-white/8 pt-3">
                <span className="text-[10px] uppercase tracking-widest text-slate-600">{project.chain}</span>
                <span className="text-[10px] text-blue-400 font-medium">Open →</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState icon={Rocket} title="No launch projects yet" description="Create your first launch project to generate a checklist, track tasks, schedule content, and measure readiness from one place." primaryAction={{ label: "Create first project", href: `/app/${slug}/new-project` }} variant="premium" />
      )}
    </GlowCard>
  );
}
