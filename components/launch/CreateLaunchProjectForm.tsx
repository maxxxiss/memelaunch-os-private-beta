"use client";

import { createLaunchProject } from "@/lib/actions/launch-project";
import { TEMPLATES } from "@/lib/templates/launch-templates";
import { useState } from "react";

interface CreateLaunchProjectFormProps {
  workspaceId: string;
  workspaceSlug: string;
}

export function CreateLaunchProjectForm({ workspaceId, workspaceSlug }: CreateLaunchProjectFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("basic");

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createLaunchProject(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="bg-[#111827] p-8 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-2">Create Launch Project</h2>
      <p className="text-slate-300 mb-6">
        Set up your launch project with a pre-built checklist. After creating, you'll add tasks, schedule content, and track readiness.
      </p>
      <form action={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-slate-300 mb-1">
            Launch template
          </label>
          <select
            id="template"
            name="template"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="basic">Basic Launch</option>
            <option value="solana_meme">Solana Meme Launch</option>
            <option value="community_first">Community-First Launch</option>
          </select>
          <p className="text-xs text-slate-400 mt-1">{TEMPLATES[selectedTemplate].description}</p>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
            Project name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="e.g. PEPE Launch"
          />
          <p className="text-xs text-slate-500 mt-1">The internal name for your launch project.</p>
        </div>
        <div>
          <label htmlFor="ticker" className="block text-sm font-medium text-slate-300 mb-1">
            Ticker
          </label>
          <input
            id="ticker"
            name="ticker"
            type="text"
            required
            maxLength={20}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="e.g. PEPE"
          />
          <p className="text-xs text-slate-500 mt-1">Token symbol (without $).</p>
        </div>
        <div>
          <label htmlFor="chain" className="block text-sm font-medium text-slate-300 mb-1">
            Chain
          </label>
          <select
            id="chain"
            name="chain"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="solana">Solana</option>
            <option value="ethereum">Ethereum</option>
            <option value="base">Base</option>
          </select>
        </div>
        <div>
          <label htmlFor="launchDate" className="block text-sm font-medium text-slate-300 mb-1">
            Launch date
          </label>
          <input
            id="launchDate"
            name="launchDate"
            type="date"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <p className="text-xs text-slate-500 mt-1">Optional. Setting this improves your readiness score.</p>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="draft">Draft</option>
            <option value="pre_launch">Pre-launch</option>
            <option value="launching">Launching</option>
            <option value="live">Live</option>
            <option value="post_launch">Post-launch</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            maxLength={500}
            rows={3}
            className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
            placeholder="Brief project description for your team"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating..." : "Create project"}
        </button>
      </form>
    </div>
  );
}
