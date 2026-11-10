"use client";

import { useState, type ReactNode } from "react";
import { cn } from "cn";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Customer Support",
  "Operations",
  "People & HR",
  "Other",
] as const;

const WORK_MODES = [
  { label: "Remote", value: "remote" },
  { label: "On-site", value: "on-site" },
] as const;

export type FilterCounts = {
  jobTypes: Record<string, number>;
  categories: Record<string, number>;
  remote: number;
  onSite: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function FilterOption({
  id,
  value,
  label,
  count,
  checked,
}: {
  id: string;
  value: string;
  label: string;
  count: number;
  checked: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg py-1.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <RadioGroupItem value={value} id={id} />
        <Label
          htmlFor={id}
          className={cn(
            "cursor-pointer truncate text-[13px] font-normal transition-colors",
            checked
              ? "text-neutral-900 dark:text-white"
              : "text-neutral-500 hover:text-neutral-800 dark:text-white/55 dark:hover:text-white/80",
          )}
        >
          {label}
        </Label>
      </div>
      <span className="shrink-0 text-[11px] tabular-nums text-neutral-400 dark:text-white/30">
        {numberFormatter.format(count)}
      </span>
    </div>
  );
}

function FilterGroup({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="min-w-0 border-t border-black/6 pt-5 first:border-t-0 first:pt-0 dark:border-white/6">
      <legend
        id={`${id}-label`}
        className="text-[13px] font-semibold text-neutral-900 dark:text-white"
      >
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export default function JobFilters({ counts }: { counts: FilterCounts }) {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [workMode, setWorkMode] = useState("");

  return (
    <Card className="h-fit gap-0 rounded-xl border border-black/8 bg-white p-5 ring-0 dark:border-white/6 dark:bg-[#0e0e0e]">
      <h2 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
        Filters
      </h2>

      <div className="mt-5 space-y-5">
        <FilterGroup id="filter-job-type" title="Job Type">
          <RadioGroup
            aria-labelledby="filter-job-type-label"
            value={jobType}
            onValueChange={setJobType}
            className="mt-2 gap-0.5"
          >
            {JOB_TYPES.map((type) => (
              <FilterOption
                key={type}
                id={`job-type-${slugify(type)}`}
                value={type}
                label={type}
                count={counts.jobTypes[type] ?? 0}
                checked={jobType === type}
              />
            ))}
          </RadioGroup>
        </FilterGroup>

        <FilterGroup id="filter-category" title="Category">
          <RadioGroup
            aria-labelledby="filter-category-label"
            value={category}
            onValueChange={setCategory}
            className="mt-2 gap-0.5"
          >
            {JOB_CATEGORIES.map((item) => (
              <FilterOption
                key={item}
                id={`job-category-${slugify(item)}`}
                value={item}
                label={item}
                count={counts.categories[item] ?? 0}
                checked={category === item}
              />
            ))}
          </RadioGroup>
        </FilterGroup>

        <FilterGroup id="filter-work-mode" title="Work Mode">
          <RadioGroup
            aria-labelledby="filter-work-mode-label"
            value={workMode}
            onValueChange={setWorkMode}
            className="mt-2 gap-0.5"
          >
            {WORK_MODES.map((mode) => (
              <FilterOption
                key={mode.value}
                id={`job-work-mode-${mode.value}`}
                value={mode.value}
                label={mode.label}
                count={mode.value === "remote" ? counts.remote : counts.onSite}
                checked={workMode === mode.value}
              />
            ))}
          </RadioGroup>
        </FilterGroup>
      </div>
    </Card>
  );
}
