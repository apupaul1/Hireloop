import Link from "next/link";

import { Logo } from "@/components/shared/Logo";

const FOOTER_LINKS = [
  {
    title: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    title: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    title: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V21h3.4Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden
      className={className}
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M6.9 8.9H3.6V21h3.3V8.9ZM5.3 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM21 14.1c0-3.3-1.8-4.8-4.1-4.8-1.9 0-2.8 1-3.2 1.8V8.9H10.4V21h3.3v-6.6c0-1.7.7-2.6 2.1-2.6 1.2 0 1.9.8 1.9 2.6V21H21v-6.9Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon, gradient: false },
  { label: "Instagram", href: "#", Icon: InstagramIcon, gradient: true },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon, gradient: false },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-10 md:px-6 bg-black">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-10 border-t border-black/5 pt-12 md:flex-row md:justify-between md:gap-16 md:pt-14 dark:border-white/5">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[11px] leading-relaxed text-neutral-500 dark:text-white/35">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-14 lg:gap-20"
          >
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h3 className="text-[11px] font-medium text-[#5b5bd6] dark:text-[#8b8bf5]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-[11px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-white/40 dark:hover:text-white/80"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon, gradient }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className={
                    gradient
                      ? "flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#8b5cf6,#e02fae)] text-white transition-opacity hover:opacity-90"
                      : "flex size-8 items-center justify-center rounded-full bg-black/5 text-neutral-600 transition-colors hover:bg-black/10 dark:bg-[#141414] dark:text-white/80 dark:hover:bg-[#1e1e1e]"
                  }
                >
                  <Icon className="size-3.5" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-1 text-[10px] text-neutral-400 sm:items-end dark:text-white/30">
            <p>Copyright 2024 - Programming Hero</p>
            <p>Terms &amp; Policy · Privacy Guideline</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
