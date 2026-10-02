"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { Project } from "@/types";

const LIMIT = 10;

export async function getProjects(page: number) {
  const offset = (page - 1) * LIMIT;

  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_projects?limit=${LIMIT}&offset=${offset}`,
    {
      method: "GET",
      headers: {
        Content_Type: "application/json",
        Prefer: "count=exact",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      "We're having trouble retrieving your projects right now. Please try again in a moment.",
    );
  }

  const contentRange = response.headers.get("Content-Range");
  const totalCount = Number(contentRange?.split("/")[1] ?? 0);
  const totalPages = Math.ceil(totalCount / LIMIT);

  const projects = (await response.json()) as Project[];

  return { totalPages, projects };
}
