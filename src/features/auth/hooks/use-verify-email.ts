"use client";

import { useMutation } from "@tanstack/react-query";

import { verifyEmailOtpAction } from "../actions/auth-action";
import type { VerifyEmailInput } from "../schemas";

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: async (input: VerifyEmailInput) => verifyEmailOtpAction(input),
  });
