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
  const blocks = text.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, idx) => {
        const lines = block.split("\n").map((l) => l.trim());
        const isList = lines.every((l) => l.startsWith("- "));
        if (isList) {
          return (
            <ul key={idx} className="space-y-2 list-none">
              {lines.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">✦</span>
                  <span>{line.replace(/^- /, "")}</span>
                </li>
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-slate-950 to-emerald-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_50%)]" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-emerald-500/20 border border-violet-500/30 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-violet-300 to-emerald-300 bg-clip-text text-transparent">
              🚀 Автоматизация бизнеса с ИИ
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              ИИ-боты для клиентов
            </span>
            <br />
            <span className="text-white">и сотрудников под ключ</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {landingContent.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-semibold text-lg shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300 hover:scale-105">
              <span className="relative z-10">{landingContent.hero.primaryCta}</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity blur" />
            </button>
            <button className="px-8 py-4 rounded-full border-2 border-violet-500/50 text-white font-semibold text-lg hover:bg-violet-500/10 transition-all duration-300 hover:border-violet-400">
              {landingContent.hero.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* PAINS */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        <div className="relative z-10 container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-300 to-orange-300 bg-clip-text text-transparent">
                {landingContent.pains.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto rounded-full" />
            </div>

            <div className="grid gap-6 mb-16">
              {landingContent.pains.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-rose-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-orange-500/0 group-hover:from-rose-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-300" />
                  <div className="relative flex items-start gap-4">
                    <span className="text-3xl">⚠️</span>
                    <p className="text-lg text-slate-200 leading-relaxed">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-violet-600 to-emerald-600 shadow-2xl shadow-violet-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">{landingContent.growthBlock.title}</h3>
                <MarkdownText
                  text={landingContent.growthBlock.body}
                  className="text-lg md:text-xl text-white/90 leading-relaxed"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

        <div className="relative z-10 container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                {landingContent.strategy.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
            </div>

            <div className="space-y-8">
              {landingContent.strategy.paragraphs.map((p, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm"
                >
                  <p className="text-lg text-slate-200 leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS INTRO */}
      <section className="relative py-20 px-4">
        <div className="relative z-10 container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              {landingContent.productsIntro.title}
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">{landingContent.productsIntro.subtitle}</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS / VERTICALS */}
      <section className="relative py-16 px-4">
        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="space-y-32">
            {landingContent.verticals.map((vertical, vIdx) => (
              <div key={vertical.id} className="space-y-12">
                {/* Vertical Header */}
                <div className="text-center max-w-4xl mx-auto">
                  <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white">{vertical.label}</h3>
                  <p className="text-xl text-slate-400">{vertical.description}</p>
                </div>

                {/* Products */}
                <div className="space-y-12">
                  {vertical.products.map((product, pIdx) => (
                    <div
                      key={product.id}
                      className={`group relative rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-500 overflow-hidden ${
                        pIdx % 2 === 0
                          ? "hover:shadow-2xl hover:shadow-violet-500/20"
                          : "hover:shadow-2xl hover:shadow-emerald-500/20"
                      }`}
                    >
                      {/* Background gradient on hover */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                          pIdx % 2 === 0
                            ? "bg-gradient-to-br from-violet-600/10 to-transparent"
                            : "bg-gradient-to-br from-emerald-600/10 to-transparent"
                        }`}
                      />

                      <div className="relative p-8 md:p-12">
                        {/* Product Header */}
                        <div className="flex items-start gap-4 mb-8">
                          <span className="text-5xl md:text-6xl">{product.icon}</span>
                          <div>
                            <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">{product.title}</h4>
                            <MarkdownText text={product.summaryMd} className="text-lg text-slate-300 leading-relaxed" />
                          </div>
                        </div>

                        {/* Three columns for desktop */}
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Column 1: Description (already shown above on mobile) */}
                          <div className="hidden md:block" />

                          {/* Column 2: Point A */}
                          <div className="p-6 rounded-2xl bg-slate-950/50 border border-rose-500/30">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                                <span className="text-xl">😓</span>
                              </div>
                              <p className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                                Точка А: как сейчас
                              </p>
                            </div>
                            <MarkdownText text={product.pointAmd} className="text-slate-300 leading-relaxed" />
                          </div>

                          {/* Column 3: Point B */}
                          <div className="p-6 rounded-2xl bg-slate-950/50 border border-emerald-500/30">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="text-xl">✨</span>
                              </div>
                              <p className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                                Точка Б: после внедрения
                              </p>
                            </div>
                            <MarkdownText text={product.pointBmd} className="text-slate-300 leading-relaxed" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FORM */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-violet-950/20 to-slate-950" />

        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
                {landingContent.closingCta.title}
              </h2>
              <p className="text-2xl md:text-3xl text-white font-semibold mb-2">{landingContent.closingCta.subtitle}</p>
              <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/50">
                <p className="text-lg text-emerald-300 font-semibold">{landingContent.closingCta.note}</p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-violet-500/30 shadow-2xl shadow-violet-500/20 backdrop-blur-xl"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-emerald-600/5 rounded-3xl" />

              <div className="relative space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider"
                    >
                      {landingContent.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={landingContent.form.namePlaceholder}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider"
                    >
                      {landingContent.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={landingContent.form.emailPlaceholder}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider"
                    >
                      {landingContent.form.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={landingContent.form.phonePlaceholder}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="storeLink"
                      className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider"
                    >
                      {landingContent.form.linkLabel}
                    </label>
                    <input
                      type="url"
                      id="storeLink"
                      name="storeLink"
                      value={formData.storeLink}
                      onChange={handleChange}
                      placeholder={landingContent.form.linkPlaceholder}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="revenue"
                      className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider"
                    >
                      {landingContent.form.revenueLabel}
                    </label>
                    <select
                      id="revenue"
                      name="revenue"
                      value={formData.revenue}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none text-white appearance-none cursor-pointer transition-all duration-300"
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
                    <label
                      htmlFor="service"
                      className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider"
                    >
                      {landingContent.form.serviceLabel}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl focus:border-violet-500 focus:outline-none text-white appearance-none cursor-pointer transition-all duration-300"
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
                </div>

                <button
                  type="submit"
                  className="group relative w-full py-5 rounded-xl bg-gradient-to-r from-violet-600 to-emerald-600 text-white font-bold text-lg shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                >
                  <span className="relative z-10">{landingContent.form.submitLabel}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <p className="text-sm text-slate-400 text-center leading-relaxed">
                  {landingContent.closingCta.footnote}
                </p>
              </div>
            </form>

            <div className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50">
              <p className="text-slate-400 mb-3 text-lg">{landingContent.form.stillDoubting}</p>
              <p className="text-xl text-white font-semibold">{landingContent.form.demoText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-4 border-t border-slate-800">
        <div className="relative z-10 container mx-auto text-center">
          <p className="text-slate-500">{landingContent.footer.text}</p>
        </div>
      </footer>
    </main>
  );
}
