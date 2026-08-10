import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const { dirname } = import.meta;

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mirrors tsconfig.json's "paths" exactly — vitest doesn't read
    // tsconfig path mappings on its own, so these can silently drift
    // apart. More specific aliases must come before the `~/*` catch-all
    // (Vite/Vitest picks the first match).
    alias: {
      "~/components": path.resolve(dirname, "./src/shared/components"),
      "~/constants": path.resolve(dirname, "./src/shared/constants"),
      "~/contexts": path.resolve(dirname, "./src/shared/contexts"),
      "~/env": path.resolve(dirname, "./src/shared/env"),
      "~/hooks": path.resolve(dirname, "./src/shared/hooks"),
      "~/lib": path.resolve(dirname, "./src/shared/lib"),
      "~/stores": path.resolve(dirname, "./src/shared/stores"),
      "~": path.resolve(dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // e2e/**/*.spec.ts are Playwright tests (run via `pnpm test:e2e`, a
    // separate runner) — without this, vitest's default test-file glob
    // (**/*.spec.ts) picks them up too and fails importing "@playwright/test".
    exclude: ["**/node_modules/**", "**/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/shared/components/ui/**",
        "src/shared/env/**",
        "src/proxy.ts",
      ],
    },
  },
});
