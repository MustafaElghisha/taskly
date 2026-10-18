"use server";

import { SignUpInput } from "../schemas/signUpSchema";

export async function signUp({ email, password, name, jobTitle }: SignUpInput) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
    {
      method: "POST",
      headers: {
        apikey: `${process.env.SUPABASE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        data: { name, jobTitle },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg ?? "Signup failed");
  }
}
