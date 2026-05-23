import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function toggleWorkspaceStatus(workspaceId: string, currentStatus: string) {
  "use server";
  const supabase = await createClient();
  const newStatus = currentStatus === "active" ? "suspended" : "active";
  
  await supabase
    .from("workspaces")
    .update({ status: newStatus })
    .eq("id", workspaceId);
  
  revalidatePath("/admin/workspaces");
}

export default async function AdminWorkspacesPage() {
  const supabase = await createClient();

  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("id, name, slug, status, plan, created_at")
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
          <h1 className="text-3xl font-bold text-white tracking-tight">Workspaces</h1>
          <p className="text-slate-300">Manage workspaces and subscriptions</p>
        </header>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          {workspaces && workspaces.length > 0 ? (
            <div className="space-y-3">
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  className="flex justify-between items-center p-4 bg-[#0b1020] rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{ws.name}</div>
                    <div className="text-sm text-slate-400">{ws.slug}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Created {new Date(ws.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-[#111827] border border-white/10 rounded text-xs text-slate-300 capitalize">
                      {ws.plan}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      ws.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {ws.status}
                    </span>
                    <form action={toggleWorkspaceStatus.bind(null, ws.id, ws.status)}>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                      >
                        {ws.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No workspaces yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
