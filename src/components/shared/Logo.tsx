import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/images/logo.png"
        alt="HireLoop"
        width={154}
        height={44}
        preload
        className="h-6 w-auto md:h-7"
      />
    </Link>
  )
}
