"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { epicsResponseSchema } from "../schemas/getEpicsSchema";

export async function getAllEpics(projectId: string) {
  try {
    const response = await authenticatedFetch(
      `/rest/v1/project_epics?project_id=eq.${projectId}`,
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const epics = await response.json();

    return epicsResponseSchema.parse(epics);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong, please try again later.",
    );
  }
}
