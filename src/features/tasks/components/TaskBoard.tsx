"use client";

import { TASK_STATUSES } from "@/features/tasks/constants/tasks";
import TasksColumn from "@/features/tasks/components/TasksColumn";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteTasksList from "./InfiniteTasksList";

export default function TaskBoard({ projectId }: { projectId: string }) {
  const isMobile = useIsMobile();

  if (isMobile) return <InfiniteTasksList projectId={projectId} />;

  return (
    <ul className="flex h-full gap-6 overflow-x-auto overflow-y-hidden px-8 py-6">
      {TASK_STATUSES.map((status, index) => (
        <li key={index}>
          <TasksColumn status={status} projectId={projectId} />
        </li>
      ))}
    </ul>
  );
}
