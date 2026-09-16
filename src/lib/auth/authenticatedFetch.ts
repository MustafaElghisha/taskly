import "server-only";

import { getAccessToken, refreshAccessToken } from "./session";

export async function authenticatedFetch(
  input: string,
  init: RequestInit = {},
) {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  if (!accessToken) {
    throw new Error("UNAUTHENTICATED");
  }

  let response = await fetch(input, {
    ...init,
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status !== 401) {
    return response;
  }

  accessToken = await refreshAccessToken();

  if (!accessToken) {
    throw new Error("UNAUTHENTICATED");
  }

  response = await fetch(input, {
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
