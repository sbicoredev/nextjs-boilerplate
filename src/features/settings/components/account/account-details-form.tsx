"use client";

import { useForm } from "@tanstack/react-form";
import { XIcon } from "lucide-react";
import Image from "next/image";

import { ButtonSpinner } from "~/components/button-spinner";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";
import { useAuth } from "~/contexts/auth-context";

import { useUpdateProfile } from "../../api/update-profile";
import { type UpdateProfilePayload, updateProfileSchema } from "../../schemas";

export const AccountDetailsForm = () => {
  const auth = useAuth();

  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: auth?.user?.name ?? "",
      image: auth?.user?.image ?? "",
    },
    validators: { onSubmit: updateProfileSchema },
    onSubmit: async ({ value }) => handleSubmit(value),
  });

  const handleSubmit = (data: UpdateProfilePayload) => {
    updateProfile({
      name: data.name || undefined,
      image: data.image || undefined,
    });
  };

  const formAvatar = form.getFieldValue("image");

  return (
    <form
      className="grid gap-6 space-y-0 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <div>
          <p className="mb-4 font-medium text-sm">Profile picture</p>
          {formAvatar ? (
            <div className="flex gap-4">
              <Image
                alt="user avatar"
                className="size-50 rounded-full border object-cover shadow-md"
                height={150}
                src={formAvatar}
                width={150}
              />
              <Button
                className="size-8"
                // onClick={() => removeImage()}
                size={"icon"}
                variant={"destructive"}
              >
                <XIcon />
              </Button>
            </div>
          ) : (
            <Skeleton className="size-50 rounded-full border" />
          )}
        </div>
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Jhon Doe"
                  required
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>
        <Field>
          <ButtonSpinner spin={isUpdating}>Update</ButtonSpinner>
        </Field>
      </FieldGroup>
    </form>
  );
};
