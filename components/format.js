export function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

export function formatPrice(value) {
  if (!hasValue(value)) return null;
  const digits = Math.abs(value) >= 100 ? 2 : Math.abs(value) >= 1 ? 4 : 6;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatPercent(value) {
  if (!hasValue(value)) return null;
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${Number(value).toFixed(1)}%`;
}

export function formatScore(value) {
  return hasValue(value) ? Number(value).toFixed(1) : null;
}

export function formatTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
