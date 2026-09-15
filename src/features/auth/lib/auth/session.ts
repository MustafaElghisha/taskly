import "server-only";

import { cookies } from "next/headers";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

const refreshTokenOptions = {
  ...options,
  maxAge: 60 * 60 * 24 * 30,
};

const accessTokenOptions = {
  ...options,
  maxAge: 60 * 60,
};

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("access_token", accessToken, accessTokenOptions);
}

export async function setRefreshToken(refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set("refresh_token", refreshToken, refreshTokenOptions);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value ?? null;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get("refresh_token")?.value ?? null;
}

export async function clearRefreshToken() {
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
}

export async function clearAccessToken() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}

export async function refreshAccessToken() {
  const cookieStore = await cookies();

  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    },
  );
  const authResponse = await response.json();
  if (!response.ok) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return null;
  }

  cookieStore.set(
    "access_token",
    authResponse.access_token,
    accessTokenOptions,
  );

  cookieStore.set(
    "refresh_token",
    authResponse.refresh_token,
    refreshTokenOptions,
  );

  return authResponse.access_token;
}
