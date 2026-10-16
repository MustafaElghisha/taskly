"use server";

import { tasksResponseSchema } from "@/features/tasks/schemas/taskSchema";
import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function getEpicTasks(epicId: string) {
  const params = new URLSearchParams();
  params.set("epic_id", `eq.${epicId}`);

  const response = await authenticatedFetch(
    `/rest/v1/project_tasks?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Prefer: "count=exact",
      },
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const contentRange = response.headers.get("Content-Range");
  const totalCount = Number(contentRange?.split("/")[1] ?? 0);

  const tasks = await response.json();

  return { tasks: tasksResponseSchema.parse(tasks), totalCount };
}
