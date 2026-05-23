"use client";

import { updateTaskStatus } from "@/lib/actions/task";
import { useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { CheckSquare } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  assignee_name: string | null;
}

interface TaskListProps {
  tasks: Task[];
}

const STATUS_LABELS: Record<string, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const PRIORITY_LABELS: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const PRIORITY_COLORS: Record<string, string> = {
  low: "text-slate-300",
  medium: "text-yellow-400",
  high: "text-red-400",
};

const STATUS_BADGES: Record<string, { label: string; bg: string; text: string }> = {
  todo: { label: "To Do", bg: "bg-[#111827]", text: "text-slate-300" },
  in_progress: { label: "In Progress", bg: "bg-blue-900/20", text: "text-blue-400" },
  done: { label: "Done", bg: "bg-green-900/20", text: "text-green-400" },
};

export function TaskList({ tasks }: TaskListProps) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [error, setError] = useState<string | null>(null);

  async function handleStatusChange(taskId: string, newStatus: string) {
    setError(null);
    const result = await updateTaskStatus(taskId, newStatus);
    if (result.success) {
      setLocalTasks(localTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } else if (result.error) {
      setError(result.error);
    }
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CheckSquare}
        title="No launch tasks yet"
        description="Assign your first task to start turning launch chaos into an execution plan. Track priorities, due dates, and assignees in one place."
        variant="default"
      />
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <ErrorMessage
          title="Failed to update task"
          message={error}
          onRetry={() => setError(null)}
        />
      )}
      {localTasks.map((task) => (
        <div key={task.id} className="p-4 bg-[#070b14] rounded-xl border border-white/6 hover:border-white/10 transition-colors">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium mb-0.5 ${task.status === "done" ? "text-slate-500 line-through" : "text-white"}`}>
                {task.title}
              </div>
              {task.description && (
                <div className="text-xs text-slate-500 leading-relaxed">{task.description}</div>
              )}
            </div>
            <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border ${STATUS_BADGES[task.status].bg} ${STATUS_BADGES[task.status].text} border-white/8`}>
              {STATUS_BADGES[task.status].label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-2">
            <span className={`font-medium ${PRIORITY_COLORS[task.priority]}`}>{PRIORITY_LABELS[task.priority]}</span>
            {task.assignee_name && <span>→ {task.assignee_name}</span>}
            {task.due_date && <span>{new Date(task.due_date).toLocaleDateString()}</span>}
          </div>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white/5 border border-white/8 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
