import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NextActionsPanelProps {
  slug: string;
  effectivePlan: string;
  hasActiveProject: boolean;
  openTasksCount: number;
  scheduledContentCount: number;
}

function ActionRow({ label, href, accent }: { label: string; href: string; accent: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${accent}`} />
      <span className="text-xs text-slate-300 flex-1 leading-snug">{label}</span>
      <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
    </Link>
  );
}

export function NextActionsPanel({
  slug,
  effectivePlan,
  hasActiveProject,
  openTasksCount,
  scheduledContentCount,
}: NextActionsPanelProps) {
  const isFree = effectivePlan === "free";
  const allClear = hasActiveProject && openTasksCount === 0 && scheduledContentCount > 0 && !isFree;

  return (
    <div className="bg-[#0d1117] border border-white/8 rounded-2xl p-6">
      <h3 className="font-semibold text-white text-sm mb-4">Next Actions</h3>
      {allClear ? (
        <p className="text-xs text-slate-500 px-3 py-2">All caught up — your launch is on track.</p>
      ) : (
        <div className="space-y-0.5">
          {!hasActiveProject && (
            <ActionRow label="Create your first launch project" href={`/app/${slug}/new-project`} accent="bg-blue-400" />
          )}
          {hasActiveProject && openTasksCount > 0 && (
            <ActionRow
              label={`${openTasksCount} task${openTasksCount === 1 ? "" : "s"} need attention`}
              href={`/app/${slug}`}
              accent="bg-cyan-400"
            />
          )}
          {hasActiveProject && scheduledContentCount === 0 && (
            <ActionRow label="Schedule your first content post" href={`/app/${slug}`} accent="bg-violet-400" />
          )}
          {isFree && (
            <ActionRow label="Upgrade to Pro for unlimited projects" href="/pricing" accent="bg-amber-400" />
          )}
        </div>
      )}
    </div>
  );
}
