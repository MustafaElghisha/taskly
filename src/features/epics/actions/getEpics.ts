"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { epicsResponseSchema } from "../schemas/getEpicsSchema";

const LIMIT = 6;

export async function getEpics(projectId: string, page?: number) {
  const query = new URLSearchParams();

  query.set("project_id", `eq.${projectId}`);

  if (page != undefined) {
    const offset = (page - 1) * LIMIT;

    query.set("limit", String(LIMIT));
    query.set("offset", String(offset));
  }

  const qs = query.toString();

  try {
    const response = await authenticatedFetch(
      `/rest/v1/project_epics?${qs && `${qs}`}`,
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

    const epics = await response.json();

    return { epics: epicsResponseSchema.parse(epics), totalPages };
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong, please try again later.",
    );
  }
}
