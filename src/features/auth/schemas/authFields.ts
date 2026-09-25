import z from "zod";

export const emailSchema = z
  .string()
  .trim()
  .nonempty("Email is required.")
  .email("Email must follow a valid email format.");

export const passwordSchema = z
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
  });

export const confirmPasswordSchema = z
  .string()
  .nonempty("Please confirm your password");
