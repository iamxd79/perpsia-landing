"use client";

import { useEffect, useState } from "react";
import { ChartNoAxesColumnIncreasing, ChevronDown, Radio, Target, Database, RefreshCw } from "lucide-react";
import { SignalFeedContent } from "./signal-feed";
import { useSignalData } from "./use-signal-data";
import { FEED_REFRESH_MS, getHeroStats } from "../lib/hero-stats.mjs";
import styles from "./home-hero.module.css";

export default function HomeMarketOverview({ children }) {
  const state = useSignalData(FEED_REFRESH_MS);
  const [now, setNow] = useState(null);
  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(interval);
  }, []);
  const stats = getHeroStats(state.data, { ...state, ...(now === null ? {} : { now }) });
  const updatedAt = state.data?.meta?.updatedAt;
  const updatedTime = updatedAt && Number.isFinite(Date.parse(updatedAt))
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(new Date(updatedAt))
    : null;
  const status = state.loading ? "Connecting to live feed" : stats.available ? `Feed updated ${updatedTime} UTC` : "Feed temporarily unavailable";
  const metrics = [
    { label: "Assets in feed", value: stats.assets, icon: ChartNoAxesColumnIncreasing },
    { label: "Live signals", value: stats.signals, icon: Radio, accent: true },
    { label: "Avg confidence", value: stats.confidence === null ? null : `${stats.confidence.toFixed(1)}%`, icon: Target },
    { label: "Sources in feed", value: stats.providers, icon: Database },
  ];

  return (
    <>
      <div className={styles.scene}>
        {children}
        <section className={styles.statistics} aria-labelledby="hero-statistics-title" aria-busy={state.loading}>
          <div className={styles.statisticsHeading}>
            <div className={styles.statisticsTitle}>
              <h2 id="hero-statistics-title">Live market intelligence in numbers</h2>
              <p>REAL TIME DATA. REAL OPPORTUNITIES.</p>
            </div>
            <div className={styles.statisticsActions}>
              <p className={`${styles.status} ${stats.available ? styles.connected : ""}`} role="status"><span aria-hidden="true" />{status}</p>
              <div className={styles.refreshControl} aria-label={`Auto refresh every ${FEED_REFRESH_MS / 1000} seconds`}>
                <RefreshCw size={25} aria-hidden="true" />
                <span><small>Auto refresh</small><strong>{FEED_REFRESH_MS / 1000}s</strong></span>
                <ChevronDown size={18} aria-hidden="true" />
              </div>
            </div>
          </div>
          <dl className={styles.metrics}>
            {metrics.map(({ label, value, icon: Icon, accent }) => (
              <div className={styles.metric} key={label}>
                <span className={`${styles.metricIcon} ${accent ? styles.accent : ""}`} aria-hidden="true"><Icon size={30} strokeWidth={1.8} /></span>
                <div><dt>{label}</dt><dd>{value ?? <span aria-label="Not available">—</span>}</dd></div>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <div className={styles.feed}><SignalFeedContent {...state} /></div>
    </>
  );
}
