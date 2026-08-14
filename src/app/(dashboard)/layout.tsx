import { ThemeCustomizerContext } from "~/contexts/theme-context";
import { getThemePreference } from "~/features/theme";
import { fontRegistry } from "~/lib/fonts";

export default async function DashboardGroupLayout({
  children,
}: React.PropsWithChildren) {
  const preference = await getThemePreference();
  const allowedFonts = Object.entries(fontRegistry).map(([key, f]) => ({
    value: key as keyof typeof fontRegistry,
    label: f.label,
  }));

  return (
    <html
      className={preference.themeMode === "light" ? "" : "dark"}
      data-theme-preset={preference.themePreset}
      dir={preference.pageDirection}
      lang="en"
      style={{
        // @ts-expect-error
        "--font-sans": `var(${fontRegistry[preference.fontPrimary].cssVar})`,
        "--font-heading": `var(${fontRegistry[preference.fontHeading].cssVar})`,
      }}
    >
      <body>
        <ThemeCustomizerContext
          allowedFonts={allowedFonts}
          themeStoreState={preference}
        >
          {children}
        </ThemeCustomizerContext>
      </body>
    </html>
  );
}
