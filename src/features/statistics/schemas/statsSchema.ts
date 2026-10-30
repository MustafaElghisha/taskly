import z from "zod";

const taskStatuses = z.object({
  TO_DO: z.number().optional(),
  IN_PROGRESS: z.number().optional(),
  BLOCKED: z.number().optional(),
  IN_REVIEW: z.number().optional(),
  READY_FOR_QA: z.number().optional(),
  REOPENED: z.number().optional(),
  READY_FOR_PRODUCTION: z.number().optional(),
  DONE: z.number().optional(),
});

// type TaskStatuses = keyof z.infer<typeof taskStatuses>;

export const statsResponseSchema = z.object({
  daily: z.array(
    z.object({
      day: z.string(),
      statuses: taskStatuses,
    }),
  ),
  totals: taskStatuses,
  total_tasks: z.number(),
  done_tasks: z.number(),
  overdue_tasks: z.number(),
});

export type StatsResponse = z.infer<typeof statsResponseSchema>;
