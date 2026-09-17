"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { Project } from "@/types";

export async function getProjects() {
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/get_projects`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(
      "We're having trouble retrieving your projects right now. Please try again in a moment.",
    );
  }

  const projects = (await response.json()) as Project[];

  return projects;
}
