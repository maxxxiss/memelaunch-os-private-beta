import Link from "next/link";

const STATUS_LABEL: Record<string, string> = {
  pre_launch: "Pre-launch",
  live: "Live",
  paused: "Paused",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<string, string> = {
  pre_launch: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  live: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  paused: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
  cancelled: "bg-red-500/10 border-red-500/20 text-red-400",
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
    <div className="lg:col-span-2 bg-[#0d1117] border border-white/8 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="font-semibold text-white text-sm">Launch Projects</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your active launch workspaces</p>
        </div>
        <Link href={`/app/${slug}/new-project`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors">
          New Project
        </Link>
      </div>
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/app/${slug}/projects/${project.id}`}
              className="block p-4 bg-[#070b14] rounded-xl border border-white/6 hover:border-white/15 hover:-translate-y-0.5 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm truncate mb-0.5">{project.name}</div>
                  <div className="text-[10px] text-blue-400 font-mono">${project.ticker}</div>
                </div>
                <span className={`ml-2 px-2 py-0.5 border rounded text-[10px] font-medium shrink-0 ${STATUS_STYLE[project.status] ?? "bg-white/5 border-white/8 text-slate-500"}`}>
                  {STATUS_LABEL[project.status] ?? project.status.replace("_", " ")}
                </span>
              </div>
              <div className="text-[10px] text-slate-600">{project.chain}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border border-dashed border-white/8 rounded-xl">
          <p className="text-sm font-medium text-slate-400 mb-1">No launch projects yet</p>
          <p className="text-xs text-slate-500 mb-4">Create a project to start tracking readiness and tasks</p>
          <Link href={`/app/${slug}/new-project`} className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors">
            Create first project
          </Link>
        </div>
      )}
    </div>
  );
}
