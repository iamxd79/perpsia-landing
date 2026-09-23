export const FEED_REFRESH_MS = 90000;
export const FEED_STALE_MS = 5 * 60 * 1000;

export function getFeedFreshness(data, { error = false, loading = false, now = Date.now() } = {}) {
  if (loading) return "loading";
  if (error) return "error";
  const updatedAt = Date.parse(data?.meta?.updatedAt);
  if (!Number.isFinite(updatedAt)) return "unknown";
  if (data?.meta?.stale === true) return "stale";
  if (updatedAt > now + 60000) return "stale";
  if (data?.meta?.stale === false) return "live";
  if (now - updatedAt > FEED_STALE_MS) return "stale";
  return "live";
}

// These counts describe the published feed, not the entire scanner universe.
export function getHeroStats(data, { error = false, loading = false, now = Date.now() } = {}) {
  const updatedAt = Date.parse(data?.meta?.updatedAt);
  const available = getFeedFreshness(data, { error, loading, now }) === "live"
    && Array.isArray(data?.signals) && Number.isFinite(updatedAt);
  if (!available) return { available: false, assets: null, signals: null, confidence: null, providers: null };

  const signals = Array.isArray(data.signals) ? data.signals : [];
  const candidates = Array.isArray(data.candidates) ? data.candidates : [];
  const feed = [...new Map([...signals, ...candidates].map((signal, index) => [signal.id || `${signal.symbol}-${signal.updatedAt || "unknown"}-${index}`, signal])).values()];
  const assets = new Set(feed.map((signal) => signal.symbol).filter(Boolean));
  const confidenceValues = feed.map((signal) => signal.confidence)
    .filter((value) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100);
  const providers = new Set(feed.flatMap((signal) => Array.isArray(signal.providers) ? signal.providers : [])
    .filter((provider) => typeof provider === "string" && provider.trim())
    .map((provider) => provider.trim().toLowerCase()));

  return {
    available: true,
    assets: assets.size,
    signals: feed.length,
    confidence: confidenceValues.length ? confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length : null,
    providers: providers.size || null,
  };
}
