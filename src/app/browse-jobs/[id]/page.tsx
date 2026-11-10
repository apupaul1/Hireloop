import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

import JobDetails from "@/components/browse/JobDetails";
import Navbar from "@/components/shared/Navbar";
import { getSingleJob } from "@/lib/api/jobs";

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job = await getSingleJob(id);

  return (
    <div className="relative isolate min-h-svh bg-[#f5f5f7] text-neutral-900 dark:bg-[#050505] dark:text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-3 pt-5 pb-16 md:px-5">
        {job ? (
          <JobDetails job={job} />
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-xl border border-black/8 bg-white px-5 py-16 sm:px-8 dark:border-white/8 dark:bg-[#0d0d0d]">
            <span className="flex size-11 items-center justify-center rounded-xl border border-black/8 bg-neutral-100 text-neutral-400 dark:border-white/8 dark:bg-white/3 dark:text-white/30">
              <BriefcaseBusiness aria-hidden className="size-5" />
            </span>

            <div>
              <h1 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                This job is no longer available
              </h1>
              <p className="mt-1 max-w-md text-[13px] leading-relaxed text-neutral-500 dark:text-white/40">
                The listing may have been closed, removed, or the link is
                incorrect. Browse the latest openings to find your next role.
              </p>
            </div>

            <Link
              href="/browse-jobs"
              className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              Back to Browse Jobs
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobDetailsPage;
