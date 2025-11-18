"use client";

import { ReactNode, useState, useEffect } from "react";

interface StackedCarouselSlide {
  id: string;
  content: ReactNode;
  title?: string;
}

interface StackedCarouselProps {
  slides: StackedCarouselSlide[];
  currentSlide: number;
  onSlideChange?: (slideIndex: number) => void;
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
}

export function StackedCarousel({
  slides,
  currentSlide,
  onSlideChange,
  autoAdvance = false,
  autoAdvanceDelay = 5000,
}: StackedCarouselProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (autoAdvance && onSlideChange && currentSlide < slides.length - 1) {
      const timer = setTimeout(() => {
        onSlideChange(currentSlide + 1);
      }, autoAdvanceDelay);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, autoAdvance, autoAdvanceDelay, slides.length, onSlideChange]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Определяем какие слайды видны в стеке (текущий и до 3 предыдущих)
  const visibleSlides = slides
    .map((slide, index) => ({ ...slide, index }))
    .slice(Math.max(0, currentSlide - 2), currentSlide + 1)
    .reverse();

  return (
    <div className="relative w-full min-h-[600px] perspective-1000">
      <div className="relative w-full h-full">
        {visibleSlides.map((slide, stackIndex) => {
          const isActive = slide.index === currentSlide;
          const depth = currentSlide - slide.index;

          return (
            <div
              key={slide.id}
              className="absolute inset-0 transition-all duration-600 ease-out"
              style={{
                transform: `
                  translateX(${isActive ? "0" : `-${depth * 30}px`})
                  scale(${isActive ? 1 : 1 - depth * 0.05})
                  translateZ(${-depth * 50}px)
                `,
                zIndex: 100 - depth,
                opacity: isActive ? 1 : 0.6 - depth * 0.2,
                filter: isActive ? "none" : "brightness(0.7)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* Карточка слайда */}
              <div
                className={`
                  w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden
                  ${isActive && isTransitioning ? "animate-slideInFromRight" : ""}
                `}
              >
                {/* Заголовок слайда (опционально) */}
                {slide.title && (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                  </div>
                )}

                {/* Контент слайда */}
                <div className="p-6 h-full overflow-auto">{slide.content}</div>
              </div>

              {/* Боковая граница (корешок) для неактивных слайдов */}
              {!isActive && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600 rounded-l-2xl"
                  style={{
                    boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Индикатор слайдов */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full z-50">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => onSlideChange?.(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"}
            `}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideInFromRight {
          animation: slideInFromRight 0.6s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
