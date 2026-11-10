"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
];

export default function SortJobsMenu() {
  const [sort, setSort] = useState("recent");

  const selected =
    SORT_OPTIONS.find((option) => option.value === sort) ?? SORT_OPTIONS[0];

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-neutral-500 dark:text-white/35">
        Sort by:
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 rounded-lg border-black/10 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-white/8 dark:bg-[#0e0e0e] dark:text-white/70 dark:hover:bg-white/6"
            />
          }
        >
          {selected.label}
          <ChevronDown className="size-3.5 text-neutral-400 dark:text-white/35" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            {SORT_OPTIONS.map((option) => (
              <DropdownMenuRadioItem
                key={option.value}
                value={option.value}
                className="text-[13px] focus:bg-black/5 dark:focus:bg-white/6 dark:focus:text-white"
              >
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
