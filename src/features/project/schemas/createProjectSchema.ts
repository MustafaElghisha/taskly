import z from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Project title is required.")
    .min(3, { message: "Project title must be at least 3 characters." })
    .max(100, "Project title must be at most 100 characters."),
  description: z
    .string()
    .max(500, {
      message: "Project description must be at most 500 characters",
    })
    .optional(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
