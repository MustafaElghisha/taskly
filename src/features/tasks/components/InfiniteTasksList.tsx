"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCallback } from "react";
import { getTasks } from "../actions/getTasks";
import { Task } from "../schemas/taskSchema";
import TasksList from "./TasksList";

export default function InfiniteTasksList({
  projectId,
  searchTerm,
}: {
  projectId: string;
  searchTerm: string;
}) {
  const fetchTasks = useCallback(
    (page: number) => getTasks(projectId, page, undefined, searchTerm),
    [projectId, searchTerm],
  );

  const {
    data: tasks,
    loading,
    lastElementRef,
  } = useInfiniteScroll<Task>([], fetchTasks, 0, 1);

  return (
    <TasksList
      tasks={tasks}
      loading={loading}
      lastElementRef={lastElementRef}
    />
  );
}
