import z from "zod";

export const createEpicInputSchema = z.object({
  title: z
    .string()
    .trim()
    .nonempty("Epic title is required.")
    .min(3, { message: "Epic title must be at least 3 characters." }),
  description: z
    .string()
    .max(500, {
      message: "Epic description must be at most 500 characters",
    })
    .optional(),
  assignee_id: z.string().optional(),
  deadline: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        return date >= new Date().toISOString().split("T")[0];
      },
      { message: "Deadline must be today or a future date" },
    ),
});

export type CreateEpicInput = z.infer<typeof createEpicInputSchema>;
