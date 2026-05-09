"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    disableTransitionOnChange
    enableSystem
  >
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster closeButton duration={5000} position="top-center" richColors />
    </QueryClientProvider>
  </ThemeProvider>
);
