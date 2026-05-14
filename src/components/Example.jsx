
import React from "react";

import { taskObject } from "../Mockdata/datas";  

const priorityStyles = {
  high:   "bg-red-500/15 text-red-400",
  medium: "bg-yellow-500/15 text-yellow-400",
  low:    "bg-green-500/15 text-green-400",
};

const categoryStyles = {
  study:    "bg-violet-500/20 text-violet-400",
  work:     "bg-blue-500/20 text-blue-400",
  health:   "bg-green-500/20 text-green-400",
  personal: "bg-pink-500/20 text-pink-400",
};

const progressBarStyles = {
  done:          "bg-green-500",
  overdue:       "bg-red-500",
  "in-progress": "bg-blue-500",
  pending:       "bg-blue-500",
};

// --- Helpers ---

function getProgress(task) {
  if (task.status === "done") return 100;
  if (task.status === "in-progress") return task.priority === "high" ? 45 : 30;
  return 0;
}

function formatDue(task) {
  if (task.status === "done") {
    const hr = parseInt(task.dueTime);
    return { text: `Done · ${hr}${hr < 12 ? "am" : "pm"}`, overdue: false };
  }
  if (task.status === "overdue") return { text: "Overdue", overdue: true };
  const [h, m] = task.dueTime.split(":");
  const hr = parseInt(h);
  const ampm = hr >= 12 ? "PM" : "AM";
  return { text: `Due today ${(hr % 12) || 12}:${m} ${ampm}`, overdue: false };
}

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// --- TaskCard ---

function TaskCard({ task }) {
  const isDone = task.status === "done";
  const due = formatDue(task);
  const progress = getProgress(task);

  return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] hover:border-[#3a3d4a] rounded-xl p-4 flex flex-col gap-3 transition-colors duration-200">

      {/* Top: checkbox + priority badge */}
      <div className="flex items-start justify-between">
        <div className={`w-[18px] h-[18px] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5
          ${isDone ? "bg-green-500 border-0" : "border-2 border-[#3a3d4a] bg-transparent"}`}>
          {isDone && <span className="text-white text-[10px] font-bold">✓</span>}
        </div>
        <span className={`text-[11px] font-semibold px-3 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
          {cap(task.priority)}
        </span>
      </div>

      {/* Title */}
      <p className={`text-sm font-medium leading-snug
        ${isDone ? "line-through text-gray-600" : "text-gray-200"}`}>
        {task.title}
      </p>

      {/* Category + due label */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[11px] font-semibold px-3 py-0.5 rounded-full ${categoryStyles[task.category]}`}>
          {cap(task.category)}
        </span>
        <span className={`text-[11px] ${due.overdue ? "text-red-400" : "text-gray-500"}`}>
          {due.text}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] bg-[#2a2d3a] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${progressBarStyles[task.status]}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Star rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`text-sm ${i < task.rating ? "text-yellow-400" : "text-[#3a3d4a]"}`}>
            ★
          </span>
        ))}
      </div>

    </div>
  );
}

// --- Default export ---

export default function TaskCards() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {taskObject.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
