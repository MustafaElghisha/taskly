import Link from "next/link";
import { Task } from "../schemas/taskSchema";
import EmptyTasks from "./EmptyTasks";
import TaskCard from "./TaskCard";
import TaskCardSkeleton from "./TaskCardSkeleton";

export default function TasksList({
  tasks,
  loading,
  lastElementRef,
}: {
  tasks: Task[];
  loading: boolean;
  lastElementRef: (node: HTMLElement | null) => void;
}) {
  return (
    <>
      {tasks.length > 0 ? (
        <>
          <ul className="flex flex-col gap-3 overflow-y-auto pb-4 md:pb-0">
            {tasks.map((task, index) => (
              <li
                key={task.task_id}
                ref={tasks.length === index + 1 ? lastElementRef : null}
              >
                <Link
                  href={`/project/${task.project_id}/tasks/view/${task.id}`}
                >
                  <TaskCard task={task} />
                </Link>
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
        <ul className="flex flex-col gap-3 overflow-y-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <TaskCardSkeleton />
            </li>
          ))}
        </ul>
      ) : (
        <div ref={lastElementRef} className="mb-4 h-full">
          <EmptyTasks />
        </div>
      )}
    </>
  );
}
