import { normalizeSignals } from "../../../lib/signals";

export const dynamic = "force-dynamic";

const apiBaseUrl = (process.env.PERPSIA_API_BASE_URL || "https://perpsia.onrender.com").replace(/\/$/, "");
const signalsUrl = process.env.PERPSIA_SIGNAL_API_URL || `${apiBaseUrl}/api/performance/trades?days=30`;
const qualityUrl = `${apiBaseUrl}/api/signal-quality?settle=0`;

async function fetchJson(url, retries = 1) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Upstream status ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

function qualityContext(payload) {
  const selected = payload?.horizons?.[payload?.selectedHorizon || "24h"];
  const statistics = selected?.sufficientObservations ? selected.statistics : null;
  return {
    ready: Boolean(statistics),
    minimumObservations: Number(payload?.minimumObservations) || null,
    evaluatedSignals: Number(selected?.observations) || 0,
    statistics: statistics
      ? {
          tp1HitRate: statistics.tp1HitRate,
          tp2HitRate: statistics.tp2HitRate,
          stopRate: statistics.stopRate,
          averageFavorableMove: statistics.averageFavorableMove,
          averageAdverseMove: statistics.averageAdverseMove,
        }
      : null,
  };
}

export async function GET() {
  try {
    const [signalsPayload, qualityResult] = await Promise.all([
      fetchJson(signalsUrl),
      fetchJson(qualityUrl).catch(() => null),
    ]);
    const signals = normalizeSignals(signalsPayload)
      .filter((signal) => !signal.lifecycle || ["OPEN", "ACTIVE", "BUILDING", "CONFIRMED", "DISCOVERED"].includes(signal.lifecycle));

    return Response.json(
      {
        signals,
        quality: qualityContext(qualityResult),
        meta: {
          source: process.env.PERPSIA_SIGNAL_API_URL ? "configured-signal-api" : "performance-trades",
          updatedAt: new Date().toISOString(),
          stale: false,
        },
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch {
    return Response.json(
      {
        signals: [],
        quality: { ready: false, minimumObservations: null, evaluatedSignals: 0, statistics: null },
        meta: { source: null, updatedAt: null, stale: true },
        error: "Live signals are temporarily unavailable.",
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
