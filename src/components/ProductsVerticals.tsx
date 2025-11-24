import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  icon: string;
  title: string;
  summaryMd: string;
  pointAmd: string;
  pointBmd: string;
}

interface Vertical {
  id: string;
  label: string;
  description: string;
  products: Product[];
}

interface ProductsVerticalsProps {
  verticals: Vertical[];
}

export function ProductsVerticals({ verticals }: ProductsVerticalsProps) {
  return (
    <section className="relative px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-24">
          {verticals.map((vertical) => (
            <div key={vertical.id} id={`vertical-${vertical.id}`} className="space-y-12 scroll-mt-20">
              {/* Vertical Header */}
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">{vertical.label}</h3>
                <p className="text-lg text-gray-600 font-light">{vertical.description}</p>
              </div>

              {/* Products */}
              <div className="space-y-8">
                {vertical.products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
