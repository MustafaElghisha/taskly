import z from "zod";
import { emailSchema } from "./authFields";

export const loginInputSchema = z.object({
  email: emailSchema,
  password: z.string().nonempty("Password is required."),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
