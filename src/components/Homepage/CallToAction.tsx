import Image from "next/image";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-32 bg-black">
      <div
        aria-hidden
        className="pointer-events-none  absolute inset-x-0 top-0 -z-10 h-85 md:h-140"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_-5%,rgba(91,91,214,0.22),transparent_70%)] dark:bg-[radial-gradient(ellipse_53%_42%_at_50%_35%,rgba(60,70,230,0.85),transparent_90%)]" />

        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="hidden object-cover object-top opacity-90 dark:block"
        />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent via-[#f5f5f7]/60 to-[#f5f5f7] dark:via-[#050505]/60 dark:to-[#050505]" />
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <h2 className="max-w-[24ch] text-3xl leading-[1.15] font-semibold tracking-[-0.03em] text-balance text-neutral-900 sm:text-4xl md:text-5xl md:leading-[1.12] dark:text-white">
          Your next role is already looking for you
        </h2>

        <p className="mt-4 max-w-md text-xs leading-relaxed text-pretty text-neutral-500 md:mt-5 md:text-sm dark:text-white/45">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row md:mt-8">
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-black/10 bg-white/60 px-4 text-xs font-medium text-neutral-800 transition-colors hover:bg-white dark:border-white/10 dark:bg-[#111111]/80 dark:text-white dark:hover:bg-[#1a1a1a]"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}