const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface IApplications {
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
}

export const getApplications = async (): Promise<IApplications[]> => {
  const res = await fetch(`${BASE_URL}/applications`);

  if (!res.ok) {
    return [];
  }

  return res.json();
};

export const getApplicationCount = async (userId: string) => {
  const res = await fetch(
    `${BASE_URL}/applications/count?applicantId=${userId}`,
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
};
