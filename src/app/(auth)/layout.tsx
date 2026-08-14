import { ThemeProvider } from "next-themes";

/**
 * Fonts: `--font-geist`/`--font-montserrat` come from the global `:root`
 * block in `src/styles/fonts.css` (self-hosted via Fontsource) — no
 * next/font wrapper needed here, see that file's header comment.
 */
export default function AuthLayout({ children }: React.PropsWithChildren) {
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
          <div className="flex min-h-screen flex-col">
            <main className="grid grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
