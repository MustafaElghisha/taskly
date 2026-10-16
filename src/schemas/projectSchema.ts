import z from "zod";

const projectResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  created_by: z.string(),
  created_at: z.string(),
});

export const projectsResponseSchema = z.array(projectResponseSchema);

export type Project = z.infer<typeof projectResponseSchema>;
