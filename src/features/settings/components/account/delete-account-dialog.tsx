"use client";

import { useForm } from "@tanstack/react-form";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ButtonSpinner } from "~/components/button-spinner";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
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
import { ErrorMessaage } from "~/constants/error-message";
import { useAuth } from "~/contexts/auth-context";
import { mapToFormError } from "~/utils/form";

import { useDeleteAccount } from "../../hooks/use-delete-account";
import { deleteAccountSchema } from "../../schemas/profile-schema";

export const DeleteAccountDialog = () => {
  const { session } = useAuth();
  const { mutateAsync, isPending, isSuccess } = useDeleteAccount();
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: { password: "" },
    validators: { onSubmit: deleteAccountSchema.omit({ token: true }) },
    onSubmit: async ({ value, formApi }) => {
      if (!session.token) {
        return;
      }
      const { validationErrors, serverError } = await mutateAsync({
        token: session.token,
        password: value.password,
      });
      if (validationErrors) {
        formApi.setErrorMap({
          onSubmit: {
            form: ErrorMessaage.validation.failed,
            fields: mapToFormError(validationErrors.fieldErrors),
          },
        });
      } else if (serverError) {
        formApi.setErrorMap({ onSubmit: { form: serverError, fields: {} } });
      }
    },
  });

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
        <DialogTitle>Are you sure to delete?</DialogTitle>
        <DialogDescription className="text-justify">
          Once your account is deleted, all of its resources and data will also
          be permanently deleted. Please enter your password to confirm you
          would like to permanently delete your account.
        </DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
              {(errors) =>
                errors && isSuccess ? (
                  <Alert className="border border-red-500/20 bg-red-500/10">
                    <AlertTriangleIcon />
                    <AlertTitle>Request Error</AlertTitle>
                    <AlertDescription>{errors.toString()}</AlertDescription>
                  </Alert>
                ) : null
              }
            </form.Subscribe>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Button
                        className="ms-auto h-4 p-0"
                        nativeButton={false}
                        render={<Link href="/dashboard/settings/security" />}
                        type="button"
                        variant="link"
                      >
                        Forgot your password?
                      </Button>
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
          <DialogFooter className="mt-4 gap-2">
            <DialogClose
              onClick={() => setOpen(false)}
              render={<Button variant="secondary" />}
            >
              Cancel
            </DialogClose>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <ButtonSpinner
                  disabled={!canSubmit}
                  spin={isSubmitting}
                  variant="destructive"
                >
                  {isSubmitting ? "Deleting..." : "Delete account"}
                </ButtonSpinner>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
