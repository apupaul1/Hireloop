import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getUserPremium = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`);

  if (!res.ok) {
    return [];
  }

  return res.json();
};

export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "desc",
    },
    headers: await headers(),
  });

  return users;
};
