import Link from "next/link";
import { notFound } from "next/navigation";

import JobPostForm from "@/components/recruiter/JobPostForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getSingleJob } from "@/lib/api/jobs";

type UpdateJobDetailsProps = {
  searchParams: Promise<{ id?: string }>;
};

const UpdateJobDetails = async ({ searchParams }: UpdateJobDetailsProps) => {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const job = await getSingleJob(id);

  if (!job) {
    notFound();
  }

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
            <BreadcrumbLink
              render={<Link href="/dashboard/recruiter/manage-jobs" />}
              className="text-white/30 hover:text-white/60"
            >
              Job Listings &amp; Postings
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white/20 [&>svg]:size-3" />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-white/45">
              Update Job Post
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="mb-9">
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
          Update Job Post
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/45">
          Modify position specifications, compensation range, and candidate
          requirements for this listing.
        </p>
      </header>

      <JobPostForm job={job} />
    </div>
  );
};

export default UpdateJobDetails;
