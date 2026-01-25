import type { Metadata } from "next";

import { SigninForm } from "~/features/auth/components/signin-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SigninPage() {
  return (
    <SigninForm className="h-screen max-w-xl place-content-center justify-self-center md:max-w-5xl" />
  );
}
