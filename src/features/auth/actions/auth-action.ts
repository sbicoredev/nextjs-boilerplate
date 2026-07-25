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
import { actionClient } from "~/lib/safe-action";
import { getSafeRedirectPath } from "~/lib/safe-redirect";

import {
  requestPasswordResetOtp,
  resetPassword,
  sendVerificationOtp,
  signInWithPassword,
  signUpWithPassword,
  verifyEmailOtp,
} from "../services/auth-service";

export const signInWithPasswordAction = actionClient
  .metadata({ actionName: "signInWithPasswordAction" })
  .bindArgsSchemas([z.string().optional()])
  .inputSchema(signInSchema)
  .action(async ({ parsedInput, bindArgsParsedInputs: [rediretTo] }) => {
    const res = await signInWithPassword(parsedInput);
    if (res.user) {
      redirect(getSafeRedirectPath(rediretTo, AUTH_REDIRECT_PATHS.afterSignIn));
    }
  });

export const signUpWithPasswordAction = actionClient
  .metadata({ actionName: "signUpWithPasswordAction" })
  .inputSchema(signUpSchema)
  .action(async ({ parsedInput }) => {
    const res = await signUpWithPassword(parsedInput);
    if (res.user) {
      redirect(AUTH_REDIRECT_PATHS.afterSignUp);
    }
  });

export const verifyEmailOtpAction = actionClient
  .metadata({ actionName: "verifyEmailOtpAction" })
  .inputSchema(verifyEmailSchema)
  .action(async ({ parsedInput }) => verifyEmailOtp(parsedInput));

export const sendVerificationOtpAction = actionClient
  .metadata({ actionName: "sendVerificationOtpAction" })
  .inputSchema(sendVerificationOtpSchema)
  .action(async ({ parsedInput }) => sendVerificationOtp(parsedInput));

export const requestPasswordResetOtpAction = actionClient
  .metadata({ actionName: "requestPasswordResetOtpAction" })
  .inputSchema(forgotPasswordSchema)
  .action(async ({ parsedInput }) => requestPasswordResetOtp(parsedInput));

export const resetPasswordAction = actionClient
  .metadata({ actionName: "resetPasswordAction" })
  .inputSchema(resetPasswordSchema)
  .action(async ({ parsedInput }) => resetPassword(parsedInput));
