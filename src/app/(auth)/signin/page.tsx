import type { Metadata } from "next";

import { SignInForm } from "~/features/auth/components/signin-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <SignInForm className="max-w-xl place-content-center justify-self-center md:max-w-5xl" />
  );
}
