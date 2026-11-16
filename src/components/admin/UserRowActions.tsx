"use client";

import { useRouter } from "next/navigation";
import {
  BriefcaseBusinessIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ShieldCheckIcon,
  UserRoundIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";

import type { AdminUser, UserRole } from "@/types";
import { updateUserRole } from "@/lib/actions/users";

type UserRowActionsProps = {
  user: AdminUser;
  isSelf: boolean;
};

const ROLE_OPTIONS: {
  value: UserRole;
  label: string;
  icon: typeof UserRoundIcon;
}[] = [
  { value: "seeker", label: "Seeker", icon: UserRoundIcon },
  { value: "recruiter", label: "Recruiter", icon: BriefcaseBusinessIcon },
  { value: "admin", label: "Admin", icon: ShieldCheckIcon },
];

export function UserRowActions({ user, isSelf }: UserRowActionsProps) {
  const router = useRouter();
  const disabled = isSelf;

  const handleRoleChange = async (role: UserRole) => {
    if (role === user.role) {
      return;
    }

    const data = await updateUserRole(user.id, role);

    if (data.modifiedCount > 0) {
      router.refresh();
      toast.add({
        type: "success",
        description: "Role updated successfull",
      });
    }
  };

  if (isSelf) {
    return (
      <span
        className="text-[12px] font-medium text-white/30"
        title="You cannot change your own access here"
      >
        Current account
      </span>
    );
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        disabled={disabled || user.role === "admin"}
        onClick={() => handleRoleChange("admin")}
        className="text-[12px] font-medium text-white/60 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {user.role === "admin" ? "Admin" : "Make Admin"}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`More access options for ${user.name}`}
          disabled={disabled}
          className="flex size-7 items-center justify-center rounded-md text-white/30 transition-colors outline-none hover:bg-white/6 hover:text-white/70 focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <EllipsisVerticalIcon className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-46 border-none bg-[#17171c] p-1 text-white shadow-xl ring-white/10"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">
              Change role
            </DropdownMenuLabel>
            {ROLE_OPTIONS.map(({ value, label, icon: Icon }) => (
              <DropdownMenuItem
                key={value}
                disabled={value === user.role}
                onClick={() => handleRoleChange(value)}
                className="gap-2 py-1.5 text-[12px] focus:bg-white/6 focus:text-white data-disabled:opacity-40"
              >
                <Icon className="size-3.5 text-white/45" />
                Make {label}
                {value === user.role ? (
                  <CheckIcon className="ml-auto size-3.5 text-[#8b8bff]" />
                ) : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
