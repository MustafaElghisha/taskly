import z from "zod";
import { emailSchema } from "./authFields";

export const forgotPasswordInputSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;
