"use client";

import { createContentItem } from "@/lib/actions/content";
import { useState } from "react";

interface CreateContentFormProps {
  workspaceId: string;
  workspaceSlug: string;
  projectId?: string;
}

export function CreateContentForm({ workspaceId, workspaceSlug, projectId }: CreateContentFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createContentItem(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-2">Schedule Content</h3>
      <p className="text-xs text-slate-400 mb-6">Plan posts for X, Telegram, Discord, or your website before launch.</p>
      <form action={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
        {projectId && <input type="hidden" name="projectId" value={projectId} />}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Content title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={200}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="e.g. Launch announcement thread"
          />
        </div>
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-slate-300 mb-1">Platform</label>
          <select
            id="platform"
            name="platform"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="x">X (Twitter)</option>
            <option value="telegram">Telegram</option>
            <option value="discord">Discord</option>
            <option value="website">Website</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Where this content will be published.</p>
        </div>
        <div>
          <label htmlFor="scheduledAt" className="block text-sm font-medium text-slate-300 mb-1">Scheduled date</label>
          <input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-1">Optional. Set when this content should go live.</p>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1">Status</label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">Mark as published after posting.</p>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-1">Notes</label>
          <textarea
            id="notes"
            name="notes"
            maxLength={1000}
            rows={2}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
            placeholder="Draft copy, hashtags, or instructions"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating..." : "Schedule content"}
        </button>
      </form>
    </div>
  );
}
