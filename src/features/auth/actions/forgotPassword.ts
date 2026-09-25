"use server";

import { ForgotPasswordInput } from "../schemas/forgotPasswordSchema";

export async function forgotPassword({ email }: ForgotPasswordInput) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/recover`,
    {
      method: "POST",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  if (!response.ok) {
    throw new Error("REQUEST_FAILED");
  }
}
