export default function ErrorState({ onRetry, compact = false }) {
  return (
    <div className={`error-state${compact ? " error-state-compact" : ""}`} role="alert" aria-live="assertive">
      <p>The live feed could not be refreshed. Try again in a moment.</p>
      {onRetry ? <button type="button" className="text-button" onClick={onRetry}>Try Again</button> : null}
    </div>
  );
}
