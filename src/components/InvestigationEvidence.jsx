export default function InvestigationEvidence({ evidence }) {
  return (
    <section className="my-8">
      <h2 className="font-display text-2xl text-ink mb-4">Assigned evidence</h2>
      <p className="text-coffee-700 leading-relaxed mb-4">{evidence.brief}</p>
      <div className="space-y-3">
        {evidence.artifacts.map((item) => (
          <article key={item.id} className="rounded-xl border border-coffee-200 bg-paper p-5">
            <h3 className="font-mono text-sm text-rust mb-2">
              {item.id} · {item.source}
            </h3>
            <p className="text-sm text-coffee-800 leading-relaxed">{item.text}</p>
          </article>
        ))}
      </div>
      <p className="text-sm text-coffee-600 mt-4">{evidence.environment}</p>
    </section>
  );
}
