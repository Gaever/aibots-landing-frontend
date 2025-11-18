interface StrategyProps {
  title: string;
  paragraphs: string[];
}

export function Strategy({ title, paragraphs }: StrategyProps) {
  return (
    <section className="relative px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {paragraphs.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-white border border-gray-200 shadow-sm"
            >
              <p className="text-base text-gray-700 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
