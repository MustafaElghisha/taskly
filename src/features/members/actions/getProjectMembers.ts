"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { membersSchemaResponse } from "../schemas/getProjectMembersSchema";

export async function getProjectMembers(projectId: string) {
  const response = await authenticatedFetch(
    `/rest/v1/get_project_members?project_id=eq.${projectId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch members data");
  }

  const data = await response.json();

  return membersSchemaResponse.parse(data);
}
