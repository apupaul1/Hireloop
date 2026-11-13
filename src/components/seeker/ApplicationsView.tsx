"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudIcon,
  CodeXmlIcon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  InboxIcon,
  PenToolIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";

import type { IApplications } from "@/lib/api/applications";

const PAGE_SIZE = 5;
const ARCHIVED_STATUSES = new Set(["archived", "withdrawn"]);

type Tab = "active" | "archived";

type StatusStyle = {
  label: string;
  badgeClassName: string;
};

const STATUS_STYLES: Record<string, StatusStyle> = {
  applied: {
    label: "Applied",
    badgeClassName: "border-white/10 bg-white/8 text-white/60",
  },
  pending: {
    label: "Pending",
    badgeClassName: "border-white/10 bg-white/8 text-white/60",
  },
  review: {
    label: "Review",
    badgeClassName: "border-amber-400/25 bg-amber-400/15 text-amber-300",
  },
  "under review": {
    label: "Review",
    badgeClassName: "border-amber-400/25 bg-amber-400/15 text-amber-300",
  },
  shortlisted: {
    label: "Shortlisted",
    badgeClassName: "border-blue-400/25 bg-blue-400/15 text-blue-300",
  },
  interview: {
    label: "Interview",
    badgeClassName: "border-violet-400/25 bg-violet-400/15 text-violet-300",
  },
  interviewing: {
    label: "Interview",
    badgeClassName: "border-violet-400/25 bg-violet-400/15 text-violet-300",
  },
  "interview scheduled": {
    label: "Interview",
    badgeClassName: "border-violet-400/25 bg-violet-400/15 text-violet-300",
  },
  offered: {
    label: "Offered",
    badgeClassName: "border-emerald-400/25 bg-emerald-400/15 text-emerald-300",
  },
  accepted: {
    label: "Accepted",
    badgeClassName: "border-emerald-400/25 bg-emerald-400/15 text-emerald-300",
  },
  hired: {
    label: "Hired",
    badgeClassName: "border-emerald-400/25 bg-emerald-400/15 text-emerald-300",
  },
  rejected: {
    label: "Rejected",
    badgeClassName: "border-red-400/25 bg-red-400/12 text-red-300",
  },
  declined: {
    label: "Declined",
    badgeClassName: "border-red-400/25 bg-red-400/12 text-red-300",
  },
  withdrawn: {
    label: "Withdrawn",
    badgeClassName: "border-white/10 bg-white/6 text-white/45",
  },
  archived: {
    label: "Archived",
    badgeClassName: "border-white/10 bg-white/6 text-white/45",
  },
};

type JobVisual = {
  icon: LucideIcon;
  tileClassName: string;
};

const NEUTRAL_VISUAL: JobVisual = {
  icon: BriefcaseIcon,
  tileClassName: "border-white/10 bg-white/8 text-white/60",
};

const JOB_VISUALS: { pattern: RegExp; visual: JobVisual }[] = [
  {
    pattern: /(cloud|devops|architect|infrastructure|platform)/i,
    visual: {
      icon: CloudIcon,
      tileClassName:
        "border-red-400/20 bg-gradient-to-br from-red-500/25 to-red-500/5 text-red-300",
    },
  },
  {
    pattern: /(design|ux|ui\b)/i,
    visual: {
      icon: PenToolIcon,
      tileClassName:
        "border-orange-400/15 bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-orange-300",
    },
  },
  {
    pattern: /(data|analytic|scientist)/i,
    visual: {
      icon: DatabaseIcon,
      tileClassName:
        "border-sky-400/15 bg-gradient-to-br from-sky-500/20 to-sky-500/5 text-sky-300",
    },
  },
  {
    pattern: /(\bai\b|machine learning|\bml\b|research)/i,
    visual: {
      icon: CpuIcon,
      tileClassName:
        "border-violet-400/15 bg-gradient-to-br from-violet-500/20 to-violet-500/5 text-violet-300",
    },
  },
  {
    pattern: /(engineer|develop|frontend|backend|full.?stack|software)/i,
    visual: {
      icon: CodeXmlIcon,
      tileClassName:
        "border-indigo-400/15 bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 text-indigo-300",
    },
  },
];

