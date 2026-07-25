import type { Metadata } from "next";

import { SignUpForm } from "~/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <SignUpForm className="max-w-xl place-content-center justify-self-center md:max-w-5xl" />
  );
}
