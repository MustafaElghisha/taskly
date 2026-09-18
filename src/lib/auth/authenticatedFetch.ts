import "server-only";

import { getAccessToken } from "./session";

export async function authenticatedFetch(
  input: string,
  init: RequestInit = {},
) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("UNAUTHENTICATED");
  }

  const response = await fetch(input, {
    ...init,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  return response;
}
