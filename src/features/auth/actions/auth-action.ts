"use server";

import { redirect } from "next/navigation";
import z from "zod";

import { AUTH_REDIRECT_PATHS } from "~/constants/auth";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  sendVerificationOtpSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from "~/features/auth/schemas";
import { authRoutesActionClient } from "~/lib/safe-action";
import { getSafeRedirectPath } from "~/lib/safe-redirect";

import {
  requestPasswordResetOtp,
  resetPassword,
  sendVerificationOtp,
  signInWithPassword,
  signUpWithPassword,
  verifyEmailOtp,
} from "../services/auth-service";

export const signInWithPasswordAction = authRoutesActionClient
  .metadata({ actionName: "signInWithPasswordAction" })
  .bindArgsSchemas([z.string().optional()])
  .inputSchema(signInSchema)
  .action(async ({ parsedInput, bindArgsParsedInputs: [rediretTo] }) => {
    const res = await signInWithPassword(parsedInput);
    if (res.user) {
      redirect(getSafeRedirectPath(rediretTo, AUTH_REDIRECT_PATHS.afterSignIn));
    }
  });

export const signUpWithPasswordAction = authRoutesActionClient
  .metadata({ actionName: "signUpWithPasswordAction" })
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }) => {
    const res = await signUpWithPassword(parsedInput);
    if (res.user) {
      redirect(AUTH_REDIRECT_PATHS.afterSignUp);
    }
  });

export const verifyEmailOtpAction = authRoutesActionClient
  .metadata({ actionName: "verifyEmailOtpAction" })
  .inputSchema(verifyEmailSchema)
  .action(async ({ parsedInput }) => verifyEmailOtp(parsedInput));

export const sendVerificationOtpAction = authRoutesActionClient
  .metadata({ actionName: "sendVerificationOtpAction" })
  .inputSchema(sendVerificationOtpSchema)
  .action(async ({ parsedInput }) => sendVerificationOtp(parsedInput));

export const requestPasswordResetOtpAction = authRoutesActionClient
  .metadata({ actionName: "requestPasswordResetOtpAction" })
  .inputSchema(forgotPasswordSchema)
  .action(async ({ parsedInput }) => {
    const res = await requestPasswordResetOtp(parsedInput);
    if (res.success) {
      redirect(AUTH_REDIRECT_PATHS.afterRequestResetPass);
    }
  });

export const resetPasswordAction = authRoutesActionClient
  .metadata({ actionName: "resetPasswordAction" })
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput }) => {
    const res = await resetPassword(parsedInput);
    if (res.success) {
      redirect(AUTH_REDIRECT_PATHS.afterPassReset);
    }
  });
