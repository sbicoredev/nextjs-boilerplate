"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ButtonLoading } from "~/components/ui/button-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Field, FieldError, FieldGroup } from "~/components/ui/field";
import { Heading } from "~/components/ui/heading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { AUTH_URI } from "~/constants/auth";
import { cn } from "~/lib/utils";

import { useSendVerificationOTP } from "../api/send-verification-otp";
import { useVerifyEmail } from "../api/verify-email";
import { verifyEmailSchema } from "../schemas";

type Props = React.ComponentProps<"div"> & {
  email: string;
};

export const VerifyEmailForm = ({ email, className, ...props }: Props) => {
  const { mutateAsync, isPending, isSuccess } = useVerifyEmail();
  const { mutateAsync: resendOTP, isPending: isSendingOTP } =
    useSendVerificationOTP();

  const form = useForm({
    defaultValues: { otp: "" },
    validators: { onSubmit: verifyEmailSchema },
    onSubmit: async ({ value }) => mutateAsync({ email, otp: value.otp }),
  });

  if (isSuccess) {
    return (
      <div className={cn("space-y-6", className)} {...props}>
        <div className="flex flex-col items-center justify-center gap-4 rounded-md">
          <CheckCircleIcon className="size-14 animate-bounce text-green-500" />
          <Heading>Email verification successfull</Heading>
          <Button nativeButton={false} render={<Link href={AUTH_URI.signin} />}>
            Go to sign in
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      <Card className="min-w-sm max-w-lg overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            <p className="text-center">
              Enter the verification code sent to your email <br /> {email}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="otp">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <InputOTP maxLength={6} onChange={field.handleChange}>
                        <InputOTPGroup className="min-w-full place-content-center">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Field>
                <ButtonLoading className="w-full" loading={isPending}>
                  Verify
                </ButtonLoading>
                <ButtonLoading
                  loading={isSendingOTP || isPending}
                  onClick={() =>
                    resendOTP({ email, type: "email-verification" })
                  }
                  size={"sm"}
                  type="button"
                  variant={"link"}
                >
                  Didn't receive a code? Resend
                </ButtonLoading>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            className="font-normal"
            nativeButton={false}
            render={<Link href={AUTH_URI.signup} />}
            size="sm"
            variant="link"
          >
            Back to Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
