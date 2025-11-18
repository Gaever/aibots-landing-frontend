"use client";

import { useEffect, useState } from "react";
import { TelegramChatDemo } from "./TelegramChatDemo";
import { ManagerTelegramDemo } from "./ManagerTelegramDemo";
import { AmoCRMDemo } from "./AmoCRMDemo";

type DemoStage = "customer" | "manager" | "crm" | "complete";

export function MessengerDemoPresentation() {
  const [stage, setStage] = useState<DemoStage>("customer");

  useEffect(() => {
    // Диалог с клиентом длится примерно 25 секунд
    const customerTimer = setTimeout(() => {
      setStage("manager");
    }, 25000);

    return () => clearTimeout(customerTimer);
  }, []);

  useEffect(() => {
    if (stage === "manager") {
      // Уведомление менеджера показывается 5 секунд
      const managerTimer = setTimeout(() => {
        setStage("crm");
      }, 5000);

      return () => clearTimeout(managerTimer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "crm") {
      // CRM показывается 5 секунд
      const crmTimer = setTimeout(() => {
        setStage("complete");
      }, 5000);

      return () => clearTimeout(crmTimer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "complete") {
      // Перезапуск через 3 секунды
      const restartTimer = setTimeout(() => {
        setStage("customer");
      }, 3000);

      return () => clearTimeout(restartTimer);
    }
  }, [stage]);

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                stage === "customer" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-current" />
              <span className="text-sm font-medium">Диалог с клиентом</span>
            </div>

            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                stage === "manager" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-current" />
              <span className="text-sm font-medium">Уведомление менеджера</span>
            </div>

            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>

            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                stage === "crm" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-current" />
              <span className="text-sm font-medium">Заявка в CRM</span>
            </div>
          </div>
        </div>

        {/* Demo area */}
        <div className="relative min-h-[900px]">
          {/* Stage 1: Customer chat */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              stage === "customer" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                Клиент общается с ИИ-ботом в Telegram
              </h2>
              <TelegramChatDemo />
            </div>
          </div>

          {/* Stage 2: Manager and CRM side by side */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              stage === "manager" || stage === "crm"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              {stage === "manager" ? "Менеджер получает уведомление" : "Заявка автоматически создается в CRM"}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Manager notification */}
              <div
                className={`transition-all duration-500 ${
                  stage === "manager" ? "opacity-100 translate-x-0" : "opacity-50 -translate-x-4"
                }`}
              >
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📱</span>
                    <span>Telegram менеджера</span>
                  </h3>
                  <ManagerTelegramDemo />
                </div>
              </div>

              {/* CRM */}
              <div
                className={`transition-all duration-500 ${
                  stage === "crm" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                }`}
              >
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span>💼</span>
                    <span>amoCRM</span>
                  </h3>
                  <AmoCRMDemo />
                </div>
              </div>
            </div>
          </div>

          {/* Stage 3: Complete message */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              stage === "complete" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Заявка обработана!</h2>
              <p className="text-lg text-gray-600 mb-2">Бот принял заказ, уведомил менеджера и создал сделку в CRM</p>
              <p className="text-sm text-gray-500">Презентация перезапустится через 3 секунды...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
