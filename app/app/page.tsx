import { createClient } from "@/lib/supabase/server";
import { getUserWorkspaces } from "@/lib/actions/workspace";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { WorkspaceOnboarding } from "@/components/workspace/WorkspaceOnboarding";

export default async function AppPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const workspaces = await getUserWorkspaces();

  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070d]">
        <header className="bg-[#0b1020] border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">MemeLaunch OS</div>
          <SignOutButton />
        </header>
        <main className="max-w-2xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create your workspace</h1>
            <p className="text-slate-300">
              Set up your first workspace to start organizing your memecoin launch.
            </p>
          </div>
          <WorkspaceOnboarding />
        </main>
      </div>
    );
  }

  const firstWorkspace = workspaces[0] as unknown as { slug: string };
  redirect(`/app/${firstWorkspace.slug}`);
}
