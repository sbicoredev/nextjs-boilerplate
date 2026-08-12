import { clientEnv } from "~/env/client";

const currentYear = new Date().getFullYear().toString();
const websiteLaunchYear = "2026";

export const siteConfig = {
  name: clientEnv.NEXT_PUBLIC_APP_NAME,
  url: clientEnv.NEXT_PUBLIC_APP_URL,
  locale: "en-US",
  language: "en-us",
  description: "A simple Next.js boilerplate",
  copywriteYears:
    currentYear === websiteLaunchYear
      ? currentYear
      : `${websiteLaunchYear}-${currentYear}`,
  author: {
    name: "Sajid",
    github: "https://github.com/sbicoredev",
    gmail: "sbicoredev@gmail.com",
    linkedin: "https://linkedin.com/in/sbicoredev",
    x: "https://x.com/sbicoredev",
  },
  socialAccount: {
    linkedin: "your-website-linkedin-username",
    x: "your-website-x-username",
  },
  githubRepo: "https://github.com/sbicoredev/nextjs-boilerplate",
} as const;
