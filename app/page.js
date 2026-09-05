import Image from "next/image";
import { ChartNoAxesColumnIncreasing, Crosshair, Database, Percent } from "lucide-react";
import HomeHero from "../components/home-hero";
import SiteFooter from "../components/site-footer";
import { Section } from "../components/section-layout";

const botUrl = "https://t.me/perpsia_bot";

const providerGroups = [
  ["Derivatives", "Binance", "Bybit", "OKX", "Hyperliquid"],
  ["Market research", "CoinMarketCap"],
  ["DEX", "DexScreener", "GeckoTerminal"],
  ["Security", "GoPlus", "Honeypot.is"],
  ["Macro", "Alternative.me Fear and Greed", "FRED when configured"],
  ["Onchain", "Public RPC monitoring"],
  ["Project activity", "GitHub when a verified repository exists"],
];

const features = [
  ["Funding and Open Interest", "See whether leverage is building with or against price."],
  ["Order Books", "Track buyer and seller pressure across supported venues."],
  ["DEX Activity", "Watch volume, liquidity, transactions, and early momentum."],
  ["Signal Conflicts", "Flag setups where price, trend, funding, or flow disagree."],
  ["Token Security", "Block or reduce confidence when security checks show serious risk."],
  ["Market Regime", "Use broader market conditions as context without making them the trade signal."],
];

