"use client";

import { landingContent } from "@/app/landingContent";

export type CTAColorScheme =
  | "blue-purple-indigo"
  | "indigo-purple-pink"
  | "teal-emerald-green"
  | "purple-indigo-blue"
  | "emerald-teal-cyan";

interface CTASectionProps {
  colorScheme?: CTAColorScheme;
  title?: string;
  subtitle?: string;
  primaryBtn?: string;
  secondaryBtn?: string | null;
  features?: string[];
}

const colorSchemes: Record<CTAColorScheme, string> = {
  "blue-purple-indigo": "from-blue-600 via-purple-600 to-indigo-700",
  "indigo-purple-pink": "from-indigo-600 via-purple-600 to-pink-600",
  "teal-emerald-green": "from-teal-500 via-emerald-500 to-green-600",
  "purple-indigo-blue": "from-purple-600 via-indigo-600 to-blue-700",
  "emerald-teal-cyan": "from-emerald-600 via-teal-600 to-cyan-700",
};

export function CTASection({
  colorScheme = "blue-purple-indigo",
  title,
  subtitle,
  primaryBtn,
  secondaryBtn,
  features,
}: CTASectionProps) {
  const gradientClasses = colorSchemes[colorScheme];

  return (
    <div
      className={`flex flex-col items-center justify-center text-center space-y-8 p-8 bg-linear-to-br ${gradientClasses} lg:rounded-2xl w-full h-full`}
    >
      <div className="text-6xl mb-4">🚀</div>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
        {title || landingContent.demoComponents.common.cta.title}
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-md mb-8">
        {subtitle || landingContent.demoComponents.common.cta.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            const el = document.getElementById("contact-form");
            if (el) {
              const rect = el.getBoundingClientRect();
              const offset = window.innerWidth >= 1280 ? 0 : window.innerWidth >= 1024 ? 0 : 0;
              window.scrollTo({
                top: window.scrollY + rect.top - offset,
                behavior: "smooth",
              });
            }
          }}
          className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-xl cursor-pointer"
        >
          {primaryBtn || landingContent.demoComponents.common.cta.primaryBtn}
        </button>
        {secondaryBtn !== null && (
          <button
            onClick={() => {
              const el = document.getElementById("contact-form");
              if (el) {
                const rect = el.getBoundingClientRect();
                const offset = window.innerWidth >= 1280 ? 0 : window.innerWidth >= 1024 ? 0 : 0;
                window.scrollTo({
                  top: window.scrollY + rect.top - offset,
                  behavior: "smooth",
                });
              }
            }}
            className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-bold text-base md:text-lg hover:bg-white/30 transition-all duration-200 cursor-pointer"
          >
            {secondaryBtn || landingContent.demoComponents.common.cta.secondaryBtn}
          </button>
        )}
      </div>
      <div className="mt-8 flex items-center gap-8 text-white/80 text-sm">
        {(features || landingContent.demoComponents.common.cta.features).map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
