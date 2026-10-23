import { emailSchema } from "@/features/auth/schemas/authFields";
import z from "zod";

export const inviteMemberSchema = z.object({
  email: emailSchema,
});
