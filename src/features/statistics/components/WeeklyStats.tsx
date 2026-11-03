import { cn } from "@/lib/utils";
import NoTasksIcon from "@/assets/icons/NoTasksIcon.svg";
import { statusStyles, TaskStatus } from "@/features/tasks/constants/tasks";
import { StatsResponse } from "../schemas/statsSchema";
import { Separator } from "@/components/ui/Separator";

export default function WeeklyStats({ stats }: { stats: StatsResponse }) {
  return (
    <>
      <ol className="hidden h-full scrollbar-none grid-cols-[repeat(7,minmax(126px,1fr))] grid-rows-[420px] gap-3 overflow-x-auto md:-mt-2.25 md:grid md:pt-2.25">
        {stats.daily.map(({ day, statuses }, index) => {
          const isToday = day === new Date().toISOString().slice(0, 10);
          const tasksLength = Object.keys(statuses).length;

          return (
            <li
              key={index}
              className={cn(
                "shadow-card relative flex flex-col gap-y-4 rounded-lg bg-white p-4",
                isToday && "border-primary border-2",
              )}
            >
              {isToday && (
                <div className="bg-primary absolute top-0 flex -translate-y-1/2 items-center justify-center self-center rounded-full px-2 py-0.5">
                  <span className="text-3xs leading-4 font-bold tracking-widest text-white uppercase">
                    TODAY
                  </span>
                </div>
              )}
              <div className="flex flex-col uppercase">
                <span
                  className={cn(
                    "text-xs leading-4 font-bold",
                    isToday ? "text-primary" : "text-slate-800/40",
                  )}
                >
                  {new Date(day).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </span>
                <span
                  className={cn(
                    "text-xl leading-7 font-extrabold",
                    tasksLength ? "text-slate-800" : "text-slate-800/60",
                  )}
                >
                  {new Date(day).toLocaleDateString("en-UK", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>

              <ul className="flex h-full scrollbar-none flex-col gap-y-2 overflow-y-auto">
                {tasksLength > 0 ? (
                  Object.entries(statuses).map(([key, value]) => (
                    <li
                      key={key}
                      className="relative flex items-center justify-between gap-1 overflow-clip rounded-xs p-2"
                      style={{
                        color:
                          statusStyles[key as TaskStatus]["primary-foreground"],
                        backgroundColor:
                          statusStyles[key as TaskStatus]["primary"],
                      }}
                    >
                      {key === "IN_PROGRESS" && (
                        <div className="bg-primary absolute inset-0 w-1" />
                      )}
                      <span
                        className={cn(
                          "text-2xs leading-4 font-bold uppercase",
                          key === "READY_FOR_PRODUCTION" && "break-all",
                        )}
                      >
                        {key.replaceAll("_", " ")}
                      </span>
                      <span className="text-xs leading-4 font-bold">
                        {value}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="m-auto flex flex-col items-center gap-y-2 text-slate-800 opacity-30">
                    <NoTasksIcon />
                    <span className="text-3xs justify-center leading-4 font-bold tracking-widest uppercase">
                      NO TASKS
                    </span>
                  </li>
                )}
              </ul>
            </li>
          );
        })}
      </ol>
      <div className="flex flex-col gap-3 md:hidden">
        <h2 className="text-lg leading-7 font-bold text-slate-800">Calendar</h2>
        <ol className="flex flex-col gap-2 md:hidden">
          {stats.daily.map(({ day, statuses }, index) => {
            const isToday = day === new Date().toISOString().slice(0, 10);
            const tasksLength = Object.keys(statuses).length;

            return (
              <li
                key={index}
                className={cn(
                  "relative flex gap-4 overflow-hidden rounded-lg p-3",
                  isToday
                    ? "outline-primary/20 shadow-card bg-white outline"
                    : "bg-surface-low",
                )}
              >
                {isToday && (
                  <div className="bg-primary-container absolute inset-0 w-1" />
                )}

                <div className="flex size-8 flex-col items-center justify-center gap-1">
                  <span
                    className={cn(
                      "text-3xs leading-2.25 font-bold uppercase",
                      isToday ? "text-primary-container" : "text-slate-500",
                    )}
                  >
                    {new Date(day).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </span>
                  <span
                    className={cn(
                      "leading-4 font-bold",
                      isToday ? "text-primary-container" : "text-slate-800",
                    )}
                  >
                    {new Date(day).toLocaleDateString("en-US", {
                      day: "2-digit",
                    })}
                  </span>
                </div>

                <Separator orientation="vertical" />

                <ul className="flex items-center gap-1.5">
                  {tasksLength > 0 &&
                    Object.entries(statuses).map(([key, value]) => (
                      <li
                        key={key}
                        className="flex size-4.5 items-center justify-center rounded-xs"
                        style={{
                          color:
                            statusStyles[key as TaskStatus][
                              "primary-foreground"
                            ],
                          backgroundColor:
                            statusStyles[key as TaskStatus]["primary"],
                        }}
                      >
                        <span className="text-3xs leading-3.5 font-bold">
                          {value}
                        </span>
                      </li>
                    ))}
                </ul>

                {isToday && (
                  <div className="bg-primary-container ml-auto flex items-center justify-center self-center rounded-full px-2 py-0.5 uppercase">
                    <span className="text-4xs leading-2.75 font-bold text-white">
                      TODAY
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
