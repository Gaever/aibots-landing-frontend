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
              className="
                group relative overflow-hidden
                rounded-[32px] border border-slate-300 bg-white px-5 py-4 shadow-none
                transition-all duration-200
                md:rounded-3xl md:border-slate-100 md:shadow-[0_10px_25px_rgba(15,23,42,0.06)]
                md:hover:-translate-y-0.5 md:hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)]
              "
            >
              {/* декор только на десктопе, мобила чистая */}
              <div className="pointer-events-none absolute -right-8 -top-8 hidden h-20 w-20 rounded-full bg-linear-to-br from-sky-400/18 via-indigo-500/16 to-fuchsia-500/18 blur-xl md:block" />

              <div className="relative flex items-center gap-4">
                <div
                  className="
                    flex h-9 w-9 shrink-0 items-center justify-center rounded-full
                    border border-slate-300 bg-white text-transparent
                    md:border-none md:bg-linear-to-br md:from-sky-500 md:to-indigo-600 md:text-[15px] md:font-bold md:text-white md:shadow-sm
                  "
                >
                  {/* знак виден только на десктопе */}
                  <span className="hidden md:inline">!</span>
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
