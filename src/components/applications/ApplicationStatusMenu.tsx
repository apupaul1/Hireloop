"use client";

import { ChevronDownIcon } from "lucide-react";

import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ApplicationStatus } from "@/types";
import {
  APPLICATION_STATUS_OPTIONS,
  cn,
  getApplicationStatusMeta,
} from "@/utils";
import { useState } from "react";

type ApplicationStatusMenuProps = {
  subject: string;
  value: ApplicationStatus;
  onChange: (next: ApplicationStatus) => void;
};

export function ApplicationStatusMenu({
  subject,
  value,
  onChange,
}: ApplicationStatusMenuProps) {
  const current = getApplicationStatusMeta(value);
  const [open, setOpen] = useState(false);



  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        aria-label={`Change status for ${subject}, currently ${current.label}`}
        className="group inline-flex items-center gap-1.5 rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/50"
      >
        <ApplicationStatusBadge option={current} />
        <ChevronDownIcon
          aria-hidden
          className="size-3.5 text-white/30 transition-colors group-hover:text-white/70"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-56 border-none bg-[#17171c] p-1 text-white shadow-xl ring-white/10"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">
            Update status
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(next) => {
              onChange(next as ApplicationStatus)
              setOpen(false)
            }}
          >
            {APPLICATION_STATUS_OPTIONS.map((option) => (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className="gap-2.5 py-1.5 pr-8 pl-2 focus:bg-white/6 focus:text-white"
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    option.dotClassName,
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-medium text-white/90">
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-white/35">
                    {option.hint}
                  </span>
                </span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
