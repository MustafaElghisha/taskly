import { TaskStatus } from "@/features/tasks/constants/tasks";
import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { statsResponseSchema } from "../schemas/statsSchema";

export async function getStats({
  p_start_date,
  p_end_date,
  p_project_id,
  p_status,
}: {
  p_start_date: string;
  p_end_date: string;
  p_project_id: string | null;
  p_status: TaskStatus | null;
}) {
  const response = await authenticatedFetch(
    `/rest/v1/rpc/get_tasks_calendar_stats`,
    {
      method: "POST",
      body: JSON.stringify({
        p_start_date,
        p_end_date,
        p_project_id,
        p_status,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("YOU FUCKED UP");
  }

  const stats = await response.json();
  return statsResponseSchema.parse(stats);
}
