"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { TaskStatus } from "../constants/tasks";
import { tasksResponseSchema } from "../schemas/taskSchema";

export async function getTasks(projectId: string, status: TaskStatus) {
  const params = new URLSearchParams();
  params.set("project_id", `eq.${projectId}`);
  params.set("status", `eq.${status}`);

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
