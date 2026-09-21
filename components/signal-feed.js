"use client";

import Link from "next/link";
import EmptyState from "./empty-state";
import ErrorState from "./error-state";
import SignalCard from "./signal-card";
import { formatTime } from "./format";
import { useSignalData } from "./use-signal-data";

export default function SignalFeed() {
  const state = useSignalData();
  return <SignalFeedContent {...state} />;
}

export function SignalFeedContent({ data, error, loading, refresh }) {
  const signals = data?.signals || [];
  const candidates = data?.candidates || [];
  const updatedAt = formatTime(data?.meta?.updatedAt);

  return (
    <section className="signal-feed" aria-labelledby="signal-feed-title">
      <div className="signal-feed-heading">
        <div>
          <p className="eyebrow">PerpsIA Signal Feed</p>
          <h2 id="signal-feed-title">Current market research</h2>
        </div>
        <Link className="text-link" href="/signals">View Live Signals</Link>
      </div>
      {loading ? <p className="loading-state">Loading live signals</p> : null}
      {!loading && error ? <ErrorState onRetry={refresh} compact /> : null}
      {!loading && !error && !signals.length && !candidates.length ? <EmptyState title="PerpsIA is scanning the market." /> : null}
      {!loading && !error && candidates.length ? (
        <div className="early-candidate-feed">
          <div className="signal-feed-heading early-candidate-heading">
            <div>
              <p className="eyebrow">Early candidates</p>
              <h3>Directional setups developing</h3>
            </div>
            <p>Evidence is forming; confirmation is still pending.</p>
          </div>
          <div className="ticker-viewport">
            <div className={`ticker-track${candidates.length > 1 ? " ticker-track-moving" : ""}`}>
              {candidates.map((candidate) => <SignalCard key={candidate.id} signal={candidate} compact />)}
              {candidates.length > 1 ? candidates.map((candidate) => <SignalCard key={`${candidate.id}-repeat`} signal={candidate} compact />) : null}
            </div>
          </div>
        </div>
      ) : null}
      {!loading && !error && signals.length ? (
        <div className="ticker-viewport">
          <div className={`ticker-track${signals.length > 1 ? " ticker-track-moving" : ""}`}>
            {signals.map((signal) => <SignalCard key={signal.id} signal={signal} compact />)}
            {signals.length > 1 ? signals.map((signal) => <SignalCard key={`${signal.id}-repeat`} signal={signal} compact />) : null}
          </div>
        </div>
      ) : null}
      <div className="signal-feed-footer">
        <p>Trading links may be affiliate links.</p>
        {updatedAt ? <p>Last updated {updatedAt}</p> : null}
      </div>
    </section>
  );
}
