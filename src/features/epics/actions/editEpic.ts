"use server";

import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { editEpicInput } from "../schemas/editEpicSchema";
import { revalidatePath } from "next/cache";

export async function editEpic(
  epicInput: editEpicInput,
  id: string,
  project_id: string,
) {
  try {
    const response = await authenticatedFetch(`/rest/v1/epics?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify(epicInput),
    });

    if (!response.ok) {
      const error = await response.json();

      return {
        success: false,
        message: error.message ?? "Failed to update epic. Please try again.",
      };
    }

    revalidatePath(`/projects/${project_id}/epics/view/${id}`);
    return { success: true, message: "Epic updated successfully!" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update epic. Please try again.",
    };
  }
}
