"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { userResponseSchema } from "@/schemas/userSchema";

export async function getUser() {
  const response = await authenticatedFetch(`/auth/v1/user`);

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const {
    user_metadata: { email, name, role },
  } = userResponseSchema.parse(await response.json());

  return { email, name, role };
}
