"use server";

import { authenticatedFetch } from "@/features/auth/lib/auth/authenticatedFetch";

export async function createProject(data: {
  title: string;
  description?: string;
}) {
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: data.title,
        description: data.description,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to add new project. Try again later.");
  }
}
