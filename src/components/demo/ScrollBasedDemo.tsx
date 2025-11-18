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
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;

      // Определяем активную секцию на основе позиции в viewport
      let newActiveSection = 0;

      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        if (!section) continue;

        const sectionRect = section.getBoundingClientRect();
        const sectionMiddle = sectionRect.top + sectionRect.height / 2;

        // Если середина секции прошла середину экрана
        if (sectionMiddle <= viewportMiddle) {
          newActiveSection = i;
        }
      }

      setActiveSection(newActiveSection);
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
        <div className="relative px-6 lg:px-12 py-12">
          {/* Sticky header */}
          <div className="sticky top-0 z-20 bg-white pt-8 pb-8 mb-8 border-b border-gray-200 -mt-8">
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

          {/* Sections */}
          <div className="space-y-32">
            {sections.map((section, index) => (
              <div
                key={section.id}
                ref={(el) => (sectionsRef.current[index] = el)}
                className={`transition-opacity duration-500 ${activeSection === index ? "opacity-100" : "opacity-40"}`}
              >
                {/* Section number badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                      activeSection === index
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white scale-110"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {section.subtitle && (
                    <span
                      className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                        activeSection === index ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {section.subtitle}
                    </span>
                  )}
                </div>

                {/* Section title */}
                <h3
                  className={`text-2xl lg:text-3xl font-bold mb-6 transition-colors ${
                    activeSection === index ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {section.title}
                </h3>

                {/* Section description */}
                <div className="space-y-4 mb-6">
                  {section.description.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={`text-base leading-relaxed transition-colors ${
                        activeSection === index ? "text-gray-700" : "text-gray-400"
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
                        className={`flex items-start gap-3 transition-all duration-300 ${
                          activeSection === index ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                        }`}
                        style={{ transitionDelay: `${idx * 100}ms` }}
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
            ))}
          </div>

          {/* Bottom spacer */}
          <div className="h-96" />
        </div>

        {/* Right side - Sticky demo area */}
        <div className="relative hidden lg:block">
          <div className="sticky top-0 h-screen w-full">
            <div className="relative w-full h-full bg-white flex items-center justify-center p-8">
              {/* Demo content */}
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

              {/* Progress indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeSection ? "w-12 bg-blue-600" : "w-2 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile demo - shown below each text section */}
      <div className="lg:hidden px-6 py-12 space-y-16 bg-gray-50">
        {sections.map((section, index) => (
          <div key={section.id}>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                Шаг {index + 1}
              </span>
            </div>
            <div className="flex items-center justify-center">{section.demoComponent}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
