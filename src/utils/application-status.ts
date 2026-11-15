import type {
  Application,
  ApplicationStatus,
  ApplicationStatusMeta,
} from "@/types";

export const APPLICATION_STATUS_OPTIONS: ApplicationStatusMeta[] = [
  {
    value: "applied",
    label: "Applied",
    hint: "Application received",
    badgeClassName: "border-white/10 bg-white/6 text-white/60",
    dotClassName: "bg-white/45",
  },
  {
    value: "under review",
    label: "Under Review",
    hint: "Screening the candidate",
    badgeClassName: "border-amber-400/25 bg-amber-400/12 text-amber-300",
    dotClassName: "bg-amber-400",
  },
  {
    value: "shortlisted",
    label: "Shortlisted",
    hint: "Move forward to interviews",
    badgeClassName: "border-blue-400/25 bg-blue-400/12 text-blue-300",
    dotClassName: "bg-blue-400",
  },
  {
    value: "offered",
    label: "Offered",
    hint: "Offer extended",
    badgeClassName: "border-emerald-400/25 bg-emerald-400/12 text-emerald-300",
    dotClassName: "bg-emerald-400",
  },
  {
    value: "rejected",
    label: "Rejected",
    hint: "Not moving forward",
    badgeClassName: "border-red-400/25 bg-red-400/10 text-red-300",
    dotClassName: "bg-red-400",
  },
];

const APPLICATION_STATUS_ALIASES: Record<string, ApplicationStatus> = {
  applied: "applied",
  pending: "applied",
  new: "applied",
  review: "under review",
  reviewing: "under review",
  "under review": "under review",
  shortlist: "shortlisted",
  shortlisted: "shortlisted",
  offered: "offered",
  accepted: "offered",
  hired: "offered",
  rejected: "rejected",
  declined: "rejected",
};

const DEFAULT_APPLICATION_STATUS: ApplicationStatus = "applied";

/** Maps API status strings (including legacy values) onto the pipeline. */
export function normalizeApplicationStatus(
  status: string | undefined | null,
): ApplicationStatus {
  const key = (status ?? "").trim().toLowerCase();

  return APPLICATION_STATUS_ALIASES[key] ?? DEFAULT_APPLICATION_STATUS;
}

export function getApplicationStatus(
  application: Pick<Application, "status">,
): ApplicationStatus {
  return normalizeApplicationStatus(application.status);
}

export function getApplicationStatusMeta(
  status: ApplicationStatus,
): ApplicationStatusMeta {
  return (
    APPLICATION_STATUS_OPTIONS.find((option) => option.value === status) ??
    APPLICATION_STATUS_OPTIONS[0]
  );
}
