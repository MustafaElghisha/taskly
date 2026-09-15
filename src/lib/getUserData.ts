import { authenticatedFetch } from "@/features/auth/lib/auth/authenticatedFetch";

export type UserData = {
  name: string;
  jobTitle?: string;
};

export async function getUserData(): Promise<UserData> {
  const response = await authenticatedFetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const user = await response.json();

  return {
    name: user.user_metadata.name,
    jobTitle: user.user_metadata.department,
  };
}
