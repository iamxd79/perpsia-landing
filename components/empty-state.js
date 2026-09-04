export default function EmptyState({ title = "No active setups right now", children }) {
  return (
    <div className="empty-state" role="status">
      <p className="eyebrow">Live signals</p>
      <h3>{title}</h3>
      <p>{children || "PerpsIA is scanning the market and will surface new setups when they meet the score and confidence rules."}</p>
    </div>
  );
}
