export function Section({ eyebrow, title, children, className = "", id }) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="section-heading">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
