import z from "zod";

export const resetPasswordInputSchema = z
  .object({
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
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Confirm password is not the same as password",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
