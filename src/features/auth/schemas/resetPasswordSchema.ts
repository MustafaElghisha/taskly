import z from "zod";
import { passwordSchema, confirmPasswordSchema } from "./authFields";

export const resetPasswordInputSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Confirm password is not the same as password",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
