"use client";

import { type ReactNode, useTransition } from "react";

import { setLocale } from "~/actions/locale";

import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export const LocaleSwitcherSelect = ({ children, defaultValue, label }: Props) => {
  const [isPending, startTransition] = useTransition();

  function onSelectChange(value: string) {
    startTransition(() => {
      setLocale(value);
    });
  }

  return (
    <Select
      value={defaultValue}
      disabled={isPending}
      onValueChange={(e) => onSelectChange(e as string)}
    >
      <SelectTrigger size="sm">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
};