export default function Home() {
  return (
    <div className="site-shell">
      <main>
        <HomeHero />

        <Section id="how-it-works" eyebrow="How PerpsIA works" title="From market data to a clear setup.">
          <div className="three-column-grid">
            <article className="step-card"><p>Step 1</p><h3>Watch the market</h3><span>PerpsIA pulls live price, volume, funding, open interest, order book, DEX, security, macro, and onchain data.</span></article>
            <article className="step-card"><p>Step 2</p><h3>Score the setup</h3><span>The PerpsIA engine compares the evidence, checks conflicts, scores the setup, and assigns a lifecycle state.</span></article>
            <article className="step-card"><p>Step 3</p><h3>Track what changes</h3><span>PerpsIA remembers previous scans and shows when a setup strengthens, weakens, confirms, or breaks.</span></article>
          </div>
        </Section>

        <Section eyebrow="Evidence" title="One signal. Multiple sources." className="sources-section">
          <p className="section-lede">PerpsIA compares evidence from different parts of the market before scoring a setup.</p>
          <div className="provider-grid">
            {providerGroups.map(([group, ...providers]) => <article key={group}><h3>{group}</h3><ul>{providers.map((provider) => <li key={provider}>{provider}</li>)}</ul></article>)}
          </div>
        </Section>

        <Section eyebrow="Lifecycle" title="Track the same setup over time." className="lifecycle-section">
          <p className="section-lede">PerpsIA does not treat every scan as a new signal. It tracks the same opportunity as market conditions change.</p>
          <div className="lifecycle-example">
            <div className="example-label">Example</div>
            <div className="lifecycle-example-title"><strong>$SOL</strong><span>Setup lifecycle</span></div>
            <div className="lifecycle-example-states">
              <article><p>DISCOVERED</p><strong>Score 6.4</strong></article>
              <article><p>BUILDING</p><strong>Score 7.2</strong></article>
              <article><p>CONFIRMED</p><strong>Score 8.3</strong></article>
            </div>
            <div className="lifecycle-states-list"><span>DISCOVERED</span><span>BUILDING</span><span>CONFIRMED</span><span>ACTIVE</span><span>INVALIDATED</span></div>
          </div>
        </Section>

        <Section eyebrow="Market context" title="Read the parts of the market that change a trade.">
          <div className="feature-grid">
            {features.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </Section>

        <Section id="early-alpha" eyebrow="Early Alpha" title="Catch momentum before it gets crowded." className="early-alpha-section">
          <div className="split-section">
            <div><p className="section-lede">PerpsIA watches early token activity for rising volume, liquidity, transactions, and price momentum before the move becomes heavily extended.</p><a className="button button-secondary" href={botUrl} target="_blank" rel="noopener noreferrer">Open Early Alpha on Telegram</a></div>
            <article className="alpha-example"><Image src="/images/beta-illustration.png" alt="PerpsIA early alpha illustration" width={900} height={900} className="alpha-image" /><p className="example-label">Example</p><strong>$TOKEN</strong><span>EARLY MOMENTUM</span><dl><div><dt>Score</dt><dd>8.4</dd></div><div><dt>Confidence</dt><dd>79 percent</dd></div><div><dt>24h move</dt><dd>+7.2 percent</dd></div><div><dt>Volume acceleration</dt><dd>+186 percent</dd></div><div><dt>Volume to market cap</dt><dd>34 percent</dd></div><div><dt>Liquidity</dt><dd>Rising</dd></div></dl><p className="signal-status">BUILDING</p></article>
          </div>
        </Section>

        <section className="section risk-section">
          <div className="section-heading">
            <p className="eyebrow">Risk</p>
            <h2>A setup is incomplete without risk.</h2>
            <p className="section-lede risk-copy">PerpsIA uses the user&apos;s capital, risk percentage, and leverage limit to size actionable setups.</p>
          </div>
          <div className="risk-layout">
            <dl className="risk-profile">
              <div><span className="risk-metric-icon" aria-hidden="true"><Database size={28} strokeWidth={1.9} /></span><div><dt>Capital</dt><dd>$500</dd></div></div>
              <div><span className="risk-metric-icon" aria-hidden="true"><Percent size={28} strokeWidth={2} /></span><div><dt>Risk per trade</dt><dd>1 percent</dd></div></div>
              <div><span className="risk-metric-icon" aria-hidden="true"><ChartNoAxesColumnIncreasing size={28} strokeWidth={1.9} /></span><div><dt>Max leverage</dt><dd>5x</dd></div></div>
            </dl>
            <article className="risk-position-card">
              <span className="risk-position-icon" aria-hidden="true"><Crosshair size={38} strokeWidth={1.7} /></span>
              <p className="risk-position-label">Position sizing</p>
              <p>Position size is calculated from the setup&apos;s actual stop distance.</p>
            </article>
          </div>
        </section>

        <Section id="performance" eyebrow="Signal Quality" title="PerpsIA tracks what happens after every signal.">
          <p className="section-lede">Signals are evaluated after 1 hour, 4 hours, 12 hours, 24 hours, and 72 hours.</p>
          <div className="performance-list"><span>TP1</span><span>TP2</span><span>Stop</span><span>Maximum favorable excursion</span><span>Maximum adverse excursion</span><span>Return after signal</span></div>
          <p className="collecting-state">Performance data is still being collected.</p>
        </Section>

        <Section id="telegram" eyebrow="Telegram" title="Built for Telegram." className="telegram-section">
          <div className="split-section"><div><p className="section-lede">Scan markets, analyze a token, track early momentum, set risk, compare setups, and follow signals without opening another trading dashboard.</p><a className="button" href={botUrl} target="_blank" rel="noopener noreferrer">Open PerpsIA</a></div><div className="telegram-right"><div className="telegram-image-frame"><Image src="/images/telegram-mockup.png" alt="PerpsIA Telegram market intelligence" width={1000} height={1000} className="telegram-image" /></div><div className="command-list"><code>/scan</code><code>/analyze $BTC</code><code>/alpha</code><code>/risk</code><code>/compare $SOL $ETH</code><code>/backtest $BTC</code></div></div></div>
        </Section>

        <section className="closing-cta"><p className="eyebrow">PerpsIA</p><h2>See what PerpsIA sees.</h2><p>Run a market scan or analyze your first setup on Telegram.</p><a className="button" href={botUrl} target="_blank" rel="noopener noreferrer">Launch PerpsIA</a></section>
      </main>
      <SiteFooter />
    </div>
  );
}
