export default function Evidence({ evidence = [], risks = [], providers = [] }) {
  if (!evidence.length && !risks.length && !providers.length) return null;

  return (
    <div className="evidence-grid">
      {evidence.length ? (
        <section>
          <h4>Why PerpsIA likes it</h4>
          <ul>{evidence.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ) : null}
      {risks.length ? (
        <section>
          <h4>Risk</h4>
          <ul>{risks.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      ) : null}
      {providers.length ? <p className="provider-attribution">Evidence: {providers.join(", ")}</p> : null}
    </div>
  );
}
