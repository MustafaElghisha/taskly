"use client";

import Link from "next/link";
import { statusStyles, TaskStatus } from "../constants/tasks";
import CirclePlusIcon from "@/assets/icons/CirclePlusIcon.svg";
import EmptyTasks from "./EmptyTasks";
import { useGetTasks } from "../hooks/useGetTasks";
import TaskCard from "./TaskCard";

export default function TasksColumn({
  status,
  projectId,
}: {
  status: TaskStatus;
  projectId: string;
}) {
  const { tasks } = useGetTasks(projectId, status);
  return (
    <div className="grid grid-cols-1 gap-3 md:h-dvh md:w-2xs md:grid-rows-[auto_auto_1fr]">
      <div className="hidden items-center gap-2 px-1 md:flex">
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
        href={`/project/${projectId}/tasks/add?status=${status}`}
        className="hidden items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-200/30 py-4 text-slate-600/60 md:flex"
      >
        <CirclePlusIcon className="scale-75" />
        <span className="text-xs leading-4 font-bold tracking-widest uppercase">
          Add New Task
        </span>
      </Link>

      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-3 overflow-y-auto pb-3 md:pb-0">
          {tasks.map((task) => (
            <li key={task.task_id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="hidden h-full md:block">
          <EmptyTasks />
        </div>
      )}
    </div>
  );
}
