type SectionBadgeProps = {
  label: string;
};

export function SectionBadge({ label }: SectionBadgeProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="size-2 rounded-full bg-[#5b5bd6] shadow-[0_0_6px_2px_rgba(91,91,214,0.35)] dark:bg-[#5C53FE] dark:shadow-[0_0_8px_2px_rgba(154,154,255,0.45)]"
      />
      <p className="text-[10px] font-medium tracking-[0.22em] text-neutral-500 uppercase dark:text-white/45">
        {label}
      </p>
      <span
        aria-hidden
        className="size-2 rounded-full bg-[#5b5bd6] shadow-[0_0_6px_2px_rgba(91,91,214,0.35)] dark:bg-[#5C53FE] dark:shadow-[0_0_8px_2px_rgba(154,154,255,0.45)]"
      />
    </div>
  );
}
