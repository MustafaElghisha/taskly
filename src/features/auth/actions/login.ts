"use server";

import {
  setAccessToken,
  setRefreshToken,
  clearRefreshToken,
} from "@/lib/auth/session";
import { LoginInput } from "../schemas/loginSchema";

type LoginResult = { success: true } | { success: false; error: string };

export async function login({
  email,
  password,
  rememberMe,
}: LoginInput): Promise<LoginResult> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) {
      return { success: false, error: "Invalid email or password." };
    }

    const authResponse = await response.json();

    await setAccessToken(authResponse.access_token);

    if (rememberMe) {
      await setRefreshToken(authResponse.refresh_token);
    } else {
      await clearRefreshToken();
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Couldn't reach the server. Check your connection and try again.",
    };
  }
}
