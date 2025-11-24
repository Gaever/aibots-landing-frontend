"use client";

import { TelegramFrame } from "../../shared/TelegramFrame";
import { landingContent } from "@/app/landingContent";
import { useEffect, useState } from "react";

interface FinancialReportDemoProps {
  autoStart?: boolean;
}

export function FinancialReportDemo({ autoStart = false }: FinancialReportDemoProps) {
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scenario = landingContent.documentBotPresentation.demo.financial.messages;

  useEffect(() => {
    if (!autoStart) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const playNextMessage = () => {
      if (currentIndex >= scenario.length) return;

      const message = scenario[currentIndex];

      if (message.role === "bot") {
        setIsTyping(true);
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, message]);
          currentIndex++;
          timeoutId = setTimeout(playNextMessage, 1500);
        }, 1500);
      } else {
        setMessages((prev) => [...prev, message]);
        currentIndex++;
        timeoutId = setTimeout(playNextMessage, 1000);
      }
    };

    // Initial delay
    timeoutId = setTimeout(playNextMessage, 500);

    return () => clearTimeout(timeoutId);
  }, [autoStart]);

  return (
    <TelegramFrame
      title={landingContent.documentBotPresentation.demo.financial.header.title}
      subtitle={isTyping ? "печатает..." : landingContent.documentBotPresentation.demo.financial.header.subtitle}
      avatar="📊"
    >
      <div className="flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${msg.role === "user"
                ? "bg-[#60A6FA] text-white self-end rounded-tr-sm"
                : "bg-[#232E3C] text-white self-start rounded-tl-sm"
              }`}
          >
            <div className="whitespace-pre-wrap">
              {msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                if (linkMatch) {
                  return (
                    <a
                      key={i}
                      href={linkMatch[2]}
                      className="text-[#60A6FA] hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      {linkMatch[1]}
                    </a>
                  );
                }
                // Handle bold text
                const parts = part.split(/(\*\*.*?\*\*)/g);
                return parts.map((p, j) => {
                  if (p.startsWith("**") && p.endsWith("**")) {
                    return <strong key={`${i}-${j}`}>{p.slice(2, -2)}</strong>;
                  }
                  return p;
                });
              })}
            </div>
          </div>
        ))}
      </div>
    </TelegramFrame>
  );
}
