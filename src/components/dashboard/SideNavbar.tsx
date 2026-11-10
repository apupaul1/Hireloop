"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BookmarkIcon,
  BriefcaseBusinessIcon,
  BriefcaseIcon,
  Building2Icon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  LogOut,
  Settings2Icon,
  UsersIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../shared/Logo";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";

type Role = "seeker" | "recruiter" | "admin";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  exact?: boolean;
};

const navByRole: Record<Role, NavItem[]> = {
  seeker: [
    {
      title: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboardIcon,
      exact: true,
    },
    {
      title: "Jobs",
      url: "/dashboard/seeker/jobs",
      icon: BriefcaseIcon,
    },
    {
      title: "Saved Jobs",
      url: "/dashboard/seeker/saved-jobs",
      icon: BookmarkIcon,
    },
    {
      title: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileTextIcon,
    },
    {
      title: "Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCardIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings2Icon,
    },
  ],
  recruiter: [
    {
      title: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboardIcon,
      exact: true,
    },
    {
      title: "Manage Jobs",
      url: "/dashboard/recruiter/manage-jobs",
      icon: BriefcaseBusinessIcon,
    },
    {
      title: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileTextIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings2Icon,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboardIcon,
      exact: true,
    },
    {
      title: "Users",
      url: "/dashboard/admin/users",
      icon: UsersIcon,
    },
    {
      title: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building2Icon,
    },
    {
      title: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: BriefcaseIcon,
    },
    {
      title: "Payments",
      url: "/dashboard/admin/payments",
      icon: WalletIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings2Icon,
    },
  ],
};

const isNavItemActive = (pathname: string, item: NavItem) =>
  item.exact
    ? pathname === item.url
    : pathname === item.url || pathname.startsWith(`${item.url}/`);

export function SideNavbar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const role = (session?.user.role as Role | undefined) ?? "seeker";
  const navItems = navByRole[role] ?? navByRole.seeker;

  return (
    <Sidebar className="border-none" collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      className="bg-[#141418] border my-5"
                    />
                  }
                >
                  <Avatar>
                    <AvatarImage
                      src={session?.user.image || ""}
                      alt={session?.user.name}
                    />
                    <AvatarFallback>
                      {session?.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {session?.user.name}
                    </span>
                    <span className="truncate text-xs capitalize">
                      {session?.user.role}
                    </span>
                  </div>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {isPending? <h1>Loading...</h1> : navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  tooltip={item.title}
                  isActive={isNavItemActive(pathname, item)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={async () => {
            await signOut();
            toast.add({
              type: "success",
              description: "Logout Successfull",
            });
            router.refresh();
            router.push("/");
          }}
        >
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
