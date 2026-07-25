import "server-only";

import { headers } from "next/headers";

import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SendVerificationOtpPayload,
  SignInPayload,
  SignUpPayload,
  VerifyEmailPayload,
} from "~/features/auth/schemas";
import { auth } from "~/services/auth/better-auth";

export async function signInWithPassword(
  input: SignInPayload & { rememberMe?: boolean }
) {
  return auth.api.signInEmail({
    returnHeaders: false,
    headers: await headers(),
    body: input,
  });
}

export async function signUpWithPassword(input: SignUpPayload) {
  return auth.api.signUpEmail({
    headers: await headers(),
    body: input,
  });
}

export async function verifyEmailOtp(input: VerifyEmailPayload) {
  return auth.api.verifyEmailOTP({
    headers: await headers(),
    body: input,
  });
}

export async function sendVerificationOtp(input: SendVerificationOtpPayload) {
  return auth.api.sendVerificationOTP({
    headers: await headers(),
    body: input,
  });
}

export async function requestPasswordResetOtp(input: ForgotPasswordPayload) {
  return auth.api.sendVerificationOTP({
    headers: await headers(),
    body: {
      email: input.email,
      type: "forget-password",
    },
  });
}

export async function resetPassword(input: ResetPasswordPayload) {
  return auth.api.resetPasswordEmailOTP({
    headers: await headers(),
    body: input,
  });
}
