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
      <h2 className="text-2xl font-bold text-white mb-2">Create your workspace</h2>
      <p className="text-slate-300 mb-6">
        Start organizing your memecoin launch with a dedicated workspace.
      </p>
      <form action={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="name" className="block text-sm text-slate-300 mb-1">
            Workspace name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="My Memecoin Launch"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm text-slate-300 mb-1">
            Slug (lowercase, letters, numbers, hyphens only)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            maxLength={50}
            pattern="[a-z0-9-]+"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="my-memecoin-launch"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create workspace"}
        </button>
      </form>
    </div>
  );
}
