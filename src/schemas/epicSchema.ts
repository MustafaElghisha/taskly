import z from "zod";

export const epicResponseSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  created_at: z.string(),
  deadline: z.string().nullable(),
  epic_id: z.string(),
  created_by: z.object({
    name: z.string(),
  }),
  assignee: z.object({
    sub: z.string().nullish(),
    name: z.string().nullish(),
    email: z.email().nullish(),
  }),
});

export const epicsResponseSchema = z.array(epicResponseSchema);

export type Epic = z.infer<typeof epicResponseSchema>;
