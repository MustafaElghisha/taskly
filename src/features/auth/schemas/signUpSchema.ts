import z from "zod";

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
    email: z
      .string()
      .trim()
      .nonempty("Email is required.")
      .email("Email must follow a valid email format."),
    password: z
      .string()
      .nonempty("Password is required.")
      .regex(/^\S+$/, { error: "Password cannot contain whitespace." })
      .regex(/[A-Z]/, {
        error: "Password must include at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        error: "Password must include at least one lowercase letter.",
      })
      .regex(/[0-9]/, {
        error: "Password must include at least one numeric digit.",
      })
      .regex(/[!@#$%^&*]/, {
        error:
          "Password must include at least one special character (e.g. !@#$%^&*).",
      })
      .min(8, {
        error: "Password must have a minimum length of 8 characters.",
      })
      .max(64, {
        error: "Password must have a maximum length of 64 characters.",
      }),
    jobTitle: z.string().optional(),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Confirm password is not the same as password",
    path: ["confirmPassword"],
  });

export type signUpInput = z.infer<typeof signUpInputSchema>;
