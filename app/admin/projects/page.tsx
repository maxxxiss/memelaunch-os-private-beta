import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("launch_projects")
    .select("id, name, ticker, chain, status, created_at, workspaces(name, slug)")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <Link
            href="/admin"
            className="text-sm text-slate-300 hover:text-white mb-4 inline-block"
          >
            ← Back to dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-slate-300">View all launch projects</p>
        </header>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          {projects && projects.length > 0 ? (
            <div className="space-y-3">
              {projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="flex justify-between items-center p-4 bg-[#0b1020] rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{proj.name}</div>
                    <div className="text-sm text-slate-400">{proj.ticker} · {proj.chain}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Workspace: {proj.workspaces?.name || "Unknown"}
                    </div>
                    <div className="text-xs text-slate-500">
                      Created {new Date(proj.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-[#111827] border border-white/10 rounded text-xs text-slate-300 capitalize">
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No projects yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
