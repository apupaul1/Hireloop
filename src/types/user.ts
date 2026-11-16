export type UserRole = "seeker" | "recruiter" | "admin";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  banned: boolean;
  createdAt: string;
};

export type UserActionResult = { ok: true } | { ok: false; error: string };
