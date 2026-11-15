export type ApplicationStatus =
  | "applied"
  | "under review"
  | "shortlisted"
  | "offered"
  | "rejected";

export type Application = {
  _id: string;
  jobId: string;
  userId: string;
  email: string;
  jobTitle: string;
  companyName: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  minSalary: string;
  maxSalary: string;
  salaryFrequency: string;
  deadline: string;
  appliedAt: string;
  status: string;
};

/** Presentation metadata for a single application status. */
export type ApplicationStatusMeta = {
  value: ApplicationStatus;
  label: string;
  hint: string;
  badgeClassName: string;
  dotClassName: string;
};
