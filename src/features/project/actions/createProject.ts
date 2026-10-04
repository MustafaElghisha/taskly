"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";

export async function createProject({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  try {
    const response = await authenticatedFetch(`/rest/v1/projects`, {
      method: "POST",
      headers: {
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        ...(description && { description }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      return {
        success: false,
        message: error.message ?? "Failed to add new project. Try again later.",
      };
    }

    return {
      success: true,
      message: "Project created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to add new project. Try again later.",
    };
  }
}
