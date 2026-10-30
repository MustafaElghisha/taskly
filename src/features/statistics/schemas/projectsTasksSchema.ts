import z from "zod";

export const projectsTasksSchema = z.array(
  z.object({
    project_id: z.string(),
    project_name: z.string(),
    tasks_count: z.number(),
  }),
);

export type ProjectTasks = z.infer<typeof projectsTasksSchema>;
