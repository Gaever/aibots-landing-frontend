import { useEffect, useState } from "react";
import { landingContent } from "@/app/landingContent";

interface HeroProps {
  title: string;
  subtitle: string;
}

// Shimmer text styles - ярче, лучше читается
const shimmerTextStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #1f2937, #374151, #4b5563, #374151, #1f2937)",
  backgroundSize: "300% 100%",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  animation: "text-shimmer 6s ease-in-out infinite",
};

export function Hero({ title, subtitle }: HeroProps) {
  // Случайные точки на фоне
  const [dots, setDots] = useState<
    Array<{
      left: string;
      top: string;
      size: number;
      opacity: number;
      color: string;
    }>
  >([]);

  // Частицы для float-анимации
  const [particles, setParticles] = useState<
    Array<{
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);

  useEffect(() => {
    // Генерируем случайно расположенные статичные точки
    const colors = ["#06b6d4", "#a855f7", "#ec4899"];
    const newDots = [...Array(60)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setDots(newDots);

    // Плавающие частицы
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative pb-0 lg:min-h-[50vh] flex items-center overflow-hidden bg-linear-to-br">
      {/* Animated background blobs - горизонтальные пузыри ВОЗВРАЩАЕМ */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Беспорядочные точки на фоне */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              opacity: dot.opacity,
            }}
          />
        ))}
      </div>

      {/* Плавающие частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="flex flex-col">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-cyan-400 block">ИИ-боты</span>
                  {/* Animated gradient text - серый shimmer */}
                  <span className="text-3xl md:text-4xl block font-medium" style={shimmerTextStyle}>
                    для клиентов и сотрудников
                  </span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 relative -top-[12px]">
                    под ключ
                  </span>
                </h1>
              </div>

              {/* Animated gradient subtitle */}
              <p className="text-lg md:text-xl max-w-xl leading-relaxed pt-4 font-medium" style={shimmerTextStyle}>
                {subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {/* Telegram CTA - frosted glass */}
                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-gray-700 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <svg className="w-4 h-4 text-[#2AABEE]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                  {landingContent.hero.primaryCta}
                </a>
                {/* Email CTA - frosted glass */}
                <a
                  href="mailto:hello@aifaqbot.ru?subject=%D0%97%D0%B0%D1%8F%D0%B2%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D1%8E%20II-%D0%B1%D0%BE%D1%82%D0%B0&body=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%0A%0A%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%20II-%D0%B1%D0%BE%D1%82%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D0%BC%D0%BE%D0%B5%D0%B3%D0%BE%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%B0.%0A%0A%D0%9D%D0%B5%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85%20%D0%BE%D0%B1%D0%BE%20%D0%BC%D0%BD%D0%B5%3A%0A%E2%80%A2%20%D0%9D%D0%B8%D1%88%D0%B0%20%D0%B8%20%D1%82%D0%B8%D0%BF%20%D0%B1%D0%B8%D0%B7%D0%BD%D0%B5%D1%81%D0%B0%3A%20%0A%E2%80%A2%20%D0%A1%D1%80%D0%B5%D0%B4%D0%BD%D0%B8%D0%B9%20%D0%BC%D0%B5%D1%81%D1%8F%D1%87%D0%BD%D1%8B%D0%B9%20%D0%BE%D0%B1%D0%BE%D1%80%D0%BE%D1%82%3A%20%0A%E2%80%A2%20%D0%9A%D0%B0%D0%BD%D0%B0%D0%BB%D1%8B%2C%20%D0%B3%D0%B4%D0%B5%20%D1%85%D0%BE%D1%82%D0%B5%D0%BB%D0%B8%20%D0%B1%D1%8B%20%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D1%82%D0%B8%D1%82%D1%8C%20%D0%B1%D0%BE%D1%82%D0%B0%20(%D1%81%D0%B0%D0%B9%D1%82%2C%20%D0%BC%D0%B5%D1%81%D1%81%D0%B5%D0%BD%D0%B4%D0%B6%D0%B5%D1%80%D1%8B%2C%20CRM%20%D0%B8%20%D0%B4%D1%80.)%3A%20%0A%E2%80%A2%20%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D0%B0%D1%8F%20%D1%86%D0%B5%D0%BB%D1%8C%20(%D0%BF%D1%80%D0%BE%D0%B4%D0%B0%D0%B6%D0%B8%2C%20%D0%BF%D0%BE%D0%B4%D0%B4%D0%B5%D1%80%D0%B6%D0%BA%D0%B0%2C%20%D1%83%D0%B2%D0%B5%D0%BB%D0%B8%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20LTV%20%D0%B8%20%D0%B4%D1%80.)%3A%20%0A%0A%D0%91%D1%83%D0%B4%D1%83%20%D0%B1%D0%BB%D0%B0%D0%B3%D0%BE%D0%B4%D0%B0%D1%80%D0%B5%D0%BD%20%D0%B7%D0%B0%20%D0%BE%D0%B1%D1%80%D0%B0%D1%82%D0%BD%D1%83%D1%8E%20%D1%81%D0%B2%D1%8F%D0%B7%D1%8C%20%D0%B8%20%D0%B8%D0%B4%D0%B5%D0%B8%20%D0%BF%D0%BE%20%D0%BE%D0%BF%D1%82%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%D1%83%20%D1%81%D1%86%D0%B5%D0%BD%D0%B0%D1%80%D0%B8%D1%8E.%0A%0A%D0%A1%20%D1%83%D0%B2%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%2C%0A"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-gray-700 text-sm font-medium rounded-xl transition-all duration-300 whitespace-nowrap hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                  }}
                >
                  <svg
                    className="w-5 h-5 text-sky-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.75 5.75h14.5A1.75 1.75 0 0 1 21 7.5v9a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 16.5v-9A1.75 1.75 0 0 1 4.75 5.75Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 7.5 11.41 12a1 1 0 0 0 1.18 0L19 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Оставить заявку на email</span>
                </a>
              </div>
            </div>

            {/* Right content - Glass Leaf Layers */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <GlassLeafLayers />
                </div>

                {/* Orbiting elements */}
                <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2">
                  <div className="absolute top-0 left-1/2 w-8 h-8 bg-cyan-400/30 rounded-lg -translate-x-1/2 animate-orbit backdrop-blur-sm" />
                  <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-purple-400/30 rounded-full -translate-x-1/2 animate-orbit-reverse animation-delay-1000 backdrop-blur-sm" />
                  <div className="absolute left-0 top-1/2 w-7 h-7 bg-pink-400/30 rounded-lg -translate-y-1/2 animate-orbit animation-delay-2000 backdrop-blur-sm rotate-45" />
                  <div className="absolute right-0 top-1/2 w-5 h-5 bg-cyan-400/40 rounded-full -translate-y-1/2 animate-orbit-reverse animation-delay-500 backdrop-blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Glass Leaf Layers - веер слоёв с 3D эффектом, аксонометрический вид
function GlassLeafLayers() {
  return (
    <div
      className="relative w-[420px] h-[420px]"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 30%", // Камера смотрит чуть сверху
      }}
    >
      {/* Контейнер со сценой - наклон в аксонометрию */}
      <div
        className="relative w-full h-full animate-float-slow"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(25deg) rotateY(-15deg) rotateZ(5deg)", // Аксонометрический поворот всей сцены
        }}
      >
        {/* Слой 1 - самый дальний, большой, сильный поворот */}
        <div
          className="absolute rounded-[50px]"
          style={{
            inset: "0px",
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.18) 0%, rgba(6, 182, 212, 0.05) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            boxShadow: "0 8px 32px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
            transform: "translateZ(-60px) rotate(-12deg)",
            animation: "layer-drift-1 8s ease-in-out infinite",
          }}
        />

        {/* Слой 2 */}
        <div
          className="absolute rounded-[48px]"
          style={{
            inset: "20px",
            background: "linear-gradient(140deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.08) 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(139, 92, 246, 0.25)",
            boxShadow: "0 12px 40px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255,255,255,0.25)",
            transform: "translateZ(-30px) rotate(-8deg)",
            animation: "layer-drift-2 7s ease-in-out infinite",
          }}
        />

        {/* Слой 3 - центральный */}
        <div
          className="absolute rounded-[45px]"
          style={{
            inset: "40px",
            background: "linear-gradient(138deg, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0.1) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            boxShadow: "0 16px 48px rgba(168, 85, 247, 0.14), inset 0 2px 0 rgba(255,255,255,0.3)",
            transform: "translateZ(0px) rotate(-3deg)",
            animation: "layer-drift-3 6s ease-in-out infinite",
          }}
        />

        {/* Слой 4 */}
        <div
          className="absolute rounded-[42px]"
          style={{
            inset: "60px",
            background: "linear-gradient(135deg, rgba(217, 70, 239, 0.3) 0%, rgba(217, 70, 239, 0.12) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(217, 70, 239, 0.35)",
            boxShadow: "0 20px 56px rgba(217, 70, 239, 0.16), inset 0 2px 0 rgba(255,255,255,0.35)",
            transform: "translateZ(30px) rotate(3deg)",
            animation: "layer-drift-4 5s ease-in-out infinite",
          }}
        />

        {/* Слой 5 */}
        <div
          className="absolute rounded-[38px]"
          style={{
            inset: "85px",
            background: "linear-gradient(132deg, rgba(236, 72, 153, 0.35) 0%, rgba(236, 72, 153, 0.15) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(236, 72, 153, 0.4)",
            boxShadow: "0 24px 64px rgba(236, 72, 153, 0.18), inset 0 2px 0 rgba(255,255,255,0.4)",
            transform: "translateZ(60px) rotate(8deg)",
            animation: "layer-drift-5 4.5s ease-in-out infinite",
          }}
        />

        {/* Слой 6 - самый ближний, яркий */}
        <div
          className="absolute rounded-[32px]"
          style={{
            inset: "115px",
            background: "linear-gradient(128deg, rgba(244, 114, 182, 0.4) 0%, rgba(251, 146, 60, 0.2) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(244, 114, 182, 0.45)",
            boxShadow: "0 28px 72px rgba(244, 114, 182, 0.2), inset 0 2px 0 rgba(255,255,255,0.5)",
            transform: "translateZ(90px) rotate(12deg)",
            animation: "layer-drift-6 4s ease-in-out infinite",
          }}
        />

        {/* Внутренний яркий акцент */}
        <div
          className="absolute rounded-[26px]"
          style={{
            inset: "145px",
            background: "linear-gradient(125deg, rgba(255, 255, 255, 0.35) 0%, rgba(251, 191, 36, 0.15) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "inset 0 2px 4px rgba(255,255,255,0.6)",
            transform: "translateZ(120px) rotate(15deg)",
            animation: "layer-drift-6 3.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Декоративные плавающие точки вокруг */}
      <div
        className="absolute top-[5%] left-[15%] w-3 h-3 rounded-full bg-cyan-400/60 animate-pulse"
        style={{ animationDuration: "2s" }}
      />
      <div
        className="absolute top-[15%] right-[5%] w-2.5 h-2.5 rounded-full bg-purple-400/60 animate-pulse"
        style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
      />
      <div
        className="absolute bottom-[15%] left-[5%] w-2.5 h-2.5 rounded-full bg-pink-400/60 animate-pulse"
        style={{ animationDuration: "3s", animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-[5%] right-[15%] w-3 h-3 rounded-full bg-fuchsia-400/60 animate-pulse"
        style={{ animationDuration: "2.2s", animationDelay: "0.3s" }}
      />
      <div
        className="absolute top-[50%] right-[0%] w-2 h-2 rounded-full bg-indigo-400/50 animate-pulse"
        style={{ animationDuration: "2.8s", animationDelay: "0.7s" }}
      />
      <div
        className="absolute bottom-[50%] left-[0%] w-2 h-2 rounded-full bg-cyan-300/50 animate-pulse"
        style={{ animationDuration: "2.4s", animationDelay: "1.2s" }}
      />
      <div
        className="absolute top-[70%] right-[20%] w-1.5 h-1.5 rounded-full bg-violet-400/40 animate-pulse"
        style={{ animationDuration: "2.6s", animationDelay: "0.9s" }}
      />
    </div>
  );
}
