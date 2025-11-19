"use client";

import { useEffect, useState } from "react";
import { TelegramFrame } from "./TelegramFrame";
import { landingContent } from "@/app/landingContent";

interface ManagerNotification {
  id: number;
  contentMd: string;
  timestamp: string;
}

interface ManagerTelegramDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

// Simple markdown parser for bold (**text**) and newlines (\n)
const SimpleMarkdown = ({ content }: { content: string }) => {
  const lines = content.split('\n');

  return (
    <>
      {lines.map((line, i) => {
        // Split by bold markers
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={i} className="m-0">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <span key={j} className="font-bold">{part.slice(2, -2)}</span>;
              }
              return part;
            })}
          </p>
        );
      })}
    </>
  );
};

export function ManagerTelegramDemo({
  autoStart = true,
  onComplete,
  startTrigger = true,
}: ManagerTelegramDemoProps = {}) {
  const [notification, setNotification] = useState<ManagerNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const content = landingContent.demoComponents.managerTelegram;

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
        contentMd: content.notification.contentMd.replace("{{date}}", date),
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
  }, [startTrigger, onComplete, date, content]);

  return (
    <TelegramFrame title={content.header.title} subtitle={content.header.subtitle} avatar="👤">
      <div className="flex flex-col h-full pt-2">
        {!isVisible && <div className="flex items-center justify-center h-full" />}

        {isVisible && notification && (
          <div className="animate-slideIn">
            {/* Сообщение от бота - используем точно такой же стиль как в TelegramChatDemo */}
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl bg-[#182533] text-white rounded-tl-md px-3 py-2 shadow-lg">
                <div className="mb-2">
                  <span className="text-xl mr-1.5">🔔</span>
                  <span className="text-[15px] font-bold">{content.notification.title.replace("🔔 ", "")}</span>
                </div>

                <div className="text-[15px] leading-[20px] whitespace-pre-line [&>p]:mb-0 [&>p]:leading-[20px]">
                  <SimpleMarkdown content={notification.contentMd} />
                </div>

                <div className="text-[11px] mt-1 text-[#8E8E93] text-right">{notification.timestamp}</div>
              </div>
            </div>

            {/* Кнопки под сообщением - точно такой же цвет как фон сообщения */}
            <div className="flex justify-start mt-1">
              <div className="max-w-[75%] space-y-[2px]">
                {content.notification.buttons.map((btn, i) => (
                  <button key={i} className="w-full py-2 px-3 bg-[#182533] text-white text-center rounded-lg text-[15px] hover:bg-[#1f2d3d] transition-colors">
                    {btn}
                  </button>
                ))}
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
