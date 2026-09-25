import z from "zod";
import {
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
} from "./authFields";

export const signUpInputSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("Name is required.")
      .regex(/^[\p{L}\s]+$/u, "Name must contain only letters and spaces")
      .regex(
        /^(?!.*\s{2}).*$/,
        "Name cannot contain multiple consecutive spaces.",
      )
      .min(3, "Name must have a minimum length of 3 characters.")
      .max(50, "Name must have a maximum length of 50 characters."),
    email: emailSchema,
    password: passwordSchema,
    jobTitle: z.string().optional(),
    confirmPassword: confirmPasswordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Confirm password is not the same as password",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpInputSchema>;
