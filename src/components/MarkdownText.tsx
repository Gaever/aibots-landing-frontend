interface MarkdownTextProps {
  text: string;
  className?: string;
}

export function MarkdownText({ text, className }: MarkdownTextProps) {
  const blocks = text.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, idx) => {
        const lines = block.split("\n").map((l) => l.trim());
        const isList = lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={idx} className="space-y-3 list-none">
              {lines.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-indigo-600 mt-1 text-lg">✓</span>
                  <span>{line.replace(/^- /, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="mb-4 last:mb-0">
            {block}
          </p>
        );
      })}
    </div>
  );
}
