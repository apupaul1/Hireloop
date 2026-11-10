const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
  /** Optional until applicant tracking is exposed by the API. */
  applicants?: number;
  /** Optional until the API reports a listing status. */
  status?: "active" | "expired" | "draft" | "paused";
};

export const getJobs = async (): Promise<Job[]> => {
  const res = await fetch(`${BASE_URL}/jobs`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  return res.json();
};
