import z from "zod";

export type User = {
  name: string;
  jobTitle?: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export const membersSchema = z.array(
  z.object({
    role: z.enum(["owner", "admin", "member", "viewer"]),
    email: z.email(),
    metadata: z.object({
      name: z.string(),
    }),
  }),
);

export type MembersType = z.infer<typeof membersSchema>;
