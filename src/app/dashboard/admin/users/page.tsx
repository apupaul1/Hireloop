import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { UserManagementView } from "@/components/admin/UserManagementView";
import { getUsers } from "@/lib/api/users";
import { getSession } from "@/lib/core/server";
import { summarizeUsers } from "@/lib/users/summary";
import type { AdminUser, UserRole } from "@/types";

export const metadata: Metadata = {
  title: "User Management — HireLoop",
  description: "Review, filter, and manage platform access for all users.",
};

const AllUsersPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "admin") {
    redirect(`/dashboard/${session.user.role ?? "seeker"}`);
  }

  const { users } = await getUsers();

  const rows: AdminUser[] = users.map((user) => {
    const createdAt = new Date(user.createdAt);

    return {
      id: user.id,
      name: user.name || "Unnamed user",
      email: user.email,
      image: user.image ?? null,
      role: (user.role as UserRole) || "seeker",
      banned: Boolean(user.banned),
      createdAt: Number.isNaN(createdAt.getTime())
        ? ""
        : createdAt.toISOString(),
    };
  });

  return (
    <UserManagementView
      users={rows}
      summary={summarizeUsers(rows)}
      currentUserId={session.user.id}
    />
  );
};

export default AllUsersPage;
