import { Task } from "@/features/tasks/schemas/taskSchema";
import CalendarIcon from "@/assets/icons/CalendarIcon.svg";
import { formatDate } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

export default function EpicTaskCard({ task }: { task: Task }) {
  return (
    <div className="border-blue-150 flex items-center justify-between rounded-lg border p-4 md:rounded-none md:border-0">
      <div className="flex w-full flex-col gap-3 md:w-fit md:gap-1">
        <h3 className="text-sm leading-5 font-semibold text-slate-800">
          {task.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              name={task.assignee.name}
              className="text-4xs size-5 rounded-full leading-3 font-bold"
            />
            <span className="text-2xs leading-4 font-medium text-slate-600">
              {task.assignee.name ?? "Unassigned"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600/70 md:hidden">
            <CalendarIcon />
            <span className="text-2xs leading-4 font-bold tracking-tighter uppercase">
              {task.due_date ? formatDate(task.due_date) : "Unassigned"}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden flex-col pe-6 md:flex">
        <span className="text-3xs text-end leading-3.75 font-bold text-slate-800/40 uppercase">
          Due Date
        </span>
        <span className="text-xs leading-4 font-medium text-slate-800/70 uppercase">
          {task.due_date ? formatDate(task.due_date) : "Unassigned"}
        </span>
      </div>
    </div>
  );
}
