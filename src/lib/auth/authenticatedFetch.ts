import "server-only";

import { getAccessToken } from "./session";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export async function authenticatedFetch(path: string, init: RequestInit = {}) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("UNAUTHENTICATED");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return response;
}
