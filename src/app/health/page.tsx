"use client";

import { HealthChat } from "@/components/HealthChat";
import { Check, ShieldCheck } from "lucide-react";

export default function HealthPage() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSolution = () => {
    document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-white font-sans text-slate-800">

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pb-32 lg:pt-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 mb-6 leading-[1.1]">
                ИИ терапевт, <br className="hidden sm:block" />
                <span className="text-teal-600">
                  проверяемый врачами
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Сервис, где искусственный интеллект проводит первичную диагностику, а настоящие врачи проверяют каждый диагноз. Быстро, доступно, безопасно.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={scrollToPricing}
                  className="w-full sm:w-auto px-8 py-4 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/25"
                >
                  Попробовать бесплатно
                </button>
                <button
                  onClick={scrollToSolution}
                  className="w-full sm:w-auto px-8 py-4 bg-white/80 text-slate-700 rounded-xl font-semibold hover:bg-white transition-colors border border-slate-200"
                >
                  Узнать больше
                </button>
              </div>
            </div>

            {/* Right Content - Chat Demo */}
            <div className="flex-1 w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0">
              <HealthChat autoStart={true} />
            </div>

          </div>
        </div>
      </section>

      {/* --- PAIN BLOCKS --- */}
      <section className="py-16 md:py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Почему мы откладываем поход к врачу?</h2>
            <p className="text-slate-600 text-base md:text-lg">Знакомые ситуации, которые мешают вовремя заняться здоровьем</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Нет времени на визит", text: "Нужно записаться, выделить полдня, добраться до клиники. В плотном графике это сложно.", icon: "🕰️" },
              { title: "Кажется, что пройдет само", text: "Откладывание лечения часто приводит к осложнениям, которых можно было избежать.", icon: "🤞" },
              { title: "Долгое ожидание записи", text: "Пока дождешься приема в поликлинике, симптомы могут измениться или усилиться.", icon: "📅" },
              { title: "Высокая стоимость приема", text: "Частный прием терапевта стоит от 2000₽, и не всегда гарантирует результат.", icon: "💸" },
              { title: "Недоверие к ИИ", text: "Опасение доверять здоровье алгоритмам без медицинского образования.", icon: "🤖" },
              { title: "Деликатные вопросы", text: "Некоторые проблемы неловко обсуждать с врачом при личной встрече.", icon: "🫣" },
            ].map((item, idx) => (
              <div key={idx} className="group p-6 md:p-8 rounded-2xl bg-white border border-teal-100 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-100 transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUTION BLOCK --- */}
      <section id="solution" className="py-16 md:py-24 bg-gradient-to-br from-teal-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">СОВРЕМЕННЫЙ ПОДХОД</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Мировая практика теперь доступна каждому</h2>
            <p className="text-base md:text-lg text-teal-100 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              Во всем мире вводится стандарт: врачам помогает ИИ. Он анализирует симптомы быстрее человека, не устает и помнит все медицинские протоколы. Но последнее слово всегда за врачом.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white/20">
                <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <span>⚡</span> Быстрая диагностика
                </h3>
                <p className="text-teal-100 text-sm md:text-base">ИИ опрашивает вас за минуту, собирая полный анамнез для врача.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white/20">
                <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <span>👨‍⚕️</span> Контроль врача
                </h3>
                <p className="text-teal-100 text-sm md:text-base">Каждый диагноз и рекомендация проверяются реальным специалистом.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEMO BLOCK --- */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 order-2 lg:order-1 w-full max-w-[340px] sm:max-w-[380px] mx-auto">
              <HealthChat autoStart={true} />
            </div>

            <div className="flex-1 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6">Как это работает?</h2>
              <div className="space-y-6 md:space-y-8">
                {[
                  { step: 1, title: "Опишите симптомы", text: "В свободной форме расскажите, что вас беспокоит. Как другу в чате." },
                  { step: 2, title: "ИИ задаст уточняющие вопросы", text: "Система проанализирует жалобы и спросит детали, которые важны для диагноза." },
                  { step: 3, title: "Врач проверит результат", text: "Через пару минут вы получите предварительный диагноз и рекомендации, верифицированные доктором." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg md:text-xl shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-slate-800 mb-1 md:mb-2">{item.title}</h4>
                      <p className="text-slate-600 text-sm md:text-base">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- OBJECTIONS (DATA PRIVACY) --- */}
      <section className="py-16 md:py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-teal-500/30">
            <div className="bg-teal-500/50 p-4 md:p-6 rounded-full shrink-0">
              <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Ваши данные под защитой</h2>
              <p className="mb-3 md:mb-4 text-sm md:text-base text-teal-100">
                Мы понимаем, что здоровье — это личное. Мы храним ваши данные в зашифрованном виде согласно требованиям законодательства (152-ФЗ).
              </p>
              <p className="text-xs md:text-sm text-teal-200">
                Никто, кроме вашего лечащего врача и ИИ-ассистента, не имеет доступа к вашей переписке. Мы не передаем данные страховым компаниям или третьим лицам.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-cyan-50 to-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Сколько это стоит?</h2>
          <p className="text-slate-600 text-base md:text-lg mb-10 md:mb-16">Выберите тариф, который подходит именно вам</p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">

            {/* Free Tier */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-teal-100 shadow-sm flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Базовый</h3>
              <p className="text-slate-500 mb-4 md:mb-6 text-sm md:text-base">Для простых вопросов</p>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8">0 ₽</div>

              <ul className="space-y-3 md:space-y-4 text-left mb-6 md:mb-8 flex-1">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">3 ответа в сутки</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">Базовые рекомендации</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">Проверка врачом</span>
                </li>
              </ul>

              <button className="w-full py-3 md:py-4 bg-teal-50 text-teal-700 font-semibold rounded-xl hover:bg-teal-100 transition-colors">
                Попробовать
              </button>
            </div>

            {/* Pro Tier UI */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-teal-500 shadow-xl shadow-teal-100 relative flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-1 rounded-full">
                Рекомендуем
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Подписка Здоровье</h3>
              <p className="text-slate-500 mb-4 md:mb-6 text-sm md:text-base">Ваш личный врач всегда рядом</p>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">500 ₽ <span className="text-base md:text-lg text-slate-400 font-normal">/ мес</span></div>
              <p className="text-teal-600 text-xs md:text-sm mb-6 md:mb-8">В 5 раз дешевле приема в клинике</p>

              <ul className="space-y-3 md:space-y-4 text-left mb-6 md:mb-8 flex-1">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Безлимитный чат с ИИ</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Подробные рекомендации</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Проверка диагноза врачом</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Приоритетная поддержка</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Хранение истории болезни</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Скидки до 20% в клиниках-партнерах</span>
                </li>
              </ul>

              <button className="w-full py-3 md:py-4 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/25">
                Оформить подписку
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">Начните заботиться о здоровье умнее</h2>
          <button className="px-8 md:px-10 py-4 md:py-5 bg-white text-teal-600 text-lg md:text-xl font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-xl">
            Запустить ИИ-терапевта
          </button>
        </div>
      </section>

    </main>
  );
}
