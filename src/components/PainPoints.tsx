import { MarkdownText } from "./MarkdownText";

export interface PainPointsProps {
  title: string;
  items: string[];
  growthBlock: {
    title: string;
    body: string;
  };
}

export function PainPoints({ title, items, growthBlock }: PainPointsProps) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-14 text-center text-4xl md:text-5xl font-bold">{title}</h2>

        <div className="mx-auto mb-16 max-w-3xl space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white px-5 py-4 transition-shadow hover:shadow-lg">
              <div className="flex gap-3">
                {/* колонка под иконку, вертикальное смещение к первой строке */}
                <div className="flex-none pt-[3px]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    !
                  </div>
                </div>

                <p className="text-[15px] md:text-[16px] leading-[1.5]">{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white shadow-xl">
          <h3 className="mb-4 text-2xl md:text-4xl font-bold">{growthBlock.title}</h3>
          <MarkdownText text={growthBlock.body} className="text-lg leading-relaxed font-light" />
        </div>
      </div>
    </section>
  );
}
