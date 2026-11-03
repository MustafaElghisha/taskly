"use client";

import Link from "next/link";
import { statusStyles, TaskStatus } from "../constants/tasks";
import CirclePlusIcon from "@/assets/icons/CirclePlusIcon.svg";
import { Task } from "../schemas/taskSchema";
import TasksList from "./TasksList";

export default function TasksColumn({
  status,
  projectId,
  tasks,
  loading,
  lastElementRef,
}: {
  status: TaskStatus;
  projectId: string;
  tasks: Task[];
  loading: boolean;
  lastElementRef: (node: HTMLElement | null) => void;
}) {
  return (
    <div className="grid h-full w-2xs grid-rows-[auto_auto_1fr] gap-3">
      <div className="flex items-center gap-2 px-1">
        <div
          className="size-2 rounded-full"
          style={{
            backgroundColor: statusStyles[status].secondary,
          }}
        />
        <h2 className="text-2xs leading-4 font-bold tracking-widest text-slate-500">
          {status === "READY_FOR_PRODUCTION"
            ? "READY FOR PROD"
            : status.replaceAll("_", " ")}
        </h2>
        <div
          className="flex items-center justify-center rounded-xs px-1.5 py-0.5"
          style={{
            backgroundColor: statusStyles[status].primary,
            color: statusStyles[status]["primary-foreground"],
          }}
        >
          <span className="text-3xs leading-4 font-bold">{tasks.length}</span>
        </div>
      </div>

      <Link
        href={`/projects/${projectId}/tasks/new?status=${status}`}
        className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-200/30 py-4 text-slate-600/60"
      >
        <CirclePlusIcon className="scale-75" />
        <span className="text-xs leading-4 font-bold tracking-widest uppercase">
          Add New Task
        </span>
      </Link>

      <TasksList
        id={status}
        tasks={tasks}
        loading={loading}
        lastElementRef={lastElementRef}
      />
    </div>
  );
}
