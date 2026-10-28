"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { TaskStatus } from "../constants/tasks";

export async function updateTaskStatus({
  task_id,
  status,
}: {
  task_id: string;
  status: TaskStatus;
}) {
  const params = new URLSearchParams();
  params.set("id", `eq.${task_id}`);

  const response = await authenticatedFetch(
    `/rest/v1/tasks?${params.toString()}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Couldn't move task. Please try again.");
  }
}
