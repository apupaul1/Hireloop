import type { LucideIcon } from "lucide-react"

type StatCardProps = {
  icon: LucideIcon
  value: string
  label: string
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex min-h-44 flex-col justify-between rounded-2xl border border-black/10 bg-white/90 p-5 backdrop-blur-sm md:min-h-52 md:p-6 dark:border-white/10 dark:bg-[#0b0b0b]/90">
      <Icon
        aria-hidden
        strokeWidth={1.6}
        className="size-5 text-neutral-700 md:size-6 dark:text-white/75"
      />
      <div>
        <p className="text-4xl font-semibold tracking-tight md:text-5xl">
          {value}
        </p>
        <p className="mt-2 text-xs text-neutral-500 md:text-sm dark:text-white/50">
          {label}
        </p>
      </div>
    </div>
  )
}
