import Link from "next/link";
import { statusStyles, TaskStatus } from "../constants/tasks";
import CirclePlusIcon from "@/assets/icons/CirclePlusIcon.svg";
import EmptyTasks from "./EmptyTasks";

export default function TasksColumn({
  status,
  length,
  projectId,
}: {
  status: TaskStatus;
  length: number;
  projectId: string;
}) {
  return (
    <div className="grid h-full w-2xs grid-cols-1 grid-rows-[auto_auto_1fr] gap-3">
      <div className="flex items-center gap-2 px-1">
        <div
          className="size-2 rounded-full"
          style={{
            backgroundColor: statusStyles[status].primary,
          }}
        />
        <h2 className="text-2xs leading-4 font-bold tracking-widest text-slate-500">
          {status.replaceAll("_", " ")}
        </h2>
        <div
          className="flex items-center justify-center rounded-xs px-1.5 py-0.5"
          style={{
            backgroundColor: statusStyles[status].background,
            color: statusStyles[status].text,
          }}
        >
          <span className="text-3xs leading-4 font-bold">{length}</span>
        </div>
      </div>

      <Link
        href={`/project/${projectId}/tasks/add?status=${status}`}
        className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-200/30 py-4 text-slate-600/60"
      >
        <CirclePlusIcon className="scale-75" />
        <span className="text-xs leading-4 font-bold tracking-widest uppercase">
          Add New Task
        </span>
      </Link>

      {length > 0 ? <></> : <EmptyTasks />}
    </div>
  );
}
