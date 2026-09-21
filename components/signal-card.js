/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Evidence from "./evidence";
import Lifecycle from "./lifecycle";
import TradeActions from "./trade-actions";
import { formatPercent, formatPrice, formatScore, formatTime, hasValue } from "./format";

function compactNumber(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return null;
  const number = Number(value);
  if (Math.abs(number) >= 1000000000) return `${(number / 1000000000).toFixed(1)}B`;
  if (Math.abs(number) >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (Math.abs(number) >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return number.toFixed(0);
}

function TokenLogo({ signal }) {
  const [failed, setFailed] = useState(false);
  const initials = String(signal.symbol || "?").replace(/^\$/, "").slice(0, 3);
  if (failed || !signal.logoUrl) return <span className="token-logo token-logo-fallback" aria-hidden="true">{initials}</span>;
  return <img className="token-logo" src={signal.logoUrl} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

function Sparkline({ points, direction }) {
  if (!Array.isArray(points) || points.length < 2) return <div className="signal-chart-empty">Chart loading</div>;
  const width = 180;
  const height = 52;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const path = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width;
    const y = height - ((point - min) / range) * (height - 8) - 4;
    return `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return <svg className={`signal-sparkline signal-sparkline-${String(direction || "neutral").toLowerCase()}`} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Recent price movement"><path d={path} fill="none" vectorEffect="non-scaling-stroke" /></svg>;
}

function Metric({ label, value, change = false }) {
  if (!hasValue(value)) return null;
  return <div className="signal-metric"><span>{label}</span><strong className={change ? (value > 0 ? "positive" : value < 0 ? "negative" : "") : ""}>{change ? formatPercent(value) : value}</strong></div>;
}

export default function SignalCard({ signal, compact = false }) {
  const title = signal.signalType || (signal.direction ? `${signal.direction} SETUP` : "SETUP");
  const lifecycle = signal.lifecycle || "UNCLASSIFIED";

  return (
    <article className={`signal-card${compact ? " signal-card-compact" : ""}`}>
      <div className="signal-card-topline">
        <div className="signal-token-identity">
          <TokenLogo signal={signal} />
          <div><p className="signal-symbol">{signal.symbol}</p>{signal.name ? <p className="signal-name">{signal.name}</p> : null}</div>
        </div>
        <p className="signal-status">{lifecycle}</p>
      </div>
      <p className="signal-type">{title}</p>
      <div className="signal-chart-row">
        <Sparkline points={signal.priceHistory} direction={signal.direction} />
        <div className="signal-market-meta">
          {signal.price !== null ? <strong>{formatPrice(signal.price)}</strong> : <strong>Price pending</strong>}
          {signal.priceChange24h !== null ? <span className={signal.priceChange24h >= 0 ? "positive" : "negative"}>{formatPercent(signal.priceChange24h)}</span> : null}
          <small>{signal.exchange || "Perpetual market"}{signal.volume24h !== null ? ` · Vol ${compactNumber(signal.volume24h)}` : ""}</small>
        </div>
      </div>
      <div className="signal-primary-metrics">
        <Metric label="Score" value={formatScore(signal.score)} />
        <Metric label="Confidence" value={hasValue(signal.confidence) ? `${Math.round(signal.confidence)} percent` : null} />
        <Metric label="24h move" value={signal.priceChange24h} change />
      </div>
      {!compact ? (
        <>
          <div className="signal-details">
            <Metric label="Price" value={formatPrice(signal.price)} />
            <Metric label="1h move" value={signal.priceChange1h} change />
            <Metric label="Entry" value={formatPrice(signal.entry)} />
            <Metric label="TP1" value={formatPrice(signal.tp1)} />
            <Metric label="TP2" value={formatPrice(signal.tp2)} />
            <Metric label="Stop" value={formatPrice(signal.stop)} />
          </div>
          {signal.exchange ? <p className="signal-exchange">Market: {signal.exchange}</p> : null}
          <Lifecycle signal={signal} />
          <Evidence evidence={signal.evidence} risks={signal.risks} providers={signal.providers} />
          <TradeActions actions={signal.tradeActions} />
          <p className="signal-updated">Updated {formatTime(signal.updatedAt) || "not available"}</p>
        </>
      ) : null}
    </article>
  );
}
