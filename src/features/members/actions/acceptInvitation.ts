"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function acceptInvitation({ p_token }: { p_token: string }) {
  const response = await authenticatedFetch("/rest/v1/rpc/accept_invitation", {
    method: "POST",
    body: JSON.stringify({
      p_token,
    }),
  });

  if (!response.ok) {
    return {
      success: false,
      message: `
      Something went wrong while accepting the invitation.
      Please try again.
      `,
    };
  }

  return { success: true, message: "Invitation accepted successfully." };
}
