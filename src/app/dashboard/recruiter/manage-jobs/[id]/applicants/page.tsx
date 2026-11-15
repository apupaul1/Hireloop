import Link from "next/link";
import { ArrowLeftIcon, MapPinIcon, UsersIcon } from "lucide-react";

import { ApplicantStatusTable } from "@/components/recruiter/ApplicantStatusTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getApplications } from "@/lib/api/applications";

const ApplicantsPerJobPage = async ({
  params,
}: PageProps<"/dashboard/recruiter/manage-jobs/[id]/applicants">) => {
  const { id } = await params;

  const applications = await getApplications(`jobId=${id}`);

  const job = applications[0];

  const jobTitle = job?.jobTitle ?? "this role";
  const location = job
    ? job.isRemote
      ? `Remote (${job.location})`
      : job.location
    : null;

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden pb-10">
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
            <BreadcrumbLink
              render={<Link href={`/dashboard/recruiter/manage-jobs/${id}`} />}
              className="max-w-60 truncate text-white/30 hover:text-white/60"
            >
              {jobTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white/20 [&>svg]:size-3" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white/45">
              Applicants
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[30px] leading-tight font-semibold tracking-[-0.03em] text-white md:text-[32px]">
            Applicants
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
            Review candidates who applied for{" "}
            <span className="text-white/70">{jobTitle}</span>
            {job?.companyName ? (
              <>
                {" "}
                at <span className="text-white/70">{job.companyName}</span>
              </>
            ) : null}{" "}
            and move them through your hiring pipeline.
          </p>

          {job ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-white/35">
              <span className="inline-flex items-center gap-1.5">
                <UsersIcon aria-hidden className="size-3.5" />
                {applications.length}{" "}
                {applications.length === 1 ? "applicant" : "applicants"}
              </span>
              {location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPinIcon aria-hidden className="size-3.5" />
                  {location}
                </span>
              ) : null}
              {job.jobType ? (
                <span className="inline-flex h-5 items-center rounded-full border border-white/8 bg-white/3 px-2 text-[10px] font-medium text-white/45">
                  {job.jobType}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        <Link
          href="/dashboard/recruiter/manage-jobs"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-white/12 bg-white/5 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Back to jobs
        </Link>
      </div>

      <ApplicantStatusTable key={id} applications={applications} />
    </div>
  );
};

export default ApplicantsPerJobPage;
