import { normalizeCandidates, normalizeSignals } from "../../../lib/signals";

export const dynamic = "force-dynamic";

const apiBaseUrl = (process.env.PERPSIA_API_BASE_URL || "https://perpsia.onrender.com").replace(/\/$/, "");
const signalsUrl = process.env.PERPSIA_SIGNAL_API_URL || `${apiBaseUrl}/api/signals?days=2`;
const qualityUrl = `${apiBaseUrl}/api/signal-quality?settle=0`;
const internalApiToken = process.env.PERPSIA_API_TOKEN || process.env.PERPSIA_INTERNAL_API_TOKEN;

async function fetchJson(url, retries = 1) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: internalApiToken ? { Authorization: `Bearer ${internalApiToken}` } : undefined,
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

function binancePair(signal) {
  const symbol = String(signal?.symbol || "").replace(/^\$/, "").replace(/[^a-z0-9]/gi, "").toUpperCase();
  return symbol ? `${symbol}USDT` : null;
}

async function enrichMarketContext(records) {
  const targets = records.filter((signal) => !signal.priceHistory?.length).slice(0, 12);
  const enriched = await Promise.all(targets.map(async (signal) => {
    const pair = binancePair(signal);
    if (!pair) return signal;
    try {
      const response = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${pair}&interval=1h&limit=24`, {
        cache: "no-store",
        signal: AbortSignal.timeout(2500),
      });
      if (!response.ok) return signal;
      const candles = await response.json();
      const priceHistory = Array.isArray(candles) ? candles.map((candle) => Number(candle?.[4])).filter(Number.isFinite) : [];
      if (priceHistory.length < 2) return signal;
      const volume24h = candles.slice(-24).reduce((total, candle) => total + (Number(candle?.[7]) || 0), 0);
      return { ...signal, priceHistory, price: signal.price ?? priceHistory.at(-1), volume24h: signal.volume24h ?? volume24h };
    } catch {
      return signal;
    }
  }));
  const byId = new Map(enriched.map((signal) => [signal.id, signal]));
  return records.map((signal) => byId.get(signal.id) || signal);
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
    const candidates = normalizeCandidates(signalsPayload)
      .filter((signal) => signal.direction && signal.earlyCandidate);
    const enriched = await enrichMarketContext([...signals, ...candidates]);
    const enrichedById = new Map(enriched.map((signal) => [signal.id, signal]));
    const enrichedSignals = signals.map((signal) => enrichedById.get(signal.id) || signal);
    const enrichedCandidates = candidates.map((signal) => enrichedById.get(signal.id) || signal);

    return Response.json(
      {
        signals: enrichedSignals,
        candidates: enrichedCandidates,
        quality: qualityContext(qualityResult),
        meta: {
          source: process.env.PERPSIA_SIGNAL_API_URL ? "configured-signal-api" : signalsPayload?.meta?.source || "active-signals",
          updatedAt: signalsPayload?.meta?.updatedAt || null,
          stale: Boolean(signalsPayload?.meta?.stale),
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
