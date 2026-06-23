"use client";

import { LayoutIcon, PaletteIcon, SunMoonIcon, TypeIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Switch } from "~/components/ui/switch";
import {
  DEFAULT_THEME_PREFERENCE,
  SIDEBAR_COLLAPSIBLE,
  SIDEBAR_SIDE,
  SIDEBAR_VARIANT,
  THEME_PRESETS,
} from "~/constants/theme-customizer";
import {
  useThemeCustomizer,
  useThemeCustomizerStore,
} from "~/contexts/theme-customizer-context";
import { toTitleCase } from "~/lib/helpers";
import { cn } from "~/lib/utils";

type Props = {
  open: boolean;
  onOpenChange(v: boolean): void;
};

export function Customizer({ open, onOpenChange }: Props) {
  const { allowedFonts } = useThemeCustomizer();
  const {
    themeMode,
    themePreset,
    fontPrimary,
    fontHeading,
    sidebarSide,
    sidebarVariant,
    sidebarCollapsible,
    setThemeMode,
    setThemePreset,
    setFontPrimary,
    setFontHeading,
    setSidebarSide,
    setSidebarVariant,
    setSidebarCollapsible,
    reset,
  } = useThemeCustomizerStore();

  // --- Apply `dark` class to <html> ---
  useEffect(() => {
    if (themeMode !== "system") {
      setThemeMode(themeMode);
      const root = document.documentElement;
      root.classList.toggle("dark", themeMode === "dark");
      root.style.colorScheme = themeMode === "dark" ? "dark" : "light";
      return;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const isDark = e.matches;
      setThemeMode(isDark ? "dark" : "light");
      const root = document.documentElement;
      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
    };
    mq.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
    };
  }, [themeMode]);

  const fontItems = useMemo(
    () =>
      allowedFonts.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    []
  );

  const handlePresetChange = (value: ThemePreset) => {
    document.documentElement.setAttribute("data-theme-preset", value);
    setThemePreset(value);
  };

  const onFontPrimaryChange = (value: FontKey) => {
    document.documentElement.style.setProperty("--font-primary", value);
    setFontPrimary(value);
  };

  const onFontHeadingChange = (value: FontKey) => {
    document.documentElement.style.setProperty("--font-heading", value);
    setFontHeading(value);
  };

  const handleResetDefault = () => {
    const root = document.documentElement;
    root.setAttribute(
      "data-theme-preset",
      DEFAULT_THEME_PREFERENCE.themePreset
    );
    root.style.setProperty(
      "--font-primary",
      DEFAULT_THEME_PREFERENCE.fontPrimary
    );
    root.style.setProperty(
      "--font-heading",
      DEFAULT_THEME_PREFERENCE.fontHeading
    );
    reset();
  };

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetContent className="overflow-y-auto sm:max-w-md!">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <PaletteIcon className="size-5" />
            Customize Dashboard
          </SheetTitle>
          <SheetDescription>
            Personalize appearance, layout, typography and brand colors.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full space-y-6 p-4">
          <Button
            className="w-full uppercase"
            onClick={handleResetDefault}
            type="button"
            variant="outline"
          >
            Reset Default
          </Button>
          {/* -------- Appearance -------- */}

          <Section icon={<SunMoonIcon className="size-4" />} title="Appearance">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-mode">Theme mode</Label>
              <Select
                onValueChange={(v) => setThemeMode(v as ThemeMode)}
                value={themeMode}
              >
                <SelectTrigger className="w-35" id="theme-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {(["light", "dark", "system"] satisfies ThemeMode[]).map(
                    (v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="quick-dark">Quick dark toggle</Label>
              <Switch
                checked={themeMode === "dark"}
                id="quick-dark"
                onCheckedChange={(c) => setThemeMode(c ? "dark" : "light")}
              />
            </div>
          </Section>

          {/* -------- Typography -------- */}
          <Section icon={<TypeIcon className="size-4" />} title="Typography">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="font-primary">Primary Fonts</Label>
              <Select
                items={fontItems}
                onValueChange={(v) => onFontPrimaryChange(v as FontKey)}
                value={fontPrimary}
              >
                <SelectTrigger
                  className="w-35 text-xs"
                  id="font-primary"
                  size="sm"
                >
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {allowedFonts.map((font) => (
                      <SelectItem
                        className="text-xs"
                        key={font.value}
                        value={font.value}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="font-heading">Heading Fonts</Label>
              <Select
                items={fontItems}
                onValueChange={(v) => onFontHeadingChange(v as FontKey)}
                value={fontHeading}
              >
                <SelectTrigger
                  className="w-35 text-xs"
                  id="font-heading"
                  size="sm"
                >
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {allowedFonts.map((font) => (
                      <SelectItem
                        className="text-xs"
                        key={font.value}
                        value={font.value}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </Section>

          {/* -------- Theme Color -------- */}
          <Section
            icon={<PaletteIcon className="size-4" />}
            title="Theme Color"
          >
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-preset">Theme Presets</Label>
              <Select
                items={THEME_PRESETS.map((v) => ({
                  label: toTitleCase(v),
                  value: v,
                }))}
                onValueChange={(v) => handlePresetChange(v as ThemePreset)}
                value={themePreset}
              >
                <SelectTrigger className="w-35" id="theme-preset">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {THEME_PRESETS.map((v) => (
                    <SelectItem key={v} value={v}>
                      {toTitleCase(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Section>

          {/* -------- Sidebar Layout -------- */}
          <Section
            icon={<LayoutIcon className="size-4" />}
            title="Sidebar Layout"
          >
            {/* sidebar position */}
            <div className="flex items-center justify-between">
              <Label htmlFor="sidebar-position">Sidebar Position</Label>
              <Select
                items={SIDEBAR_SIDE.map((v) => ({
                  label: toTitleCase(v),
                  value: v,
                }))}
                onValueChange={(v) => setSidebarSide(v as SidebarSide)}
                value={sidebarSide}
              >
                <SelectTrigger className="w-35" id="sidebar-position">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {SIDEBAR_SIDE.map((v) => (
                    <SelectItem key={v} value={v}>
                      {toTitleCase(v)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator />

            {/* sidebar variant */}
            <div className="space-y-3">
              <div>
                <Label>Sidebar Variant</Label>
                <p className="mt-1 text-muted-foreground text-xs">
                  {sidebarVariant === "sidebar" &&
                    "Default: Standard sidebar layout"}
                  {sidebarVariant === "floating" &&
                    "Floating: Floating sidebar with border"}
                  {sidebarVariant === "inset" &&
                    "Inset: Inset sidebar with rounded corners"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {SIDEBAR_VARIANT.map((v) => (
                  <button
                    className={cn(
                      "relative rounded-md border p-2 transition-colors",
                      sidebarVariant === v
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/60"
                    )}
                    key={v}
                    onClick={() => setSidebarVariant(v)}
                    type="button"
                  >
                    {/* Visual representation of sidebar variant */}
                    <div className="space-y-2">
                      <div
                        className={cn(
                          "flex h-16 rounded border",
                          v === "inset" ? "bg-muted" : "bg-background"
                        )}
                      >
                        {/* Sidebar representation - smaller and more proportional */}
                        <div
                          className={cn(
                            "flex w-6 shrink-0 flex-col gap-0.5 bg-muted p-1",
                            v === "floating"
                              ? "m-1 rounded border-r"
                              : v === "inset"
                                ? "m-1 ms-0 rounded bg-muted/80"
                                : "border-r"
                          )}
                        >
                          {/* Menu icon representations - clearer and more visible */}
                          <div className="h-0.5 w-full rounded bg-foreground/60" />
                          <div className="h-0.5 w-3/4 rounded bg-foreground/50" />
                          <div className="h-0.5 w-2/3 rounded bg-foreground/40" />
                          <div className="h-0.5 w-3/4 rounded bg-foreground/30" />
                        </div>
                        {/* Main content area - larger and more prominent */}
                        <div
                          className={cn(
                            "m-1 flex-1 rounded-sm border border-muted-foreground/20 border-dashed",
                            v === "inset"
                              ? "ms-0 bg-background"
                              : "bg-background/50"
                          )}
                        />
                      </div>
                      <div className="text-center">{v}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <Separator />

            {/* sidebar collapsible mode */}
            <div className="space-y-3">
              <div>
                <Label>Sidebar Collapsible Mode</Label>
                <p className="mt-1 text-muted-foreground text-xs">
                  {sidebarCollapsible === "offcanvas" &&
                    "Off Canvas: Slides out of view"}
                  {sidebarCollapsible === "icon" &&
                    "Icon: Collapses to icon only"}
                  {sidebarCollapsible === "none" && "None: Always visible"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {SIDEBAR_COLLAPSIBLE.map((v) => (
                  <button
                    className={cn(
                      "relative rounded-md border p-2 transition-colors",
                      sidebarCollapsible === v
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-border/60"
                    )}
                    key={v}
                    onClick={() => setSidebarCollapsible(v)}
                    type="button"
                  >
                    {/* Visual representation of collapsible mode */}
                    <div className="space-y-2">
                      <div className="flex h-16 rounded border bg-background">
                        {/* Sidebar representation based on collapsible mode */}
                        {v === "offcanvas" ? (
                          // Off-canvas: Show collapsed state with hamburger menu
                          <div className="m-1 flex flex-1 items-center justify-start rounded-sm border border-muted-foreground/20 border-dashed bg-background/50 pl-2">
                            <div className="flex flex-col gap-0.5">
                              <div className="h-0.5 w-3 rounded bg-foreground/60" />
                              <div className="h-0.5 w-3 rounded bg-foreground/60" />
                              <div className="h-0.5 w-3 rounded bg-foreground/60" />
                            </div>
                          </div>
                        ) : v === "icon" ? (
                          // Icon mode: Show thin icon sidebar with clear icons
                          <>
                            <div className="flex w-4 shrink-0 flex-col items-center gap-1 border-r bg-muted p-1">
                              <div className="h-2 w-2 rounded-sm bg-foreground/60" />
                              <div className="h-2 w-2 rounded-sm bg-foreground/40" />
                              <div className="h-2 w-2 rounded-sm bg-foreground/30" />
                            </div>
                            <div className="m-1 flex-1 rounded-sm border border-muted-foreground/20 border-dashed bg-background/50" />
                          </>
                        ) : (
                          // None: Always show full sidebar - more proportional
                          <>
                            <div className="flex w-6 shrink-0 flex-col gap-0.5 border-r bg-muted p-1">
                              <div className="h-0.5 w-full rounded bg-foreground/60" />
                              <div className="h-0.5 w-3/4 rounded bg-foreground/50" />
                              <div className="h-0.5 w-2/3 rounded bg-foreground/40" />
                              <div className="h-0.5 w-3/4 rounded bg-foreground/30" />
                            </div>
                            <div className="m-1 flex-1 rounded-sm border border-muted-foreground/20 border-dashed bg-background/50" />
                          </>
                        )}
                      </div>
                      <div className="text-center">{v}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 font-medium">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">{children}</CardContent>
    </Card>
  );
}
