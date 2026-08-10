import "server-only";

import { auth } from "~/server/auth/better-auth";

import type {
  ForgotPasswordInput,
  ResetPasswordInput,
  SendVerificationOtpInput,
  SignInInput,
  SignUpInput,
  VerifyEmailInput,
} from "../schemas";

export async function signInWithPassword(input: SignInInput, headers: Headers) {
  return await auth.api.signInEmail({
    headers,
    body: input,
  });
}

export async function signOut(headers: Headers) {
  return await auth.api.signOut({ headers });
}

export async function signUpWithPassword(input: SignUpInput, headers: Headers) {
  return await auth.api.signUpEmail({
    headers,
    body: input,
  });
}

export async function verifyEmailOtp(
  input: VerifyEmailInput,
  headers: Headers
) {
  return await auth.api.verifyEmailOTP({
    headers,
    body: input,
  });
}

export async function sendVerificationOtp(
  input: SendVerificationOtpInput,
  headers: Headers
) {
  return await auth.api.sendVerificationOTP({
    headers,
    body: input,
  });
}

export async function requestPasswordResetOtp(
  input: ForgotPasswordInput,
  headers: Headers
) {
  return await auth.api.sendVerificationOTP({
    headers,
    body: {
      email: input.email,
      type: "forget-password",
    },
  });
}

export async function resetPassword(
  input: ResetPasswordInput,
  headers: Headers
) {
  return await auth.api.resetPasswordEmailOTP({
    headers,
    body: input,
  });
}
