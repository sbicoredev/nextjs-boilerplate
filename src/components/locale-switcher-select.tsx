"use client";

import { type ChangeEvent, type ReactNode, useTransition } from "react";

import { setLocale } from "~/actions/locale";
import { cn } from "~/lib/utils";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export const LocaleSwitcherSelect = ({ children, defaultValue, label }: Props) => {
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as string;
    startTransition(() => {
      setLocale(nextLocale);
    });
  }

  return (
    <label
      className={cn(
        "relative text-gray-400",
        isPending && "transition-opacity disabled:opacity-30",
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pr-6 pl-2"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute top-2 right-2">⌄</span>
    </label>
  );
};
