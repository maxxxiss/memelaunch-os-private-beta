"use client";

import { updateContentStatus } from "@/lib/actions/content";
import { useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Calendar } from "lucide-react";
import { StatusChip } from "@/components/ui/premium";
import { PlatformBadge } from "@/components/ui/PlatformBadge";

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

const STATUS_TONE: Record<string, "blue" | "cyan" | "emerald" | "violet"> = {
  draft: "blue",
  scheduled: "cyan",
  published: "emerald",
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
      <EmptyState
        icon={Calendar}
        title="No content scheduled yet"
        description="Plan launch posts before the timeline gets noisy. Schedule content for X, Telegram, Discord, or your website to keep your launch on track."
        variant="default"
      />
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <ErrorMessage
          title="Failed to update content"
          message={error}
          onRetry={() => setError(null)}
        />
      )}
      {localItems.map((item) => (
        <div key={item.id} className="p-4 bg-[#070b14] rounded-2xl border border-white/6 hover:border-white/10 transition-colors">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white mb-0.5 truncate">{item.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <PlatformBadge platform={item.platform as any} size="sm" />
                {item.scheduled_at && (
                  <span className="font-mono text-[10px] text-slate-500">
                    {new Date(item.scheduled_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <StatusChip tone={STATUS_TONE[item.status] || "blue"}>{STATUS_LABELS[item.status]}</StatusChip>
          </div>
          {item.notes && (
            <div className="text-xs text-slate-500 mt-2 leading-relaxed">{item.notes}</div>
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
