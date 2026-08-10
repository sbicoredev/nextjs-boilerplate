import * as z from "zod";

import {
  confirmPasswordSchema,
  emailValidator,
  passwordValidator,
} from "~/lib/validators/common";

export const signInSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
  rememberMe: z.boolean().optional(),
});
export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = confirmPasswordSchema.extend({
  name: z.string().min(3),
  email: emailValidator,
});
export type SignUpInput = z.infer<typeof signUpSchema>;

export const verifyEmailSchema = z.object({
  otp: z.string().min(6),
  email: emailValidator,
});
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const sendVerificationOtpSchema = z.object({
  type: z.enum(["sign-in", "email-verification", "forget-password"]),
  email: emailValidator,
});
export type SendVerificationOtpInput = z.infer<
  typeof sendVerificationOtpSchema
>;

export const forgotPasswordSchema = z.object({
  email: emailValidator,
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = confirmPasswordSchema.extend({
  otp: z.string(),
  email: emailValidator,
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
