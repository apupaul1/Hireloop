import { Briefcase, Search } from "lucide-react";

import JobFilters, { type FilterCounts } from "@/components/browse/JobFilters";
import JobListCard from "@/components/browse/JobListCard";
import SortJobsMenu from "@/components/browse/SortJobsMenu";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getJobs, type Job } from "@/lib/api/jobs";

const numberFormatter = new Intl.NumberFormat("en-US");

function buildFilterCounts(jobs: Job[]): FilterCounts {
  const jobTypes: Record<string, number> = {};
  const categories: Record<string, number> = {};
  let remote = 0;

  for (const job of jobs) {
    if (job.jobType) {
      jobTypes[job.jobType] = (jobTypes[job.jobType] ?? 0) + 1;
    }

    if (job.category) {
      categories[job.category] = (categories[job.category] ?? 0) + 1;
    }

    if (job.isRemote) {
      remote += 1;
    }
  }

  return {
    jobTypes,
    categories,
    remote,
    onSite: jobs.length - remote,
  };
}

const BrowseJobsPage = async () => {
  const jobs = await getJobs();
  const counts = buildFilterCounts(jobs);

  

  return (
    <div className="relative isolate min-h-svh bg-[#f5f5f7] text-neutral-900 dark:bg-[#050505] dark:text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-3 pt-5 pb-16 md:px-5">
        <Card
          aria-label="Job search"
          className="gap-0 rounded-xl border border-black/8 bg-white p-2 ring-0 dark:border-white/6 dark:bg-[#0e0e0e]"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <InputGroup className="h-11 flex-1 rounded-lg border-black/10 bg-transparent dark:border-white/8 dark:bg-transparent">
              <InputGroupAddon className="pl-2.5 text-neutral-400 dark:text-white/35">
                <Search aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                type="search"
                name="query"
                aria-label="Search by job title, keywords, or company"
                placeholder="Search by job title, keywords..."
                className="text-sm placeholder:text-neutral-400 dark:placeholder:text-white/30"
              />
            </InputGroup>

            <Button
              type="button"
              className="h-11 shrink-0 rounded-lg bg-neutral-900 px-6 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
            >
              Search Jobs
            </Button>
          </div>
        </Card>

        <div className="mt-5 grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6">
          <JobFilters counts={counts} />

          <section aria-label="Job results" className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-[17px] font-semibold tracking-tight text-neutral-900 dark:text-white">
                Found {numberFormatter.format(jobs.length)} Professional Jobs
              </h1>

              <SortJobsMenu />
            </div>

            {jobs.length === 0 ? (
              <Card className="mt-4 items-center gap-3 rounded-xl border border-black/8 bg-white px-5 py-16 text-center ring-0 dark:border-white/6 dark:bg-[#0e0e0e]">
                <span className="flex size-11 items-center justify-center rounded-xl border border-black/8 bg-neutral-100 text-neutral-400 dark:border-white/8 dark:bg-white/3 dark:text-white/30">
                  <Briefcase aria-hidden className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-white/70">
                    No jobs available right now
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-white/35">
                    New roles will appear here as soon as they are published.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="mt-4 space-y-3">
                {jobs.map((job, index) => (
                  <JobListCard key={job._id ?? index} job={job} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BrowseJobsPage;
