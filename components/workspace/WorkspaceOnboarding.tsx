"use client";

import { createWorkspace } from "@/lib/actions/workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { GlowCard, PremiumCTA, SectionLabel } from "@/components/ui/premium";

export function WorkspaceOnboarding() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createWorkspace(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <GlowCard className="p-8 md:p-10">
      <SectionLabel>Workspace</SectionLabel>
      <h2 className="text-3xl font-black tracking-[-0.04em] text-white mb-3">Create your launch command center</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-md leading-6">Your workspace is where you manage launch projects, readiness, tasks, and content. Name it for your team or project.</p>
      <form action={handleSubmit} className="space-y-5">
        {error && <ErrorMessage title="Workspace creation failed" message={error} onRetry={() => setError(null)} />}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">Workspace name</label>
          <input id="name" name="name" type="text" required maxLength={100} className="w-full px-3 py-2.5 bg-[#0b1020] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600" placeholder="e.g. PEPE Launch Team" />
          <p className="mt-1.5 text-xs text-slate-500">Visible to your team. You can create multiple workspaces later.</p>
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-slate-300 mb-1.5">URL slug</label>
          <input id="slug" name="slug" type="text" required maxLength={50} pattern="[a-z0-9-]+" className="w-full px-3 py-2.5 bg-[#0b1020] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600" placeholder="e.g. pepe-launch" />
          <p className="mt-1.5 text-xs text-slate-500">Lowercase letters, numbers, and hyphens only. Used in your workspace URL.</p>
        </div>
        <button type="submit" disabled={loading} className="w-full py-2.5 bg-white hover:bg-blue-50 text-[#05070d] rounded-lg font-bold text-sm disabled:opacity-50 transition-colors shadow-lg shadow-blue-500/15">
          {loading ? "Creating workspace..." : "Create workspace"}
        </button>
        <p className="text-xs text-slate-500 text-center">After creating, you'll set up your first launch project.</p>
      </form>
    </GlowCard>
  );
}
