import { format, startOfWeek, endOfWeek } from "date-fns";
import { getProjects } from "@/features/project/actions/getProjects";
import { getStats } from "@/features/statistics/actions/getStats";
import { getTasksCount } from "@/features/statistics/actions/getTasksCount";
import { TASK_STATUSES } from "@/features/tasks/constants/tasks";
import ChartStats from "@/features/statistics/componeents/ChartStats";
import KpiList from "@/features/statistics/componeents/KpiList";
import StatsFilters from "@/features/statistics/componeents/StatsFilters";
import WeeklyStats from "@/features/statistics/componeents/WeeklyStats";

type Props = {
  searchParams: Promise<{
    from?: string;
    to?: string;
    projectId?: string;
    status?: string;
  }>;
};

export default async function StatisticsPage({ searchParams }: Props) {
  const params = await searchParams;

  const today = new Date();

  const startDate =
    params.from ??
    format(startOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");

  const endDate =
    params.to ?? format(endOfWeek(today, { weekStartsOn: 1 }), "yyyy-MM-dd");

  const projectId = params.projectId || null;

  const status = TASK_STATUSES.includes(
    params.status as (typeof TASK_STATUSES)[number],
  )
    ? (params.status as (typeof TASK_STATUSES)[number])
    : null;

  const [stats, projectsTasks, { data: projects }] = await Promise.all([
    getStats({
      p_start_date: startDate,
      p_end_date: endDate,
      p_project_id: projectId,
      p_status: status,
    }),

    getTasksCount({
      p_start_date: startDate,
      p_end_date: endDate,
    }),

    getProjects(),
  ]);

  return (
    <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8 md:pt-0">
      <div className="hidden md:block">
        <h1 className="text-3xl leading-9 font-bold tracking-tight text-slate-800">
          Weekly Planner
        </h1>
        <p className="leading-6 text-slate-600">
          Manage your deadlines and track team velocity.
        </p>
      </div>

      <StatsFilters projects={projects} />

      <KpiList stats={stats} />

      <WeeklyStats stats={stats} />

      <div className="flex flex-col gap-4">
        <h2 className="text-lg leading-7 font-bold text-slate-800 md:hidden">
          Task Statistics
        </h2>

        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
          <ChartStats stats={stats} />

          <div className="shadow-card flex h-fit flex-col gap-4 rounded-2xl border border-slate-200/10 bg-white p-5 lg:gap-10 lg:rounded-lg lg:border-none lg:p-8">
            <h3 className="text-lg leading-7 font-bold text-slate-800">
              All Projects
            </h3>

            <ul className="flex flex-col gap-4">
              {projectsTasks.map(
                ({ project_id, project_name, tasks_count }) => (
                  <li
                    key={project_id}
                    className="text-3xs flex items-center justify-between leading-4 font-bold text-slate-800 lg:text-xs"
                  >
                    <span className="lg:text-slate-800/70">{project_name}</span>
                    <span>{tasks_count} Tasks</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
