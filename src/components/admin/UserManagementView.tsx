"use client";

import { useMemo, useState } from "react";
import {
  BriefcaseBusinessIcon,
  CheckIcon,
  ChevronDownIcon,
  DownloadIcon,
  ShieldCheckIcon,
  UserRoundIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "cn";

import { UserRowActions } from "@/components/admin/UserRowActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import type { UserSummary } from "@/lib/users/summary";
import type { AdminUser, UserRole } from "@/types";

type RoleFilter = "all" | UserRole;

type UserManagementViewProps = {
  users: AdminUser[];
  summary: UserSummary;
  currentUserId: string;
};

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All Roles" },
  { value: "seeker", label: "Seekers" },
  { value: "recruiter", label: "Recruiters" },
  { value: "admin", label: "Admins" },
];

const ROLE_BADGES: Record<
  UserRole,
  { label: string; icon: LucideIcon; className: string }
> = {
  seeker: {
    label: "Seeker",
    icon: UserRoundIcon,
    className: "border-white/10 bg-white/5 text-white/60",
  },
  recruiter: {
    label: "Recruiter",
    icon: BriefcaseBusinessIcon,
    className: "border-indigo-400/25 bg-indigo-500/12 text-indigo-300",
  },
  admin: {
    label: "Admin",
    icon: ShieldCheckIcon,
    className: "border-amber-400/25 bg-amber-500/12 text-amber-300",
  },
};

const numberFormatter = new Intl.NumberFormat("en-US");

function formatJoinDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function shareOfTotal(part: number, total: number) {
  if (total === 0 || part === 0) {
    return "0%";
  }

  return `${Math.round((part / total) * 100)}%`;
}

function RoleBadge({ role }: { role: UserRole }) {
  const badge = ROLE_BADGES[role] ?? ROLE_BADGES.seeker;
  const Icon = badge.icon;

  return (
    <span
      className={cn(
        "inline-flex h-6.5 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium",
        badge.className,
      )}
    >
      <Icon aria-hidden className="size-3" strokeWidth={1.9} />
      {badge.label}
    </span>
  );
}

function StatusBadge({ banned }: { banned: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-6.5 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium",
        banned
          ? "border-red-500/25 bg-red-500/8 text-red-400"
          : "border-emerald-500/25 bg-emerald-500/8 text-emerald-400",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          banned
            ? "bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.75)]"
            : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]",
        )}
      />
      {banned ? "Suspended" : "Active"}
    </span>
  );
}

function MetricCard({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone: "positive" | "warning" | "muted";
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#141418] p-5">
      <p className="text-[12.5px] font-medium text-white/50">{label}</p>
      <p className="mt-3 text-[28px] leading-none font-semibold tracking-[-0.02em] text-white">
        {value}
      </p>
      <p
        className={cn(
          "mt-3 text-[12px] font-medium",
          tone === "positive"
            ? "text-emerald-400"
            : tone === "warning"
              ? "text-amber-400"
              : "text-white/40",
        )}
      >
        {hint}
      </p>
    </div>
  );
}

const headerCellClassName =
  "h-12 px-5 text-left text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap text-white/30 uppercase";

const bodyCellClassName = "px-5 py-4 align-middle whitespace-nowrap";

const csvCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

