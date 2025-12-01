"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DemoSection {
  id: string;
  title: string;
  subtitle?: string;
  description: string[];
  demoComponent: React.ReactNode;
  highlights?: string[];
  mobileConfig?: {
    scale?: number; // Scale value (default: 0.8)
    noScale?: boolean; // If true, don't apply any scaling
    marginBottom?: string; // Custom negative margin (default: '-mb-48')
    className?: string; // Custom class name
    fullWidth?: boolean; // If true, remove padding and rounded corners for full-width display
  };
}

interface ScrollBasedDemoProps {
  sections: DemoSection[];
  headerTitle: string;
  headerSubtitle?: string;
  headerIcon?: React.ReactNode;
}

export function ScrollBasedDemo({ sections, headerTitle, headerSubtitle, headerIcon }: ScrollBasedDemoProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionOpacities, setSectionOpacities] = useState<number[]>(sections.map(() => 0));
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportHeight = window.innerHeight;
      const newOpacities: number[] = [];

      // Для каждой секции вычисляем её opacity на основе прокрутки
      sectionsRef.current.forEach((section, index) => {
        if (!section) {
          newOpacities.push(0);
          return;
        }

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        // Секция начинает появляться когда её верх на уровне 80% экрана
        // Полностью видна когда верх достигает 50% экрана
        // Начинает исчезать когда низ уходит выше 20% экрана
        const startAppearing = viewportHeight * 0.8;
        const fullyVisible = viewportHeight * 0.5;
        const startDisappearing = viewportHeight * 0.2;

        let opacity = 0;

        if (sectionTop <= startAppearing && sectionTop >= fullyVisible) {
          // Плавное появление от 0 до 1
          const progress = (startAppearing - sectionTop) / (startAppearing - fullyVisible);
          opacity = Math.max(0, Math.min(1, progress));
        } else if (sectionTop < fullyVisible && sectionBottom > startDisappearing) {
          // Полностью видна
          opacity = 1;
        } else if (sectionBottom <= startDisappearing && sectionBottom >= 0) {
          // Плавное исчезание
          const progress = sectionBottom / startDisappearing;
          opacity = Math.max(0, Math.min(1, progress));
        } else {
          // Еще не появилась или уже ушла
          opacity = 0;
        }

        newOpacities.push(opacity);
      });

      // Нормализуем opacity - только одна секция может иметь высокую opacity
      const maxOpacity = Math.max(...newOpacities);
      const normalizedOpacities = newOpacities.map((op) => {
        if (maxOpacity === 0) return 0;
        // Усиливаем контраст - активная секция ярче, остальные тусклее
        const normalized = op / maxOpacity;
        return normalized > 0.7 ? normalized : normalized * 0.3;
      });

      setSectionOpacities(normalizedOpacities);

      // Определяем активную секцию на основе видимости (80% правило)
      let bestCandidateIndex = -1;
      let maxVisibility = 0;

      sectionsRef.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const validVisibleHeight = Math.max(0, visibleHeight);

        // Считаем процент видимости самой секции и процент покрытия экрана
        const sectionVisibilityRatio = validVisibleHeight / rect.height;
        const viewportCoverageRatio = validVisibleHeight / viewportHeight;

        // Используем максимум из двух метрик (для поддержки длинных секций)
        const effectiveVisibility = Math.max(sectionVisibilityRatio, viewportCoverageRatio);

        if (effectiveVisibility > maxVisibility) {
          maxVisibility = effectiveVisibility;
          bestCandidateIndex = index;
        }
      });

      // Переключаем только если кандидат достаточно виден (>80%)
      // Или если это первая секция и мы в самом верху (чтобы не было пустого состояния)
      if (bestCandidateIndex !== -1 && (maxVisibility > 0.8 || (bestCandidateIndex === 0 && window.scrollY < 100))) {
        setActiveSection(bestCandidateIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Инициализация

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections.length]);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left side - Text content */}
        <div className="relative py-12 hidden lg:block">
          {/* Sticky header */}
          <div className="sticky top-0 z-20 bg-white pt-4 pb-3 mb-8 w-full px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                {headerIcon || (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{headerTitle}</h2>
                {headerSubtitle && <p className="text-gray-600 mt-1">{headerSubtitle}</p>}
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-[42vh] px-6 lg:px-12">
            {sections.map((section, index) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionsRef.current[index] = el;
                }}
                className="transition-opacity duration-200"
                style={{ opacity: sectionOpacities[index] || 0 }}
              >
                {/* Section number badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${activeSection === index
                      ? "bg-linear-to-br from-blue-600 to-purple-600 text-white scale-110"
                      : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {index + 1}
                  </div>
                  {section.subtitle && (
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide transition-colors ${activeSection === index ? "text-blue-600" : "text-gray-400"
                        }`}
                    >
                      {section.subtitle}
                    </span>
                  )}
                </div>

                {/* Section title */}
                <h3
                  className={`text-2xl lg:text-3xl font-bold mb-6 transition-colors ${activeSection === index ? "text-gray-900" : "text-gray-500"
                    }`}
                >
                  {section.title}
                </h3>

                {/* Section description */}
                <div className="space-y-4 mb-6">
                  {section.description.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={`text-base leading-relaxed transition-colors ${activeSection === index ? "text-gray-700" : "text-gray-400"
                        }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Highlights */}
                {section.highlights && section.highlights.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {section.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 transition-all duration-300 ${activeSection === index ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                          }`}
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <div className="w-6 h-6 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom spacer */}
          <div className="h-96" />
        </div>

        {/* Right side - Sticky demo area */}
        <div className="relative hidden lg:block">
          <div className="sticky top-0 h-screen w-full">
            <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-8">
              {/* Demo content - показываем только активную секцию */}
              <div className="relative z-10 w-full flex-1 flex items-center justify-center min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sections[activeSection].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {sections[activeSection].demoComponent}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-2 mt-6 shrink-0 z-50">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${index === activeSection ? "w-12 bg-black" : "w-2 bg-gray-400"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile demo - shown with scaled demo and condensed text */}
      <div className="lg:hidden bg-gray-50">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 mb-6 shadow-xs transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="hidden w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-purple-600 items-center justify-center text-white">
              {headerIcon || (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">{headerTitle}</h2>
              {headerSubtitle && <p className="hidden text-sm text-gray-600 mt-0.5">{headerSubtitle}</p>}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 pb-4">
          {sections.map((section, index) => (
            <div key={section.id} className={section.mobileConfig?.fullWidth ? "" : "px-4"}>
              {/* Condensed text content - moved before demo */}
              <div className={`space-y-2 mb-3 ${section.mobileConfig?.fullWidth ? "px-4" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  {section.subtitle && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {section.subtitle}
                    </span>
                  )}
                </div>

                <h3 className="text-md font-bold text-gray-900 mb-2">{section.title}</h3>

                {/* Show only first 3-4 highlights as key value propositions */}
                {section.highlights && section.highlights.length > 0 && (
                  <div className="space-y-1.5">
                    {section.highlights.slice(0, 4).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scaled demo component - moved after text */}
              <div
                className={`overflow-hidden ${section.mobileConfig?.fullWidth ? "rounded-none" : "rounded-xl"
                  } bg-white shadow-lg ${section.mobileConfig?.noScale ? "" : section.mobileConfig?.marginBottom || ""} ${section.mobileConfig?.className || ""
                  }`}
                style={
                  section.mobileConfig?.noScale
                    ? {}
                    : {
                      transform: `scale(${section.mobileConfig?.scale || 0.9})`,
                      transformOrigin: "top center",
                    }
                }
              >
                <MobileDemoItem>
                  {section.demoComponent}
                </MobileDemoItem>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileDemoItem({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0);

  return (
    <motion.div
      onViewportEnter={() => setKey((k) => k + 1)}
      viewport={{ amount: 0.2 }}
      className="w-full h-full"
    >
      <div key={key} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
