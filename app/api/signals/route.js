import { normalizeCandidates, normalizeSignals } from "../../../lib/signals";

export const dynamic = "force-dynamic";

const apiBaseUrl = (process.env.PERPSIA_API_BASE_URL || "https://perpsia.onrender.com").replace(/\/$/, "");
const signalsUrl = process.env.PERPSIA_SIGNAL_API_URL || `${apiBaseUrl}/api/signals?days=2`;
const qualityUrl = `${apiBaseUrl}/api/signal-quality?settle=0`;
const performanceUrl = `${apiBaseUrl}/api/performance?days=365&settle=0`;
const internalApiToken = process.env.PERPSIA_API_TOKEN || process.env.PERPSIA_INTERNAL_API_TOKEN;

const capabilities = {
  liveSignals: true,
  paperTrading: true,
  paperTradingMode: "simulation_only",
  livePnlTracking: true,
  automaticStopLossTakeProfitAlerts: true,
  privateUserAnalytics: true,
  marketDataFallbacks: ["Binance", "Bybit", "OKX"],
};

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
      const baseSymbol = pair.replace(/USDT$/, "");
      const endpoints = [
        { name: "Binance", url: `https://fapi.binance.com/fapi/v1/klines?symbol=${pair}&interval=1h&limit=24`, rows: (payload) => payload, volumeIndex: 7, reverse: false },
        { name: "Binance", url: `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=1h&limit=24`, rows: (payload) => payload, volumeIndex: 7, reverse: false },
        { name: "Bybit", url: `https://api.bybit.com/v5/market/kline?category=linear&symbol=${pair}&interval=60&limit=24`, rows: (payload) => payload?.result?.list, volumeIndex: 6, reverse: true },
        { name: "OKX", url: `https://www.okx.com/api/v5/market/candles?instId=${baseSymbol}-USDT-SWAP&bar=1H&limit=24`, rows: (payload) => payload?.data, volumeIndex: 7, reverse: true },
      ];
      let candles = null;
      let sourceName = null;
      let volumeIndex = 7;
      let reverse = false;
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint.url, {
            cache: "no-store",
            signal: AbortSignal.timeout(2500),
          });
          if (!response.ok) continue;
          const payload = await response.json();
          const rows = endpoint.rows(payload);
          if (Array.isArray(rows) && rows.length >= 2) {
            candles = rows;
            sourceName = endpoint.name;
            volumeIndex = endpoint.volumeIndex;
            reverse = endpoint.reverse;
            break;
          }
        } catch {
          // Continue through the public exchange fallbacks.
        }
      }
      if (!candles) return signal;
      const orderedCandles = reverse ? [...candles].reverse() : candles;
      const priceHistory = orderedCandles.map((candle) => Number(candle?.[4])).filter(Number.isFinite);
      if (priceHistory.length < 2) return signal;
      const volume24h = orderedCandles.slice(-24).reduce((total, candle) => total + (Number(candle?.[volumeIndex]) || 0), 0);
      const firstPrice = priceHistory[0];
      const lastPrice = priceHistory.at(-1);
      const priceChange24h = firstPrice ? ((lastPrice - firstPrice) / firstPrice) * 100 : null;
      return { ...signal, priceHistory, price: signal.price ?? lastPrice, priceChange24h: signal.priceChange24h ?? priceChange24h, volume24h: signal.volume24h ?? volume24h, exchange: signal.exchange || sourceName };
    } catch {
      return signal;
    }
  }));
  const byId = new Map(enriched.map((signal) => [signal.id, signal]));
  return records.map((signal) => byId.get(signal.id) || signal);
}

function qualityContext(payload, performancePayload) {
  const selected = payload?.horizons?.[payload?.selectedHorizon || "24h"];
  const publicSummary = performancePayload?.last_30_days || {};
  const statistics = selected?.sufficientObservations ? selected.statistics : null;
  return {
    ready: Boolean(statistics),
    minimumObservations: Number(payload?.minimumObservations) || null,
    evaluatedSignals: Number(selected?.observations) || Number(publicSummary.closed_signals) || 0,
    trackedSignals: Number(payload?.totalSignals) || Number(publicSummary.total_signals) || 0,
    settledSignals: Number(publicSummary.closed_signals) || 0,
    dataStatus: payload?.dataStatus || performancePayload?.data_status || "collecting_real_observations",
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
    const [signalsPayload, qualityResult, performanceResult] = await Promise.all([
      fetchJson(signalsUrl),
      fetchJson(qualityUrl).catch(() => null),
      fetchJson(performanceUrl).catch(() => null),
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
        capabilities,
        quality: qualityContext(qualityResult, performanceResult),
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
        capabilities,
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
