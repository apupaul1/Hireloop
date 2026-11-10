import type { Job } from "@/lib/api/jobs";

const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "/ hr",
  "per month": "/ mo",
  "per year": "/ yr",
};

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatSalary(value: string) {
  if (!value || value.trim() === "") {
    return null;
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return null;
  }

  return `€${compactFormatter.format(amount)}`;
}

export function formatCompensation(job: Job) {
  const min = formatSalary(job.minSalary);
  const max = formatSalary(job.maxSalary);

  if (!min && !max) {
    return null;
  }

  const range =
    min && max ? (min === max ? min : `${min} – ${max}`) : (min ?? max);
  const suffix = FREQUENCY_SUFFIX[job.frequency];

  return suffix ? `${range} ${suffix}` : range;
}

/** Split a free-text field into clean bullet lines for display. */
export function toBulletList(value: string | undefined | null) {
  if (!value) {
    return [];
  }

  return value
    .split(/\r?\n|•/)
    .map((line) => line.replace(/^[\s\-–—*]+/, "").trim())
    .filter(Boolean);
}
