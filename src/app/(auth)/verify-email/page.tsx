import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_URI, SIGNUP_EMAIL_COOKIE } from "~/constants/auth";
import { VerifyEmailForm } from "~/features/auth/components/verify-email-form";

export const metadata: Metadata = {
  title: "Verify email",
};

export default async function VerifyEmailPage() {
  const cookie = await cookies();
  const email = cookie.get(SIGNUP_EMAIL_COOKIE)?.value;
  if (!email) {
    return redirect(AUTH_URI.signup);
  }

  return (
    <VerifyEmailForm
      className="h-screen max-w-xl place-content-center justify-self-center md:max-w-5xl"
      email={email}
    />
  );
}
