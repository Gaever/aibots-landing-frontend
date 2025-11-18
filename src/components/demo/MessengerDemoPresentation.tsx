"use client";

import { useState } from "react";
import { StackedCarousel } from "./StackedCarousel";
import { TelegramChatDemo } from "./TelegramChatDemo";
import { ManagerTelegramDemo } from "./ManagerTelegramDemo";
import { AmoCRMDemo } from "./AmoCRMDemo";

export function MessengerDemoPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCompletions, setSlideCompletions] = useState<Record<number, boolean>>({});

  const handleSlideComplete = (slideIndex: number) => {
    console.log(`Slide ${slideIndex} completed`);
    setSlideCompletions((prev) => ({ ...prev, [slideIndex]: true }));

    // Автоматически переходим к следующему слайду
    if (slideIndex < slides.length - 1) {
      setTimeout(() => {
        setCurrentSlide(slideIndex + 1);
      }, 500);
    } else {
      // Последний слайд - перезапуск через 3 секунды
      setTimeout(() => {
        setCurrentSlide(0);
        setSlideCompletions({});
      }, 3000);
    }
  };

  const slides = [
    {
      id: "customer-chat",
      title: "Шаг 1: Клиент общается с ИИ-ботом",
      content: (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <div className="mb-6 text-center max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Диалог с клиентом в Telegram</h3>
            <p className="text-gray-600">
              ИИ-бот автоматически отвечает на вопросы клиента, помогает с выбором товара и оформляет заказ
            </p>
          </div>
          <TelegramChatDemo
            autoStart={false}
            startTrigger={currentSlide === 0}
            onComplete={() => handleSlideComplete(0)}
          />
        </div>
      ),
    },
    {
      id: "manager-notification",
      title: "Шаг 2: Уведомление менеджера",
      content: (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <div className="mb-6 text-center max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Менеджер получает уведомление</h3>
            <p className="text-gray-600">
              Сразу после оформления заказа менеджер получает уведомление в Telegram с деталями заявки
            </p>
          </div>
          <ManagerTelegramDemo
            autoStart={false}
            startTrigger={currentSlide === 1}
            onComplete={() => handleSlideComplete(1)}
          />
        </div>
      ),
    },
    {
      id: "crm-integration",
      title: "Шаг 3: Заявка в CRM",
      content: (
        <div className="flex flex-col items-center justify-center h-full py-8">
          <div className="mb-6 text-center max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Автоматическое создание сделки в amoCRM</h3>
            <p className="text-gray-600">
              Заявка автоматически создается в CRM со всеми данными: контактом клиента, товаром и суммой сделки
            </p>
          </div>
          <AmoCRMDemo autoStart={false} startTrigger={currentSlide === 2} onComplete={() => handleSlideComplete(2)} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Как работает автоматизация</h2>
          <p className="text-xl text-gray-600">От первого сообщения клиента до заявки в CRM за секунды</p>
        </div>

        {/* Carousel */}
        <StackedCarousel
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          autoAdvance={false}
        />

        {/* Info banner */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 border border-blue-200 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-blue-900">
              {currentSlide === slides.length - 1
                ? "Демонстрация завершена. Перезапуск через 3 секунды..."
                : "Наблюдайте за автоматической обработкой заявки"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
