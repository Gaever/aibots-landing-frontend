"use client";

import { ScrollBasedDemo } from "./ScrollBasedDemo";
import { TelegramChatDemo } from "./TelegramChatDemo";
import { ManagerTelegramDemo } from "./ManagerTelegramDemo";
import { AmoCRMDemo } from "./AmoCRMDemo";
import { landingContent } from "@/app/landingContent";

export function MessengerScrollPresentation() {
  const content = landingContent.messengerPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <TelegramChatDemo autoStart={true} />,
    },
    {
      ...content.sections[1],
      demoComponent: <AmoCRMDemo autoStart={true} />,
    },
    {
      ...content.sections[2],
      demoComponent: <ManagerTelegramDemo autoStart={true} />,
    },
    {
      ...content.sections[3],
      demoComponent: (
        <div className="flex flex-col items-center justify-center text-center space-y-8 p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl w-full h-full">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-4xl font-bold text-white mb-4">
            Готовы автоматизировать?
          </h3>
          <p className="text-xl text-white/90 max-w-md mb-8">
            Начните получать заявки на автопилоте уже через неделю
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-xl"
            >
              Записаться на демо
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-200"
            >
              Узнать цену
            </a>
          </div>
          <div className="mt-8 flex items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Запуск за 7 дней</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Поддержка 24/7</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ScrollBasedDemo
      headerTitle={content.headerTitle}
      headerSubtitle={content.headerSubtitle}
      sections={sections}
    />
  );
}
