const SUPPORTED_VENUES = new Set(["Binance", "Bybit", "OKX", "Hyperliquid"]);

function asNumber(value) {
  if (value === null || value === undefined || (typeof value === "string" && !value.trim())) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function cleanSymbol(value) {
  const symbol = String(value || "").trim().toUpperCase();
  return symbol ? (symbol.startsWith("$") ? symbol : `$${symbol}`) : null;
}

function validTradeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function normalizeTradeActions(source) {
  const actions = source?.tradingLinks || source?.tradeLinks || source?.trade_actions || source?.tradeActions;
  if (!actions || typeof actions !== "object") return [];

  return Object.entries(actions)
    .map(([venue, action]) => {
      const name = String(action?.venue || action?.name || venue || "").trim();
      const url = validTradeUrl(typeof action === "string" ? action : action?.url || action?.href);
      if (!SUPPORTED_VENUES.has(name) || !url) return null;
      return { venue: name, url };
    })
    .filter(Boolean);
}

export function normalizeSignal(source, index = 0) {
  const direction = String(source?.direction || source?.side || "").trim().toUpperCase() || null;
  const signalType = String(source?.signalType || source?.signal_type || "").trim()
    || (direction ? `${direction} SETUP` : null);
  const timestamp = source?.updatedAt || source?.updated_at || source?.signal_time || source?.timestamp || null;
  const status = String(source?.lifecycleState || source?.lifecycle_state || source?.lifecycle || source?.status || "").trim().toUpperCase() || null;

  return {
    id: String(source?.id || `${source?.symbol || "signal"}-${timestamp || index}-${direction || ""}`),
    symbol: cleanSymbol(source?.symbol || source?.asset || source?.ticker),
    name: String(source?.name || source?.tokenName || source?.token_name || "").trim() || null,
    signalType,
    direction,
    score: asNumber(source?.score),
    confidence: asNumber(source?.confidence ?? source?.confidence_score),
    lifecycle: status,
    price: asNumber(source?.currentPrice || source?.current_price || source?.marketPrice || source?.market_price || source?.price),
    priceChange1h: asNumber(source?.priceChange1h || source?.price_change_1h || source?.change_1h),
    priceChange24h: asNumber(source?.priceChange24h || source?.price_change_24h || source?.change_24h),
    entry: asNumber(source?.entry || source?.entry_price),
    tp1: asNumber(source?.tp1 || source?.tp1_price),
    tp2: asNumber(source?.tp2 || source?.tp2_price),
    stop: asNumber(source?.stop || source?.stop_price),
    exchange: String(source?.venue || source?.exchange || "").trim() || null,
    updatedAt: timestamp,
    previousState: String(source?.previousState || source?.previous_state || "").trim().toUpperCase() || null,
    previousScore: asNumber(source?.previousScore || source?.previous_score),
    evidence: asArray(source?.evidence || source?.reasons || source?.why),
    risks: asArray(source?.risks || source?.conflicts || source?.risk),
    providers: asArray(source?.providers || source?.provider),
    watchlist: Boolean(source?.watchlist || source?.isWatchlist),
    tradeActions: normalizeTradeActions(source),
  };
}

export function normalizeSignals(payload) {
  const records = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.signals)
      ? payload.signals
      : Array.isArray(payload?.trades)
        ? payload.trades
        : [];

  return records.map(normalizeSignal).filter((signal) => signal.symbol);
}
