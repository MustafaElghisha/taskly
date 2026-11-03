import { cn } from "@/lib/utils";
import ClipboardListIcon from "@/assets/icons/ClipboardListIcon.svg";
import CheckedIcon from "@/assets/icons/CheckedIcon.svg";
import TriangleAlertIcon from "@/assets/icons/TriangleAlertIcon.svg";
import { StatsResponse } from "../schemas/statsSchema";

const KPI_LIST = [
  {
    title: "TOTAL TASKS",
    value: "total_tasks",
    Icon: ClipboardListIcon,
    iconBackground: "md:bg-[hsla(216,100%,40%,0.1)]",
    valueColor: "text-[hsl(215,87%,13%)]",
  },
  {
    title: "COMPLETED TASKS",
    value: "done_tasks",
    Icon: CheckedIcon,
    iconBackground: "md:bg-[hsla(159,100%,20%,0.1)]",
    valueColor: "text-[hsl(215,87%,13%)]",
  },
  {
    title: "OVERDUE TASKS",
    value: "overdue_tasks",
    Icon: TriangleAlertIcon,
    iconBackground: "md:bg-[hsla(6,100%,92%,0.2)]",
    valueColor: "text-[hsl(0,75%,42%)]",
  },
] as const;

export default function KpiList({ stats }: { stats: StatsResponse }) {
  return (
    <ul className="grid scrollbar-none grid-cols-[repeat(3,minmax(140px,1fr))] gap-6 overflow-auto md:grid-cols-[repeat(3,minmax(240px,1fr))]">
      {KPI_LIST.map((item, index) => (
        <li
          key={index}
          className="shadow-card flex flex-col-reverse gap-y-2 rounded-lg border border-slate-200/10 bg-white p-4 md:flex-row md:items-end md:justify-between md:border-none md:p-6 md:shadow-none"
        >
          <div className="flex flex-col md:gap-y-1">
            <span className="text-3xs leading-4 font-medium tracking-wider text-slate-800/60 uppercase md:text-xs md:font-bold">
              {item.title}
            </span>
            <span
              className={cn(
                "text-xl leading-7 font-bold text-slate-800 md:text-3xl md:leading-9",
                item.valueColor,
              )}
            >
              {stats[item.value]}
            </span>
          </div>
          <div
            className={cn(
              "shrink-0 items-center justify-center rounded-xs md:flex md:size-12",
              item.iconBackground,
            )}
          >
            <item.Icon
              className={cn(item.title === "COMPLETED TASKS" && "scale-160")}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
