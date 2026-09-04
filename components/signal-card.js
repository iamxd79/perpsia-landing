import Evidence from "./evidence";
import Lifecycle from "./lifecycle";
import TradeActions from "./trade-actions";
import { formatPercent, formatPrice, formatScore, formatTime, hasValue } from "./format";

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
        <div>
          <p className="signal-symbol">{signal.symbol}</p>
          {signal.name ? <p className="signal-name">{signal.name}</p> : null}
        </div>
        <p className="signal-status">{lifecycle}</p>
      </div>
      <p className="signal-type">{title}</p>
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
