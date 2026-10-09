import z from "zod";
import { TASK_STATUSES } from "../constants/tasks";

export const createTaskInputSchema = z.object({
  title: z.string().trim().nonempty("Task title is required."),
  epic_id: z.string().optional(),
  description: z
    .string()
    .max(500, {
      message: "Task description must be at most 500 characters.",
    })
    .optional(),
  assignee_id: z.string().optional(),
  due_date: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        return new Date(date).toISOString() >= new Date().toISOString();
      },
      { message: "Due Date must be today or a future date." },
    ),
  status: z.enum(TASK_STATUSES),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;
