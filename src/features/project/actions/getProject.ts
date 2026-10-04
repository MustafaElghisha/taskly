"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { Project } from "@/types";

export async function getProject(projectId: string) {
  const response = await authenticatedFetch(
    `/rest/v1/rpc/get_projects?id=eq.${projectId}`,
  );

  if (!response.ok) {
    throw new Error("Faild to fetch the current project");
  }

  const project = (await response.json()) as Project[];
  return project[0];
}
