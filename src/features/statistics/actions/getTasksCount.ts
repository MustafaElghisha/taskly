import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { projectsTasksSchema } from "../schemas/projectsTasksSchema";

export async function getTasksCount({
  p_start_date,
  p_end_date,
}: {
  p_start_date: string;
  p_end_date: string;
}) {
  const response = await authenticatedFetch(
    `/rest/v1/rpc/get_tasks_count_per_project`,
    {
      method: "POST",
      body: JSON.stringify({
        p_start_date,
        p_end_date,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  const data = await response.json();

  return projectsTasksSchema.parse(data);
}
