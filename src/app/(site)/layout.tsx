import { ThemeProvider } from "next-themes";

/**
 * No `cookies()`/`headers()`/session read here — see `src/app/layout.tsx`
 * for why that matters. Dark/light mode comes from `next-themes`
 * (`SiteThemeProvider`), which is client-only and doesn't block rendering.
 * `suppressHydrationWarning` is required on `<html>` because next-themes
 * sets the `dark` class before React hydrates.
 *
 * Fonts: `--font-geist`/`--font-montserrat` come from the global
 * `:root` block in `src/styles/fonts.css` (self-hosted via Fontsource) —
 * no next/font wrapper needed here, see that file's header comment.
 */
export default function SiteGroupLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      style={{
        // @ts-expect-error
        "--font-sans": "var(--font-geist)",
        "--font-heading": "var(--font-montserrat)",
      }}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
