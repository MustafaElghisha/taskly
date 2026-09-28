"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { membersSchema } from "@/types";

export async function getProjectMembers(projectId: string) {
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/get_project_members?project_id=eq.${projectId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch members data");
  }

  const data = await response.json();

  return membersSchema.parse(data);
}
