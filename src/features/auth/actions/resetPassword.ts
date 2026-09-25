"use server";

import { clearTempAccessToken, getTempAccessToken } from "@/lib/auth/session";
import { ResetPasswordInput } from "../schemas/resetPasswordSchema";

export async function resetPassword(data: ResetPasswordInput) {
  const accessToken = await getTempAccessToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
      {
        method: "PUT",
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
        }),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        message: "Unable to reset your password. Please try again.",
      };
    }

    await clearTempAccessToken();

    return {
      success: true,
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
