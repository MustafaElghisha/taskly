import z from "zod";

export const forgotPasswordInputSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required.")
    .email("Email must follow a valid email format."),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;
