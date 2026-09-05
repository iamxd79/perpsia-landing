import Link from "next/link";
import { ChartNoAxesColumnIncreasing, Send } from "lucide-react";
import SiteHeader from "./site-header";
import HomeMarketOverview from "./home-market-overview";
import styles from "./home-hero.module.css";

const providers = [
  ["Binance", "binance"],
  ["BYBIT", "bybit"],
  ["OKX", "okx"],
  ["Hyperliquid", "hyperliquid"],
  ["CoinMarketCap", "cmc"],
  ["DexScreener", "dexscreener"],
  ["GeckoTerminal", "gecko"],
];

export default function HomeHero() {
  return (
    <HomeMarketOverview>
      <SiteHeader className={styles.header} hero />
      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <p className={styles.wordmark}>PerpsIA</p>
        <h1 id="hero-title">Find perp setups before<br className={styles.titleBreak} /> the move gets obvious.</h1>
        <p className={styles.description}>PerpsIA watches live perp markets, scores setups, tracks signal changes, and flags risk across multiple data sources.</p>
        <div className={styles.actions}>
          <a className={styles.primaryButton} href="https://t.me/perpsia_bot" target="_blank" rel="noopener noreferrer">
            <Send size={24} aria-hidden="true" />Open PerpsIA on Telegram
          </a>
          <Link className={styles.secondaryButton} href="/signals">
            <ChartNoAxesColumnIncreasing size={25} aria-hidden="true" />View Live Signals
          </Link>
        </div>
      </section>
      <div className={styles.providerStrip}>
        <p>Market intelligence across</p>
        <ul aria-label="Supported data sources and delivery">
          {providers.map(([name, mark]) => (
            <li key={mark} className={styles[mark]}>
              {mark === "binance" ? <span className={styles.binanceMark} aria-hidden="true"><i /><i /><i /><i /><i /></span> : null}
              {name}
            </li>
          ))}
          <li className={styles.telegram}><Send size={22} aria-hidden="true" />Telegram</li>
        </ul>
      </div>
    </HomeMarketOverview>
  );
}
