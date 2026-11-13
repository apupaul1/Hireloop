import {
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  CircleDollarSign,
  Globe2,
  HeartPulse,
  Laptop,
  MapPin,
  MonitorSmartphone,
  PlaneTakeoff,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/api/jobs";
import { formatCompensation, toBulletList } from "@/lib/job-format";
import { CATEGORY_ICONS } from "@/lib/job-icons";
import { cn } from "@/lib/utils";
import ApplyNowButton from "./ApplyNowButton";

const BENEFITS: { icon: LucideIcon; label: string }[] = [
  { icon: HeartPulse, label: "Full Health & Dental" },
  { icon: CircleDollarSign, label: "Competitive 401k" },
  { icon: Laptop, label: "Latest Hardware Stipend" },
  { icon: PlaneTakeoff, label: "Unlimited PTO" },
];

type Stat = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-semibold tracking-tight text-neutral-900 dark:text-white">
      {children}
    </h2>
  );
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;

  return (
    <div
      className={cn(
        "px-4 py-4",
        index >= 2 && "border-t md:border-t-0",
        index % 2 === 1 && "border-l",
        index >= 2 && "md:border-l",
        "border-black/8 dark:border-white/8",
      )}
    >
      <dt className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] text-neutral-500 uppercase dark:text-white/35">
        <Icon aria-hidden strokeWidth={1.8} className="size-3.5 shrink-0" />
        {stat.label}
      </dt>
      <dd className="mt-2 text-[13px] font-medium text-neutral-800 dark:text-white/85">
        {stat.value}
      </dd>
    </div>
  );
}

function CompanyShowcase() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 480 300"
      className="block h-auto w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="jd-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#26282d" />
          <stop offset="55%" stopColor="#141519" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
        <linearGradient id="jd-window" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor="#63798c" />
          <stop offset="45%" stopColor="#2b3742" />
          <stop offset="100%" stopColor="#111820" />
        </linearGradient>
        <radialGradient id="jd-glow" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jd-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c2d31" />
          <stop offset="100%" stopColor="#0b0c0e" />
        </linearGradient>
        <linearGradient id="jd-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#191a1d" />
          <stop offset="100%" stopColor="#070708" />
        </linearGradient>
        <radialGradient id="jd-vignette" cx="50%" cy="42%" r="78%">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      <rect width="480" height="300" fill="url(#jd-wall)" />
      <ellipse cx="240" cy="4" rx="215" ry="125" fill="url(#jd-glow)" />

      <rect
        x="150"
        y="44"
        width="180"
        height="136"
        fill="url(#jd-window)"
        stroke="#0a0b0d"
        strokeWidth="4"
      />

      <g fill="#0c1218" opacity="0.9">
        <rect x="156" y="138" width="28" height="42" />
        <rect x="188" y="120" width="22" height="60" />
        <rect x="214" y="146" width="34" height="34" />
        <rect x="252" y="128" width="18" height="52" />
        <rect x="274" y="116" width="26" height="64" />
        <rect x="304" y="142" width="20" height="38" />
      </g>

      <g fill="#d8c49a" opacity="0.55">
        <rect x="192" y="132" width="3" height="3" />
        <rect x="201" y="144" width="3" height="3" />
        <rect x="258" y="140" width="3" height="3" />
        <rect x="281" y="126" width="3" height="3" />
        <rect x="288" y="151" width="3" height="3" />
        <rect x="165" y="150" width="3" height="3" />
      </g>

      <g stroke="#0a0b0d" strokeWidth="3">
        <line x1="240" y1="44" x2="240" y2="180" />
        <line x1="150" y1="112" x2="330" y2="112" />
      </g>

      <rect
        x="196"
        y="14"
        width="88"
        height="3"
        rx="1.5"
        fill="#f0ede4"
        opacity="0.32"
      />

      <g fill="#0d0e10">
        <rect x="0" y="0" width="44" height="300" />
        <rect x="436" y="0" width="44" height="300" />
      </g>
      <g stroke="#26272b" strokeWidth="1" opacity="0.55">
        <line x1="44" y1="0" x2="44" y2="300" />
        <line x1="436" y1="0" x2="436" y2="300" />
      </g>

      <rect x="0" y="252" width="480" height="48" fill="url(#jd-floor)" />

      <rect x="86" y="214" width="308" height="15" fill="url(#jd-desk)" />
      <rect
        x="86"
        y="214"
        width="308"
        height="1.5"
        fill="#3d3e43"
        opacity="0.8"
      />

      <g>
        <rect
          x="190"
          y="148"
          width="100"
          height="60"
          rx="3"
          fill="#07080a"
          stroke="#2e3035"
          strokeWidth="1.5"
        />
        <rect
          x="193"
          y="151"
          width="94"
          height="54"
          fill="#0d131a"
          opacity="0.92"
        />
        <rect x="238" y="208" width="8" height="7" fill="#0e0f12" />
        <rect x="224" y="213" width="36" height="3" rx="1.5" fill="#0e0f12" />

        <rect x="110" y="222" width="9" height="52" fill="#08090b" />
        <rect x="362" y="222" width="9" height="52" fill="#08090b" />
      </g>

      <g fill="#0a0b0d">
        <path d="M282 246 q16 -22 32 0 l-5 30 h-22 z" />
        <rect x="272" y="272" width="52" height="5" rx="2.5" />
        <rect x="292" y="277" width="12" height="18" />
      </g>

      <rect width="480" height="300" fill="url(#jd-vignette)" />
    </svg>
  );
}

