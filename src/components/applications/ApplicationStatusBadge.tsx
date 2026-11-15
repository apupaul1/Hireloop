import type { ApplicationStatusMeta } from "@/types";
import { cn } from "@/utils";

export function ApplicationStatusBadge({
  option,
}: {
  option: ApplicationStatusMeta;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium whitespace-nowrap",
        option.badgeClassName,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", option.dotClassName)}
      />
      {option.label}
    </span>
  );
}
