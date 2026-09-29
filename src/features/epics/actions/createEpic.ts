"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { CreateEpicInput } from "../schemas/createEpicSchema";

export async function createEpic({
  project_id,
  title,
  description,
  assignee_id,
  deadline,
}: CreateEpicInput & { project_id: string }) {
  try {
    const response = await authenticatedFetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/epics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          project_id,
          ...(description && { description }),
          ...(assignee_id && { assignee_id }),
          ...(deadline && { deadline }),
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();

      return {
        success: false,
        message: error.message ?? "Failed to create epic",
      };
    }

    return { success: true, message: "A new Epic created successfully!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create epic",
    };
  }
}
