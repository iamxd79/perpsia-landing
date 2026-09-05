export const FEED_REFRESH_MS = 90000;
export const FEED_STALE_MS = 5 * 60 * 1000;

// These counts describe the published feed, not the entire scanner universe.
export function getHeroStats(data, { error = false, loading = false, now = Date.now() } = {}) {
  const updatedAt = Date.parse(data?.meta?.updatedAt);
  const available = !loading && !error && data?.meta?.stale === false
    && Array.isArray(data?.signals) && Number.isFinite(updatedAt)
    && now - updatedAt <= FEED_STALE_MS && updatedAt <= now + 60000;
  if (!available) return { available: false, assets: null, signals: null, confidence: null, providers: null };

  const signals = data.signals;
  const assets = new Set(signals.map((signal) => signal.symbol).filter(Boolean));
  const confidenceValues = signals.map((signal) => signal.confidence)
    .filter((value) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100);
  const providers = new Set(signals.flatMap((signal) => Array.isArray(signal.providers) ? signal.providers : [])
    .filter((provider) => typeof provider === "string" && provider.trim())
    .map((provider) => provider.trim().toLowerCase()));

  return {
    available: true,
    assets: assets.size,
    signals: signals.length,
    confidence: confidenceValues.length ? confidenceValues.reduce((sum, value) => sum + value, 0) / confidenceValues.length : null,
    providers: providers.size || null,
  };
}
