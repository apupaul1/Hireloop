import {
  BoxesIcon,
  BriefcaseIcon,
  CodeXmlIcon,
  HeadphonesIcon,
  LandmarkIcon,
  MapPinIcon,
  MegaphoneIcon,
  PaletteIcon,
  UsersIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";

import { JobRowActions } from "@/components/recruiter/JobRowActions";
import type { Job } from "@/lib/api/jobs";

type CategoryStyle = {
  label: string;
  icon: LucideIcon;
  tileClassName: string;
  labelClassName: string;
};

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "Engineering & Tech": {
    label: "Engineering",
    icon: CodeXmlIcon,
    tileClassName:
      "border-indigo-400/15 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 text-indigo-300",
    labelClassName: "text-indigo-300/80",
  },
  "Design & Creative": {
    label: "Design",
    icon: PaletteIcon,
    tileClassName:
      "border-orange-400/15 bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-orange-300",
    labelClassName: "text-orange-300/80",
  },
  "Marketing & Sales": {
    label: "Marketing",
    icon: MegaphoneIcon,
    tileClassName:
      "border-violet-400/15 bg-gradient-to-br from-violet-500/20 to-violet-500/5 text-violet-300",
    labelClassName: "text-violet-300/80",
  },
  "Finance & Accounting": {
    label: "Finance",
    icon: LandmarkIcon,
    tileClassName:
      "border-emerald-400/15 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-300",
    labelClassName: "text-emerald-300/80",
  },
  "Customer Support": {
    label: "Support",
    icon: HeadphonesIcon,
    tileClassName:
      "border-sky-400/15 bg-gradient-to-br from-sky-500/20 to-sky-500/5 text-sky-300",
    labelClassName: "text-sky-300/80",
  },
  Operations: {
    label: "Operations",
    icon: BoxesIcon,
    tileClassName:
      "border-cyan-400/15 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 text-cyan-300",
    labelClassName: "text-cyan-300/80",
  },
  "People & HR": {
    label: "People & HR",
    icon: UsersRoundIcon,
    tileClassName:
      "border-rose-400/15 bg-gradient-to-br from-rose-500/20 to-rose-500/5 text-rose-300",
    labelClassName: "text-rose-300/80",
  },
};

const DEFAULT_CATEGORY_STYLE: CategoryStyle = {
  label: "General",
  icon: BriefcaseIcon,
  tileClassName:
    "border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] text-white/55",
  labelClassName: "text-white/40",
};

const FREQUENCY_SUFFIX: Record<string, string> = {
  "per hour": "/ hr",
  "per month": "/ mo",
  "per year": "/ yr",
};

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function formatSalary(value: string) {
  const amount = Number(value);

  if (value.trim() === "" || !Number.isFinite(amount)) {
    return null;
  }

  return `€${numberFormatter.format(amount)}`;
}

function formatCompensation(job: Job) {
  const min = formatSalary(job.minSalary);
  const max = formatSalary(job.maxSalary);
  const suffix = FREQUENCY_SUFFIX[job.frequency] ?? job.frequency;

  let range: string | null = null;

  if (min && max) {
    range = min === max ? min : `${min} – ${max}`;
  } else {
    range = min ?? max;
  }

  if (!range) {
    return "—";
  }

  return suffix ? `${range} ${suffix}` : range;
}

