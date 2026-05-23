"use client";

import { createWorkspace } from "@/lib/actions/workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="bg-[#111827] p-8 rounded-2xl border border-white/10">
      <h2 className="text-xl font-bold text-white mb-2">Create your workspace</h2>
      <p className="text-slate-400 text-sm mb-6">
        A workspace is your launch command center. Give it a name — you can create more later.
      </p>
      <form action={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm text-slate-300 mb-1.5 font-medium">
            Workspace name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            className="w-full px-3 py-2.5 bg-[#0b1020] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
            placeholder="e.g. PEPE Launch Team"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm text-slate-300 mb-1.5 font-medium">
            URL slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            maxLength={50}
            pattern="[a-z0-9-]+"
            className="w-full px-3 py-2.5 bg-[#0b1020] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
            placeholder="e.g. pepe-launch"
          />
          <p className="mt-1.5 text-xs text-slate-500">Lowercase letters, numbers, and hyphens only.</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating workspace..." : "Create workspace"}
        </button>
      </form>
    </div>
  );
}
