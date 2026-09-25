"use server";

import {
  setAccessToken,
  setRefreshToken,
  clearRefreshToken,
} from "@/lib/auth/session";
import { LoginInput } from "../schemas/loginSchema";

export async function login({ email, password, rememberMe }: LoginInput) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  const authResponse = await response.json();

  await setAccessToken(authResponse.access_token);

  if (rememberMe) {
    await setRefreshToken(authResponse.refresh_token);
  } else {
    await clearRefreshToken();
  }
}
