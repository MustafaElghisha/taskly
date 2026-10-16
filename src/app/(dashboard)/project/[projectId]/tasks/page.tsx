import Link from "next/link";
import { cn } from "@/lib/utils";
import { TASK_STATUSES } from "@/features/tasks/constants/tasks";
import TasksColumn from "@/features/tasks/components/TasksColumn";
import Input from "@/components/ui/Input";
import { buttonVariants } from "@/components/ui/Button";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import PlusIcon from "@/assets/icons/PlusIcon.svg";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className="px-4 py-6 md:px-0 md:pt-3">
      <div className="mb-7 flex flex-col flex-wrap gap-x-20 md:mb-0 md:flex-row md:items-end md:justify-between md:gap-y-4 md:px-8">
        <div className="flex flex-col md:gap-1">
          <h1 className="text-3xl leading-9 font-semibold tracking-tight text-slate-800">
            Active Workboard
          </h1>
          <p className="hidden text-sm leading-5 text-slate-500 md:block">
            Curating Project Alpha&apos;s production pipeline and milestones.
          </p>
        </div>

        <div className="relative flex items-center pt-6 pb-4 md:w-fit md:py-0">
          <SearchIcon className="absolute left-4 scale-170" />
          <Input
            placeholder="Search tasks..."
            className="w-full py-3.5 ps-10 pe-4 leading-0 md:rounded-xs"
          />
        </div>

        <Link
          href={`/project/${projectId}/tasks/add`}
          className={cn(
            buttonVariants({
              variant: "primary",
            }),
            "gap-2 rounded-sm py-2 md:hidden",
          )}
        >
          <PlusIcon className="-scale-75" />
          <span className="text-xs font-bold tracking-widest uppercase">
            Add New Task
          </span>
        </Link>
      </div>

      <ul className="grid overflow-y-auto md:grid-cols-[repeat(8,288px)] md:gap-6 md:px-8 md:py-6">
        {TASK_STATUSES.map((status, index) => (
          <li key={index}>
            <TasksColumn status={status} projectId={projectId} />
          </li>
        ))}
      </ul>
    </div>
  );
}
