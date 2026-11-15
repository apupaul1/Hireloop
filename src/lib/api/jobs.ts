import type { Job } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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

export const getJobsCount = async (recruiterEmail: string) => {
  const res = await fetch(
    `${BASE_URL}/jobs/count?recruiterEmail=${recruiterEmail}`,
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
};
