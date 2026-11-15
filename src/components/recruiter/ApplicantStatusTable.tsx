"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InboxIcon,
  SearchIcon,
  SearchXIcon,
} from "lucide-react";

import { ApplicationStatusMenu } from "@/components/applications/ApplicationStatusMenu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import type { Application, ApplicationStatus } from "@/types";
import {
  APPLICATION_STATUS_OPTIONS,
  cn,
  formatRelativeTime,
  formatShortDate,
  getApplicationStatus,
  getApplicationStatusMeta,
  getInitials,
} from "@/utils";
import { updateApplicationStatus } from "@/lib/actions/applications";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 8;

const headerCellClassName =
  "h-11 px-4 text-left text-[10px] font-semibold tracking-[0.12em] whitespace-nowrap text-white/30 uppercase";

const bodyCellClassName = "px-4 py-3.5 align-middle whitespace-nowrap";

type ApplicantStatusTableProps = {
  applications: Application[];
};

export function ApplicantStatusTable({
  applications,
}: ApplicantStatusTableProps) {
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const sortedApplications = useMemo(
    () =>
      [...applications].sort((a, b) => {
        const first = new Date(a.appliedAt).getTime() || 0;
        const second = new Date(b.appliedAt).getTime() || 0;

        return second - first;
      }),
    [applications],
  );

  const counts = useMemo(() => {
    const totals: Record<ApplicationStatus | "all", number> = {
      all: sortedApplications.length,
      applied: 0,
      "under review": 0,
      shortlisted: 0,
      offered: 0,
      rejected: 0,
    };

    for (const application of sortedApplications) {
      totals[getApplicationStatus(application)] += 1;
    }

    return totals;
  }, [sortedApplications]);

  const filteredApplications = useMemo(() => {
    const search = query.trim().toLowerCase();

    return sortedApplications.filter((application) => {
      const status = getApplicationStatus(application);
      const matchesFilter = filter === "all" || status === filter;
      const matchesQuery =
        search === "" || application.email?.toLowerCase().includes(search);

      return matchesFilter && matchesQuery;
    });
  }, [sortedApplications, filter, query]);

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
    value: number;
    accentClassName?: string;
  }[] = [
    { label: "Total Applicants", value: counts.all },
    { label: "Under Review", value: counts["under review"] },
    { label: "Shortlisted", value: counts.shortlisted },
    {
      label: "Offers Extended",
      value: counts.offered,
      accentClassName: "text-emerald-400",
    },
  ];

  const handleFilterChange = (next: ApplicationStatus | "all") => {
    setFilter(next);
    setPage(1);
  };

  const handleQueryChange = (next: string) => {
    setQuery(next);
    setPage(1);
  };

  const handleStatusChange = async (
    application: Application,
    next: ApplicationStatus,
  ) => {
    if (getApplicationStatus(application) === next) {
      return;
    }

    if (next === "applied") {
      return;
    }

    const data = await updateApplicationStatus(application._id, next);

    if (data.modifiedCount) {
      toast.add({
        type: "success",
        description: `Status "${getApplicationStatusMeta(next).label}" was selected for ${application.email || "this applicant"}.`,
      });
      router.push(
        `/dashboard/recruiter/manage-jobs/${application.jobId}/applicants`,
      );
    }
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/8 bg-[#0B0B0E] px-5 py-4"
          >
            <p className="text-[13px] text-white/45">{stat.label}</p>
            <p
              className={cn(
                "mt-2 text-[28px] leading-none font-semibold tracking-[-0.02em]",
                stat.accentClassName ?? "text-white",
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section
        aria-label="Applicants"
        className="overflow-hidden rounded-xl border border-white/8 bg-[#0B0B0E]"
      >
        <div className="flex flex-col gap-3 border-b border-white/8 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter applicants by status"
            className="flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => handleFilterChange("all")}
              className={cn(
                "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                filter === "all"
                  ? "border-white/15 bg-white/10 text-white"
                  : "border-transparent text-white/40 hover:bg-white/4 hover:text-white/75",
              )}
            >
              All
              <span className="text-white/35">{counts.all}</span>
            </button>

            {APPLICATION_STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={filter === option.value}
                onClick={() => handleFilterChange(option.value)}
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/25",
                  filter === option.value
                    ? "border-white/15 bg-white/10 text-white"
                    : "border-transparent text-white/40 hover:bg-white/4 hover:text-white/75",
                )}
              >
                {option.label}
                <span className="text-white/35">{counts[option.value]}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-64">
            <SearchIcon
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/30"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search by email"
              aria-label="Search applicants by email"
              className="h-9 rounded-lg border-white/10 bg-white/3 pl-9 text-[13px] text-white placeholder:text-white/30 focus-visible:border-[#5b5bd6]/60 focus-visible:ring-[#5b5bd6]/25 dark:bg-white/3"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-white/1.5">
                <th className={cn(headerCellClassName, "w-[48%] pl-5")}>
                  Candidate
                </th>
                <th className={cn(headerCellClassName, "w-[22%]")}>Applied</th>
                <th className={cn(headerCellClassName, "w-[30%] pr-5")}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {visibleApplications.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/30">
                        {applications.length === 0 ? (
                          <InboxIcon aria-hidden className="size-5" />
                        ) : (
                          <SearchXIcon aria-hidden className="size-5" />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white/70">
                          {applications.length === 0
                            ? "No applicants yet"
                            : "No applicants match these filters"}
                        </p>
                        <p className="mt-1 text-xs text-white/35">
                          {applications.length === 0
                            ? "Candidates who apply to this role will appear here."
                            : "Try a different status or search term."}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                visibleApplications.map((application) => {
                  const appliedOn = formatShortDate(application.appliedAt);

                  return (
                    <tr
                      key={application._id}
                      className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/2"
                    >
                      <td className={cn(bodyCellClassName, "pl-5")}>
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#5b5bd6]/25 bg-[#5b5bd6]/15 text-[11px] font-semibold text-[#b4b4ff]">
                            {getInitials(application.email)}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-medium text-white">
                              {application.email || "Unknown applicant"}
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] text-white/35">
                              {application.jobTitle || "Role not recorded"}
                            </span>
                          </span>
                        </div>
                      </td>

                      <td
                        className={cn(
                          bodyCellClassName,
                          "text-[12px] text-white/45",
                        )}
                      >
                        <time
                          dateTime={application.appliedAt || undefined}
                          title={appliedOn}
                        >
                          {formatRelativeTime(application.appliedAt)}
                        </time>
                      </td>

                      <td className={cn(bodyCellClassName, "pr-5")}>
                        <ApplicationStatusMenu
                          subject={application.email}
                          value={getApplicationStatus(application)}
                          onChange={(next) =>
                            handleStatusChange(application, next)
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="flex flex-col gap-3 border-t border-white/8 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-white/40">
              Showing {firstVisible}-{lastVisible} of{" "}
              {filteredApplications.length} applicant
              {filteredApplications.length === 1 ? "" : "s"}
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

              <span className="px-1 text-[12px] text-white/40">
                Page {currentPage} of {totalPages}
              </span>

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
        ) : null}
      </section>

      <p className="text-[11px] text-white/30">
        Status changes are not saved yet. Connect the applications update
        endpoint to persist them.
      </p>
    </div>
  );
}