function formatDeadline(deadline: string) {
  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function isExpired(deadline: string) {
  if (!deadline) {
    return false;
  }

  const end = deadline.slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  return end < today;
}

function formatPostedAgo(createdAt: string) {
  if (!createdAt) {
    return null;
  }

  const created = new Date(createdAt).getTime();

  if (Number.isNaN(created)) {
    return null;
  }

  const minutes = Math.max(0, Math.floor((Date.now() - created) / 60_000));

  if (minutes < 1) {
    return "Posted just now";
  }

  if (minutes < 60) {
    return `Posted ${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Posted ${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `Posted ${days}d ago`;
  }

  if (days < 30) {
    return `Posted ${Math.floor(days / 7)}w ago`;
  }

  if (days < 365) {
    return `Posted ${Math.floor(days / 30)}mo ago`;
  }

  return `Posted ${Math.floor(days / 365)}y ago`;
}

function StatusBadge({ job }: { job: Job }) {
  const status =
    job.status ?? (isExpired(job.deadline) ? "expired" : "active");
  const isActive = status === "active";
  const label =
    status === "active"
      ? "Active"
      : status === "draft"
        ? "Draft"
        : status === "paused"
          ? "Paused"
          : "Expired";

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium",
        isActive
          ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-300"
          : "border-white/8 bg-white/4 text-white/40",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          isActive
            ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
            : "bg-white/30",
        )}
      />
      {label}
    </span>
  );
}

function JobTitleCell({ job }: { job: Job }) {
  const style = CATEGORY_STYLES[job.category] ?? {
    ...DEFAULT_CATEGORY_STYLE,
    label: job.category || DEFAULT_CATEGORY_STYLE.label,
  };
  const Icon = style.icon;

  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-[10px] border",
          style.tileClassName,
        )}
      >
        <Icon aria-hidden className="size-4.5" strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] font-semibold text-white">
          {job.title}
        </span>
        <span
          className={cn(
            "mt-0.5 block truncate text-[11px] font-medium",
            style.labelClassName,
          )}
        >
          {style.label}
        </span>
      </span>
    </div>
  );
}

const headerCellClassName =
  "h-11 px-4 text-left text-[10px] font-semibold tracking-[0.12em] whitespace-nowrap text-white/30 uppercase";

const bodyCellClassName =
  "px-4 py-4 align-middle text-[12px] whitespace-nowrap";

export function JobPostsTable({ jobs }: { jobs: Job[] }) {
  return (
    <section
      aria-label="Job posts"
      className="overflow-hidden rounded-xl border border-white/8 bg-[#0B0B0E]"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-260 border-collapse">
          <thead>
            <tr className="border-b border-white/8 bg-white/1.5">
              <th className={cn(headerCellClassName, "w-[27%] pl-5")}>
                Job Title &amp; Dept
              </th>
              <th className={cn(headerCellClassName, "w-[21%]")}>
                Company &amp; Location
              </th>
              <th className={cn(headerCellClassName, "w-[10%]")}>Type</th>
              <th className={cn(headerCellClassName, "w-[13%]")}>
                Compensation
              </th>
              <th className={cn(headerCellClassName, "w-[12%]")}>
                Applicants
              </th>
              <th className={cn(headerCellClassName, "w-[9%]")}>Status</th>
              <th className={cn(headerCellClassName, "w-[12%]")}>Deadline</th>
              <th
                className={cn(headerCellClassName, "w-40 pr-5 text-right")}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/30">
                      <BriefcaseIcon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white/70">
                        No job posts yet
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        Publish your first role to start collecting applicants.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              jobs.map((job) => {
                const postedAgo = formatPostedAgo(job.createdAt);
                const location = job.isRemote
                  ? `Remote (${job.location})`
                  : job.location;

                return (
                  <tr
                    key={job._id}
                    className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/2"
                  >
                    <td className={cn(bodyCellClassName, "pl-2")}>
                      <JobTitleCell job={job} />
                    </td>

                    <td className={bodyCellClassName}>
                      <span className="block text-[12px] font-medium text-white/85">
                        {job.company}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] text-white/40">
                        <MapPinIcon
                          aria-hidden
                          className="size-3 shrink-0 text-white/30"
                        />
                        <span className="max-w-42.5 truncate">
                          {location || "Location not set"}
                        </span>
                      </span>
                    </td>

                    <td className={bodyCellClassName}>
                      <span className="inline-flex h-6 items-center rounded-full border border-white/8 bg-white/3 px-2.5 text-[11px] font-medium text-white/55">
                        {job.jobType}
                      </span>
                    </td>

                    <td
                      className={cn(
                        bodyCellClassName,
                        "font-medium text-white/70",
                      )}
                    >
                      {formatCompensation(job)}
                    </td>

                    <td className={bodyCellClassName}>
                      <span
                        className="inline-flex items-center gap-1.5 text-white/55"
                        title={
                          job.applicants == null
                            ? "Applicant tracking is not connected yet"
                            : undefined
                        }
                      >
                        <UsersIcon
                          aria-hidden
                          className="size-3.5 text-white/30"
                        />
                        {job.applicants == null
                          ? "—"
                          : `${job.applicants} ${
                              job.applicants === 1
                                ? "Candidate"
                                : "Candidates"
                            }`}
                      </span>
                    </td>

                    <td className={bodyCellClassName}>
                      <StatusBadge job={job} />
                    </td>

                    <td className={bodyCellClassName}>
                      <span className="block text-[12px] font-medium text-white/65">
                        {formatDeadline(job.deadline)}
                      </span>
                      {postedAgo ? (
                        <span className="mt-0.5 block text-[11px] text-white/30">
                          {postedAgo}
                        </span>
                      ) : null}
                    </td>

                    <td className={cn(bodyCellClassName, "pr-4")}>
                      <JobRowActions jobId={job._id} jobTitle={job.title} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
