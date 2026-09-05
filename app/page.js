import Image from "next/image";
import { Activity, ArrowUpRight, ChartNoAxesColumnIncreasing, Crosshair, Database, Droplets, FileText, Percent, Send, ShieldCheck, Zap } from "lucide-react";
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

        <section id="early-alpha" className="section early-alpha-section">
          <div className="early-alpha-layout">
            <div className="early-alpha-copy">
              <p className="eyebrow early-alpha-eyebrow">Early Alpha</p>
              <h2>Catch momentum before it gets crowded.</h2>
              <p className="section-lede">PerpsIA watches early token activity for rising volume, liquidity, transactions, and price momentum before the move becomes heavily extended.</p>
              <a className="button button-secondary early-alpha-button" href={botUrl} target="_blank" rel="noopener noreferrer"><Send size={17} strokeWidth={2.2} />Open Early Alpha on Telegram<ArrowUpRight size={18} strokeWidth={2.1} /></a>
            </div>
            <div className="early-alpha-showcase">
              <div className="alpha-signal-tags" aria-label="Early alpha signals">
                <span><Activity size={20} />Rising volume</span>
                <span><Droplets size={20} />Liquidity</span>
                <span><FileText size={20} />Transactions</span>
                <span><Zap size={20} />Momentum</span>
              </div>
              <article className="alpha-example">
                <div className="alpha-example-heading">
                  <div><p className="example-label">Example</p><strong>$TOKEN</strong><span>EARLY MOMENTUM</span></div>
                  <Image src="/images/beta-illustration.png" alt="PerpsIA early alpha illustration" width={900} height={900} className="alpha-image" />
                </div>
                <dl><div><dt>Score</dt><dd>8.4</dd></div><div><dt>Confidence</dt><dd>79 percent</dd></div><div><dt>24h move</dt><dd>+7.2 percent</dd></div><div><dt>Volume acceleration</dt><dd>+186 percent</dd></div><div><dt>Volume to market cap</dt><dd>34 percent</dd></div><div><dt>Liquidity</dt><dd>Rising</dd></div></dl>
                <p className="signal-status">BUILDING<span aria-hidden="true">•••</span></p>
              </article>
            </div>
          </div>
        </section>

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

        <section id="telegram" className="section telegram-section">
          <div className="telegram-layout">
            <div className="telegram-copy-card">
              <p className="telegram-kicker"><span className="telegram-kicker-icon"><Send size={18} strokeWidth={2.2} /></span><span>Telegram</span></p>
              <h2>Built for Telegram.</h2>
              <p className="section-lede">Scan markets, analyze a token, track early momentum, set risk, compare setups, and follow signals without opening another trading dashboard.</p>
              <a className="button telegram-button" href={botUrl} target="_blank" rel="noopener noreferrer"><Send size={17} strokeWidth={2.2} />Open PerpsIA<ArrowUpRight size={18} strokeWidth={2.1} /></a>
              <div className="telegram-benefits" aria-label="Telegram benefits">
                <span><Zap size={17} strokeWidth={2.2} />Fast</span>
                <span><ShieldCheck size={17} strokeWidth={2.2} />Private</span>
                <span><ChartNoAxesColumnIncreasing size={17} strokeWidth={2.2} />Built for traders</span>
              </div>
            </div>
            <div className="telegram-visual">
              <div className="telegram-image-frame"><Image src="/images/telegram-mockup.png" alt="PerpsIA Telegram market intelligence" width={1000} height={1000} className="telegram-image" /></div>
              <div className="command-list"><code><Send size={15} />/scan<ArrowUpRight size={15} /></code><code><Send size={15} />/analyze $BTC<ArrowUpRight size={15} /></code><code><Send size={15} />/alpha<ArrowUpRight size={15} /></code><code><Send size={15} />/risk<ArrowUpRight size={15} /></code><code><Send size={15} />/compare $SOL $ETH<ArrowUpRight size={15} /></code><code><Send size={15} />/backtest $BTC<ArrowUpRight size={15} /></code></div>
            </div>
          </div>
        </section>

        <section className="closing-cta"><p className="eyebrow">PerpsIA</p><h2>See what PerpsIA sees.</h2><p>Run a market scan or analyze your first setup on Telegram.</p><a className="button" href={botUrl} target="_blank" rel="noopener noreferrer">Launch PerpsIA</a></section>
      </main>
      <SiteFooter />
    </div>
  );
}
