"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { CreateTaskInput } from "../schemas/createTaskSchema";

export async function createTask(
  projectId: string,
  {
    status,
    title,
    description,
    assignee_id,
    due_date,
    epic_id,
  }: CreateTaskInput,
) {
  try {
    const response = await authenticatedFetch("/rest/v1/tasks", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        title,
        ...(epic_id && { epic_id }),
        ...(description && { description }),
        ...(assignee_id && { assignee_id }),
        ...(due_date && { due_date }),
        status,
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      return {
        success: false,
        message: error.message ?? "Failed to add new task. Try again later.",
      };
    }

    return {
      success: true,
      message: "Task created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add new task. Try again later.",
    };
  }
}
