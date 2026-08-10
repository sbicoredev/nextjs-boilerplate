"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import {
  AUTH_REDIRECT_PATHS,
  EMAIL_OTP_COOKIE,
  SIGNUP_EMAIL_COOKIE,
} from "~/constants/auth";
import { authRoutesActionClient } from "~/server/actions/client";
import { getSafeRedirectPath } from "~/utils/safe-redirect";

import {
  forgotPasswordSchema,
  resetPasswordSchema,
  sendVerificationOtpSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from "../schemas";
import {
  requestPasswordResetOtp,
  resetPassword,
  sendVerificationOtp,
  signInWithPassword,
  signUpWithPassword,
  verifyEmailOtp,
} from "../server/auth-service";

export const signInWithPasswordAction = authRoutesActionClient
  .metadata({ actionName: "signInWithPasswordAction" })
  .bindArgsSchemas([z.string().optional()])
  .inputSchema(signInSchema)
  .action(async ({ parsedInput, bindArgsParsedInputs: [rediretTo] }) => {
    const res = await signInWithPassword(parsedInput, await headers());
    if (res.user) {
      redirect(getSafeRedirectPath(rediretTo, AUTH_REDIRECT_PATHS.afterSignIn));
    }
  });

export const signUpWithPasswordAction = authRoutesActionClient
  .metadata({ actionName: "signUpWithPasswordAction" })
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }) => {
    const cs = await cookies();
    const res = await signUpWithPassword(parsedInput, await headers());
    if (res.user) {
      // after successfull signup request set a cookie for unverified email
      cs.set({
        name: SIGNUP_EMAIL_COOKIE,
        value: parsedInput.email,
        expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        path: "/",
      });

      redirect(AUTH_REDIRECT_PATHS.afterSignUp);
    }
  });

export const verifyEmailOtpAction = authRoutesActionClient
  .metadata({ actionName: "verifyEmailOtpAction" })
  .inputSchema(verifyEmailSchema)
  .action(async ({ parsedInput }) => {
    const cs = await cookies();
    const res = await verifyEmailOtp(parsedInput, await headers());
    // delete the unverified email cookie after 5 seconds of email verification
    if (res.user.emailVerified) {
      cs.set({
        name: SIGNUP_EMAIL_COOKIE,
        value: parsedInput.email,
        expires: Date.now() + 5 * 1000, // 5 seconds
        path: "/",
      });
    }
  });

export const sendVerificationOtpAction = authRoutesActionClient
  .metadata({ actionName: "sendVerificationOtpAction" })
  .inputSchema(sendVerificationOtpSchema)
  .action(async ({ parsedInput }) =>
    sendVerificationOtp(parsedInput, await headers())
  );

export const requestPasswordResetOtpAction = authRoutesActionClient
  .metadata({ actionName: "requestPasswordResetOtpAction" })
  .inputSchema(forgotPasswordSchema)
  .action(async ({ parsedInput }) => {
    const cs = await cookies();
    const res = await requestPasswordResetOtp(parsedInput, await headers());
    if (res.success) {
      // after successfull forgot password request set a cookie for email
      cs.set({
        name: EMAIL_OTP_COOKIE,
        value: parsedInput.email,
        expires: Date.now() + 24 * 60 * 60 * 1000, // 1 day
        path: "/",
      });
      redirect(AUTH_REDIRECT_PATHS.afterRequestResetPass);
    }
  });

export const resetPasswordAction = authRoutesActionClient
  .metadata({ actionName: "resetPasswordAction" })
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const res = await resetPassword(parsedInput, await headers());
    if (res.success) {
      redirect(AUTH_REDIRECT_PATHS.afterPassReset);
    }
  });
