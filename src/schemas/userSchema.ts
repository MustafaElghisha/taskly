import z from "zod";

const userMetaDataSchema = z.object({
  email: z.email(),
  name: z.string(),
  jobTitle: z.string().optional(),
});

export const userResponseSchema = z.object({
  user_metadata: userMetaDataSchema,
});

export type User = z.infer<typeof userMetaDataSchema>;
