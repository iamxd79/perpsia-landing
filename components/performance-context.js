export default function PerformanceContext({ quality }) {
  const stats = quality?.statistics;
  if (!quality?.ready || !stats) {
    return <p className="collecting-state">Performance data is still being collected.</p>;
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
