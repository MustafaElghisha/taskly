import { LoginSchemaType } from "../schemas/LoginSchema";
import { saveSession } from "./session";

export async function login(data: LoginSchemaType) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        apikey: `${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    },
  );
  const authResponse = await response.json();

  if (!response.ok) {
    throw new Error(authResponse.msg);
  }

  saveSession(
    {
      access_token: authResponse.access_token,
      refresh_token: authResponse.refresh_token,
      expires_at: authResponse.expires_at,
    },
    data.rememberMe,
  );
}
