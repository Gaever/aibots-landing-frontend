"use client";

import { TelegramFrame } from "../../shared/TelegramFrame";
import { landingContent } from "@/app/landingContent";
import { useEffect, useState } from "react";

export function QualityControlNotificationDemo({ autoStart = false }: { autoStart?: boolean }) {
  const { notification } = landingContent.qualityControlPresentation.demo;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [autoStart]);

  return (
    <TelegramFrame
      title="Контроль качества"
      subtitle="bot"
      avatar="🛡️"
      showInput={false}
    >
      <div className="flex flex-col h-full pt-2">
        {!isVisible && <div className="flex items-center justify-center h-full" />}

        {isVisible && (
          <div className="animate-slideIn">
            {/* Message from bot - exactly like ManagerTelegramDemo */}
            <div className="flex justify-start">
              <div className="max-w-[75%] rounded-2xl bg-[#182533] text-white rounded-tl-md px-3 py-2 shadow-lg">
                <div className="mb-2">
                  <span className="text-xl mr-1.5">🔔</span>
                  <span className="text-[15px] font-bold">{notification.title.replace("⚠️ ", "")}</span>
                </div>

                <div className="text-[15px] leading-[20px] whitespace-pre-line mb-1">
                  {notification.message}
                </div>

                <div className="text-[11px] mt-1 text-[#8E8E93] text-right">14:32</div>
              </div>
            </div>

            {/* Buttons under the message - exactly like ManagerTelegramDemo */}
            <div className="flex justify-start mt-1">
              <div className="max-w-[75%] space-y-[2px] w-full">
                <button className="w-full py-2 px-3 bg-[#182533] text-white text-center rounded-lg text-[15px] hover:bg-[#1f2d3d] transition-colors">
                  Связаться с клиентом
                </button>
                <button className="w-full py-2 px-3 bg-[#182533] text-white text-center rounded-lg text-[15px] hover:bg-[#1f2d3d] transition-colors">
                  {notification.buttonText}
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
