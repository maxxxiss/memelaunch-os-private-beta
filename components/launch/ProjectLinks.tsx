"use client";

import { addProjectLink, removeProjectLink } from "@/lib/actions/project-link";
import { useState } from "react";

interface ProjectLink {
  id: string;
  type: string;
  url: string;
  label: string | null;
}

interface ProjectLinksProps {
  projectId: string;
  workspaceId: string;
  workspaceSlug: string;
  links: ProjectLink[];
}

const LINK_TYPE_LABELS: Record<string, string> = {
  website: "Website",
  x: "X (Twitter)",
  telegram: "Telegram",
  discord: "Discord",
  chart: "Chart",
  docs: "Docs",
};

export function ProjectLinks({ projectId, workspaceId, workspaceSlug, links }: ProjectLinksProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAddLink(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await addProjectLink(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  async function handleRemoveLink(linkId: string) {
    setError(null);
    const result = await removeProjectLink(linkId, workspaceSlug, projectId);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4">Project Links</h3>
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm mb-4">
          {error}
        </div>
      )}
      <div className="space-y-2 mb-6">
        {links.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-slate-300 mb-1">No links added yet</p>
            <p className="text-xs text-slate-400">Add your project links below</p>
          </div>
        ) : (
          links.map((link) => (
            <div key={link.id} className="flex justify-between items-center p-3 bg-[#0b1020] rounded-lg border border-white/10">
              <div>
                <div className="text-sm font-medium text-white">{LINK_TYPE_LABELS[link.type] || link.type}</div>
                {link.label && <div className="text-xs text-slate-300">{link.label}</div>}
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300">
                  {link.url}
                </a>
              </div>
              <button
                onClick={() => handleRemoveLink(link.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <form action={handleAddLink} className="space-y-3">
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="projectId" value={projectId} />
        <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-300 mb-1">Link type</label>
          <select
            id="type"
            name="type"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="website">Website</option>
            <option value="x">X (Twitter)</option>
            <option value="telegram">Telegram</option>
            <option value="discord">Discord</option>
            <option value="chart">Chart</option>
            <option value="docs">Docs</option>
          </select>
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-1">URL</label>
          <input
            id="url"
            name="url"
            type="url"
            required
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="https://"
          />
        </div>
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-slate-300 mb-1">Label</label>
          <input
            id="label"
            name="label"
            type="text"
            maxLength={100}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Optional label"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Adding..." : "Add link"}
        </button>
      </form>
    </div>
  );
}
