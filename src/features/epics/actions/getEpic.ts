"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { epicsResponseSchema } from "../schemas/epicSchema";

export async function getEpic(projectId: string, epicId: string) {
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

  return epicsResponseSchema.parse(epics)[0];
}
