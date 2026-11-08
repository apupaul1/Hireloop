"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChartColumn,
  Crown,
  Plus,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SectionBadge } from "@/components/shared/SectionBadge";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  icon: LucideIcon;
  price: Record<Billing, number>;
  features: string[];
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    icon: Crown,
    price: { monthly: 0, yearly: 0 },
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: ChartColumn,
    price: { monthly: 17, yearly: 13 },
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    icon: Zap,
    price: { monthly: 99, yearly: 74 },
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

function PricingCard({
  name,
  icon: Icon,
  price,
  features,
  highlighted = false,
  billing,
}: Plan & { billing: Billing }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border p-4 md:p-5",
        highlighted
          ? "border-black/12 bg-neutral-50 shadow-lg shadow-black/5 dark:border-white/12 dark:bg-[#151515] dark:shadow-none"
          : "border-black/8 bg-white dark:border-white/6 dark:bg-[#0b0b0b]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-md",
              highlighted
                ? "bg-black/8 dark:bg-white/10"
                : "bg-black/5 dark:bg-white/6",
            )}
          >
            <Icon
              aria-hidden
              strokeWidth={1.7}
              className="size-4.5 text-neutral-800 dark:text-[#F7C2FF]"
            />
          </span>
          <h3 className="truncate text-sm font-medium text-neutral-900 dark:text-white">
            {name}
          </h3>
        </div>

        <p className="flex shrink-0 items-baseline gap-0.5 text-neutral-900 dark:text-white">
          <span className="text-2xl font-semibold tracking-tight">
            ${price[billing]}
          </span>
          <span className="text-[10px] font-normal text-neutral-400 dark:text-white/40">
            /month
          </span>
        </p>
      </div>

      <p className="mt-5 text-[11px] text-neutral-500 dark:text-white/45">
        Start building your insights hub:
      </p>

      <ul className="mt-3 space-y-2.5 h-45">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-[11px] text-neutral-600 dark:text-white/60"
          >
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-black/6 dark:bg-white/8">
              <Plus
                aria-hidden
                strokeWidth={2}
                className="size-2.5 text-neutral-700 dark:text-white/80"
              />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-1 items-end">
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-[11px] font-medium transition-colors outline-none focus-visible:ring-3",
            highlighted
              ? "border-transparent bg-white text-neutral-900 hover:bg-neutral-200 focus-visible:ring-white/40 dark:bg-white dark:hover:bg-white/90"
              : "border-black/8 bg-black/4 text-neutral-800 hover:bg-black/8 focus-visible:ring-black/20 dark:border-white/8 dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#242424] dark:focus-visible:ring-white/30",
          )}
        >
          Choose This Plan
          <ArrowRight aria-hidden strokeWidth={1.8} className="size-3.5" />
        </button>
      </div>
    </article>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <SectionBadge label="Pricing" />

          <h2 className="mt-5 max-w-lg text-3xl leading-[1.18] font-semibold tracking-[-0.03em] text-balance text-neutral-900 md:text-4xl dark:text-white">
            Pay for the leverage, not the listings
          </h2>

          <div
            role="group"
            aria-label="Billing period"
            className="mt-6 inline-flex items-center gap-1 rounded-full border border-black/8 bg-white p-1 dark:border-white/8 dark:bg-[#0b0b0b]"
          >
            <button
              type="button"
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30",
                billing === "monthly"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800 dark:text-white/50 dark:hover:text-white/80",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billing === "yearly"}
              onClick={() => setBilling("yearly")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30",
                billing === "yearly"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-800 dark:text-white/50 dark:hover:text-white/80",
              )}
            >
              Yearly
              <span className="rounded-lg bg-[#e02fae] px-1.5 py-0.5 text-[8px] font-semibold text-white">
                25%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} {...plan} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  );
}
