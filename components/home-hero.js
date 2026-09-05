import Link from "next/link";
import {
  ChartNoAxesColumnIncreasing,
  Send,
} from "lucide-react";

import SiteHeader from "./site-header";
import HomeMarketOverview from "./home-market-overview";
import ProviderMarquee from "./provider-marquee";

import styles from "./home-hero.module.css";

export default function HomeHero() {
  return (
    <HomeMarketOverview>
      <SiteHeader
        className={styles.header}
        hero
      />

      <section
        className={styles.hero}
        id="top"
        aria-labelledby="hero-title"
      >
        <p className={styles.wordmark}>
          PerpsIA
        </p>

        <h1 id="hero-title">
          Find perp setups before
          <br
            className={
              styles.titleBreak
            }
          />
          the move gets obvious.
        </h1>

        <p
          className={
            styles.description
          }
        >
          PerpsIA watches live perp
          markets, scores setups,
          tracks signal changes, and
          flags risk across multiple
          data sources.
        </p>

        <div
          className={
            styles.actions
          }
        >
          <a
            className={
              styles.primaryButton
            }
            href="https://t.me/perpsia_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send
              size={24}
              aria-hidden="true"
            />

            Open PerpsIA on Telegram
          </a>

          <Link
            className={
              styles.secondaryButton
            }
            href="/signals"
          >
            <ChartNoAxesColumnIncreasing
              size={25}
              aria-hidden="true"
            />

            View Live Signals
          </Link>
        </div>
      </section>

      <ProviderMarquee
        className={
          styles.providerStrip
        }
      />
    </HomeMarketOverview>
  );
}