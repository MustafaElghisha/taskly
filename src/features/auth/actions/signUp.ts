"use server";

import { signUpInput } from "../schemas/signUpSchema";

export async function signUp(data: signUpInput) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/signup`,
    {
      method: "POST",
      headers: {
        apikey: `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        data: { name: data.name, department: data.jobTitle },
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.msg ?? "Signup failed");
  }
}
