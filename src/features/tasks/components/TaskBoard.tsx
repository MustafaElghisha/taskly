"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TASK_STATUSES, TaskStatus } from "@/features/tasks/constants/tasks";
import TasksColumn from "@/features/tasks/components/TasksColumn";
import { useIsMobile } from "@/hooks/useIsMobile";
import InfiniteTasksList from "./InfiniteTasksList";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { useTaskBoard } from "@/features/tasks/hooks/useTaskBoard";
import { updateTaskStatus } from "@/features/tasks/actions/updateTaskStatus";
import { toast } from "sonner";

export default function TaskBoard({ projectId }: { projectId: string }) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const [revision, setRevision] = useState(0);

  useEffect(() => {
    function handleTaskCreated(event: Event) {
      const customEvent = event as CustomEvent<{
        projectId: string;
      }>;

      if (customEvent.detail.projectId === projectId) {
        setRevision((prev) => prev + 1);
      }
    }

    window.addEventListener("taskly:task-created", handleTaskCreated);

    return () => {
      window.removeEventListener("taskly:task-created", handleTaskCreated);
    };
  }, [projectId]);

  return (
    <TaskBoardContent
      key={`${projectId}-${searchTerm}-${revision}`}
      projectId={projectId}
      searchTerm={searchTerm}
    />
  );
}

function TaskBoardContent({
  projectId,
  searchTerm,
}: {
  projectId: string;
  searchTerm: string;
}) {
  const isMobile = useIsMobile();

  const { columns, loading, getLastElementRef, moveTask } = useTaskBoard(
    projectId,
    searchTerm,
  );

  async function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;

    const id = event.operation.source?.id as string;
    const toStatus = event.operation.target?.id as TaskStatus;

    if (!id || !toStatus) return;

    const fromStatus = (Object.keys(columns) as TaskStatus[]).find((status) =>
      columns[status].some((task) => task.id === id),
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
      <ul className="hidden h-full gap-6 overflow-x-auto overflow-y-hidden px-8 pt-6 md:flex">
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
