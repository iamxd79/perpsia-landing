"use client";

import { useMemo, useState } from "react";
import EmptyState from "./empty-state";
import ErrorState from "./error-state";
import PerformanceContext from "./performance-context";
import SignalCard from "./signal-card";
import { formatTime } from "./format";
import { useSignalData } from "./use-signal-data";

const signalKinds = ["All", "Long", "Short", "Early Momentum", "Watchlist"];

function typeMatches(signal, filter) {
  if (filter === "All") return true;
  if (filter === "Watchlist") return signal.watchlist;
  if (filter === "Early Momentum") return String(signal.signalType || "").toUpperCase().includes("EARLY MOMENTUM");
  return signal.direction === filter.toUpperCase();
}

function actionableRank(signal) {
  return ["OPEN", "ACTIVE", "CONFIRMED", "BUILDING"].includes(signal.lifecycle) ? 1 : 0;
}

export default function SignalsBoard() {
  const { data, error, loading, refresh } = useSignalData();
  const [kind, setKind] = useState("All");
  const [lifecycle, setLifecycle] = useState("All");
  const [exchange, setExchange] = useState("All");
  const [minimumScore, setMinimumScore] = useState("0");
  const [minimumConfidence, setMinimumConfidence] = useState("0");
  const [sort, setSort] = useState("default");
  const signals = data?.signals || [];
  const lifecycleOptions = [...new Set(signals.map((signal) => signal.lifecycle).filter(Boolean))];
  const exchangeOptions = [...new Set(signals.map((signal) => signal.exchange).filter(Boolean))];

  const visibleSignals = useMemo(() => {
    const score = Number(minimumScore) || 0;
    const confidence = Number(minimumConfidence) || 0;
    const filtered = [...signals].filter((signal) => typeMatches(signal, kind)
      && (lifecycle === "All" || signal.lifecycle === lifecycle)
      && (exchange === "All" || signal.exchange === exchange)
      && (signal.score === null || signal.score >= score)
      && (signal.confidence === null || signal.confidence >= confidence));

    return filtered.sort((a, b) => {
      if (sort === "score") return (b.score ?? -Infinity) - (a.score ?? -Infinity);
      if (sort === "confidence") return (b.confidence ?? -Infinity) - (a.confidence ?? -Infinity);
      if (sort === "move") return (b.priceChange24h ?? -Infinity) - (a.priceChange24h ?? -Infinity);
      if (sort === "newest") return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
      return actionableRank(b) - actionableRank(a)
        || (b.confidence ?? -Infinity) - (a.confidence ?? -Infinity)
        || (b.score ?? -Infinity) - (a.score ?? -Infinity)
        || new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });
  }, [signals, kind, lifecycle, exchange, minimumScore, minimumConfidence, sort]);

  return (
    <>
      <div className="signals-status-row">
        <p>Live</p>
        <p>Auto refreshing</p>
        {data?.meta?.updatedAt ? <p>Last updated {formatTime(data.meta.updatedAt)}</p> : null}
      </div>
      <div className="signal-filters" aria-label="Live signal filters">
        <div className="filter-tabs" role="group" aria-label="Signal type">
          {signalKinds.map((item) => <button key={item} type="button" className={kind === item ? "is-selected" : ""} onClick={() => setKind(item)}>{item}</button>)}
        </div>
        <div className="filter-selects">
          <label>Lifecycle<select value={lifecycle} onChange={(event) => setLifecycle(event.target.value)}><option>All</option>{lifecycleOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Exchange<select value={exchange} onChange={(event) => setExchange(event.target.value)}><option>All</option>{exchangeOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Minimum score<select value={minimumScore} onChange={(event) => setMinimumScore(event.target.value)}><option value="0">Any</option><option value="6">6.0</option><option value="7">7.0</option><option value="8">8.0</option></select></label>
          <label>Minimum confidence<select value={minimumConfidence} onChange={(event) => setMinimumConfidence(event.target.value)}><option value="0">Any</option><option value="60">60 percent</option><option value="70">70 percent</option><option value="80">80 percent</option></select></label>
          <label>Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">Default</option><option value="score">Score</option><option value="confidence">Confidence</option><option value="newest">Newest</option><option value="move">24h Move</option></select></label>
        </div>
      </div>
      {loading ? <p className="loading-state">Loading live signals</p> : null}
      {!loading && error ? <ErrorState onRetry={refresh} /> : null}
      {!loading && !error && !visibleSignals.length ? <EmptyState /> : null}
      {!loading && !error && visibleSignals.length ? <div className="signals-grid">{visibleSignals.map((signal) => <SignalCard key={signal.id} signal={signal} />)}</div> : null}
      <p className="affiliate-disclosure">Trading links may be affiliate links.</p>
      <section className="signals-performance" aria-labelledby="signals-performance-title">
        <p className="eyebrow">Signal Quality</p>
        <h2 id="signals-performance-title">Performance context</h2>
        <PerformanceContext quality={data?.quality} />
      </section>
    </>
  );
}
