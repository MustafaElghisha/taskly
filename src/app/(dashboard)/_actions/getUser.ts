"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function getUser() {
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const user = await response.json();

  return {
    name: user.user_metadata.name as string,
    jobTitle: user.user_metadata.department as string,
  };
}
