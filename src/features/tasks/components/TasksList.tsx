import { useIsMobile } from "@/hooks/useIsMobile";
import { Task } from "../schemas/taskSchema";
import EmptyTasks from "./EmptyTasks";
import TaskCard from "./TaskCard";
import TaskCardSkeleton from "./TaskCardSkeleton";
import { useDroppable } from "@dnd-kit/react";

export default function TasksList({
  id,
  tasks,
  loading,
  lastElementRef,
}: {
  id?: string;
  tasks: Task[];
  loading: boolean;
  lastElementRef: (node: HTMLElement | null) => void;
}) {
  const { ref } = useDroppable({ id: id ?? "" });
  const isMobile = useIsMobile();

  return (
    <div ref={isMobile ? null : ref} className="h-full overflow-y-auto">
      {tasks.length > 0 ? (
        <>
          <ul className="flex flex-col gap-3 pb-4 md:pb-0">
            {tasks.map((task, index) => (
              <li
                key={task.id}
                ref={tasks.length === index + 1 ? lastElementRef : null}
              >
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
          {loading && (
            <span className="flex justify-center pt-4 text-slate-600">
              Loading...
            </span>
          )}
        </>
      ) : loading ? (
        <ul
          ref={lastElementRef}
          className="flex flex-col gap-3 overflow-y-auto"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <TaskCardSkeleton />
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full pb-4 md:pb-0">
          <EmptyTasks />
        </div>
      )}
    </div>
  );
}