export default function JobDetails({ job }: { job: Job }) {
  const Icon = CATEGORY_ICONS[job.category] ?? BriefcaseBusiness;
  const compensation = formatCompensation(job);
  const responsibilities = toBulletList(job.responsibilities);
  const requirements = toBulletList(job.qualifications);
  const location = job.location?.trim();

  const workMode = job.isRemote ? "Remote" : "On-site";
  const companyName = job.company?.trim() || "This company";
  const roleSummary = [
    job.jobType?.toLowerCase(),
    job.isRemote ? "remote" : "on-site",
  ]
    .filter(Boolean)
    .join(" and ");

  const summary = `${companyName} is hiring a ${job.title}${
    location ? ` based in ${location}` : ""
  }. This role is ${roleSummary}. The details below outline what the position involves and who they are looking for.`;

  const stats: Stat[] = [
    {
      icon: CircleDollarSign,
      label: "Salary Range",
      value: compensation ?? "Not disclosed",
    },
    {
      icon: MapPin,
      label: "Location",
      value: location || (job.isRemote ? "Remote" : "Not specified"),
    },
    {
      icon: BriefcaseBusiness,
      label: "Job Type",
      value: job.jobType || "Not specified",
    },
    {
      icon: ChartNoAxesColumn,
      label: "Experience",
      value: job.experience?.trim() || "Not specified",
    },
  ];

  const tags: { icon: LucideIcon; label: string }[] = [
    job.category ? { icon: Icon, label: job.category } : null,
    job.jobType ? { icon: BriefcaseBusiness, label: job.jobType } : null,
    {
      icon: job.isRemote ? Globe2 : MonitorSmartphone,
      label: workMode,
    },
  ].filter((tag): tag is { icon: LucideIcon; label: string } => tag !== null);

  return (
    <>
      <article className="rounded-xl border border-black/8 bg-white p-5 sm:p-6 dark:border-white/8 dark:bg-[#111112]">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 items-start gap-3.5">
            <span
              aria-hidden
              className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-black/8 bg-neutral-100 text-neutral-500 dark:border-white/8 dark:bg-white/8 dark:text-white/70"
            >
              <Icon strokeWidth={1.7} className="size-5" />
            </span>

            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl dark:text-white">
                {job.title}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px]">
                <span className="text-neutral-500 dark:text-white/45">
                  {companyName}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400/90">
                  <BadgeCheck
                    aria-hidden
                    strokeWidth={2}
                    className="size-3.5"
                  />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={`Save ${job.title}`}
              className="size-9 rounded-lg border-black/10 bg-transparent text-neutral-500 hover:bg-black/4 hover:text-neutral-800 dark:border-white/10 dark:bg-white/4 dark:text-white/55 dark:hover:bg-white/8 dark:hover:text-white"
            >
              <Bookmark aria-hidden strokeWidth={1.8} className="size-4" />
            </Button>

            <ApplyNowButton job={job} />
          </div>
        </div>
      </article>

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-5">
        <div className="min-w-0 space-y-4">
          <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-black/8 bg-white md:grid-cols-4 dark:border-white/8 dark:bg-[#0d0d0d]">
            {stats.map((stat, index) => (
              <StatCell key={stat.label} stat={stat} index={index} />
            ))}
          </dl>

          <article className="rounded-xl border border-black/8 bg-white px-5 py-6 sm:px-6 dark:border-white/8 dark:bg-[#0d0d0d]">
            <div>
              <SectionHeading>Job Description</SectionHeading>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-600 dark:text-white/50">
                {summary}
              </p>
            </div>

            {responsibilities.length > 0 ? (
              <div className="mt-6 border-t border-black/6 pt-6 dark:border-white/6">
                <SectionHeading>Responsibilities</SectionHeading>
                <ul className="mt-4 list-disc space-y-2.5 pl-4 marker:text-neutral-300 dark:marker:text-white/25">
                  {responsibilities.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="text-[13px] leading-relaxed text-neutral-600 dark:text-white/55"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 border-t border-black/6 pt-6 dark:border-white/6">
              <SectionHeading>Requirements</SectionHeading>

              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const TagIcon = tag.icon;

                  return (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-1.5 rounded-md border border-black/8 bg-black/2 px-2.5 py-1.5 text-[11px] font-medium text-neutral-600 dark:border-white/8 dark:bg-white/3 dark:text-white/55"
                    >
                      <TagIcon
                        aria-hidden
                        strokeWidth={1.8}
                        className="size-3.5 shrink-0 text-neutral-400 dark:text-white/40"
                      />
                      {tag.label}
                    </span>
                  );
                })}
              </div>

              {requirements.length > 0 ? (
                <ul className="mt-4 list-disc space-y-2.5 pl-4 marker:text-neutral-300 dark:marker:text-white/25">
                  {requirements.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="text-[13px] leading-relaxed text-neutral-600 dark:text-white/55"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="mt-6 border-t border-black/6 pt-6 dark:border-white/6">
              <SectionHeading>Benefits</SectionHeading>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {BENEFITS.map((benefit) => {
                  const BenefitIcon = benefit.icon;

                  return (
                    <li
                      key={benefit.label}
                      className="flex items-center gap-3 rounded-lg border border-black/8 bg-black/2 px-4 py-3.5 dark:border-white/8 dark:bg-white/2"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
                        <BenefitIcon
                          aria-hidden
                          strokeWidth={1.8}
                          className="size-3.5"
                        />
                      </span>
                      <span className="text-[12px] font-medium text-neutral-700 dark:text-white/65">
                        {benefit.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </div>

        <aside className="rounded-xl border border-black/8 bg-white p-5 dark:border-white/8 dark:bg-[#0d0d0d]">
          <SectionHeading>Company Overview</SectionHeading>

          <div className="mt-4 overflow-hidden rounded-lg border border-black/8 bg-neutral-950 dark:border-white/8">
            <CompanyShowcase />
          </div>

          <dl className="mt-4 border-t border-black/6 dark:border-white/6">
            <div className="flex items-center justify-between gap-4 border-b border-black/6 py-3.5 dark:border-white/6">
              <dt className="text-[10px] font-medium tracking-[0.12em] text-neutral-400 uppercase dark:text-white/30">
                Size
              </dt>
              <dd className="text-right text-[12px] font-medium text-neutral-700 dark:text-white/70">
                {job.companySize?.trim() || "Not disclosed"}
              </dd>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-black/6 py-3.5 dark:border-white/6">
              <dt className="text-[10px] font-medium tracking-[0.12em] text-neutral-400 uppercase dark:text-white/30">
                Industry
              </dt>
              <dd className="text-right text-[12px] font-medium text-neutral-700 dark:text-white/70">
                {job.category || "Not specified"}
              </dd>
            </div>
          </dl>

          <Button
            type="button"
            variant="outline"
            className="mt-5 h-9 w-full rounded-lg border-black/10 bg-black/2 text-[12px] font-medium text-neutral-600 hover:bg-black/5 hover:text-neutral-900 dark:border-white/10 dark:bg-white/4 dark:text-white/60 dark:hover:bg-white/8 dark:hover:text-white"
          >
            Visit Website
          </Button>
        </aside>
      </div>
    </>
  );
}
