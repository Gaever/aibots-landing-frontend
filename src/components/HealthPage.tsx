"use client";

import { HealthChat } from "@/components/HealthChat";
import { Check, ShieldCheck, ChevronDown } from "lucide-react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

export default function HealthPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [contactType, setContactType] = useState<"telegram" | "phone">("telegram");
  const [contactValue, setContactValue] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('heals_early_access') === 'true') {
      setHasAlreadySubscribed(true);
    }
  }, []);

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSolution = () => {
    document.getElementById("solution")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/integrations/amocrm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: contactValue,
          type: contactType,
          consent: isAgreed
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        localStorage.setItem("heals_early_access", "true");
        setHasAlreadySubscribed(true);
        // No auto-close logic here anymore, UI handles the switch
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-800">

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32 lg:pb-32 lg:pt-40 bg-gradient-to-br from-cyan-50 via-white to-teal-50">

        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-300/30 rounded-full blur-[120px] animate-blob" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-teal-200/25 rounded-full blur-[100px] animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/3 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[140px] animate-blob animation-delay-4000" />
        </div>

        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">

              <div className="mb-5">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Health
                </span>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-700">
                  Zen
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-800 mb-5 leading-[1.1]">
                ИИ терапевт, <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  проверяемый врачами
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Сервис, где искусственный интеллект проводит первичную диагностику, а настоящие врачи проверяют каждый диагноз. Быстро, доступно, безопасно.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={scrollToPricing}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-400 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-teal-300 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/35 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Попробовать бесплатно
                </button>
                <button
                  onClick={scrollToSolution}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
                >
                  Узнать больше
                </button>
              </div>
            </div>

            {/* Right Content - Chat Demo */}
            <div className="flex-1 w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] mx-auto lg:mx-0">
              <HealthChat autoStart={true} light={true} />
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
              <div key={idx} className="group p-6 md:p-8 rounded-2xl bg-white border border-cyan-100 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100 transition-all duration-300">
                <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUTION BLOCK --- */}
      <section id="solution" className="py-16 md:py-24 bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">СОВРЕМЕННЫЙ ПОДХОД</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-8">Мировая практика теперь доступна каждому</h2>
            <p className="text-base md:text-lg text-emerald-100 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              Во всем мире вводится стандарт: врачам помогает ИИ. Он анализирует симптомы быстрее человека, не устает и помнит все медицинские протоколы. Но последнее слово всегда за врачом.
            </p>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white/20">
                <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <span>⚡</span> Быстрая диагностика
                </h3>
                <p className="text-cyan-100 text-sm md:text-base">ИИ опрашивает вас за минуту, собирая полный анамнез для врача.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-5 md:p-6 rounded-xl border border-white/20">
                <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <span>👨‍⚕️</span> Контроль врача
                </h3>
                <p className="text-cyan-100 text-sm md:text-base">Каждый диагноз и рекомендация проверяются реальным специалистом.</p>
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
              <HealthChat autoStart={true} light={true} />
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
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-lg md:text-xl shrink-0">
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

      {/* --- OUR DOCTORS --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Наши врачи</h2>
            <p className="text-slate-600 text-base md:text-lg">Опытные специалисты, которые проверяют каждый ответ ИИ</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-12 max-w-3xl mx-auto">
            {/* Doctor 1 - Female */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                <Image
                  src="/doctor_w.jpg"
                  alt="Анна Михайлова"
                  fill
                  className="rounded-full object-cover object-top border-4 border-cyan-100 shadow-lg"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">Анна Михайлова</h3>
              <p className="text-cyan-600 font-medium text-sm mb-2">Терапевт, к.м.н.</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                15 лет клинического опыта. Специализируется на диагностике сложных случаев.
              </p>
            </div>

            {/* Doctor 2 - Male */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                <Image
                  src="/doctor_m.jpg"
                  alt="Дмитрий Соколов"
                  fill
                  className="rounded-full object-cover object-top border-4 border-cyan-100 shadow-lg"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">Дмитрий Соколов</h3>
              <p className="text-cyan-600 font-medium text-sm mb-2">Врач общей практики</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                12 лет опыта в поликлинике. Эксперт по профилактике и раннему выявлению заболеваний.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- OBJECTIONS (DATA PRIVACY) --- */}
      <section className="py-16 md:py-20 bg-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <div className="bg-cyan-700/50 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-cyan-500/30">
            <div className="bg-cyan-500/50 p-4 md:p-6 rounded-full shrink-0">
              <ShieldCheck className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Ваши данные под защитой</h2>
              <p className="mb-3 md:mb-4 text-sm md:text-base text-cyan-100">
                Мы понимаем, что здоровье — это личное. Мы храним ваши данные в зашифрованном виде согласно требованиям законодательства (152-ФЗ).
              </p>
              <p className="text-xs md:text-sm text-cyan-200">
                Никто, кроме вашего лечащего врача и ИИ-ассистента, не имеет доступа к вашей переписке. Мы не передаем данные страховым компаниям или третьим лицам.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-cyan-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Сколько это стоит?</h2>
          <p className="text-slate-600 text-base md:text-lg mb-10 md:mb-16">Выберите тариф, который подходит именно вам</p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">

            {/* Free Tier */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-cyan-100 shadow-sm flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Базовый</h3>
              <p className="text-slate-500 mb-4 md:mb-6 text-sm md:text-base">Для простых вопросов</p>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 md:mb-8">0 ₽</div>

              <ul className="space-y-3 md:space-y-4 text-left mb-6 md:mb-8 flex-1">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">Бесплатный чат с ИИ</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">Базовые рекомендации</span>
                </li>
              </ul>

              <a
                href={process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 md:py-4 bg-cyan-50 text-cyan-700 font-semibold rounded-xl hover:bg-cyan-100 transition-colors text-center"
              >
                Попробовать
              </a>
            </div>

            {/* Pro Tier UI */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-cyan-500 shadow-xl shadow-cyan-100 relative flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-white text-xs md:text-sm font-bold px-3 md:px-4 py-1 rounded-full">
                Рекомендуем
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Подписка Здоровье</h3>
              <p className="text-slate-500 mb-4 md:mb-6 text-sm md:text-base">Ваш личный врач всегда рядом</p>
              <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">500 ₽ <span className="text-base md:text-lg text-slate-400 font-normal">/ мес</span></div>
              <p className="text-cyan-600 text-xs md:text-sm mb-6 md:mb-8">В 5 раз дешевле приема в клинике</p>

              <ul className="space-y-3 md:space-y-4 text-left mb-6 md:mb-8 flex-1">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Безлимитный чат с ИИ</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Подробные рекомендации</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Проверка диагноза врачом</span>
                </li>
                {/* <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Приоритетная поддержка</span>
                </li> */}
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Хранение истории болезни</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm md:text-base">Скидки до 20% в клиниках-партнерах</span>
                </li>
              </ul>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 md:py-4 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/25"
              >
                Оформить подписку
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl text-center font-bold text-slate-800 mb-8 md:mb-12">Частые вопросы</h2>

          <div className="space-y-4">
            {[
              {
                id: "item-1",
                q: "Как быстро отвечает врач?",
                a: "Обычно врач подключается к проверке диагноза в течение 15-30 минут в рабочее время. ИИ отвечает моментально."
              },
              {
                id: "item-2",
                q: "Врачи настоящие?",
                a: "Да, мы сотрудничаем только с дипломированными терапевтами и врачами общей практики, прошедшими нашу верификацию."
              },
              {
                id: "item-3",
                q: "Это заменяет очный прием?",
                a: "Нет. Наш сервис помогает получить второе мнение, расшифровать анализы или понять, к какому специалисту обратиться. Для постановки окончательного диагноза и назначения рецептурных препаратов нужен очный осмотр."
              },
              {
                id: "item-4",
                q: "Мои данные в безопасности?",
                a: "Абсолютно. Мы используем шифрование и соблюдаем закон о персональных данных. Вашу переписку видит только лечащий врач."
              },
              {
                id: "item-5",
                q: "Можно ли показать результаты анализов?",
                a: "Да, вы можете загрузить фото или PDF с результатами анализов в чат. Врач расшифрует их и даст пояснения."
              },
            ].map((item) => (
              <div key={item.id} className="bg-slate-50 border border-slate-100 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-800 hover:bg-slate-100 transition-colors w-full"
                  aria-expanded={openFaqId === item.id}
                >
                  {item.q}
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${openFaqId === item.id ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${openFaqId === item.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-0 leading-relaxed text-sm text-slate-600">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      {/* <section className="py-16 md:py-20 bg-linear-to-r from-cyan-500 to-cyan-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">Начните заботиться о здоровье умнее</h2>
          <a
            href={process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 md:px-10 py-4 md:py-5 bg-white text-cyan-600 text-lg md:text-xl font-bold rounded-xl hover:bg-cyan-50 transition-colors shadow-xl"
          >
            Запустить ИИ-терапевта
          </a>
        </div>
      </section> */}

      {/* --- EARLY ACCESS MODAL --- */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 animate-in fade-in duration-300" />
          <Dialog.Content className="fixed z-50 w-full bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-300 focus:outline-none 
            h-full inset-0 rounded-none 
            md:h-auto md:inset-auto md:left-[50%] md:top-[50%] md:max-w-lg md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-2xl md:p-8 md:border md:border-slate-100">


            <div className={`flex flex-col gap-6 transition-all duration-300 ${submitStatus === "success" || (typeof window !== 'undefined' && localStorage.getItem('heals_early_access') === 'true') ? "items-center text-center py-8" : ""}`}>

              {(submitStatus === "success" || (typeof window !== 'undefined' && localStorage.getItem('heals_early_access') === 'true')) ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2 animate-in zoom-in spin-in-12 duration-500">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <Dialog.Title className="text-2xl font-bold text-slate-900">
                    Спасибо! Вы в списке
                  </Dialog.Title>
                  <Dialog.Description className="text-slate-600 mt-2 text-lg leading-relaxed max-w-sm mx-auto">
                    Мы уже получили ваши контакты. Как только все будет готово, мы сразу свяжемся с вами и подарим месяц бесплатного доступа!
                  </Dialog.Description>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-6 px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Закрыть
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      🎁
                    </div>
                    <Dialog.Title className="text-2xl font-bold text-slate-900">
                      Получите месяц бесплатно
                    </Dialog.Title>
                    <Dialog.Description className="text-slate-600 mt-2 text-base leading-relaxed">
                      Мы запускаем подписку уже совсем скоро. Оставьте контакты сейчас, и мы подарим вам <span className="font-bold text-cyan-600">30 дней полного доступа</span> на старте!
                    </Dialog.Description>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-slate-700 block">Куда отправить приглашение?</label>
                      <div className="flex p-1 bg-slate-100 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setContactType("telegram")}
                          className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${contactType === "telegram"
                            ? "bg-white text-cyan-700 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                          Telegram
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactType("phone")}
                          className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all ${contactType === "phone"
                            ? "bg-white text-cyan-700 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                          Телефон
                        </button>
                      </div>
                    </div>

                    <div>
                      <input
                        type={contactType === "phone" ? "tel" : "text"}
                        required
                        placeholder={contactType === "phone" ? "+7 (999) 000-00-00" : "@username"}
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-lg"
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex h-6 items-center">
                        <input
                          id="consent"
                          type="checkbox"
                          checked={isAgreed}
                          onChange={(e) => setIsAgreed(e.target.checked)}
                          className="h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                          required
                        />
                      </div>
                      <label htmlFor="consent" className="text-sm text-slate-500 leading-snug cursor-pointer select-none">
                        Я даю согласие на обработку персональных данных и принимаю условия <a href="/user-agreement" target="_blank" className="text-cyan-600 hover:text-cyan-700 underline" onClick={(e) => e.stopPropagation()}>пользовательского соглашения</a>
                      </label>
                    </div>

                    {submitStatus === "error" && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
                        Что-то пошло не так. Попробуйте еще раз.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !isAgreed}
                      className="w-full py-4 bg-cyan-600 text-white font-bold text-lg rounded-xl hover:bg-cyan-700 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-cyan-500/25"
                    >
                      {isSubmitting ? "Отправка..." : "Забрать подарок"}
                    </button>
                  </form>
                </>
              )}
            </div>

            <Dialog.Close className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <footer className="py-4 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p className="mb-2">{new Date().getFullYear()} <a href="/user-agreement" className="hover:text-cyan-600 transition-colors">Пользовательское соглашение</a></p>
        </div>
      </footer>

    </main>
  );
}
