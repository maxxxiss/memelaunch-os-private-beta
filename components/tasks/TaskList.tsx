"use client";

import { updateTaskStatus } from "@/lib/actions/task";
import { useState } from "react";

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
      <div className="text-center py-6">
        <p className="text-sm text-slate-300 mb-1">No tasks yet</p>
        <p className="text-xs text-slate-400">Create a task to get started</p>
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
      {localTasks.map((task) => (
        <div key={task.id} className="p-4 bg-[#0b1020] rounded-lg border border-white/10">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="font-medium text-white mb-1">{task.title}</div>
              {task.description && (
                <div className="text-sm text-slate-300">{task.description}</div>
              )}
            </div>
            <span className={`px-2 py-1 rounded text-xs ${STATUS_BADGES[task.status].bg} ${STATUS_BADGES[task.status].text} border border-white/10`}>
              {STATUS_BADGES[task.status].label}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
            <span className={PRIORITY_COLORS[task.priority]}>
              {PRIORITY_LABELS[task.priority]} priority
            </span>
            {task.assignee_name && <span>Assigned to: {task.assignee_name}</span>}
            {task.due_date && <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>}
          </div>
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
            className="mt-3 w-full px-2 py-1 bg-[#111827] border border-white/10 rounded text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
