import { Geist, Montserrat } from "next/font/google";

import { getThemePreference } from "~/features/theme/utils";
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

export default async function SiteGroupLayout({
  children,
}: React.PropsWithChildren) {
  const preference = await getThemePreference();
  return (
    <html
      className={preference.themeMode === "light" ? "" : "dark"}
      lang="en"
      style={{
        // @ts-expect-error
        "--font-sans": "geist",
        "--font-heading": "montserrat",
      }}
    >
      <body className={cn(geist.variable, montserrat.variable)}>
        {children}
      </body>
    </html>
  );
}
