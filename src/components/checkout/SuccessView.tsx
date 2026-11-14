import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

type SuccessViewProps = {
  sessionId: string;
  amount: number;
  dashboardHref: string;
};

const formatAmount = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);

export function SuccessView({
  sessionId,
  amount,
  dashboardHref,
}: SuccessViewProps) {
  return (
    <div className="relative isolate flex items-center justify-center overflow-hidden bg-[#f5f5f7] px-4 py-16 text-neutral-900 dark:bg-[#08080a] dark:text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"
      >
        <div className="mt-35 h-72 w-140 rounded-full bg-[#4f6bff]/8 blur-[100px] dark:bg-[#4f6bff]/20" />
      </div>

      <main
        aria-labelledby="success-heading"
        className="w-full max-w-89.5 rounded-2xl border border-black/8 bg-white px-6 py-9 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.18)] dark:border-white/8 dark:bg-[#121214] dark:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.9)]"
      >
        <div className="mx-auto flex size-13 items-center justify-center rounded-full bg-emerald-500/12 ring-1 ring-emerald-500/20 dark:bg-emerald-400/10 dark:ring-emerald-400/15">
          <Check
            aria-hidden
            strokeWidth={3}
            className="size-6 text-emerald-600 dark:text-emerald-400"
          />
        </div>

        <p className="mx-auto mt-5 w-fit rounded-full border border-[#5b5bd6]/25 bg-[#5b5bd6]/6 px-3 py-1 text-[9px] font-semibold tracking-[0.14em] text-[#4b4bc0] uppercase dark:border-[#5b5bd6]/40 dark:bg-[#5b5bd6]/12 dark:text-[#8d97f5]">
          Upgrade successful
        </p>

        <h1
          id="success-heading"
          className="mt-3.5 text-center text-[18px] font-semibold tracking-[-0.01em] text-neutral-900 dark:text-white"
        >
          Welcome to HireLoop Pro
        </h1>

        <p className="mt-5 text-center text-[12px] leading-relaxed text-neutral-500 dark:text-white/45">
          Your payment of{" "}
          <strong className="font-semibold text-neutral-900 dark:text-white">
            {formatAmount(amount)}
          </strong>{" "}
          was received perfectly.
        </p>

        <p className="mt-4 text-center text-[12px] leading-[1.65] text-neutral-500 dark:text-white/45">
          All advanced premium recruiting modules are unlocked{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            on your account. You may need to re-authenticate to see the effect.
          </span>
        </p>

        <div className="mt-7 flex items-center justify-between gap-3 rounded-xl border border-black/8 bg-neutral-50 px-3 py-2.5 dark:border-white/8 dark:bg-white/3">
          <div className="flex min-w-0 items-center gap-2">
            <ShieldCheck
              aria-hidden
              strokeWidth={1.8}
              className="size-3.5 shrink-0 text-neutral-500 dark:text-white/55"
            />
            <span className="truncate text-[11px] font-medium text-neutral-600 dark:text-white/70">
              Session ID Verified
            </span>
          </div>

          <code
            title={sessionId}
            className="max-w-[46%] truncate rounded-md border border-black/8 bg-black/4 px-2 py-1 font-mono text-[10px] text-neutral-500 dark:border-white/8 dark:bg-white/6 dark:text-white/45"
          >
            {sessionId}
          </code>
        </div>

        <Link
          href={dashboardHref}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-neutral-900 text-[12px] font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-[#5b5bd6]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-offset-[#121214]"
        >
          Go to Workspace Dashboard
          <ArrowRight aria-hidden strokeWidth={2} className="size-3.5" />
        </Link>
      </main>
    </div>
  );
}
