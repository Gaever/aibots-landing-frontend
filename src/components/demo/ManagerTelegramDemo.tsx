"use client";

import { useEffect, useState } from "react";
import { TelegramFrame } from "./TelegramFrame";

interface ManagerNotification {
  id: number;
  customerName: string;
  product: string;
  price: string;
  timestamp: string;
}

interface ManagerTelegramDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

export function ManagerTelegramDemo({
  autoStart = true,
  onComplete,
  startTrigger = true,
}: ManagerTelegramDemoProps = {}) {
  const [notification, setNotification] = useState<ManagerNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!startTrigger) return;

    // Показываем уведомление через 1 секунду после монтирования
    const timer = setTimeout(() => {
      setNotification({
        id: 1,
        customerName: "Клиент",
        product: "Парка зимняя, размер L",
        price: "8 990 ₽",
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
    <TelegramFrame title="ИИ-бот (менеджер)" subtitle="online">
      <div className="flex items-center justify-center h-full">
        {!isVisible && (
          <div className="text-gray-500 text-center">
            <div className="text-4xl mb-3">⏳</div>
            <p className="text-sm">Ожидание заявки...</p>
          </div>
        )}

        {isVisible && notification && (
          <div className="w-full animate-slideIn">
            <div className="bg-[#182533] rounded-2xl rounded-tl-md px-4 py-3 shadow-lg">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">🔔</div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-base mb-1">Новая заявка!</div>
                  <div className="text-[#8E8E93] text-xs">{notification.timestamp}</div>
                </div>
              </div>

              <div className="space-y-2 text-white text-[15px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#8E8E93]">👤</span>
                  <span>{notification.customerName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8E8E93]">🛍️</span>
                  <span>{notification.product}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#8E8E93]">💰</span>
                  <span className="font-semibold text-green-400">{notification.price}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-700">
                <button className="w-full py-2 bg-[#8BBEF6] text-white rounded-lg font-semibold text-sm hover:bg-[#7AACDC] transition-colors">
                  Связаться с клиентом
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </TelegramFrame>
  );
}
