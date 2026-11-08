"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

type ThemeToggleProps = {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg border border-black/10 text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-900 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white",
        className
      )}
    >
      <Sun className="col-start-1 row-start-1 size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="col-start-1 row-start-1 size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
