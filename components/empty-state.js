export default function EmptyState({ title = "No active setups right now", children, action = null }) {
  return (
    <div className="empty-state" role="status">
      <p className="eyebrow">Live signals</p>
      <h3>{title}</h3>
      <p>{children || "No active setups are available right now. The feed updates when price, volume, funding, and market-structure evidence aligns."}</p>
      {action}
    </div>
  );
}
