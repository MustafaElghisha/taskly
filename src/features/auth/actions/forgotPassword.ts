"use server";

import { ForgotPasswordInput } from "../schemas/forgotPasswordSchema";

export async function forgotPassword({ email }: ForgotPasswordInput) {
  try {
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
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "If an account exists for this email, you will receive a password reset link.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
