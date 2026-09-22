"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function editProject(
  data: {
    name: string;
    description?: string;
  },
  id: string,
) {
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?id=eq.${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to edit project. Try again later.");
  }
}
