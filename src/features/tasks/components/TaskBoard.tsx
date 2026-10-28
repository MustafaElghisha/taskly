"use client";

import { useSearchParams } from "next/navigation";
import { TASK_STATUSES, TaskStatus } from "@/features/tasks/constants/tasks";
import TasksColumn from "@/features/tasks/components/TasksColumn";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteTasksList from "./InfiniteTasksList";
import { DragDropProvider } from "@dnd-kit/react";
import { useTaskBoard } from "@/features/tasks/hooks/useTaskBoard";
import { updateTaskStatus } from "@/features/tasks/actions/updateTaskStatus";
import { toast } from "sonner";
import { DragEndEvent } from "@dnd-kit/react";

export default function TaskBoard({ projectId }: { projectId: string }) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const { columns, loading, getLastElementRef, moveTask } = useTaskBoard(
    projectId,
    searchTerm,
  );

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;

    const id = event.operation.source?.id as string;
    const toStatus = event.operation.target?.id as TaskStatus;

    if (!id || !toStatus) return;

    const fromStatus = (Object.keys(columns) as TaskStatus[]).find((s) =>
      columns[s].some((t) => t.id === id),
    );

    if (!fromStatus || fromStatus === toStatus) return;

    moveTask(id, fromStatus, toStatus);

    setTimeout(() => {
      updateTaskStatus({ task_id: id, status: toStatus }).catch(() => {
        moveTask(id, toStatus, fromStatus);
        toast.error("Couldn't move task. Please try again.");
      });
    }, 100);
  }

  if (isMobile)
    return (
      <InfiniteTasksList
        key={`${projectId}-${searchTerm}`}
        projectId={projectId}
        searchTerm={searchTerm}
      />
    );

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <ul className="hidden h-full gap-6 overflow-x-auto overflow-y-hidden px-8 py-6 md:flex">
        {TASK_STATUSES.map((status) => (
          <li key={status}>
            <TasksColumn
              key={`${projectId}-${status}-${searchTerm}`}
              status={status}
              projectId={projectId}
              tasks={columns[status]}
              loading={loading[status]}
              lastElementRef={getLastElementRef(status)}
            />
          </li>
        ))}
      </ul>
    </DragDropProvider>
  );
}
