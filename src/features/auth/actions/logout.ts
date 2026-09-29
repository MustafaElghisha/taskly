"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { clearAccessToken, clearRefreshToken } from "@/lib/auth/session";

export default async function logout() {
  try {
    await authenticatedFetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/logout`,
      { method: "POST" },
    );
  } finally {
    await clearAccessToken();
    await clearRefreshToken();
  }
}
