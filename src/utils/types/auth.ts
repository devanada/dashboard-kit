import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export interface LoginPayload {
  email: string;
  name: string;
  role: string;
}
