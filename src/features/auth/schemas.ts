import * as z from "zod";

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export type SigninPayload = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignupPayload = z.infer<typeof signupSchema>;

export const verifyEmailSchema = z.object({
  otp: z.string().min(6),
});
export type VerifyEmailPayload = z.infer<typeof verifyEmailSchema>;
