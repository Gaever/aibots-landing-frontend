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

const EMAIL_CONFIG = {
  address: "hello@aifaqbot.ru",
  subject: "Заявка на интеграцию ИИ-бота",
  body: `Здравствуйте!

Хочу обсудить запуск ИИ-бота для моего бизнеса.

Несколько данных обо мне:
• Ниша и тип бизнеса: 
• Средний месячный оборот: 
• Каналы, где хотели бы запустить бота (сайт, мессенджеры, CRM и др.): 
• Основная цель (продажи, поддержка, увеличение LTV и др.): 

Буду благодарен за обратную связь и идеи по оптимальному сценарию.

С уважением,`,
};

function getMailtoUrl() {
  const subject = encodeURIComponent(EMAIL_CONFIG.subject);
  const body = encodeURIComponent(EMAIL_CONFIG.body);
  return `mailto:${EMAIL_CONFIG.address}?subject=${subject}&body=${body}`;
}

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
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-700 text-base font-semibold rounded-xl transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {landingContent.hero.primaryCta}
                </button>
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
