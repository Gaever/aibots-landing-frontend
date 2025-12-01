import { MarkdownText } from "./MarkdownText";

interface PainPointsProps {
  title: string;
  items: string[];
  growthBlock: {
    title: string;
    body: string;
  };
}

export function PainPoints({ title, items, growthBlock }: PainPointsProps) {
  return (
    <section className="relative px-4 py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{title}</h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto mb-16">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group p-5 rounded-xl bg-white border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">⚠️</span>
                <p className="text-base text-gray-700 leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative p-10 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-700 shadow-xl max-w-4xl mx-auto">
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">{growthBlock.title}</h3>
            <MarkdownText text={growthBlock.body} className="text-lg text-white/95 leading-relaxed font-light" />
          </div>
        </div>
      </div>
    </section>
  );
}
