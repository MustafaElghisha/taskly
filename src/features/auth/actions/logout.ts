"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { clearAccessToken, clearRefreshToken } from "@/lib/auth/session";

export default async function logout() {
  try {
    const response = await authenticatedFetch(`/auth/v1/logout`, {
      method: "POST",
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Logout failed, please try again.",
      };
    }

    await clearAccessToken();
    await clearRefreshToken();

    return {
      success: true,
      message: "",
    };
  } catch {
    return {
      success: false,
      message: "Logout failed, please try again.",
    };
  }
}
