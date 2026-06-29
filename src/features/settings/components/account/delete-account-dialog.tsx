"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

import { ButtonSpinner } from "~/components/button-spinner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { AUTH_URI } from "~/constants/auth";
import { useAuth } from "~/contexts/auth-context";

import { useDeleteAccount } from "../../api/delete-account";

const schema = z.object({
  password: z.string().min(6),
});

export const DeleteAccountDialog = () => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();

  const { mutate: deleteAccoount, isPending } = useDeleteAccount();

  const form = useForm({
    defaultValues: {
      password: "123456",
    },
    validators: { onSubmit: schema },
    onSubmit: async ({ value }) => handleDelete(value.password),
  });

  const handleDelete = async (password: string) => {
    if (!auth?.session?.token) {
      return;
    }
    deleteAccoount({
      token: auth.session.token,
      password,
    });
  };

  return (
    <Dialog onOpenChange={(v) => setOpen(v)} open={open}>
      <DialogTrigger
        render={
          <ButtonSpinner spin={isPending} variant={"destructive"}>
            Delete Account
          </ButtonSpinner>
        }
      />

      <DialogContent>
        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
        <DialogDescription className="text-justify">
          Once your account is deleted, all of its resources and data will also
          be permanently deleted. Please enter your password to confirm you
          would like to permanently delete your account.
        </DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Link
                        className="ms-auto text-blue-500 text-xs underline-offset-2 hover:underline dark:text-blue-500"
                        href={AUTH_URI.forgotPassword}
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      aria-invalid={isInvalid}
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      type="password"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
          <DialogFooter className="mt-4 gap-2">
            <DialogClose
              render={
                <Button onClick={() => setOpen(false)} variant="secondary" />
              }
            >
              Cancel
            </DialogClose>

            <ButtonSpinner spin={isPending} variant="destructive">
              Delete account
            </ButtonSpinner>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
