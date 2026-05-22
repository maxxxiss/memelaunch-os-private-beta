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
      <div className="text-center py-6">
        <p className="text-sm text-slate-300 mb-1">No checklist items yet</p>
        <p className="text-xs text-slate-400">Checklist items are auto-created on project creation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      {sections.map((section) => (
        <div key={section}>
          <h3 className="text-lg font-semibold text-white mb-3">
            {SECTION_LABELS[section] || section}
          </h3>
          <div className="space-y-2">
            {localItems
              .filter((item) => item.section === section)
              .sort((a, b) => a.order_index - b.order_index)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-4 bg-[#0b1020] rounded-lg border border-white/10"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={(e) => handleToggle(item.id, e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#111827] text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-white">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-slate-300 mt-1">{item.description}</div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
