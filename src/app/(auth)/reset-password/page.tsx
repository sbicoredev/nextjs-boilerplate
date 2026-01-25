import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_URI, EMAIL_OTP_COOKIE } from "~/constants/auth";
import { ResetPasswordForm } from "~/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
};

export default async function ResetPasswordPage() {
  const cookie = await cookies();
  const email = cookie.get(EMAIL_OTP_COOKIE)?.value;
  if (!email) return redirect(AUTH_URI.signin);

  return (
    <ResetPasswordForm
      email={email}
      className="h-screen max-w-xl place-content-center justify-self-center md:max-w-5xl"
    />
  );
}
