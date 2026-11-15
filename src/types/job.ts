export type JobStatus = "active" | "expired" | "draft" | "paused";

export type Job = {
  _id: string;
  title: string;
  company: string;
  category: string;
  jobType: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
  createdAt: string;
  applicants?: number;
  status?: JobStatus;
  experience?: string;
  companySize?: string;
};

/** Aggregated counts used by the browse-jobs filter sidebar. */
export type FilterCounts = {
  jobTypes: Record<string, number>;
  categories: Record<string, number>;
  remote: number;
  onSite: number;
};

/** Static card content used by the homepage featured-jobs section. */
export type FeaturedJob = {
  title: string;
  description: string;
  location: string;
  workMode: string;
  salary: string;
};
