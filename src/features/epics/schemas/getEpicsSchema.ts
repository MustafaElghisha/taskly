import z from "zod";

const epicSchema = z.object({
  epic_id: z.string(),
  title: z.string(),
  deadline: z.string().nullable(),
  created_by: z.object({
    name: z.string(),
  }),
  assignee: z.object({
    name: z.string().nullable(),
  }),
});

export const epicsResponseSchema = z.array(epicSchema);

export type Epic = z.infer<typeof epicSchema>;
