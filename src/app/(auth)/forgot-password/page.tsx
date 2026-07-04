import type { Metadata } from "next";

import { ForgotPasswordForm } from "~/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <ForgotPasswordForm className="max-w-xl place-content-center justify-self-center md:max-w-5xl" />
  );
}
