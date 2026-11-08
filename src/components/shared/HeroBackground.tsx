import Image from "next/image";

export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-x-0 -bottom-12 h-155 md:h-200">
        <div className="absolute -bottom-40 left-1/2 h-125 w-300 -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(91,91,214,0.3),transparent_70%)] opacity-40 blur-3xl dark:opacity-100" />
        <div className="absolute -top-69 md:-top-24 inset-x-0 bottom-0 mx-auto h-full w-[94%] md:w-[90%]">
          <Image
            src="/images/globe.png"
            alt=""
            fill
            sizes="90vw"
            className="object-cover opacity-40 dark:opacity-100"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#f5f5f7] to-transparent dark:from-[#050505]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#f5f5f7] via-[#f5f5f7]/70 to-transparent dark:from-[#050505] dark:via-[#050505]/70" />
      </div>
    </div>
  );
}
