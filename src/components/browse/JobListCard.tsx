import type { ReactNode } from "react";
import {
  BadgeDollarSign,
  Bookmark,
  BriefcaseBusiness,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Job } from "@/lib/api/jobs";
import { CATEGORY_ICONS } from "@/lib/job-icons";
import { formatCompensation } from "@/lib/job-format";
import Link from "next/link";

function MetaChip({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-black/2 px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 dark:border-white/8 dark:bg-white/3 dark:text-white/55">
      <Icon
        aria-hidden
        strokeWidth={1.8}
        className="size-3.5 shrink-0 text-neutral-400 dark:text-white/40"
      />
      {children}
    </span>
  );
}

export default function JobListCard({ job }: { job: Job }) {
  const Icon = CATEGORY_ICONS[job.category] ?? BriefcaseBusiness;
  const compensation = formatCompensation(job);

  return (
    <Link href={`/browse-jobs/${job._id}`}>
      <Card className="flex-row items-start gap-4 rounded-xl border border-black/8 bg-white p-4 ring-0 transition-colors hover:border-black/15 dark:border-white/6 dark:bg-[#0e0e0e] dark:hover:border-white/12">
        <span
          aria-hidden
          className="flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-black/8 bg-neutral-100 text-neutral-500 dark:border-white/8 dark:bg-white/8 dark:text-white/70"
        >
          <Icon strokeWidth={1.7} className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-white">
                {job.title}
              </h2>
              <p className="mt-1 truncate text-[11px] text-neutral-500 dark:text-white/40">
                {job.company}
                {job.location ? ` • ${job.location}` : ""}
                {job.isRemote ? " (Remote)" : ""}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Save ${job.title}`}
              className="shrink-0 text-neutral-400 hover:bg-black/5 hover:text-neutral-700 dark:text-white/35 dark:hover:bg-white/6 dark:hover:text-white"
            >
              <Bookmark aria-hidden strokeWidth={1.8} />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {compensation ? (
              <MetaChip icon={BadgeDollarSign}>{compensation}</MetaChip>
            ) : null}

            {job.jobType ? (
              <MetaChip icon={BriefcaseBusiness}>{job.jobType}</MetaChip>
            ) : null}

            <MetaChip icon={MonitorSmartphone}>
              {job.isRemote ? "Remote" : "On-site"}
            </MetaChip>
          </div>
        </div>
      </Card>
    </Link>
  );
}
