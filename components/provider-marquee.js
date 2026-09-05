"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import styles from "./provider-marquee.module.css";

// Supported integrations, including context-dependent providers; not endorsements
// or a claim that every provider is queried for every signal. Sources: docs/provider-logos.md.
const providers = [
  { name: "Binance", file: "binance.svg", tone: "monochrome" },
  { name: "Bybit", file: "bybit.svg", tone: "onDark", width: 87, height: 34, wordmark: true },
  { name: "OKX", file: "okx.svg", tone: "monochrome", width: 82, height: 28, wordmark: true },
  { name: "Hyperliquid", file: "hyperliquid.svg", tone: "mint", width: 42, height: 42 },
  { name: "CoinMarketCap", file: "coinmarketcap.svg", tone: "monochrome" },
  { name: "DexScreener", file: "dexscreener.png", tone: "tile" },
  { name: "GeckoTerminal", file: "geckoterminal.svg" },
  { name: "GoPlus Security", file: "goplus.png", tone: "onDark", width: 126, height: 26, wordmark: true },
  { name: "Honeypot.is", file: "honeypot-icon.png" },
  { name: "Alternative.me", file: "alternative.png" },
  { name: "FRED", file: "fred.svg", tone: "detailed", width: 112, height: 24, wordmark: true },
  { name: "GitHub", file: "github.svg", tone: "monochrome" },
  { name: "Telegram", file: "telegram.svg", tone: "monochrome" },
];

function ProviderList({ duplicate = false }) {
  return (
    <ul className={styles.group} aria-label={duplicate ? undefined : "Supported data providers and Telegram delivery"} aria-hidden={duplicate || undefined}>
      {providers.map(({ name, file, tone, width = 30, height = 30, wordmark }) => (
        <li className={styles.provider} key={name}>
          <Image
            src={`/images/providers/${file}`}
            alt={wordmark && !duplicate ? name : ""}
            width={width}
            height={height}
            sizes={`${width}px`}
            loading="eager"
            className={`${styles.logo} ${tone ? styles[tone] : ""}`}
            style={{ width, height }}
          />
          {!wordmark && <span>{name}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function ProviderMarquee({ className = "" }) {
  const [paused, setPaused] = useState(false);

  return (
    <section className={`${className} ${styles.root}`} aria-label="Market intelligence across providers" data-paused={paused}>
      <p className={styles.caption}>Powered by leading data sources</p>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <ProviderList />
          <ProviderList duplicate />
        </div>
      </div>
      <button
        className={styles.control}
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Resume provider logo animation" : "Pause provider logo animation"}
        title={paused ? "Resume animation" : "Pause animation"}
      >
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </section>
  );
}
