import { formatScore } from "./format";

const states = ["DISCOVERED", "BUILDING", "CONFIRMED", "ACTIVE", "INVALIDATED"];

export default function Lifecycle({ signal, example = false }) {
  const current = signal?.lifecycle || null;
  const previous = signal?.previousState || null;
  const hasHistory = previous || signal?.previousScore !== null && signal?.previousScore !== undefined;

  if (!current && !example) return null;

  return (
    <section className="lifecycle" aria-label="Signal lifecycle">
      <div className="lifecycle-line" aria-hidden="true" />
      {states.map((state) => (
        <div className={`lifecycle-state${state === current ? " is-current" : ""}`} key={state}>
          <span>{state}</span>
        </div>
      ))}
      {hasHistory ? (
        <div className="lifecycle-change">
          {previous ? <span>Previous state {previous}</span> : null}
          {current ? <span>Current state {current}</span> : null}
          {signal?.previousScore !== null && signal?.previousScore !== undefined ? <span>Previous score {formatScore(signal.previousScore)}</span> : null}
          {signal?.score !== null && signal?.score !== undefined ? <span>Current score {formatScore(signal.score)}</span> : null}
        </div>
      ) : null}
    </section>
  );
}
