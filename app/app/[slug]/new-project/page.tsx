import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CreateLaunchProjectForm } from "@/components/launch/CreateLaunchProjectForm";

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!workspace) {
    redirect("/app");
  }

  const { data: member } = await supabase
    .from("workspace_members")
    .select("*")
    .eq("workspace_id", workspace.id)
    .eq("user_id", user.id)
    .single();

  if (!member) {
    redirect("/app");
  }

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Launch Project</h1>
          <p className="text-slate-300">
            Set up your memecoin launch with a pre-built checklist.
          </p>
        </div>
        <CreateLaunchProjectForm workspaceId={workspace.id} workspaceSlug={workspace.slug} />
      </div>
    </div>
  );
}
