import CirclePlusIcon from "@/assets/icons/CirclePlusIcon.svg";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import Input from "@/components/ui/Input";
import EmptyTasks from "@/features/tasks/components/EmptyTasks";
import { statusStyles, TASKS } from "@/features/tasks/constants/tasks";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <div className="h-full px-4 py-6 md:px-0 md:pt-3">
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

      <div className="grid h-3/4 pb-6 md:hidden">
        <EmptyTasks />
      </div>

      <ul className="hidden h-10/11 grid-cols-[repeat(8,288px)] gap-6 overflow-x-scroll px-8 py-6 md:grid">
        {TASKS.map(({ status, length }, index) => (
          <li
            key={index}
            className="grid w-2xs grid-cols-1 grid-rows-[auto_auto_1fr] gap-3"
          >
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
          </li>
        ))}
      </ul>
    </div>
  );
}
