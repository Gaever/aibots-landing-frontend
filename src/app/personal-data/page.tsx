import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default async function PersonalDataPolicyPage() {
  const filePath = path.join(process.cwd(), 'src/content/personal-data.md');
  const content = fs.readFileSync(filePath, 'utf8');

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => <h1 className="text-3xl font-semibold mb-6 text-gray-900" {...props} />,
              h2: ({ ...props }) => <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800" {...props} />,
              p: ({ ...props }) => <p className="text-gray-600 mb-4 leading-relaxed" {...props} />,
              ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-600" {...props} />,
              li: ({ ...props }) => <li className="mb-2" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