function getJobVisual(title: string): JobVisual {
  return (
    JOB_VISUALS.find(({ pattern }) => pattern.test(title))?.visual ??
    NEUTRAL_VISUAL
  );
}

function getStatusStyle(status: string): StatusStyle {
  const key = status.trim().toLowerCase();
  const style = STATUS_STYLES[key];

  if (style) {
    return style;
  }

  return {
    label: key ? key.charAt(0).toUpperCase() + key.slice(1) : "Applied",
    badgeClassName: "border-white/10 bg-white/8 text-white/60",
  };
}

function pluralize(count: number, singular: string) {
  return `${count} ${singular}${count === 1 ? "" : "s"} ago`;
}

function formatAppliedAt(value: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  const minutes = Math.floor(
    Math.max(0, Date.now() - date.getTime()) / 60_000,
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return pluralize(minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return pluralize(hours, "hour");
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return pluralize(days, "day");
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return pluralize(weeks, "week");
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return pluralize(months, "month");
  }

  return pluralize(Math.floor(days / 365), "year");
}

function formatWorkplace(application: IApplications) {
  const arrangement = application.isRemote
    ? "Remote"
    : application.location || "On-site";

  return application.jobType
    ? `${application.jobType} • ${arrangement}`
    : arrangement;
}

function isInterviewing(status: string) {
  return status.toLowerCase().includes("interview");
}

function getPageItems(current: number, total: number) {
  const items: (number | "ellipsis")[] = [];

  for (let page = 1; page <= total; page += 1) {
    const isEdge = page === 1 || page === total;
    const isNearCurrent = Math.abs(page - current) <= 1;

    if (isEdge || isNearCurrent) {
      items.push(page);
    } else if (items[items.length - 1] !== "ellipsis") {
      items.push("ellipsis");
    }
  }

  return items;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ApplicationsViewProps = {
  applications: IApplications[];
};

export function ApplicationsView({ applications }: ApplicationsViewProps) {
  const [tab, setTab] = useState<Tab>("active");
  const [page, setPage] = useState(1);

  const sortedApplications = useMemo(
    () =>
      [...applications].sort((a, b) => {
        const first = new Date(a.appliedAt).getTime() || 0;
        const second = new Date(b.appliedAt).getTime() || 0;

        return second - first;
      }),
    [applications],
  );

  const stats = useMemo(() => {
    const total = sortedApplications.length;
    const shortlisted = sortedApplications.filter(
      (application) => application.status?.toLowerCase() === "shortlisted",
    ).length;
    const interviews = sortedApplications.filter((application) =>
      isInterviewing(application.status ?? ""),
    ).length;
    const offers = sortedApplications.filter((application) =>
      ["offered", "accepted", "hired"].includes(
        application.status?.toLowerCase() ?? "",
      ),
    ).length;
    const successRate = total > 0 ? Math.floor((offers / total) * 100) : 0;

    return { total, shortlisted, interviews, successRate };
  }, [sortedApplications]);

  const filteredApplications = useMemo(() => {
    if (tab === "archived") {
      return sortedApplications.filter((application) =>
        ARCHIVED_STATUSES.has(application.status?.toLowerCase() ?? ""),
      );
    }

    return sortedApplications.filter(
      (application) =>
        !ARCHIVED_STATUSES.has(application.status?.toLowerCase() ?? ""),
    );
  }, [sortedApplications, tab]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const visibleApplications = filteredApplications.slice(
    pageStart,
    pageStart + PAGE_SIZE,
  );
  const firstVisible = filteredApplications.length === 0 ? 0 : pageStart + 1;
  const lastVisible = pageStart + visibleApplications.length;

  const statCards: {
    label: string;
    value: string;
    accent?: boolean;
    hint?: string;
  }[] = [
    { label: "Total Applied", value: String(stats.total) },
    { label: "Shortlisted", value: String(stats.shortlisted) },
    { label: "Interviews", value: String(stats.interviews) },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      accent: true,
      hint: "Offers received as a share of total applications",
    },
  ];

  const handleTabChange = (nextTab: Tab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleExport = () => {
    const printWindow = window.open("", "_blank", "width=960,height=720");

    if (!printWindow) {
      return;
    }

    const rows = sortedApplications
      .map(
        (application) => `
          <tr>
            <td>
              <strong>${escapeHtml(application.jobTitle)}</strong>
              <span>${escapeHtml(formatWorkplace(application))}</span>
            </td>
            <td>${escapeHtml(application.companyName)}</td>
            <td>${escapeHtml(formatAppliedAt(application.appliedAt))}</td>
            <td>${escapeHtml(getStatusStyle(application.status ?? "").label)}</td>
          </tr>`,
      )
      .join("");

    printWindow.document.write(`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>My Applications</title>
          <style>
            * { box-sizing: border-box; }
            body { margin: 40px; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif; color: #18181b; }
            h1 { margin: 0; font-size: 24px; }
            p.subtitle { margin: 6px 0 24px; color: #71717a; font-size: 13px; }
            .stats { display: flex; gap: 12px; margin-bottom: 24px; }
            .stat { flex: 1; border: 1px solid #e4e4e7; border-radius: 10px; padding: 12px 16px; }
            .stat span { display: block; font-size: 12px; color: #71717a; }
            .stat strong { display: block; margin-top: 6px; font-size: 22px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e4e4e7; color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }
            td { padding: 12px; border-bottom: 1px solid #f0f0f2; vertical-align: middle; }
            td span { display: block; margin-top: 3px; color: #71717a; font-size: 11px; }
          </style>
        </head>
        <body>
          <h1>My Applications</h1>
          <p class="subtitle">Track your job applications and interview progress in real-time.</p>
          <div class="stats">
            ${statCards
              .map(
                (stat) =>
                  `<div class="stat"><span>${stat.label}</span><strong>${stat.value}</strong></div>`,
              )
              .join("")}
          </div>
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </body>
      </html>`);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[26px] leading-tight font-semibold tracking-[-0.02em] text-white sm:text-[28px]">
            My Applications
          </h1>
          <p className="mt-1.5 text-[13px] text-white/45">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Application filters"
            className="inline-flex items-center gap-1 rounded-lg border border-white/8 bg-white/3 p-1"
          >
            <button
              type="button"
              aria-pressed={tab === "active"}
              onClick={() => handleTabChange("active")}
              className={cn(
                "h-8 rounded-md px-3.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                tab === "active"
                  ? "bg-white/8 text-white shadow-sm"
                  : "text-white/45 hover:text-white/75",
              )}
            >
              Active
            </button>
            <button
              type="button"
              aria-pressed={tab === "archived"}
              onClick={() => handleTabChange("archived")}
              className={cn(
                "h-8 rounded-md px-3.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                tab === "archived"
                  ? "bg-white/8 text-white shadow-sm"
                  : "text-white/45 hover:text-white/75",
              )}
            >
              Archived
            </button>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-[13px] font-semibold text-[#0B0B0E] transition-colors outline-none hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E11]"
          >
            <DownloadIcon aria-hidden className="size-4" />
            Export PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            title={stat.hint}
            className="rounded-xl border border-white/8 bg-[#0B0B0E] px-5 py-4"
          >
            <p className="text-[13px] text-white/45">{stat.label}</p>
            <p
              className={cn(
                "mt-2 text-[28px] leading-none font-semibold tracking-[-0.02em]",
                stat.accent ? "text-emerald-400" : "text-white",
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section
        aria-label="Application history"
        className="overflow-hidden rounded-xl border border-white/8 bg-[#0B0B0E]"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-215 border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-white/1.5">
                <th className="h-11 w-[34%] px-5 text-left text-[11px] font-medium whitespace-nowrap text-white/40">
                  Job Title
                </th>
                <th className="h-11 px-5 text-left text-[11px] font-medium whitespace-nowrap text-white/40">
                  Company
                </th>
                <th className="h-11 px-5 text-left text-[11px] font-medium whitespace-nowrap text-white/40">
                  Applied
                </th>
                <th className="h-11 px-5 text-left text-[11px] font-medium whitespace-nowrap text-white/40">
                  Status
                </th>
                <th className="h-11 px-5 text-left text-[11px] font-medium whitespace-nowrap text-white/40">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleApplications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/30">
                        <InboxIcon aria-hidden className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white/70">
                          {tab === "archived"
                            ? "No archived applications"
                            : "No active applications"}
                        </p>
                        <p className="mt-1 text-xs text-white/35">
                          {tab === "archived"
                            ? "Applications you archive will show up here."
                            : "Apply to a role and your progress will appear here."}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                visibleApplications.map((application) => {
                  const status = getStatusStyle(application.status ?? "");
                  const visual = getJobVisual(application.jobTitle);
                  const Icon = visual.icon;

                  return (
                    <tr
                      key={application._id}
                      className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/2"
                    >
                      <td className="px-5 py-3.5 align-middle">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex size-9 shrink-0 items-center justify-center rounded-[10px] border",
                              visual.tileClassName,
                            )}
                          >
                            <Icon
                              aria-hidden
                              className="size-4.5"
                              strokeWidth={1.75}
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium text-white">
                              {application.jobTitle || "Untitled role"}
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] text-white/40">
                              {formatWorkplace(application)}
                            </span>
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 align-middle text-[13px] text-white/80">
                        <span className="block truncate">
                          {application.companyName || "—"}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 align-middle text-[13px] whitespace-nowrap text-white/45">
                        {formatAppliedAt(application.appliedAt)}
                      </td>

                      <td className="px-5 py-3.5 align-middle">
                        <span
                          className={cn(
                            "inline-flex h-6 items-center rounded-md border px-2.5 text-[11px] font-medium whitespace-nowrap",
                            status.badgeClassName,
                          )}
                        >
                          {status.label}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 align-middle text-[13px] whitespace-nowrap">
                        {application.jobId ? (
                          <Link
                            href={`/browse-jobs/${application.jobId}`}
                            className="font-medium text-white/70 transition-colors hover:text-white"
                          >
                            Details
                          </Link>
                        ) : (
                          <span className="font-medium text-white/30">
                            Details
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/40">
            Showing {firstVisible}-{lastVisible} of {filteredApplications.length}{" "}
            application{filteredApplications.length === 1 ? "" : "s"}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors outline-none hover:bg-white/6 hover:text-white focus-visible:ring-2 focus-visible:ring-white/25 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeftIcon aria-hidden className="size-4" />
            </button>

            {getPageItems(currentPage, totalPages).map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden
                  className="px-1 text-[13px] text-white/30"
                >
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  aria-label={`Page ${item}`}
                  aria-current={item === currentPage ? "page" : undefined}
                  onClick={() => setPage(item)}
                  className={cn(
                    "h-8 min-w-8 rounded-lg px-2 text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                    item === currentPage
                      ? "bg-white text-[#0B0B0E]"
                      : "text-white/45 hover:bg-white/6 hover:text-white/85",
                  )}
                >
                  {item}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="flex size-8 items-center justify-center rounded-lg text-white/45 transition-colors outline-none hover:bg-white/6 hover:text-white focus-visible:ring-2 focus-visible:ring-white/25 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRightIcon aria-hidden className="size-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
