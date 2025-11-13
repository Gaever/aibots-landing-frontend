"use client";

import { useState } from "react";
import { landingContent } from "./landingContent";

interface FormState {
  name: string;
  email: string;
  phone: string;
  storeLink: string;
  revenue: string;
  service: string;
}

function MarkdownText(props: { text: string; className?: string }) {
  const { text, className } = props;

  // Примитивный рендерер: параграфы по пустой строке, списки по "-" в начале строки
  const blocks = text.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, idx) => {
        const lines = block.split("\n").map((l) => l.trim());
        const isList = lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={idx} className="space-y-1 list-disc list-inside">
              {lines.map((line, i) => (
                <li key={i}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={idx} className="mb-3 last:mb-0">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    storeLink: "",
    revenue: "",
    service: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: сюда добавить реальную отправку данных
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* HERO */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">{landingContent.hero.title}</h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8">{landingContent.hero.subtitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-slate-900 text-white px-8 py-3 text-sm font-semibold shadow-lg hover:bg-black transition">
              {landingContent.hero.primaryCta}
            </button>
            <button className="rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-white/70 transition">
              {landingContent.hero.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-center">{landingContent.pains.title}</h2>

            <div className="space-y-4 mb-10">
              {landingContent.pains.items.map((item, idx) => (
                <div key={idx} className="bg-slate-50/80 rounded-xl px-5 py-4 border border-slate-100">
                  <p className="text-lg text-slate-800">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white shadow-xl">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">{landingContent.growthBlock.title}</h3>
              <MarkdownText text={landingContent.growthBlock.body} className="text-base md:text-lg text-slate-100/90" />
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="bg-gradient-to-b from-slate-50 to-slate-100 py-16 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">{landingContent.strategy.title}</h2>

            <div className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
              {landingContent.strategy.paragraphs.map((p, idx) => (
                <p key={idx} className="text-lg text-slate-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS / VERTICALS */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">{landingContent.productsIntro.title}</h2>
            <p className="text-lg text-slate-600">{landingContent.productsIntro.subtitle}</p>
          </div>

          <div className="space-y-16">
            {landingContent.verticals.map((vertical) => (
              <section key={vertical.id} className="space-y-6">
                <div className="max-w-5xl mx-auto flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-2xl md:text-3xl font-semibold">{vertical.label}</h3>
                  <p className="text-slate-600 md:max-w-xl">{vertical.description}</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                  {vertical.products.map((product) => (
                    <article
                      key={product.id}
                      className="bg-slate-50 rounded-2xl p-6 md:p-7 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-3xl">{product.icon}</span>
                        <h4 className="text-xl font-semibold">{product.title}</h4>
                      </div>
                      <MarkdownText text={product.summaryMd} className="text-slate-700 mb-5" />
                      <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-500 mb-1">Точка А: как сейчас</p>
                          <MarkdownText text={product.pointAmd} className="text-sm text-slate-700" />
                        </div>
                        <div className="h-px bg-slate-100" />
                        <div>
                          <p className="text-sm font-semibold text-slate-500 mb-1">Точка Б: после внедрения</p>
                          <MarkdownText text={product.pointBmd} className="text-sm text-slate-700" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FORM */}
      <section className="bg-gradient-to-b from-slate-100 to-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">{landingContent.closingCta.title}</h2>
              <p className="text-xl text-slate-700 mb-1">{landingContent.closingCta.subtitle}</p>
              <p className="text-base text-slate-500">{landingContent.closingCta.note}</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 md:p-10 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  {landingContent.form.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={landingContent.form.namePlaceholder}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  {landingContent.form.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={landingContent.form.emailPlaceholder}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  {landingContent.form.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={landingContent.form.phonePlaceholder}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-slate-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="storeLink" className="block text-sm font-semibold text-slate-700 mb-2">
                  {landingContent.form.linkLabel}
                </label>
                <input
                  type="url"
                  id="storeLink"
                  name="storeLink"
                  value={formData.storeLink}
                  onChange={handleChange}
                  placeholder={landingContent.form.linkPlaceholder}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label htmlFor="revenue" className="block text-sm font-semibold text-slate-700 mb-2">
                  {landingContent.form.revenueLabel}
                </label>
                <select
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-slate-900"
                  required
                >
                  <option value="">{landingContent.form.revenuePlaceholder}</option>
                  {landingContent.form.revenueOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                  {landingContent.form.serviceLabel}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-slate-900 focus:outline-none text-slate-900"
                  required
                >
                  <option value="">{landingContent.form.servicePlaceholder}</option>
                  {landingContent.form.serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 text-white font-semibold py-4 px-8 hover:bg-black transition shadow-lg"
              >
                {landingContent.form.submitLabel}
              </button>

              <p className="text-xs text-slate-500 text-center">{landingContent.closingCta.footnote}</p>
            </form>

            <div className="mt-10 text-center">
              <p className="text-slate-600 mb-2">{landingContent.form.stillDoubting}</p>
              <p className="text-lg text-slate-700">{landingContent.form.demoText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">{landingContent.footer.text}</p>
        </div>
      </footer>
    </main>
  );
}
