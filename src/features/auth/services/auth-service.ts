import "server-only";

import { cookies, headers } from "next/headers";

import { EMAIL_OTP_COOKIE, SIGNUP_EMAIL_COOKIE } from "~/constants/auth";
import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
  SendVerificationOtpPayload,
  SignInPayload,
  SignUpPayload,
  VerifyEmailPayload,
} from "~/features/auth/schemas";
import { auth } from "~/lib/auth/better-auth";

export async function signInWithPassword(
  input: SignInPayload & { rememberMe?: boolean }
) {
  return auth.api.signInEmail({
    headers: await headers(),
    body: input,
  });
}

export async function signOut() {
  return auth.api.signOut({ headers: await headers() });
}

export async function signUpWithPassword(input: SignUpPayload) {
  const cookieStore = await cookies();
  const res = await auth.api.signUpEmail({
    headers: await headers(),
    body: input,
  });
  if (res.user) {
    // after successfull signup request set a cookie for unverified email
    cookieStore.set({
      name: SIGNUP_EMAIL_COOKIE,
      value: input.email,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });
  }

  return res;
}

export async function verifyEmailOtp(input: VerifyEmailPayload) {
  const cookieStore = await cookies();
  const res = await auth.api.verifyEmailOTP({
    headers: await headers(),
    body: input,
  });
  // after email verification delete the unverified email
  if (res.user.emailVerified) {
    cookieStore.set({
      name: SIGNUP_EMAIL_COOKIE,
      value: input.email,
      expires: Date.now() + 5 * 1000, // 5 seconds
      path: "/",
    });
  }
  return res;
}

export async function sendVerificationOtp(input: SendVerificationOtpPayload) {
  return auth.api.sendVerificationOTP({
    headers: await headers(),
    body: input,
  });
}

export async function requestPasswordResetOtp(input: ForgotPasswordPayload) {
  const cookieStore = await cookies();
  const res = await auth.api.sendVerificationOTP({
    headers: await headers(),
    body: {
      email: input.email,
      type: "forget-password",
    },
  });
  // after successfull forgot password request set a cookie for email
  if (res.success) {
    cookieStore.set({
      name: EMAIL_OTP_COOKIE,
      value: input.email,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });
  }
  return res;
}

export async function resetPassword(input: ResetPasswordPayload) {
  return auth.api.resetPasswordEmailOTP({
    headers: await headers(),
    body: input,
  });
}
