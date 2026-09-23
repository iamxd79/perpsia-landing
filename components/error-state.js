export default function ErrorState({ onRetry, compact = false }) {
  return (
    <div className={`error-state${compact ? " error-state-compact" : ""}`} role="alert" aria-live="assertive">
      <p>Live signals are temporarily unavailable.</p>
      {onRetry ? <button type="button" className="text-button" onClick={onRetry}>Try Again</button> : null}
    </div>
  );
}
