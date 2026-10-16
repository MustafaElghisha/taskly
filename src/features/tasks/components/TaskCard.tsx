import { Avatar } from "@/components/ui/Avatar";
import CalendarIcon from "@/assets/icons/CalendarIcon.svg";
import CheckedIcon from "@/assets/icons/CheckedIcon.svg";
import { Task } from "../schemas/taskSchema";
import { cn } from "@/lib/utils";
import { statusStyles } from "../constants/tasks";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div
      className={cn(
        "shadow-task-card flex flex-col gap-3 rounded-lg border border-white bg-white p-4",
        task.status === "BLOCKED" &&
          "border-[hsla(0,75%,42%,0.1)] bg-[hsla(6,100%,92%,0.2)]",
      )}
    >
      <div className="text-2xs flex items-center justify-between leading-4 font-bold">
        <span className="tracking-tighter text-slate-600/50">
          {task.task_id}
        </span>
        <span
          className="bg-blue-150 px-2 py-0.5 md:hidden"
          style={{
            backgroundColor: statusStyles[task.status].primary,
            color: statusStyles[task.status]["primary-foreground"],
          }}
        >
          {task.status === "READY_FOR_PRODUCTION"
            ? "READY FOR PROD"
            : task.status.replaceAll("_", " ")}
        </span>
      </div>
      <h3
        className={cn(
          "text-sm leading-5 font-medium text-slate-800",
          task.status === "DONE" && "line-through",
        )}
      >
        {task.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="text-3xs flex items-center gap-2 leading-3.75 font-bold text-slate-300 uppercase">
          {task.status === "DONE" ? (
            <>
              <CheckedIcon />
              <span className="text-[hsla(158,100%,15%,1)]">COMPLETED</span>
            </>
          ) : (
            <>
              <CalendarIcon />
              <span>
                {task.due_date
                  ? new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "short",
                    }).format(new Date(task.due_date))
                  : "Unassigned"}
              </span>
            </>
          )}
        </div>
        <Avatar
          name={task.assignee.name}
          className="text-3xs! bg-blue-150 size-6! rounded-full border border-white font-bold text-slate-800"
        />
      </div>
    </div>
  );
}
