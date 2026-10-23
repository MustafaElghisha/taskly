"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { epicsResponseSchema } from "../../../schemas/epicSchema";

const LIMIT = 6;

export async function getEpics(
  projectId: string,
  page?: number,
  searchTerm?: string,
) {
  const params = new URLSearchParams();

  params.set("project_id", `eq.${projectId}`);

  if (searchTerm?.length) {
    params.set("title", `ilike.%${searchTerm}%`);
  }

  if (page != undefined) {
    const offset = (page - 1) * LIMIT;

    params.set("limit", String(LIMIT));
    params.set("offset", String(offset));
  }

  const response = await authenticatedFetch(
    `/rest/v1/project_epics?${params.toString()}`,
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

  return { data: epicsResponseSchema.parse(epics), totalPages };
}
