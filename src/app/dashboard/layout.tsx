import { SideNavbar } from "@/components/dashboard/SideNavbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BellCheckIcon, MessageCircle, SearchIcon } from "lucide-react";

const DashboardLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div>
      <SidebarProvider>
        <SideNavbar />
        <SidebarInset className="bg-[#0C0C0F] mr-3 my-2">
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border rounded-t-2xl pr-6">
            <div className="flex flex-1 items-center gap-2 px-4 w-full py-3">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-8"
              />
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="flex gap-3 items-center md:flex-1 justify-end">
              <BellCheckIcon size="20"/>
              <MessageCircle size="20"/>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 border-l border-r">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
