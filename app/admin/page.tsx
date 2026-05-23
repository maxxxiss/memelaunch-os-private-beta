import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: totalWorkspaces } = await supabase
    .from("workspaces")
    .select("*", { count: "exact", head: true });

  const { count: totalProjects } = await supabase
    .from("launch_projects")
    .select("*", { count: "exact", head: true });

  const { count: totalSubscriptions } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true });

  const { data: recentWorkspaces } = await supabase
    .from("workspaces")
    .select("id, name, slug, created_at, status, plan")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: recentProjects } = await supabase
    .from("launch_projects")
    .select("id, name, ticker, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-300">Platform overview and management</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Total Users</h3>
            <div className="text-3xl font-bold text-blue-500">{totalUsers || 0}</div>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Total Workspaces</h3>
            <div className="text-3xl font-bold text-green-500">{totalWorkspaces || 0}</div>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Total Projects</h3>
            <div className="text-3xl font-bold text-purple-500">{totalProjects || 0}</div>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Subscriptions</h3>
            <div className="text-3xl font-bold text-yellow-500">{totalSubscriptions || 0}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Recent Workspaces</h2>
              <Link
                href="/admin/workspaces"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                View all
              </Link>
            </div>
            {recentWorkspaces && recentWorkspaces.length > 0 ? (
              <div className="space-y-3">
                {recentWorkspaces.map((ws) => (
                  <div
                    key={ws.id}
                    className="flex justify-between items-center p-3 bg-[#0b1020] rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-white">{ws.name}</div>
                      <div className="text-sm text-slate-400">{ws.slug}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-[#111827] border border-white/10 rounded text-xs text-slate-300 capitalize">
                        {ws.plan}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        ws.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {ws.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No workspaces yet</p>
            )}
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Recent Projects</h2>
              <Link
                href="/admin/projects"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                View all
              </Link>
            </div>
            {recentProjects && recentProjects.length > 0 ? (
              <div className="space-y-3">
                {recentProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex justify-between items-center p-3 bg-[#0b1020] rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-white">{proj.name}</div>
                      <div className="text-sm text-slate-400">{proj.ticker}</div>
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

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/users"
              className="p-4 bg-[#0b1020] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="font-medium text-white">Manage Users</div>
              <div className="text-sm text-slate-400">View and manage user accounts</div>
            </Link>
            <Link
              href="/admin/workspaces"
              className="p-4 bg-[#0b1020] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="font-medium text-white">Manage Workspaces</div>
              <div className="text-sm text-slate-400">View and suspend workspaces</div>
            </Link>
            <Link
              href="/admin/projects"
              className="p-4 bg-[#0b1020] rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="font-medium text-white">Manage Projects</div>
              <div className="text-sm text-slate-400">View all launch projects</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
