import {
  Bookmark,
  ChartLine,
  ChartNoAxesColumn,
  Circle,
  FileText,
  Search,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { SectionBadge } from "@/components/shared/SectionBadge";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: Sparkles,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Circle,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

function FeatureItem({ icon: Icon, title, description }: Feature) {
  return (
    <div className="group flex items-start gap-3.5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-black/8 bg-white shadow-sm transition-colors group-hover:border-black/15 dark:border-white/8 dark:bg-[#111111] dark:shadow-none dark:group-hover:border-white/16">
        <Icon
          aria-hidden
          strokeWidth={1.5}
          className="size-5 text-neutral-700 dark:text-[#F7C2FF]"
        />
      </span>

      <div className="min-w-0">
        <h3 className="text-[13.5px] font-medium text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-neutral-500 dark:text-white/40">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24 bg-[#151516]">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <SectionBadge label="Features Job" />

          <h2 className="mt-5 max-w-lg text-3xl leading-[1.18] font-semibold tracking-[-0.03em] text-balance text-neutral-900 md:text-4xl dark:text-white">
            Everything you need <br /> to succeed
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-x-6">
          {FEATURES.map((feature) => (
            <FeatureItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
