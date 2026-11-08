import { BriefcaseBusiness, Building2, Flame, Star, Users } from "lucide-react";

import { StarField } from "@/components/shared/StarField";
import { StatCard } from "@/components/shared/StatCard";
import SearchBar from "../shared/SearchBar";
import HeroBackground from "../shared/HeroBackground";

const TRENDING = ["Product Designer", "AI Engineering", "DevOps Engineer"];

const STATS = [
  { icon: BriefcaseBusiness, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-14 pb-10 md:px-6 md:pt-20 mb-12">
      <HeroBackground />
      <StarField />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-px w-8 bg-linear-to-r from-transparent to-black/15 md:w-14 dark:to-white/20"
          />
          <span className="flex items-center gap-2 rounded-full border border-black/10 bg-black/3 py-1 pr-3 pl-1 text-[11px] tracking-wide text-neutral-500 dark:border-white/10 dark:bg-white/4 dark:text-white/55">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#ff8a3d]/15 dark:bg-[#2a170c]">
              <Flame aria-hidden className="size-3.5 text-[#ff8a3d]" />
            </span>
            <span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                50,000+
              </span>{" "}
              NEW JOBS THIS MONTH
            </span>
          </span>
          <span
            aria-hidden
            className="h-px w-8 bg-linear-to-l from-transparent to-black/15 md:w-14 dark:to-white/20"
          />
        </div>

        <h1 className="mt-7 text-4xl font-semibold tracking-[-0.035em] text-balance md:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-neutral-600 md:text-base dark:text-white/55">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <SearchBar />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs">
          <span className="text-neutral-500 dark:text-white/40">
            Trending Position
          </span>
          {TRENDING.map((position) => (
            <a
              key={position}
              href="#"
              className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-neutral-600 transition-colors hover:border-black/20 hover:text-neutral-900 dark:border-white/10 dark:bg-white/4 dark:text-white/70 dark:hover:border-white/25 dark:hover:text-white"
            >
              {position}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-30 flex w-full max-w-6xl flex-col items-center md:mt-32 lg:mt-73">
        <p className="max-w-xl text-center text-lg leading-snug font-medium text-balance text-neutral-900/90 md:text-3xl dark:text-white/90">
          Assisting over 15,000 job seekers find their dream positions.
        </p>

        <div className="mt-8 grid w-full grid-cols-2 gap-3 md:mt-10 md:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
