interface Product {
  id: string;
  title: string;
  icon: string;
}

interface Vertical {
  id: string;
  label: string;
  description: string;
  products: Product[];
}

interface TableOfContentsProps {
  verticals: Vertical[];
  scrollToSection: (id: string) => void;
}

export function TableOfContents({ verticals, scrollToSection }: TableOfContentsProps) {
  return (
    <section className="relative px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Наши решения</h2>
          {/* <p className="text-lg text-gray-600 font-light">Выберите интересующее направление</p> */}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {verticals.map((vertical) => (
            <div key={vertical.id} className="space-y-3">
              <button
                onClick={() => scrollToSection(vertical.id)}
                className="w-full text-left p-6 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 group"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {vertical.label}
                </h3>
                <p className="text-sm text-gray-600 font-light">{vertical.description}</p>
              </button>

              <div className="ml-4 space-y-2">
                {vertical.products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => scrollToSection(product.id)}
                    className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{product.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {product.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
