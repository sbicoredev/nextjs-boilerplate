import * as z from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export type SignInPayload = z.infer<typeof signInSchema>;

export const signUpSchema = z
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
export type SignUpPayload = z.infer<typeof signUpSchema>;

export const verifyEmailSchema = z.object({
  otp: z.string().min(6),
  email: z.email(),
});
export type VerifyEmailPayload = z.infer<typeof verifyEmailSchema>;

export const sendVerificationOtpSchema = z.object({
  email: z.email(),
  type: z.enum(["sign-in", "email-verification", "forget-password"]),
});
export type SendVerificationOtpPayload = z.infer<
  typeof sendVerificationOtpSchema
>;

export const forgotPasswordSchema = z.object({
  email: z.email(),
});
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    otp: z.string(),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
