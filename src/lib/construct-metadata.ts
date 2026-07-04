import "server-only";

import type { Metadata } from "next";

import { siteConfig } from "~/configs/site-config";

export function constructMetadata({
  video,
  canonicalUrl,
  title = siteConfig.name,
  description = siteConfig.description,
  ...rest
}: { image?: string; video?: string; canonicalUrl?: string } & Metadata) {
  return {
    title: { default: title, template: `%s - ${title}` },
    description,
    authors: {
      name: siteConfig.author.name,
      url: siteConfig.author.github,
    },
    creator: siteConfig.author.name,
    icons: {
      icon: { url: "/favicon.ico", sizes: "any" },
      // shortcut: "/favicon-16x16.png",
      // apple: "/apple-touch-icon.png",
    },
    metadataBase: new URL(siteConfig.url),
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
      creator: siteConfig.author.x,
      card: "summary_large_image",
      images: [`${siteConfig.url}/opengraph-image.png`],
      ...(video && { player: video }),
      ...rest.twitter,
    },
    // manifest: `${siteConfig.url}/site.webmanifest`,
    alternates: {
      // types: {
      //   "application/rss+xml": `${siteConfig.url}/rss.xml`,
      // },
      canonical: canonicalUrl,
    },
    ...rest,
  } as Metadata;
}
