import { useState, useCallback, useRef } from "react";
import { Task } from "../schemas/taskSchema";
import { TaskStatus, TASK_STATUSES } from "../constants/tasks";
import { getTasks } from "../actions/getTasks";

export type ColumnState = {
  tasks: Task[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  lastElementRef: (node: HTMLElement | null) => void;
};

export function useTaskBoard(projectId: string, searchTerm: string) {
  const [columns, setColumns] = useState(
    () =>
      Object.fromEntries(TASK_STATUSES.map((s) => [s, [] as Task[]])) as Record<
        TaskStatus,
        Task[]
      >,
  );

  const [loading, setLoading] = useState<Record<TaskStatus, boolean>>(
    () =>
      Object.fromEntries(TASK_STATUSES.map((s) => [s, true])) as Record<
        TaskStatus,
        boolean
      >,
  );

  const [pagination, setPagination] = useState(
    () =>
      Object.fromEntries(
        TASK_STATUSES.map((s) => [s, { current: 0, total: 1 }]),
      ) as Record<TaskStatus, { current: number; total: number }>,
  );

  const loadingRefs = useRef(
    Object.fromEntries(TASK_STATUSES.map((s) => [s, false])) as Record<
      TaskStatus,
      boolean
    >,
  );

  const observers = useRef(
    Object.fromEntries(TASK_STATUSES.map((s) => [s, null])) as Record<
      TaskStatus,
      IntersectionObserver | null
    >,
  );

  const loadMore = useCallback(
    async (status: TaskStatus) => {
      const { current, total } = pagination[status];
      if (loadingRefs.current[status] || current >= total) return;

      const nextPage = current + 1;
      loadingRefs.current[status] = true;
      setLoading((prev) => ({ ...prev, [status]: true }));

      try {
        const { data: newTasks, totalPages } = await getTasks(
          projectId,
          nextPage,
          status,
          searchTerm,
        );
        setColumns((prev) => {
          const existingIds = new Set(prev[status].map((t) => t.id));
          const fresh = newTasks.filter((t) => !existingIds.has(t.id));
          return { ...prev, [status]: [...prev[status], ...fresh] };
        });
        setPagination((prev) => ({
          ...prev,
          [status]: { current: nextPage, total: totalPages },
        }));
      } finally {
        loadingRefs.current[status] = false;
        setLoading((prev) => ({ ...prev, [status]: false }));
      }
    },
    [pagination, projectId, searchTerm],
  );

  const getLastElementRef = useCallback(
    (status: TaskStatus) => (node: HTMLElement | null) => {
      observers.current[status]?.disconnect();
      const { current, total } = pagination[status];
      if (!node || loadingRefs.current[status] || current >= total) return;

      observers.current[status] = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadingRefs.current[status]) {
          loadMore(status);
        }
      });
      observers.current[status]!.observe(node);
    },
    [pagination, loadMore],
  );

  const moveTask = useCallback(
    (taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus) => {
      setColumns((prev) => {
        const task = prev[fromStatus].find((t) => t.id === taskId);
        if (!task) return prev;
        return {
          ...prev,
          [fromStatus]: prev[fromStatus].filter((t) => t.id !== taskId),
          [toStatus]: [{ ...task, status: toStatus }, ...prev[toStatus]],
        };
      });
    },
    [],
  );

  return { columns, loading, getLastElementRef, moveTask };
}
