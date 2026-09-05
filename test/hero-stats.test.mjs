import test from "node:test";
import assert from "node:assert/strict";
import { FEED_STALE_MS, getHeroStats } from "../lib/hero-stats.mjs";
import { normalizeSignal } from "../lib/signals.js";

const now = Date.parse("2026-09-05T12:00:00Z");
const payload = (signals = []) => ({ signals, meta: { updatedAt: new Date(now).toISOString(), stale: false } });

test("an empty successful feed has zero signals and no fabricated confidence or sources", () => {
  assert.deepEqual(getHeroStats(payload(), { now }), { available: true, assets: 0, signals: 0, confidence: null, providers: null });
});

test("counts unique assets and providers while averaging valid confidence including zero", () => {
  const result = getHeroStats(payload([
    { symbol: "$BTC", confidence: 80, providers: ["Binance", "OKX"] },
    { symbol: "$BTC", confidence: 0, providers: ["binance", " OKX "] },
    { symbol: "$SOL", confidence: null, providers: ["DexScreener"] },
    { symbol: "$SOL", confidence: 150, providers: [] },
  ]), { now });
  assert.deepEqual(result, { available: true, assets: 2, signals: 4, confidence: 40, providers: 3 });
});

test("failed, loading, missing and stale feeds never show cached numbers as live", () => {
  const data = payload([{ symbol: "$BTC", confidence: 90 }]);
  for (const state of [{ error: true }, { loading: true }, { now: now + FEED_STALE_MS + 1 }]) {
    const result = getHeroStats(data, { now, ...state });
    assert.equal(result.available, false);
    assert.equal(result.signals, null);
    assert.equal(result.confidence, null);
  }
  assert.equal(getHeroStats(null, { now }).available, false);
  assert.equal(getHeroStats({ ...data, meta: { ...data.meta, stale: true } }, { now }).available, false);
});

test("malformed timestamps and malformed feeds remain unavailable", () => {
  for (const meta of [{ updatedAt: "bad", stale: false }, { updatedAt: new Date(now + 120000).toISOString(), stale: false }]) {
    assert.equal(getHeroStats({ signals: [], meta }, { now }).available, false);
  }
  assert.equal(getHeroStats({ signals: {}, meta: payload().meta }, { now }).available, false);
});

test("signal normalization preserves missing confidence and legitimate zero", () => {
  assert.equal(normalizeSignal({ symbol: "BTC", confidence: null }).confidence, null);
  assert.equal(normalizeSignal({ symbol: "BTC", confidence: "" }).confidence, null);
  assert.equal(normalizeSignal({ symbol: "BTC", confidence: 0, confidence_score: 90 }).confidence, 0);
  assert.equal(normalizeSignal({ symbol: "BTC", confidence_score: "78.4" }).confidence, 78.4);
});
