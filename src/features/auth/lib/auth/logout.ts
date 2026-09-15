"use server";

import { authenticatedFetch } from "./authenticatedFetch";
import { clearAccessToken, clearRefreshToken } from "./session";

export default async function logout() {
  try {
    const response = await authenticatedFetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/logout`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      throw new Error("Logout failed");
    }
  } finally {
    await clearAccessToken();
    await clearRefreshToken();
  }
}
