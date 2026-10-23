"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function inviteMember({
  p_email,
  p_project_id,
}: {
  p_email: string;
  p_project_id: string;
}) {
  const response = await authenticatedFetch(`/rest/v1/rpc/invite_member`, {
    method: "POST",
    body: JSON.stringify({
      p_email,
      p_project_id,
      p_app_url: process.env.NEXT_PUBLIC_APP_URL!,
      p_base_url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    }),
  });

  if (!response.ok) {
    return {
      success: false,
      message: "Something went wrong, please try again.",
    };
  }

  return { success: true, message: "Invitation sent successfully." };
}
