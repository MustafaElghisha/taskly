import { authenticatedFetch } from "@/lib/auth/authenticatedFetch";
import { epicsResponseSchema } from "../schemas/getEpicsSchema";

export async function getEpics(projectId: string) {
  try {
    const response = await authenticatedFetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/project_epics?project_id=eq.${projectId}`,
      {
        method: "GET",
        headers: {
          Content_Type: "application/json",
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const epics = await response.json();

    return epicsResponseSchema.parse(epics);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Something went wrong, please try again later.",
    );
  }
}
