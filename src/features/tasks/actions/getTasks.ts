"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { TaskStatus } from "../constants/tasks";
import { tasksResponseSchema } from "../schemas/taskSchema";

const LIMIT = 10;

export async function getTasks(
  projectId: string,
  page: number,
  status?: TaskStatus,
) {
  const offset = (page - 1) * LIMIT;

  const params = new URLSearchParams();
  params.set("project_id", `eq.${projectId}`);
  if (status) {
    params.set("status", `eq.${status}`);
  }
  params.set("limit", String(LIMIT));
  params.set("offset", String(offset));

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
  const totalPages = Math.ceil(totalCount / LIMIT);

  const tasks = await response.json();

  return {
    data: tasksResponseSchema.parse(tasks),
    totalPages: totalPages,
  };
}
