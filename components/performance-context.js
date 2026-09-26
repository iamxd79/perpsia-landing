export default function PerformanceContext({ quality, activity = {} }) {
  const stats = quality?.statistics;
  if (!quality?.ready || !stats) {
    const developing = Number(activity.developing) || 0;
    const active = Number(activity.active) || 0;
    const tracked = Number(quality?.trackedSignals) || 0;
    const settled = Number(quality?.settledSignals ?? quality?.evaluatedSignals) || 0;
    return (
      <>
        <div className="performance-context performance-context-collecting">
          <div><span>Developing candidates</span><strong>{developing}</strong></div>
          <div><span>Active signals</span><strong>{active}</strong></div>
          <div><span>Settled outcomes</span><strong>{settled}{quality?.minimumObservations ? ` / ${quality.minimumObservations} needed` : ""}</strong></div>
          <div><span>Signals tracked</span><strong>{tracked}</strong></div>
        </div>
        <p className="collecting-state">Live calls are shown above. Outcome metrics appear after enough signals are settled.</p>
      </>
    );
  }

  const metrics = [
    ["Evaluated signals", quality.evaluatedSignals],
    ["TP1 hit rate", stats.tp1HitRate],
    ["TP2 hit rate", stats.tp2HitRate],
    ["Stop rate", stats.stopRate],
    ["Average favorable move", stats.averageFavorableMove],
    ["Average adverse move", stats.averageAdverseMove],
  ].filter(([, value]) => value !== null && value !== undefined);

  return (
    <div className="performance-context">
      {metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{typeof value === "number" ? `${value.toFixed(1)} percent` : value}</strong></div>)}
    </div>
  );
}
