"use client"

import { Menu, X } from "lucide-react"

import { Logo } from "@/components/shared/Logo"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type NavLink = {
  label: string
  href: string
}

type MobileNavProps = {
  links: NavLink[]
}

export function MobileNav({ links }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation"
        className="grid size-9 shrink-0 place-items-center rounded-lg border border-black/10 text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-900 md:hidden dark:border-white/10 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <Menu aria-hidden className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="max-w-xs gap-0 border-black/10 bg-white p-0 dark:border-white/10 dark:bg-[#0c0c0d]"
      >
        <SheetClose
          aria-label="Close navigation"
          className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-lg text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <X aria-hidden className="size-4" />
        </SheetClose>

        <SheetHeader className="border-b border-black/10 p-4 dark:border-white/10">
          <Logo />
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <SheetDescription className="sr-only">
            Browse HireLoop pages and account actions.
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col gap-1 p-3">
          {links.map((link) => (
            <SheetClose
              key={link.label}
              render={<a href={link.href} />}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2 border-t border-black/10 p-4 dark:border-white/10">
          <SheetClose
            render={<a href="#" />}
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Sign In
          </SheetClose>
          <SheetClose
            render={<a href="#" />}
            className="rounded-lg bg-[#5b5bd6] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#4b4bc0]"
          >
            Get Started
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}
