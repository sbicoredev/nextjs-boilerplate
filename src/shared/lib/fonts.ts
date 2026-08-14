/**
 * Font registry — labels + the CSS custom property each font is exposed
 * under. The actual @font-face declarations and --font-* variable
 * definitions live in `src/styles/fonts.css` (self-hosted via Fontsource,
 * see that file's header comment for why).
 *
 * This file used to wrap next/font/google and export each font's
 * generated `.variable` className. That's gone: with self-hosted fonts,
 * `--font-x` is a plain global CSS variable (see fonts.css's `:root`
 * block) rather than something scoped to a next/font-generated className,
 * so there's no per-font className to collect anymore.
 */

export const fontRegistry = {
  dmSans: { label: "DM Sans", cssVar: "--font-dm-sans" },
  geist: { label: "Geist", cssVar: "--font-geist" },
  geistMono: { label: "Geist Mono", cssVar: "--font-geist-mono" },
  montserrat: { label: "Montserrat", cssVar: "--font-montserrat" },
  notoSans: { label: "Noto Sans", cssVar: "--font-noto-sans" },
  notoSerif: { label: "Noto Serif", cssVar: "--font-noto-serif" },
  poppins: { label: "Poppins", cssVar: "--font-poppins" },
  roboto: { label: "Roboto", cssVar: "--font-roboto" },
  robotoMono: { label: "Roboto Mono", cssVar: "--font-roboto-mono" },
} as const;
