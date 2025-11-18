"use client";

import { useEffect, useRef, useState } from "react";

interface DemoSection {
  id: string;
  title: string;
  subtitle?: string;
  description: string[];
  demoComponent: React.ReactNode;
  highlights?: string[];
}

interface ScrollBasedDemoProps {
  sections: DemoSection[];
  headerTitle: string;
  headerSubtitle?: string;
}

export function ScrollBasedDemo({ sections, headerTitle, headerSubtitle }: ScrollBasedDemoProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [nextSectionProgress, setNextSectionProgress] = useState(0); // 0–1, насколько «проявилась» следующая
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const viewportMiddle = window.innerHeight / 2;

      // 1. Определяем активную секцию (по-прежнему по середине вьюпорта)
      let newActiveSection = 0;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        if (!section) continue;

        const sectionRect = section.getBoundingClientRect();
        const sectionThreshold = sectionRect.top + sectionRect.height * 0.3;

        if (sectionThreshold <= viewportMiddle) {
          newActiveSection = i;
        }
      }

      setActiveSection(newActiveSection);

      // 2. Считаем прогресс появления следующей секции
      const nextIndex = newActiveSection + 1;
      const nextSectionEl = sectionsRef.current[nextIndex];

      if (nextSectionEl) {
        const rect = nextSectionEl.getBoundingClientRect();

        // хотим, чтобы следующая секция начинала проявляться,
        // когда её верх где-то между серединой экрана и «ниже середины»
        const startY = viewportMiddle + 200; // ещё далеко внизу — прогресс 0
        const endY = viewportMiddle; // дошла до середины — прогресс 1

        let progress = 0;

        if (rect.top >= startY) {
          progress = 0;
        } else if (rect.top <= endY) {
          progress = 1;
        } else {
          progress = 1 - (rect.top - endY) / (startY - endY);
        }

        // на всякий случай зажимаем в [0,1]
        progress = Math.max(0, Math.min(1, progress));
        setNextSectionProgress(progress);
      } else {
        setNextSectionProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // инициализация

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections.length]);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Левая колонка — текст */}
        <div className="relative py-12">
          {/* Sticky header */}
          <div className="sticky top-0 z-20 bg-white pt-6 pb-4 mb-8 w-full px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">{headerTitle}</h2>
                {headerSubtitle && <p className="text-gray-600 mt-1">{headerSubtitle}</p>}
              </div>
            </div>
          </div>

          {/* Секции */}
          {/* space-y-96 как раз даёт много белого пространства между блоками */}
          <div className="space-y-96 px-6 lg:px-12">
            {sections.map((section, index) => {
              const isActive = index === activeSection;
              const isNext = index === activeSection + 1;
              const isPast = index < activeSection;

              // Базовые значения
              let opacity = 0;
              let translateY = 0;

              if (isActive) {
                // Активная секция — в фокусе, но немного «гасим» её по мере появления следующей
                opacity = 1 - nextSectionProgress * 0.3; // от 1 до 0.7
                translateY = -nextSectionProgress * 8; // чуть поднимается вверх
              } else if (isNext) {
                // Следующая секция плавно появляется
                // стартуем с 0.05 чтобы её почти не было видно
                opacity = 0.05 + nextSectionProgress * 0.95; // до 1
                translateY = 30 - nextSectionProgress * 30; // снизу вверх
              } else if (isPast) {
                // Уже проскролленные — тусклые
                opacity = 0.25;
                translateY = -10;
              } else {
                // Дальние — полностью скрыты
                opacity = 0;
                translateY = 40;
              }

              return (
                <div
                  key={section.id}
                  ref={(el) => (sectionsRef.current[index] = el)}
                  className="transition-all duration-500 will-change-opacity will-change-transform"
                  style={{
                    opacity,
                    transform: `translateY(${translateY}px)`,
                  }}
                >
                  {/* Номер секции */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-110"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {section.subtitle && (
                      <span
                        className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                          isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                      >
                        {section.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Заголовок */}
                  <h3
                    className={`text-2xl lg:text-3xl font-bold mb-6 transition-colors ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {section.title}
                  </h3>

                  {/* Текст */}
                  <div className="space-y-4 mb-6">
                    {section.description.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={`text-base leading-relaxed transition-colors ${
                          isActive ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Буллеты */}
                  {section.highlights && section.highlights.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {section.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-3 transition-all duration-300`}
                          style={{
                            opacity: isActive ? 1 : isNext ? nextSectionProgress : 0,
                            transform: `translateX(${isActive ? 0 : isNext ? (1 - nextSectionProgress) * 16 : 16}px)`,
                            transitionDelay: `${idx * 80}ms`,
                          }}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
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
              );
            })}
          </div>

          {/* Низ — просто дополнительный воздух */}
          <div className="h-96" />
        </div>

        {/* Правая колонка — демо, как было */}
        <div className="relative hidden lg:block">
          <div className="sticky top-0 h-screen w-full">
            <div className="relative w-full h-full bg-white flex items-center justify-center p-8">
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                      activeSection === index
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {section.demoComponent}
                  </div>
                ))}
              </div>

              {/* Индикатор прогресса */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeSection ? "w-12 bg-black" : "w-2 bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
