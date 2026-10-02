import z from "zod";

const memberSchema = z.object({
  user_id: z.string(),
  role: z.enum(["owner", "admin", "member", "viewer"]),
  email: z.email(),
  metadata: z.object({
    name: z.string(),
  }),
});

export const membersSchemaResponse = z.array(memberSchema);

export type Member = z.infer<typeof memberSchema>;
