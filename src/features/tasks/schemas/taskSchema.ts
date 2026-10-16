import z from "zod";
import { TASK_STATUSES } from "../constants/tasks";

export const taskResponseSchema = z.object({
  id: z.string(),
  project_id: z.string(),
  epic_id: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.enum(TASK_STATUSES),
  created_at: z.string(),
  due_date: z.string().nullable(),
  task_id: z.string(),
  epic: z.object({
    id: z.string().nullable(),
    title: z.string().nullable(),
    epic_id: z.string().nullable(),
  }),
  created_by: z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
  }),
  assignee: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.email().nullable(),
  }),
});

export const tasksResponseSchema = z.array(taskResponseSchema);

export type Task = z.infer<typeof taskResponseSchema>;
