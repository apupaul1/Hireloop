
import { SideNavbar } from "@/components/dashboard/SideNavbar";
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
    <div className="w-full min-w-0 overflow-x-hidden">
      <SidebarProvider className="min-w-0 overflow-hidden">
        <SideNavbar />

        <SidebarInset className="mr-3 my-2 min-w-0 flex-1 overflow-hidden bg-[#0E0E11]">
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 rounded-t-2xl border pr-6">
            <div className="flex w-full min-w-0 flex-1 items-center gap-2 px-4 py-3 pl-8">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-8"
              />
              <InputGroup className="min-w-0">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-3">
              <BellCheckIcon size={20} />
              <MessageCircle size={20} />
            </div>
          </header>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-x-hidden border-x p-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
