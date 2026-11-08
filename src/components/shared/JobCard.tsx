import {
  ArrowRight,
  BadgeDollarSign,
  MapPin,
  MonitorSmartphone,
} from "lucide-react";
import { Job } from "../Homepage/FeaturedJobs";
import Link from "next/link";

export default function JobCard({
  title,
  description,
  location,
  workMode,
  salary,
}: Job) {
  const META_ICON = (
    <span className="shrink-0">
      <MapPin aria-hidden strokeWidth={1.8} className="size-3.5 text-[#F7C2FF]" />
    </span>
  );
  return (
    <article className="group/card flex h-full flex-col rounded-2xl border border-black/8 bg-white p-5 transition-colors hover:border-black/15 dark:border-white/6 dark:bg-[#0e0e0e] dark:hover:border-white/12">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{title}</h3>

      <p className="mt-2 text-[11px] leading-relaxed text-neutral-500 dark:text-white/40">
        {description}
      </p>

      <div className="mt-4 flex flex-col items-start gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/2 py-1 pr-2.5 pl-1 text-[11px] text-neutral-600 dark:border-white/8 dark:bg-white/2 dark:text-white/55 dark:hover:border-[#8b8bf5]/25 dark:hover:bg-[#8b8bf5]/8 dark:hover:text-[#b4b4ff]">
            {META_ICON}
            {location}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/2 py-1 pr-2.5 pl-1 text-[11px] text-neutral-600 dark:border-white/8 dark:bg-white/2 dark:text-white/55 dark:hover:border-[#8b8bf5]/25 dark:hover:bg-[#8b8bf5]/8 dark:hover:text-[#b4b4ff]">
            <span className="shrink-0 ">
              <MonitorSmartphone
                aria-hidden
                strokeWidth={1.8}
                className="size-3.5 text-[#F7C2FF]"
              />
            </span>
            {workMode}
          </span>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-black/2 py-1 pr-2.5 pl-1 text-[11px] text-neutral-600 dark:border-white/8 dark:bg-white/2 dark:text-white/55 dark:hover:border-[#8b8bf5]/25 dark:hover:bg-[#8b8bf5]/8 dark:hover:text-[#b4b4ff]">
          <span className="shrink-0">
            <BadgeDollarSign
              aria-hidden
              strokeWidth={1.8}
              className="size-3.5 text-[#F7C2FF]"
            />
          </span>
          {salary}
        </span>
      </div>

      <Link
        href="#"
        className="mt-6 inline-flex w-fit items-center gap-1.5 text-[11px] font-medium text-neutral-800 transition-colors hover:text-neutral-950 dark:text-white/75 "
      >
        Apply Now
        <ArrowRight
          aria-hidden
          strokeWidth={1.8}
          className="size-3 transition-transform duration-200 group-hover/card:translate-x-0.5"
        />
      </Link>
    </article>
  );
}
