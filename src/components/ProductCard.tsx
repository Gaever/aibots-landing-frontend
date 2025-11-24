import { MarkdownText } from "./MarkdownText";

interface ProductCardProps {
  id: string;
  icon: string;
  title: string;
  summaryMd: string;
  pointAmd: string;
  pointBmd: string;
}

export function ProductCard({ id, icon, title, summaryMd, pointAmd, pointBmd }: ProductCardProps) {
  return (
    <div
      id={`card-${id}`}
      className="group rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 scroll-mt-20 overflow-hidden"
    >
      <div className="p-8 md:p-10">
        {/* Product Header */}
        <div className="flex items-start gap-4 mb-8">
          <span className="text-4xl md:text-5xl shrink-0">{icon}</span>
          <div>
            <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{title}</h4>
            <MarkdownText text={summaryMd} className="text-base text-gray-600 leading-relaxed font-light" />
          </div>
        </div>

        {/* Two columns: Point A and Point B (50/50) */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Point A */}
          <div className="p-6 rounded-xl bg-red-50 border border-red-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-base">😓</span>
              </div>
              <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                Точка А: как сейчас
              </p>
            </div>
            <MarkdownText text={pointAmd} className="text-sm text-gray-700 leading-relaxed" />
          </div>

          {/* Point B */}
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <span className="text-base">✨</span>
              </div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                Точка Б: после внедрения
              </p>
            </div>
            <MarkdownText text={pointBmd} className="text-sm text-gray-700 leading-relaxed" />
          </div>
        </div>
      </div>
    </div>
  );
}
