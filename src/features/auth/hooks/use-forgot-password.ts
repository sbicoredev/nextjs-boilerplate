"use client";

import { useMutation } from "@tanstack/react-query";

import { requestPasswordResetOtpAction } from "../actions/auth-action";
import type { ForgotPasswordInput } from "../schemas";

export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (input: ForgotPasswordInput) =>
      requestPasswordResetOtpAction(input),
  });
