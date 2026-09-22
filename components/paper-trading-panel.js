import { ArrowUpRight, BarChart3, BellRing, Send, ShieldCheck } from "lucide-react";

const botUrl = "https://t.me/perpsia_bot";

export default function PaperTradingPanel({ compact = false }) {
  return (
    <section className={`section paper-trading-panel${compact ? " paper-trading-panel-compact" : ""}`}>
      <div className="section-heading">
        <p className="eyebrow">Paper trading</p>
        <h2>{compact ? "Test the setup before you trade it." : "Turn every signal into a measurable paper trade."}</h2>
        <p className="section-lede">Simulate LONG and SHORT positions in Telegram with entry, margin, leverage, stop-loss, take-profit, live PnL, and automatic exit notifications. Simulation only — no real orders are sent.</p>
      </div>
      <div className="three-column-grid">
        <article className="step-card">
          <p><BarChart3 size={18} aria-hidden="true" /> PAPER POSITION</p>
          <h3>Model the trade</h3>
          <span>Set the symbol, direction, margin, leverage, SL, and TP to see the position’s notional size and unrealized PnL.</span>
        </article>
        <article className="step-card">
          <p><BellRing size={18} aria-hidden="true" /> AUTOMATIC TRACKING</p>
          <h3>Know when it exits</h3>
          <span>PerpsIA checks public market prices and sends a Telegram notification when the simulated stop-loss or take-profit is reached.</span>
        </article>
        <article className="step-card">
          <p><ShieldCheck size={18} aria-hidden="true" /> PRIVATE STATS</p>
          <h3>Measure your process</h3>
          <span>Positions, closed trades, wins, losses, win rate, and realized PnL are kept private to each Telegram user.</span>
        </article>
      </div>
      <a className="button button-secondary" href={botUrl} target="_blank" rel="noopener noreferrer">
        <Send size={17} strokeWidth={2.2} /> Try paper trading on Telegram <ArrowUpRight size={18} strokeWidth={2.1} />
      </a>
    </section>
  );
}