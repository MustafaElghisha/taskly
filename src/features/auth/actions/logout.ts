"use server";

import { authenticatedFetch } from "../lib/auth/authenticatedFetch";
import { clearAccessToken, clearRefreshToken } from "../lib/auth/session";

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
