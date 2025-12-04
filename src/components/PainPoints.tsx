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
    <section className="relative px-4 py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{title}</h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto mb-16">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white px-6 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
            >
              {/* постоянный декор — мягкое пятно в цветах хедера */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br from-sky-400/18 via-indigo-500/16 to-fuchsia-500/18 blur-xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-[15px] font-bold text-white shadow-sm">
                  !
                </div>
                <p className="text-[15px] md:text-[16px] leading-relaxed text-slate-900">{item}</p>
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
