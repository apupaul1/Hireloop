"use server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type JobPayload = Record<string, unknown>;

export const postJob = async (data: JobPayload) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateJob = async (id: string, data: JobPayload) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json().catch(() => null);

  return { ok: res.ok, data: result };
};

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  return res.json();
};
