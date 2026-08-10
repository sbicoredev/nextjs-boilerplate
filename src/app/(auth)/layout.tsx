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

export default function AuthLayout({ children }: React.PropsWithChildren) {
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
          <div className="flex min-h-screen flex-col">
            <main className="grid grow">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
