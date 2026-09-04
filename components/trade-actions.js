export default function TradeActions({ actions = [] }) {
  if (!actions.length) return null;

  return (
    <div className="trade-actions" aria-label="Available trading venues">
      {actions.map((action) => (
        <a key={`${action.venue}-${action.url}`} href={action.url} target="_blank" rel="noopener noreferrer" className="trade-button">
          Trade on {action.venue}
        </a>
      ))}
    </div>
  );
}
