"use client";

import { createTask } from "@/lib/actions/task";
import { useState } from "react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { GlowCard, SectionLabel } from "@/components/ui/premium";

interface CreateTaskFormProps {
  workspaceId: string;
  workspaceSlug: string;
  projectId?: string;
}

export function CreateTaskForm({ workspaceId, workspaceSlug, projectId }: CreateTaskFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await createTask(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <GlowCard className="p-5">
      <SectionLabel>Task</SectionLabel>
      <h3 className="text-lg font-bold text-white mb-2">Create Task</h3>
      <p className="text-xs text-slate-400 mb-5 leading-5">Assign work to your team with clear priorities and due dates.</p>
      <form action={handleSubmit} className="space-y-4">
        {error && <ErrorMessage title="Task creation failed" message={error} onRetry={() => setError(null)} />}
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
        {projectId && <input type="hidden" name="projectId" value={projectId} />}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">Task title</label>
          <input id="title" name="title" type="text" required maxLength={200} className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g. Design token graphics" />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-1">Priority</label>
          <select id="priority" name="priority" className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">High priority tasks appear first in your dashboard.</p>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300 mb-1">Due date</label>
          <input id="dueDate" name="dueDate" type="date" className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
          <p className="text-xs text-slate-500 mt-1">Optional. Helps your team track deadlines.</p>
        </div>
        <div>
          <label htmlFor="assigneeName" className="block text-sm font-medium text-slate-300 mb-1">Assignee</label>
          <input id="assigneeName" name="assigneeName" type="text" maxLength={100} className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g. @username or real name" />
          <p className="text-xs text-slate-500 mt-1">Optional. Name or handle of the person responsible.</p>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
          <textarea id="description" name="description" maxLength={1000} rows={2} className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none" placeholder="Add context, requirements, or notes" />
        </div>
        <button type="submit" disabled={loading} className="w-full py-2 bg-white hover:bg-blue-50 text-[#05070d] rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/15">
          {loading ? "Creating..." : "Create task"}
        </button>
      </form>
    </GlowCard>
  );
}
