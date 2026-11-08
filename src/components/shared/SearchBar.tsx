import { MapPin, Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form
      role="search"
      className="mt-8 w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-1.5 text-left shadow-sm focus-within:border-black/20 md:mt-9 dark:border-white/10 dark:bg-[#101011] dark:shadow-none dark:focus-within:border-white/25"
    >
      <div className="flex flex-col gap-1 md:flex-row md:items-center">
        <label className="flex flex-1 items-center gap-2.5 px-3 py-2.5 md:py-2">
          <Search
            aria-hidden
            className="size-4 shrink-0 text-neutral-400 dark:text-white/40"
          />
          <input
            type="text"
            name="query"
            aria-label="Job title, skill or company"
            placeholder="Job title, skill or company"
            className="w-full min-w-0 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-white/35"
          />
        </label>

        <span
          aria-hidden
          className="mx-3 h-px bg-black/10 md:mx-0 md:h-6 md:w-px dark:bg-white/10"
        />

        <label className="flex flex-1 items-center gap-2.5 px-3 py-2.5 md:py-2">
          <MapPin
            aria-hidden
            className="size-4 shrink-0 text-neutral-400 dark:text-white/40"
          />
          <input
            type="text"
            name="location"
            aria-label="Location or remote"
            placeholder="Location or Remote"
            className="w-full min-w-0 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white dark:placeholder:text-white/35"
          />
        </label>

        <button
          type="submit"
          aria-label="Search jobs"
          className="mt-1 flex h-10 items-center justify-center gap-2 rounded-xl bg-[#5b5bd6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4b4bc0] md:mt-0 md:size-10 md:shrink-0 md:px-0"
        >
          <Search aria-hidden className="size-4" />
          <span className="md:hidden">Search</span>
        </button>
      </div>
    </form>
  );
}