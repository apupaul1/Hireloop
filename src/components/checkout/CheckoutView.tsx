import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Check,
  CreditCard,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CHECKOUT_PLANS,
  formatPrice,
  type CheckoutPlanId,
} from "@/lib/checkout";

const PLAN_ICONS = {
  seeker: UserRound,
  recruiter: Building2,
} satisfies Record<CheckoutPlanId, typeof UserRound>;

type CheckoutViewProps = {
  planId: CheckoutPlanId;
  searchParams: Promise<{ canceled?: string }>;
};

export async function CheckoutView({
  planId,
  searchParams,
}: CheckoutViewProps) {
  const plan = CHECKOUT_PLANS[planId];
  const PlanIcon = PLAN_ICONS[planId];

  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready.",
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-7">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 transition-colors hover:text-neutral-800 dark:text-white/40 dark:hover:text-white/70"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          Back to HireLoop
        </Link>

        <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.03em] text-neutral-900 md:text-4xl dark:text-white">
          Checkout
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-white/45">
          You will be charged {formatPrice(plan.price)} once. This does not
          create a subscription.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0">
          <section aria-labelledby="plan-heading">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2
                id="plan-heading"
                className="text-sm font-medium text-neutral-900 dark:text-white"
              >
                Your pass
              </h2>
              <span className="text-[10px] tracking-[0.16em] text-neutral-400 uppercase dark:text-white/30">
                One-time payment
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-4 rounded-xl border border-[#5b5bd6]/40 bg-white p-4 ring-1 ring-[#5b5bd6]/15 sm:flex-row sm:items-center sm:justify-between dark:border-[#5C53FE]/45 dark:bg-[#0b0b0b] dark:ring-[#5C53FE]/20">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#5b5bd6]/10 text-[#5b5bd6] dark:bg-[#5C53FE]/15 dark:text-[#9a9aff]">
                  <PlanIcon
                    aria-hidden
                    strokeWidth={1.7}
                    className="size-4.5"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase dark:text-white/40">
                    {plan.audience}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-neutral-900 dark:text-white">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 dark:text-white/40">
                    {plan.tagline}
                  </p>
                </div>
              </div>

              <p className="flex shrink-0 items-baseline gap-1 text-neutral-900 sm:pl-4 dark:text-white">
                <span className="text-2xl font-semibold tracking-tight">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-[10px] font-normal text-neutral-400 dark:text-white/40">
                  one-time
                </span>
              </p>
            </div>
          </section>
        </div>

        <aside className="rounded-2xl border border-black/8 bg-white p-5 lg:sticky lg:top-6 dark:border-white/6 dark:bg-[#0b0b0b]">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-neutral-900 dark:text-white">
              Order summary
            </h2>
            <ReceiptText
              aria-hidden
              strokeWidth={1.7}
              className="size-4 text-neutral-400 dark:text-white/35"
            />
          </div>

          <div className="mt-4 rounded-xl border border-black/8 bg-neutral-50 p-3 dark:border-white/8 dark:bg-white/4">
            <p className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase dark:text-white/40">
              <PlanIcon aria-hidden strokeWidth={1.7} className="size-3" />
              {plan.audience}
            </p>
            <p className="mt-1.5 text-sm font-medium text-neutral-900 dark:text-white">
              {plan.name}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 dark:text-white/40">
              {plan.tagline}
            </p>
          </div>

          <ul className="mt-4 space-y-2.5">
            {plan.perks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-2 text-[11px] leading-relaxed text-neutral-600 dark:text-white/60"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-black/6 dark:bg-white/8">
                  <Check
                    aria-hidden
                    strokeWidth={2.5}
                    className="size-2.5 text-neutral-700 dark:text-white/80"
                  />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <Separator className="my-4" />

          <dl className="space-y-2 text-[11px] text-neutral-500 dark:text-white/45">
            <div className="flex items-center justify-between gap-3">
              <dt>Subtotal</dt>
              <dd>{formatPrice(plan.price)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt>Tax</dt>
              <dd>Included</dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-black/8 pt-2 text-sm font-medium text-neutral-900 dark:border-white/8 dark:text-white">
              <dt>Total due today</dt>
              <dd>{formatPrice(plan.price)}</dd>
            </div>
          </dl>

          <form action="/api/checkout_sessions" method="POST">
            <section>
              <Button
                type="submit"
                size="lg"
                className="mt-6 h-10 w-full bg-[#5b5bd6] text-white hover:bg-[#4b4bc0]"
              >
                <CreditCard aria-hidden />
                Pay {formatPrice(plan.price)} for {plan.name}
              </Button>
            </section>
          </form>
        </aside>
      </div>
    </main>
  );
}
