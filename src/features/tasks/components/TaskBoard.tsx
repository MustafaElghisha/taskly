"use client";

import { useSearchParams } from "next/navigation";
import { TASK_STATUSES } from "@/features/tasks/constants/tasks";
import TasksColumn from "@/features/tasks/components/TasksColumn";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteTasksList from "./InfiniteTasksList";

export default function TaskBoard({ projectId }: { projectId: string }) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  if (isMobile)
    return (
      <InfiniteTasksList
        key={`${projectId}-${searchTerm}`}
        projectId={projectId}
        searchTerm={searchTerm}
      />
    );

  return (
    <ul className="flex h-full gap-6 overflow-x-auto overflow-y-hidden px-8 py-6">
      {TASK_STATUSES.map((status) => (
        <li key={status}>
          <TasksColumn
            key={`${projectId}-${status}-${searchTerm}`}
            status={status}
            projectId={projectId}
            searchTerm={searchTerm}
          />
        </li>
      ))}
    </ul>
  );
}
