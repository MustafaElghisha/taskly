import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required.")
    .email("Email must follow a valid email format."),
  password: z.string().nonempty("Password is required."),
  rememberMe: z.boolean().default(false),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
