export function pluralize(count: number, singular: string) {
  return `${count} ${singular}${count === 1 ? "" : "s"} ago`;
}

/** Relative "x minutes ago" label with a safe fallback for bad input. */
export function formatRelativeTime(value: string | undefined | null) {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  const minutes = Math.floor(Math.max(0, Date.now() - date.getTime()) / 60_000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return pluralize(minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return pluralize(hours, "hour");
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return pluralize(days, "day");
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return pluralize(weeks, "week");
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return pluralize(months, "month");
  }

  return pluralize(Math.floor(days / 365), "year");
}

/** Absolute date label, or undefined when the value is not a valid date. */
export function formatShortDate(value: string | undefined | null) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Two-letter avatar initials derived from an email or a name. */
export function getInitials(value: string | undefined | null) {
  const local = (value ?? "").split("@")[0];
  const parts = local.split(/[._-]+/).filter(Boolean);
  const letters =
    parts.length > 1
      ? `${parts[0].charAt(0)}${parts[1].charAt(0)}`
      : local.slice(0, 2);

  return (letters || "?").toUpperCase();
}

/** USD price label used across the checkout surfaces. */
export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
