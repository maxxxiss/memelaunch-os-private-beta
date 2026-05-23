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
      <div className="py-8 text-center border border-dashed border-white/10 rounded-xl">
        <p className="text-sm text-slate-400 mb-1">No content scheduled yet</p>
        <p className="text-xs text-slate-600">Add posts for X, Telegram, Discord, or your website.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
      )}
      {localItems.map((item) => (
        <div key={item.id} className="p-4 bg-[#070b14] rounded-xl border border-white/6 hover:border-white/10 transition-colors">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-0.5 truncate">{item.title}</div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">
                {PLATFORM_LABELS[item.platform] ?? item.platform}
              </div>
            </div>
            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_BADGES[item.status].bg} ${STATUS_BADGES[item.status].text} border-white/8`}>
              {STATUS_BADGES[item.status].label}
            </span>
          </div>
          {(item.scheduled_at || item.notes) && (
            <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2">
              {item.scheduled_at && <span>{new Date(item.scheduled_at).toLocaleString()}</span>}
              {item.notes && <span className="truncate">{item.notes}</span>}
            </div>
          )}
          <select
            value={item.status}
            onChange={(e) => handleStatusChange(item.id, e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white/5 border border-white/8 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
