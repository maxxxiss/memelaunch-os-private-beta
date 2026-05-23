"use client";

import { useState } from "react";

interface Project {
  name: string;
  ticker: string;
  chain: string;
  launch_date: string | null;
  status: string;
  description: string | null;
}

interface ChecklistItem {
  title: string;
  completed: boolean;
}

interface Task {
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  assignee_name: string | null;
}

interface ContentItem {
  title: string;
  platform: string;
  scheduled_at: string | null;
  status: string;
  notes: string | null;
}

interface ProjectLink {
  type: string;
  url: string;
  label: string | null;
}

interface ReadinessBreakdown {
  totalScore: number;
  checklistScore: number;
  launchDateScore: number;
  requiredLinksScore: number;
  tasksScore: number;
  contentScore: number;
}

interface LaunchPlanSummaryProps {
  project: Project;
  links: ProjectLink[];
  checklist: ChecklistItem[];
  tasks: Task[];
  contentItems: ContentItem[];
  readiness: ReadinessBreakdown;
}

const LINK_TYPE_LABELS: Record<string, string> = {
  website: "Website",
  x: "X (Twitter)",
  telegram: "Telegram",
  discord: "Discord",
  chart: "Chart",
  docs: "Docs",
};

export function LaunchPlanSummary({
  project,
  links,
  checklist,
  tasks,
  contentItems,
  readiness,
}: LaunchPlanSummaryProps) {
  const [copied, setCopied] = useState(false);

  function generateMarkdown(): string {
    const completedChecklist = checklist.filter((c) => c.completed).length;
    const openTasks = tasks.filter((t) => t.status !== "done").length;
    const scheduledContent = contentItems.filter((c) => c.status === "scheduled").length;

    let md = `# ${project.name} Launch Plan\n\n`;
    md += `**Ticker:** ${project.ticker}\n`;
    md += `**Chain:** ${project.chain}\n`;
    md += `**Status:** ${project.status.replace(/_/g, " ")}\n`;
    md += `**Launch Date:** ${project.launch_date ? new Date(project.launch_date).toLocaleDateString() : "Not set"}\n`;
    md += `**Readiness Score:** ${readiness.totalScore}%\n\n`;

    if (project.description) {
      md += `## Description\n\n${project.description}\n\n`;
    }

    md += `## Links\n\n`;
    if (links.length === 0) {
      md += `No links added yet.\n\n`;
    } else {
      links.forEach((link) => {
        md += `- **${LINK_TYPE_LABELS[link.type] || link.type}:** ${link.url}`;
        if (link.label) md += ` (${link.label})`;
        md += `\n`;
      });
      md += `\n`;
    }

    md += `## Readiness Breakdown\n\n`;
    md += `- Checklist completion: ${readiness.checklistScore}/50\n`;
    md += `- Launch date set: ${readiness.launchDateScore}/15\n`;
    md += `- Required links (X + Telegram): ${readiness.requiredLinksScore}/15\n`;
    md += `- Tasks completed: ${readiness.tasksScore}/10\n`;
    md += `- Content scheduled/published: ${readiness.contentScore}/10\n\n`;

    md += `## Checklist Progress\n\n`;
    md += `${completedChecklist}/${checklist.length} items completed\n\n`;
    checklist.forEach((item) => {
      md += `- [${item.completed ? "x" : " "}] ${item.title}\n`;
    });
    md += `\n`;

    md += `## Tasks\n\n`;
    md += `${openTasks} open tasks\n\n`;
    tasks.forEach((task) => {
      md += `- **${task.title}** (${task.status}, ${task.priority} priority)`;
      if (task.due_date) md += ` - Due: ${new Date(task.due_date).toLocaleDateString()}`;
      if (task.assignee_name) md += ` - Assigned: ${task.assignee_name}`;
      md += `\n`;
    });
    md += `\n`;

    md += `## Content Plan\n\n`;
    md += `${scheduledContent} scheduled content items\n\n`;
    contentItems.forEach((item) => {
      md += `- **${item.title}** (${item.platform}, ${item.status})`;
      if (item.scheduled_at) md += ` - ${new Date(item.scheduled_at).toLocaleString()}`;
      if (item.notes) md += ` - ${item.notes}`;
      md += `\n`;
    });

    return md;
  }

  async function handleCopy() {
    const markdown = generateMarkdown();
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold text-white">Launch Plan Summary</h3>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? "Copied!" : "Copy Launch Plan"}
        </button>
      </div>
      <div className="space-y-5 text-sm">
        <div className="p-4 bg-[#0b1020] rounded-xl border border-white/8">
          <div className="font-medium text-white mb-2 text-xs uppercase tracking-wider">Project Overview</div>
          <div className="space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Name</span>
              <span className="text-right">{project.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ticker</span>
              <span className="text-right font-mono text-blue-400">${project.ticker}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Chain</span>
              <span className="text-right">{project.chain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status</span>
              <span className="text-right capitalize">{project.status.replace(/_/g, " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Readiness</span>
              <span className="text-right font-semibold text-white">{readiness.totalScore}%</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[#0b1020] rounded-xl border border-white/8">
          <div className="font-medium text-white mb-2 text-xs uppercase tracking-wider">Links</div>
          {links.length === 0 ? (
            <div className="text-slate-400 text-xs">No links added yet. Add your X and Telegram links to improve readiness.</div>
          ) : (
            <div className="space-y-1.5">
              {links.map((link, i) => (
                <div key={i} className="flex justify-between text-slate-300">
                  <span className="text-slate-500">{LINK_TYPE_LABELS[link.type] || link.type}</span>
                  <span className="text-right truncate max-w-[180px]" title={link.url}>{link.url}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 bg-[#0b1020] rounded-xl border border-white/8">
          <div className="font-medium text-white mb-2 text-xs uppercase tracking-wider">Progress</div>
          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Checklist</span>
              <span className="text-right">{checklist.filter((c) => c.completed).length}/{checklist.length} completed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Open tasks</span>
              <span className="text-right">{tasks.filter((t) => t.status !== "done").length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled content</span>
              <span className="text-right">{contentItems.filter((c) => c.status === "scheduled").length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
