"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  budget: string;
  status: string;
  timestamp: string;
}

interface AmoCRMDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

export function AmoCRMDemo({ autoStart = true, onComplete, startTrigger = true }: AmoCRMDemoProps = {}) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!startTrigger) return;

    // Показываем новую заявку через 1 секунду
    const timer = setTimeout(() => {
      setLead({
        id: 12345,
        name: "Заявка с сайта - Парка зимняя",
        budget: "8 990 ₽",
        status: "Новая заявка",
        timestamp: new Date().toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setIsVisible(true);

      // Вызываем onComplete через 3 секунды после появления
      setTimeout(() => {
        onComplete?.();
      }, 3000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [startTrigger, onComplete]);

  return (
    <div className="w-full max-w-[900px] mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* AmoCRM Header */}
      <div className="bg-[#1f2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">amoCRM</h1>
            <p className="text-gray-400 text-xs">Воронка продаж</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            + Создать сделку
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">М</span>
          </div>
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold whitespace-nowrap">
            Новые заявки (1)
          </div>
          <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">
            Квалификация (0)
          </div>
          <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">
            Принятие решения (0)
          </div>
          <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">
            Успешно (0)
          </div>
        </div>
      </div>

      {/* Leads area */}
      <div className="p-6 min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100">
        {!isVisible && (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-lg font-medium">Ожидание новой заявки...</p>
            <p className="text-sm mt-2">Заявки появятся здесь автоматически</p>
          </div>
        )}

        {isVisible && lead && (
          <div className="animate-dropIn">
            <div className="bg-white rounded-lg shadow-lg border-l-4 border-blue-600 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              {/* Lead card header */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">{lead.status}</span>
                  </div>
                  <span className="text-xs text-gray-500">#{lead.id}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{lead.name}</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                    </svg>
                    <span className="text-xl font-bold text-green-600">{lead.budget}</span>
                  </div>
                  <span className="text-sm text-gray-500">{lead.timestamp}</span>
                </div>
              </div>

              {/* Lead card body */}
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Клиент</p>
                    <p className="text-sm text-gray-600">Новый контакт</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Источник</p>
                    <p className="text-sm text-gray-600">Telegram-бот</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Товар</p>
                    <p className="text-sm text-gray-600">Парка зимняя, размер L</p>
                  </div>
                </div>
              </div>

              {/* Lead card footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold hover:bg-blue-700 transition-colors">
                    Связаться
                  </button>
                  <button className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-semibold hover:bg-gray-300 transition-colors">
                    Изменить
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