export function UserManagementView({
  users,
  summary,
  currentUserId,
}: UserManagementViewProps) {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filteredUsers = useMemo(
    () =>
      roleFilter === "all"
        ? users
        : users.filter((user) => user.role === roleFilter),
    [roleFilter, users],
  );

  const activeFilter =
    ROLE_FILTERS.find((filter) => filter.value === roleFilter) ??
    ROLE_FILTERS[0];

  const handleExport = () => {
    const rows = [
      ["Name", "Email", "Role", "Status", "Joined"],
      ...filteredUsers.map((user) => [
        user.name,
        user.email,
        ROLE_BADGES[user.role]?.label ?? user.role,
        user.banned ? "Suspended" : "Active",
        formatJoinDate(user.createdAt),
      ]),
    ];

    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "hireloop-users.csv";
    link.click();
    URL.revokeObjectURL(url);

    toast.add({
      type: "success",
      description: `Exported ${filteredUsers.length} ${
        filteredUsers.length === 1 ? "user" : "users"
      }.`,
    });
  };

  return (
    <div className="w-full min-w-0 pb-10">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.03em] text-white">
            User Management
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-white/45">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 self-start">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/12 bg-white/4 px-3.5 text-[13px] font-medium text-white/85 transition-colors outline-none hover:bg-white/8 hover:text-white focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/50">
              {activeFilter.label}
              <ChevronDownIcon className="size-4 text-white/40" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-42 border-none bg-[#17171c] p-1 text-white shadow-xl ring-white/10"
            >
              {ROLE_FILTERS.map((filter) => (
                <DropdownMenuItem
                  key={filter.value}
                  onClick={() => setRoleFilter(filter.value)}
                  className="gap-2 py-1.5 text-[12px] focus:bg-white/6 focus:text-white"
                >
                  {filter.label}
                  {filter.value === roleFilter ? (
                    <CheckIcon className="ml-auto size-3.5 text-[#8b8bff]" />
                  ) : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={handleExport}
            disabled={filteredUsers.length === 0}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-[13px] font-semibold text-[#141418] transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <DownloadIcon aria-hidden className="size-4" />
            Export List
          </button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Active Users"
          value={numberFormatter.format(summary.active)}
          hint={
            summary.joinedLastMonth > 0
              ? `+${numberFormatter.format(summary.joinedLastMonth)} in the last 30 days`
              : "No new signups this month"
          }
          tone={summary.joinedLastMonth > 0 ? "positive" : "muted"}
        />
        <MetricCard
          label="Recruiter Growth"
          value={numberFormatter.format(summary.recruiters)}
          hint={
            summary.recruiters > 0
              ? `${shareOfTotal(summary.recruiters, summary.total)} of all accounts`
              : "No recruiters yet"
          }
          tone={summary.recruiters > 0 ? "positive" : "muted"}
        />
        <MetricCard
          label="Suspended Accounts"
          value={numberFormatter.format(summary.suspended)}
          hint={`${shareOfTotal(summary.suspended, summary.total)} of total`}
          tone="muted"
        />
        <MetricCard
          label="New Signups (24h)"
          value={numberFormatter.format(summary.joinedLastDay)}
          hint={
            summary.joinedLastDay > 0 ? "Steady activity" : "No activity in 24h"
          }
          tone={summary.joinedLastDay > 0 ? "warning" : "muted"}
        />
      </div>

      <section
        aria-label="Platform users"
        className="mt-7 overflow-hidden rounded-xl border border-white/8 bg-[#0B0B0E]"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-white/1.5">
                <th className={cn(headerCellClassName, "w-[26%]")}>User Name</th>
                <th className={cn(headerCellClassName, "w-[24%]")}>
                  Email Address
                </th>
                <th className={cn(headerCellClassName, "w-[14%]")}>Role</th>
                <th className={cn(headerCellClassName, "w-[14%]")}>
                  Join Date
                </th>
                <th className={cn(headerCellClassName, "w-[12%]")}>Status</th>
                <th
                  className={cn(headerCellClassName, "w-[20%] text-right")}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-white/30">
                        <UsersIcon aria-hidden className="size-5" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white/70">
                          No users found
                        </p>
                        <p className="mt-1 text-xs text-white/35">
                          {roleFilter === "all"
                            ? "New signups will appear here."
                            : `There are no ${activeFilter.label.toLowerCase()} yet.`}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/6 transition-colors last:border-0 hover:bg-white/2"
                  >
                    <td className={bodyCellClassName}>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8 border border-white/10">
                          <AvatarImage
                            src={user.image ?? ""}
                            alt={user.name}
                          />
                          <AvatarFallback className="bg-white/8 text-[11px] font-semibold text-white/70">
                            {user.name.charAt(0).toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="min-w-0">
                          <span className="block truncate text-[12.5px] font-medium text-white/90">
                            {user.name}
                          </span>
                          {user.role === "admin" ? (
                            <span className="mt-0.5 block text-[10.5px] font-medium text-amber-300/70">
                              Platform admin
                            </span>
                          ) : null}
                        </span>
                      </div>
                    </td>

                    <td className={bodyCellClassName}>
                      <span className="block max-w-60 truncate text-[12px] text-white/50">
                        {user.email}
                      </span>
                    </td>

                    <td className={bodyCellClassName}>
                      <RoleBadge role={user.role} />
                    </td>

                    <td className={bodyCellClassName}>
                      <span className="text-[12px] font-medium text-white/65">
                        {formatJoinDate(user.createdAt)}
                      </span>
                    </td>

                    <td className={bodyCellClassName}>
                      <StatusBadge banned={user.banned} />
                    </td>

                    <td className={cn(bodyCellClassName, "pr-4")}>
                      <UserRowActions
                        user={user}
                        isSelf={user.id === currentUserId}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
