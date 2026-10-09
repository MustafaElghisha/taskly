"use server";

import { setTempAccessToken } from "@/lib/auth/session";

export async function setTempAccessTokenAction(tempAccessToken: string) {
  await setTempAccessToken(tempAccessToken);
}
