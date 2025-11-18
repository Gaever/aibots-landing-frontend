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
  const [date] = useState(() => {
    const d = new Date();
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  });

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
    <TelegramFrame title="Менеджер" subtitle="online" avatar="👤">
      <div className="flex flex-col h-full pt-2">
        {!isVisible && (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 text-center">
              <div className="text-4xl mb-3">⏳</div>
              <p className="text-sm">Ожидание заявки...</p>
            </div>
          </div>
        )}

        {isVisible && notification && (
          <div className="animate-slideIn">
            {/* Сообщение от бота - используем точно такой же стиль как в TelegramChatDemo */}
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl bg-[#182533] text-white rounded-tl-md px-3 py-2 shadow-lg">
                <div className="mb-2">
                  <span className="text-xl mr-1.5">🔔</span>
                  <span className="text-[15px] font-bold">Новая заявка!</span>
                </div>

                <p className="text-[15px] leading-[20px] whitespace-pre-line">
                  <span className="font-bold">Клиент:</span> Анна Петрова{"\n"}
                  <span className="font-bold">Позиция:</span> Парка зимняя, размер L{"\n"}
                  <span className="font-bold">Дата заказа:</span> {date}
                  {"\n"}
                  <span className="font-bold">Сумма:</span> 8 990 ₽
                </p>

                <div className="text-[11px] mt-1 text-[#8E8E93] text-right">{notification.timestamp}</div>
              </div>
            </div>

            {/* Кнопки под сообщением - точно такой же цвет как фон сообщения */}
            <div className="flex justify-start mt-1">
              <div className="max-w-[75%] space-y-[2px]">
                <button className="w-full py-2 px-3 bg-[#182533] text-white text-center rounded-lg text-[15px] hover:bg-[#1f2d3d] transition-colors">
                  Связаться с клиентом
                </button>
                <button className="w-full py-2 px-3 bg-[#182533] text-white text-center rounded-lg text-[15px] hover:bg-[#1f2d3d] transition-colors">
                  Открыть в CRM
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
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </TelegramFrame>
  );
}
