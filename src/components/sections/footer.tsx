import Image from "next/image";
import Link from "next/link";

import { Logo } from "~/components/logo";
import { siteConfig } from "~/configs/site-config";

import { Container } from "../container";

const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

export const Footer = () => (
  <footer className="mt-auto py-8 md:py-10">
    <Container>
      <Link aria-label="go home" className="mx-auto block size-fit" href="/">
        <Logo />
      </Link>

      <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
        {links.map((link) => (
          <Link
            className="block text-muted-foreground duration-150 hover:text-primary"
            href={link.href}
            key={link.title}
          >
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
      <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
        <Link
          aria-label="Github"
          className="block text-muted-foreground hover:text-primary"
          href={siteConfig.author.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="github logo"
            className="size-6 dark:invert"
            height={40}
            src="/assets/github-icon.svg"
            width={40}
          />
        </Link>
        <Link
          aria-label="X/Twitter"
          className="block text-muted-foreground hover:text-primary"
          href={siteConfig.author.x}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            className="size-6"
            height="1em"
            viewBox="0 0 24 24"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <Link
          aria-label="Gmail"
          className="block text-muted-foreground hover:text-primary"
          href={`mailto:${siteConfig.author.gmail}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="gmail logo"
            className="size-6"
            height={40}
            src="/assets/gmail-icon.svg"
            width={40}
          />
        </Link>
        <Link
          aria-label="LinkedIn"
          className="block text-muted-foreground hover:text-primary"
          href={siteConfig.author.linkedin}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="linkedin logo"
            className="size-6"
            height={40}
            src="/assets/linkedin-icon.svg"
            width={40}
          />
        </Link>
      </div>
      <p className="text-center text-muted-foreground text-sm">
        Copyright © {siteConfig.copywriteYears}{" "}
        <Link href={siteConfig.author.github}>{siteConfig.author.name}</Link> •
        All right reserved
      </p>
    </Container>
  </footer>
);
