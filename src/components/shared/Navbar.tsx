import { cn } from "@/lib/utils";

import { Logo } from "@/components/shared/Logo";
import { MobileNav } from "@/components/shared/MobileNav";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="px-3 pt-3 md:px-5 md:pt-5">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-xl border border-black/10 bg-white/80 px-4 py-3 backdrop-blur-md md:px-6 dark:border-white/10 dark:bg-[#222222]"
      >
        <Logo />

        <div className="hidden items-center gap-5 md:flex lg:gap-6">
          <ul className="flex items-center gap-5 text-sm text-neutral-500 lg:gap-6 dark:text-white">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-4 w-px bg-black/10 dark:bg-white/15" />
          <ThemeToggle />

          <Link
            href="/signin"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-white/60 dark:hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className={cn(
              "rounded-lg bg-[#5b5bd6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4b4bc0]",
            )}
          >
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav links={NAV_LINKS} />
        </div>
      </nav>
    </header>
  );
}
