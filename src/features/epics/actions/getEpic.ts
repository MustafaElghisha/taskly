"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { epicResponseSchema } from "../schemas/getEpicsSchema";

export async function getEpic(projectId: string, epicId: string) {
  try {
    const response = await authenticatedFetch(
      `/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.message ?? "Something went wrong, please try again later.",
      );
    }

    const epics = await response.json();

    return epicResponseSchema.parse(epics[0]);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong, please try again later.",
    );
  }
}
