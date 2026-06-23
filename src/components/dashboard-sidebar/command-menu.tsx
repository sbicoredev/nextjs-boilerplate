"use client";

import { ArrowRightIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { SidebarMenuButton } from "~/components/ui/sidebar";
import { dashboardNav } from "~/configs/dashboard-config";
import { useThemeCustomizer } from "~/contexts/theme-customizer-context";

export const CommandMenu = () => {
  const { store } = useThemeCustomizer();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const setTheme = store.getState().setThemeMode;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback(
    (item: {
      title: string;
      url: string;
      disabled?: boolean;
      external?: boolean;
    }) => {
      console.log(item);
      if (item.disabled) {
        return;
      }
      setOpen(false);
      if (item.external) {
        window.open(item.url, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.url);
      }
    },
    [router, setOpen]
  );

  return (
    <>
      <SidebarMenuButton onClick={() => setOpen(true)}>
        <SearchIcon className="size-4" />
        <span>Search</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>k
        </kbd>
      </SidebarMenuButton>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {dashboardNav.map((group) => (
              <CommandGroup heading={group.label} key={group.label}>
                {group.items.map((item) =>
                  "url" in item ? (
                    <CommandItem
                      key={item.title}
                      onSelect={() => handleSelect(item)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </CommandItem>
                  ) : (
                    item.items.map((sub) => (
                      <CommandItem
                        key={`${item.title}-${sub.title}`}
                        onSelect={() => handleSelect(sub)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        <ArrowRightIcon />
                        <span>{sub.title}</span>
                      </CommandItem>
                    ))
                  )
                )}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => setTheme("light")}>
                <SunIcon />
                <span>Set Light Theme</span>
              </CommandItem>
              <CommandItem onSelect={() => setTheme("dark")}>
                <MoonIcon />
                <span>Set Dark Theme</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
