import { useEffect, useState } from "react";
import { landingContent } from "@/app/landingContent";

interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  const [particles, setParticles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="relative min-h-dvh lg:min-h-[50vh] flex items-center overflow-hidden bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M10 10 L30 10 L30 30 M70 10 L50 10 L50 30 M10 70 L30 70 L30 50 M70 70 L50 70 L50 50"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-cyan-400/30"
              />
              <circle cx="30" cy="30" r="2" fill="currentColor" className="text-cyan-400/50" />
              <circle cx="50" cy="30" r="2" fill="currentColor" className="text-purple-400/50" />
              <circle cx="30" cy="50" r="2" fill="currentColor" className="text-pink-400/50" />
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-cyan-400/50" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={style}
          />
        ))}
      </div>
      <div className="relative z-10 w-full px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="flex flex-col">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-cyan-400 block">ИИ-боты</span>
                  <span className="text-3xl md:text-4xl text-gray-300 block">для клиентов и сотрудников</span>
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 relative -top-[12px]">
                    под ключ
                  </span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed pt-4">{subtitle}</p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://t.me/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-4 bg-linear-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                  {landingContent.hero.primaryCta}
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-4 py-4 bg-transparent text-cyan-400 font-semibold rounded-xl border-2 border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                >
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>whatsapp</title>
                    <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
                  </svg>
                  {landingContent.hero.secondaryCta}
                </a>
              </div>
            </div>

            {/* Right content - Complex 3D illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Main polygon shape with complex interior */}
                  <div className="relative w-96 h-96 animate-float-slow">
                    {/* Outer polygon layer */}
                    <div
                      className="absolute inset-0 bg-linear-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl rotate-12 transform-gpu"
                      style={{
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      }}
                    />

                    {/* Middle polygon layer */}
                    <div
                      className="absolute inset-8 bg-linear-to-br from-purple-600/30 to-pink-500/30 backdrop-blur-xl rounded-3xl -rotate-6 transform-gpu"
                      style={{
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      }}
                    />

                    {/* Inner polygon layer */}
                    <div
                      className="absolute inset-16 bg-linear-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-xl rounded-3xl rotate-3 transform-gpu"
                      style={{
                        clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                      }}
                    />

                    {/* Complex node network */}
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                        </linearGradient>
                        <linearGradient id="line-grad-3" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>

                      {/* Outer ring connections */}
                      <line
                        x1="20%"
                        y1="20%"
                        x2="80%"
                        y2="20%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                      />
                      <line
                        x1="80%"
                        y1="20%"
                        x2="80%"
                        y2="80%"
                        stroke="url(#line-grad-2)"
                        strokeWidth="1.5"
                        className="animate-pulse animation-delay-500"
                      />
                      <line
                        x1="80%"
                        y1="80%"
                        x2="20%"
                        y2="80%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="1.5"
                        className="animate-pulse animation-delay-1000"
                      />
                      <line
                        x1="20%"
                        y1="80%"
                        x2="20%"
                        y2="20%"
                        stroke="url(#line-grad-2)"
                        strokeWidth="1.5"
                        className="animate-pulse animation-delay-1500"
                      />

                      {/* Diagonal cross connections */}
                      <line
                        x1="20%"
                        y1="20%"
                        x2="80%"
                        y2="80%"
                        stroke="url(#line-grad-3)"
                        strokeWidth="1"
                        opacity="0.4"
                        className="animate-pulse animation-delay-2000"
                      />
                      <line
                        x1="80%"
                        y1="20%"
                        x2="20%"
                        y2="80%"
                        stroke="url(#line-grad-3)"
                        strokeWidth="1"
                        opacity="0.4"
                        className="animate-pulse animation-delay-500"
                      />

                      {/* Inner network - center star */}
                      <line
                        x1="50%"
                        y1="50%"
                        x2="35%"
                        y2="35%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="1"
                        opacity="0.5"
                        className="animate-pulse animation-delay-1000"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="65%"
                        y2="35%"
                        stroke="url(#line-grad-2)"
                        strokeWidth="1"
                        opacity="0.5"
                        className="animate-pulse animation-delay-1500"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="65%"
                        y2="65%"
                        stroke="url(#line-grad-3)"
                        strokeWidth="1"
                        opacity="0.5"
                        className="animate-pulse animation-delay-2000"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="35%"
                        y2="65%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="1"
                        opacity="0.5"
                        className="animate-pulse animation-delay-500"
                      />

                      {/* Mid-layer connections */}
                      <line
                        x1="35%"
                        y1="35%"
                        x2="65%"
                        y2="35%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="0.8"
                        opacity="0.3"
                      />
                      <line
                        x1="65%"
                        y1="35%"
                        x2="65%"
                        y2="65%"
                        stroke="url(#line-grad-2)"
                        strokeWidth="0.8"
                        opacity="0.3"
                      />
                      <line
                        x1="65%"
                        y1="65%"
                        x2="35%"
                        y2="65%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="0.8"
                        opacity="0.3"
                      />
                      <line
                        x1="35%"
                        y1="65%"
                        x2="35%"
                        y2="35%"
                        stroke="url(#line-grad-2)"
                        strokeWidth="0.8"
                        opacity="0.3"
                      />

                      {/* Connecting mid to outer */}
                      <line
                        x1="35%"
                        y1="35%"
                        x2="20%"
                        y2="20%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="0.8"
                        opacity="0.4"
                        className="animate-pulse animation-delay-1000"
                      />
                      <line
                        x1="65%"
                        y1="35%"
                        x2="80%"
                        y2="20%"
                        stroke="url(#line-grad-2)"
                        strokeWidth="0.8"
                        opacity="0.4"
                        className="animate-pulse animation-delay-1500"
                      />
                      <line
                        x1="65%"
                        y1="65%"
                        x2="80%"
                        y2="80%"
                        stroke="url(#line-grad-3)"
                        strokeWidth="0.8"
                        opacity="0.4"
                        className="animate-pulse animation-delay-2000"
                      />
                      <line
                        x1="35%"
                        y1="65%"
                        x2="20%"
                        y2="80%"
                        stroke="url(#line-grad-1)"
                        strokeWidth="0.8"
                        opacity="0.4"
                        className="animate-pulse animation-delay-500"
                      />
                    </svg>

                    {/* Outer ring nodes */}
                    <div className="absolute top-[20%] left-[20%] w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[20%] left-[80%] w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse animation-delay-500 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[80%] left-[80%] w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50 animate-pulse animation-delay-1000 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[80%] left-[20%] w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse animation-delay-1500 -translate-x-1/2 -translate-y-1/2" />

                    {/* Mid-layer nodes */}
                    <div className="absolute top-[35%] left-[35%] w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-md shadow-cyan-300/50 animate-pulse animation-delay-2000 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[35%] left-[65%] w-2.5 h-2.5 bg-purple-300 rounded-full shadow-md shadow-purple-300/50 animate-pulse animation-delay-500 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[65%] left-[65%] w-2.5 h-2.5 bg-pink-300 rounded-full shadow-md shadow-pink-300/50 animate-pulse animation-delay-1000 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[65%] left-[35%] w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-md shadow-cyan-300/50 animate-pulse animation-delay-1500 -translate-x-1/2 -translate-y-1/2" />

                    {/* Center hub node - larger */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-linear-to-br from-cyan-400 to-purple-400 rounded-full shadow-xl shadow-purple-500/60 animate-pulse -translate-x-1/2 -translate-y-1/2" />

                    {/* Additional accent nodes */}
                    <div className="absolute top-[50%] left-[20%] w-2 h-2 bg-purple-400/60 rounded-full shadow-sm shadow-purple-400/40 animate-pulse animation-delay-1000 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[20%] left-[50%] w-2 h-2 bg-cyan-400/60 rounded-full shadow-sm shadow-cyan-400/40 animate-pulse animation-delay-1500 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[50%] left-[80%] w-2 h-2 bg-pink-400/60 rounded-full shadow-sm shadow-pink-400/40 animate-pulse animation-delay-2000 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-[80%] left-[50%] w-2 h-2 bg-cyan-400/60 rounded-full shadow-sm shadow-cyan-400/40 animate-pulse animation-delay-500 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Orbiting elements - more varied */}
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
      {/* Bottom fade */}
      {/* <div
        className="
          absolute bottom-0 left-0 right-0 h-32 
          bg-white 
          [mask-image:linear-gradient(to_top,white_0%,transparent_100%)]
        "
      /> */}
    </section>
  );
}
