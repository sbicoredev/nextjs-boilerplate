import "server-only";

import type { Metadata } from "next";

import { siteConfig } from "~/configs/site-config";

type Props = {
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  canonicalUrl?: string;
} & Metadata;

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  video,
  canonicalUrl,
  ...rest
}: Props): Metadata {
  return {
    title: { default: title, template: `%s - ${title}` },
    description,
    keywords: ["Next.js", "React", "Shadcn", "Better Auth"],
    authors: {
      name: siteConfig.author.name,
      url: siteConfig.author.github,
    },
    creator: siteConfig.author.name,
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
        { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      ],
      apple: { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      // types: {
      //   "application/rss+xml": `${siteConfig.url}/rss.xml`,
      // },
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      title: title ?? undefined,
      description: description ?? undefined,
      siteName: siteConfig.name,
      url: siteConfig.url,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      ...(video && { videos: video }),
      ...rest.openGraph,
    },
    twitter: {
      title: title ?? undefined,
      description: description ?? undefined,
      site: `@${siteConfig.socialAccount.x}`,
      creator: siteConfig.author.x,
      card: "summary_large_image",
      images: [
        {
          url: `${siteConfig.url}/twitter-image.png`,
          width: 1200,
          height: 675,
          alt: siteConfig.name,
        },
      ],
      ...(video && { player: video }),
      ...rest.twitter,
    },
    ...rest,
  };
}
