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
  /** Optional until the API reports the required experience. */
  experience?: string;
  /** Optional until the API reports the company size. */
  companySize?: string;
};

export const getJobs = async (query: string = ""): Promise<Job[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`, { cache: "no-store" });

  if (!res.ok) {
    return [];
  }

  return res.json();
};

export const getSingleJob = async (id: string): Promise<Job | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, { cache: "no-store" });

  if (res.ok) {
    return res.json();
  }

  if (res.status !== 404) {
    return null;
  }

  // Some deployments do not expose a single-job endpoint yet; fall back to
  // looking the listing up in the collection response.
  const jobs = await getJobs();
  return jobs.find((job) => job._id === id) ?? null;
};
