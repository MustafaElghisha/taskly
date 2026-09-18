import "server-only";

import { cookies } from "next/headers";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

export const refreshTokenOptions = {
  ...options,
  maxAge: 60 * 60 * 24 * 30,
};

export const accessTokenOptions = {
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
