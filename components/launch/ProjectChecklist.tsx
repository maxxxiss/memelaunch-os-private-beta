"use client";

import { toggleChecklistItem } from "@/lib/actions/launch-project";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  section: string;
  title: string;
  description: string | null;
  completed: boolean;
  order_index: number;
}

interface ProjectChecklistProps {
  projectId: string;
  items: ChecklistItem[];
}

const SECTION_LABELS: Record<string, string> = {
  brand: "Brand",
  community: "Community",
  content: "Content",
  technical: "Technical",
  post_launch: "Post-launch",
};

export function ProjectChecklist({ projectId, items }: ProjectChecklistProps) {
  const [localItems, setLocalItems] = useState(items);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle(itemId: string, completed: boolean) {
    setError(null);
    const result = await toggleChecklistItem(itemId, completed);
    if (result.success) {
      setLocalItems(localItems.map((item) =>
        item.id === itemId ? { ...item, completed } : item
      ));
    } else if (result.error) {
      setError(result.error);
    }
  }

  const sections = Array.from(new Set(localItems.map((item) => item.section)));

  if (localItems.length === 0) {
    return (
      <div className="py-8 text-center border border-dashed border-white/10 rounded-xl">
        <p className="text-sm text-slate-400 mb-1">No checklist items yet</p>
        <p className="text-xs text-slate-600">Items are generated automatically when you create a project</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
      )}
      {sections.map((section) => {
        const sectionItems = localItems.filter((i) => i.section === section).sort((a, b) => a.order_index - b.order_index);
        const done = sectionItems.filter((i) => i.completed).length;
        return (
          <div key={section}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                {SECTION_LABELS[section] || section}
              </h3>
              <span className="text-xs text-slate-600">{done}/{sectionItems.length}</span>
            </div>
            <div className="space-y-1.5">
              {sectionItems.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    item.completed
                      ? "bg-emerald-500/5 border-emerald-500/15 hover:border-emerald-500/25"
                      : "bg-[#070b14] border-white/6 hover:border-white/12"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => handleToggle(item.id, e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-transparent text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${item.completed ? "text-slate-500 line-through" : "text-white"}`}>
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
