"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function editProject(
  {
    name,
    description,
  }: {
    name: string;
    description?: string;
  },
  projectId: string,
) {
  try {
    const response = await authenticatedFetch(
      `/rest/v1/projects?id=eq.${projectId}`,
      {
        method: "PATCH",
        headers: {
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();

      return {
        success: false,
        message: error.message ?? "Failed to edit project. Try again later.",
      };
    }

    return {
      success: true,
      message: "Project updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to edit project. Try again later.",
    };
  }
}
