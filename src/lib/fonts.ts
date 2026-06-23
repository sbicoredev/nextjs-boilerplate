import "server-only";

import {
  DM_Sans,
  Fraunces,
  Geist,
  Geist_Mono,
  Inter,
  Montserrat,
  Noto_Sans,
  Noto_Serif,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
  Raleway,
  Roboto,
  Roboto_Mono,
  Space_Grotesk,
} from "next/font/google";

// const ibmPlexMono = IBM_Plex_Mono({
//   subsets: ["latin"],
//   weight: ["300", "400", "700"],
//   variable: "--font-ibmPlexMono",
// });

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-fraunces",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-montserrat",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-noto-serif",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-noto-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-playfair-display",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-poppins",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-raleway",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-roboto-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-space-grotesk",
});

export const fontRegistry = {
  dmSans: {
    label: "DM Sans",
    font: dmSans,
  },
  geist: {
    label: "Geist",
    font: geist,
  },
  geistMono: {
    label: "Geist Mono",
    font: geistMono,
  },
  fraunces: {
    label: "Fraunces",
    font: fraunces,
  },
  inter: {
    label: "Inter",
    font: inter,
  },
  montserrat: {
    label: "Montserrat",
    font: montserrat,
  },
  notoSans: {
    label: "Noto Sans",
    font: notoSans,
  },
  notoSerif: {
    label: "Noto Serif",
    font: notoSerif,
  },
  plusJakartaSans: {
    label: "Plus Jakarta Sans",
    font: plusJakartaSans,
  },
  playfairDisplay: {
    label: "Playfair Display",
    font: playfairDisplay,
  },
  poppins: {
    label: "Poppins",
    font: poppins,
  },
  roboto: {
    label: "Roboto",
    font: roboto,
  },
  robotoMono: {
    label: "Roboto Mono",
    font: robotoMono,
  },
  raleway: {
    label: "Raleway",
    font: raleway,
  },
  spaceGrotesk: {
    label: "Space Grotesk",
    font: spaceGrotesk,
  },
} as const;

export const fontVars = Object.values(fontRegistry)
  .map((f) => f.font.variable)
  .join(" ");
