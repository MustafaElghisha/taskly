"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { StatsResponse } from "../schemas/statsSchema";
import { statusStyles, TaskStatus } from "@/features/tasks/constants/tasks";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function ChartStats({ stats }: { stats: StatsResponse }) {
  const isMobile = useIsMobile(391);

  const chartData = Object.entries(stats.totals)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: key.replaceAll("_", " "),
      value: value as number,
      fill: statusStyles[key as TaskStatus]["primary-foreground"],
    }));

  return (
    <div className="shadow-card flex flex-col gap-4 rounded-2xl border border-slate-200/10 bg-white p-5 lg:gap-10 lg:rounded-lg lg:border-none lg:p-8">
      <h3 className="text-lg leading-7 font-bold text-slate-800">
        Tasks by Status
      </h3>
      <div className="flex items-center justify-center gap-6 lg:gap-12">
        <div className="xs:size-45 relative size-37 flex-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="100%"
                innerRadius={isMobile ? "85%" : "60%"}
                stroke="none"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 right-1/2 flex translate-x-1/2 -translate-y-1/2 flex-col gap-1 text-center">
            <span className="text-3xl leading-5.5 font-extrabold text-gray-800">
              {stats.total_tasks}
            </span>
            <span className="text-sm leading-4 font-bold text-gray-500">
              Total
            </span>
          </div>
        </div>
        <ul className="flex flex-1 flex-col gap-4">
          {chartData.map(({ name, value, fill }) => (
            <li key={name} className="flex items-center gap-2 lg:gap-3">
              <div
                className="size-2 shrink-0 rounded-full lg:size-3"
                style={{ backgroundColor: fill }}
              />
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-3xs leading-4 font-medium text-slate-800/70 lg:text-xs lg:font-bold">
                    {name === "READY FOR PRODUCTION" ? "READY FOR PROD" : name}
                  </span>
                  <span className="text-3xs leading-4 font-bold text-slate-800 lg:text-xs">
                    {value}
                  </span>
                </div>
                <progress
                  max={stats.total_tasks}
                  value={value}
                  className="hidden h-1 w-full rounded-full lg:block [&::-moz-progress-bar]:bg-(--progress-color) [&::-webkit-progress-value]:bg-(--progress-color)"
                  style={{ "--progress-color": fill } as React.CSSProperties}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
