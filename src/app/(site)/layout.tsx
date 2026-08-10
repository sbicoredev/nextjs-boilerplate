import { Geist, Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "~/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-geist",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-montserrat",
});

/**
 * No `cookies()`/`headers()`/session read here — see `src/app/layout.tsx`
 * for why that matters. Dark/light mode comes from `next-themes`
 * (`SiteThemeProvider`), which is client-only and doesn't block rendering.
 * `suppressHydrationWarning` is required on `<html>` because next-themes
 * sets the `dark` class before React hydrates.
 */
export default function SiteGroupLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      style={{
        // @ts-expect-error
        "--font-sans": "geist",
        "--font-heading": "montserrat",
      }}
      suppressHydrationWarning
    >
      <body className={cn(geist.variable, montserrat.variable)}>
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
