"use client";

import { updateContentStatus } from "@/lib/actions/content";
import { useState } from "react";

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  scheduled_at: string | null;
  status: string;
  notes: string | null;
}

interface ContentListProps {
  items: ContentItem[];
}

const PLATFORM_LABELS: Record<string, string> = {
  x: "X (Twitter)",
  telegram: "Telegram",
  discord: "Discord",
  website: "Website",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  published: "Published",
};

const STATUS_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  draft: { label: "Draft", bg: "bg-[#111827]", text: "text-slate-300" },
  scheduled: { label: "Scheduled", bg: "bg-yellow-900/20", text: "text-yellow-400" },
  published: { label: "Published", bg: "bg-green-900/20", text: "text-green-400" },
};

export function ContentList({ items }: ContentListProps) {
  const [localItems, setLocalItems] = useState(items);
  const [error, setError] = useState<string | null>(null);

  async function handleStatusChange(itemId: string, newStatus: string) {
    setError(null);
    const result = await updateContentStatus(itemId, newStatus);
    if (result.success) {
      setLocalItems(localItems.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      ));
    } else if (result.error) {
      setError(result.error);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-sm text-slate-300 mb-1">No content scheduled yet</p>
        <p className="text-xs text-slate-400">Schedule content to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      {localItems.map((item) => (
        <div key={item.id} className="p-4 bg-[#0b1020] rounded-lg border border-white/10">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="font-medium text-white mb-1">{item.title}</div>
              <div className="text-sm text-slate-300">
                {PLATFORM_LABELS[item.platform]}
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${STATUS_BADGES[item.status].bg} ${STATUS_BADGES[item.status].text} border border-white/10`}>
              {STATUS_BADGES[item.status].label}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
            {item.scheduled_at && (
              <span>Scheduled: {new Date(item.scheduled_at).toLocaleString()}</span>
            )}
            {item.notes && <span>Notes: {item.notes}</span>}
          </div>
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
            className="mt-3 w-full px-2 py-1 bg-[#111827] border border-white/10 rounded text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>
      ))}
    </div>
  );
}
