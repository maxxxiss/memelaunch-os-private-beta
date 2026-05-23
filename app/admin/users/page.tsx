import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, created_at")
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
          <h1 className="text-3xl font-bold text-white tracking-tight">Users</h1>
          <p className="text-slate-300">Manage user accounts</p>
        </header>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          {users && users.length > 0 ? (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-4 bg-[#0b1020] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.display_name || "User"}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center">
                        <span className="text-white font-medium">
                          {(user.display_name || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-white">
                        {user.display_name || "Unnamed User"}
                      </div>
                      <div className="text-sm text-slate-400">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No users yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
