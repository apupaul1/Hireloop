import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { JobPostsTable } from "@/components/recruiter/JobPostsTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getJobs } from "@/lib/api/jobs";

const ManageJobsPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="w-full pb-10">
      <Breadcrumb className="mb-5">
        <BreadcrumbList className="gap-1.5 text-[11px] text-white/30">
          <BreadcrumbItem>
            <BreadcrumbLink
              render={<Link href="/dashboard/recruiter/manage-jobs" />}
              className="text-white/30 hover:text-white/60"
            >
              Manage Jobs
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white/20 [&>svg]:size-3" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white/45">
              Job Listings &amp; Postings
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.03em] text-white md:text-[32px]">
            Manage Job Posts
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/manage-jobs/new"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#5b5bd6] px-4 text-sm font-medium text-white shadow-[0_8px_24px_-8px_rgba(91,91,214,0.9)] transition-colors hover:bg-[#4b4bc0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E11]"
        >
          <PlusIcon aria-hidden className="size-4" />
          New Job Post
        </Link>
      </div>

      <JobPostsTable jobs={jobs} />
    </div>
  );
};

export default ManageJobsPage;
