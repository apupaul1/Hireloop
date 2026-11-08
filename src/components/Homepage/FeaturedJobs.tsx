import { SectionBadge } from "@/components/shared/SectionBadge";
import JobCard from "../shared/JobCard";

export type Job = {
  title: string;
  description: string;
  location: string;
  workMode: string;
  salary: string;
};

const JOBS: Job[] = [
  {
    title: "Frontend Developer",
    description:
      "Showcases your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workMode: "Hybrid",
    salary: "$125-$140/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcases your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workMode: "Hybrid",
    salary: "$125-$140/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcases your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workMode: "Hybrid",
    salary: "$125-$140/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcases your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workMode: "Hybrid",
    salary: "$125-$140/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcases your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workMode: "Hybrid",
    salary: "$125-$140/hour",
  },
  {
    title: "Frontend Developer",
    description:
      "Showcases your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    workMode: "Hybrid",
    salary: "$125-$140/hour",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="px-4 py-14 md:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <SectionBadge label="Smart Job Discovery" />

          <h2 className="mt-5 max-w-136 text-3xl leading-[1.18] font-semibold tracking-[-0.03em] text-balance text-neutral-900 md:text-4xl dark:text-white">
            The roles you&rsquo;d never find by searching
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-3">
          {JOBS.map((job, index) => (
            <JobCard key={`${job.title}-${index}`} {...job} />
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <a
            href="/jobs"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-100 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
          >
            View all job open
          </a>
        </div>
      </div>
    </section>
  );
}
