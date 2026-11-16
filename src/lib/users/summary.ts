import type { AdminUser } from "@/types";

export type UserSummary = {
  total: number;
  active: number;
  suspended: number;
  recruiters: number;
  joinedLastDay: number;
  joinedLastMonth: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const joinedWithin = (user: AdminUser, now: number, windowMs: number) =>
  now - new Date(user.createdAt).getTime() < windowMs;

export const summarizeUsers = (
  users: AdminUser[],
  now = Date.now(),
): UserSummary => {
  const total = users.length;
  const suspended = users.filter((user) => user.banned).length;

  return {
    total,
    active: total - suspended,
    suspended,
    recruiters: users.filter((user) => user.role === "recruiter").length,
    joinedLastDay: users.filter((user) => joinedWithin(user, now, DAY_MS))
      .length,
    joinedLastMonth: users.filter((user) =>
      joinedWithin(user, now, 30 * DAY_MS),
    ).length,
  };
};
