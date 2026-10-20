"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { tasksResponseSchema } from "../schemas/taskSchema";

export async function getTask(projectId: string, taskId: string) {
  const params = new URLSearchParams();
  params.set("project_id", `eq.${projectId}`);
  params.set("id", `eq.${taskId}`);

  const response = await authenticatedFetch(
    `/rest/v1/project_tasks?${params.toString()}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const task = await response.json();

  return tasksResponseSchema.parse(task)[0];
}
