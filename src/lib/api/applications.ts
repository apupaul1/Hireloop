import type { Application } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getApplications = async (
  query = "",
): Promise<Application[]> => {
  const res = await fetch(`${BASE_URL}/applications?${query}`);

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
