"use client";

import { motion } from "framer-motion";
import { MessagesSquare, Star, ShoppingBag, Headphones, Building2, Users, FileText, ShieldCheck, ArrowRight } from "lucide-react";

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

// Map product ids to the same icons used in their ScrollPresentations' headers
const productIcons: Record<string, React.ReactNode> = {
  // client-comms
  messengers: <MessagesSquare className="w-5 h-5" />,
  reviews: <Star className="w-5 h-5" />,
  ecommerce: <ShoppingBag className="w-5 h-5" />,

  // team-internal
  "operator-souffleur": <Headphones className="w-5 h-5" />,
  "internal-assistant": <Building2 className="w-5 h-5" />,
  "hr-bot": <Users className="w-5 h-5" />,

  // knowledge-docs
  "doc-bot": <FileText className="w-5 h-5" />,

  // analytics-quality
  "quality-control": <ShieldCheck className="w-5 h-5" />,
};

export function TableOfContents({ verticals, scrollToSection }: TableOfContentsProps) {
  return (
    <section className="relative px-4 py-20 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight opacity-0"
          >
            Наши решения
          </motion.h2>
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto opacity-0"
          >
            Комплексная автоматизация коммуникаций для роста вашего бизнеса
          </motion.p> */}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {verticals.map((vertical, index) => (
            <motion.div
              key={vertical.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/10 overflow-hidden opacity-0"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity opacity-0 group-hover:opacity-100 duration-700" />

              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {vertical.label}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-lg">
                    {vertical.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {vertical.products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => scrollToSection(product.id)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50/80 border border-transparent hover:border-indigo-100 transition-all duration-300 group/item text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover/item:text-indigo-600 group-hover/item:scale-110 transition-all duration-300">
                          {productIcons[product.id] ?? product.icon}
                        </div>
                        <span className="font-semibold text-gray-700 group-hover/item:text-gray-900">
                          {product.title}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover/item:text-indigo-600 transform translate-x-0 group-hover/item:translate-x-1 transition-all duration-300" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
