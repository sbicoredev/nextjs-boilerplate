"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {children}
      <Toaster closeButton duration={5000} position="top-center" richColors />
    </TooltipProvider>
  </QueryClientProvider>
);
