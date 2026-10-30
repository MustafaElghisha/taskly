"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { projectsResponseSchema } from "@/schemas/projectSchema";

const LIMIT = 5;

export async function getProjects(page?: number) {
  const params = new URLSearchParams();

  if (page !== undefined) {
    params.set("limit", String(LIMIT));
    params.set("offset", String((page - 1) * LIMIT));
  }

  const response = await authenticatedFetch(
    `/rest/v1/rpc/get_projects?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Prefer: "count=exact",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "We're having trouble retrieving your projects right now. Please try again in a moment.",
    );
  }

  const projects = await response.json();

  if (page === undefined) {
    return {
      data: projectsResponseSchema.parse(projects),
    };
  }

  const contentRange = response.headers.get("Content-Range");
  const totalCount = Number(contentRange?.split("/")[1] ?? 0);

  return {
    data: projectsResponseSchema.parse(projects),
    totalPages: Math.ceil(totalCount / LIMIT),
  };
}
