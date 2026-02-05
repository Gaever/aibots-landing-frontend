"use client";

import { useEffect, useState, useRef } from "react";
import { TelegramFrame } from "@/components/demo/shared/TelegramFrame";
import { Check } from "lucide-react";

interface HealthChatProps {
  autoStart?: boolean;
  light?: boolean;
}

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  time: string;
  isVerified?: boolean;
  isAi?: boolean;
  isEdited?: boolean;
}

export function HealthChat({ autoStart = true, light = false }: HealthChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Message bubble colors based on theme
  const bubbleStyles = light
    ? {
      user: "bg-[#64A3E8] text-white rounded-tr-sm",
      bot: "bg-white/90 text-slate-800 rounded-tl-sm shadow-sm",
      botMeta: "text-slate-500",
      botTime: "text-slate-400",
      typing: "bg-white/90 text-slate-800 shadow-sm",
      typingDot: "bg-slate-400",
    }
    : {
      user: "bg-[#64A3E8] text-white rounded-tr-sm",
      bot: "bg-[#25303E] text-white rounded-tl-sm",
      botMeta: "text-gray-400",
      botTime: "text-gray-400",
      typing: "bg-[#25303E] text-white",
      typingDot: "bg-gray-400",
    };

  // Auto-scroll ONLY inside the chat container
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!autoStart) return;

    let timeoutIds: NodeJS.Timeout[] = [];
    let isMounted = true;

    const scenario = [
      {
        delay: 500,
        action: () => {
          setMessages([
            {
              id: 1,
              role: "user",
              text: "Доброе утро. Беспокоит тянущая боль в пояснице, отдает в ногу. Началось вчера после тренировки.",
              time: "09:41",
            }
          ]);
          setIsTyping(true);
        }
      },
      {
        delay: 3500,
        action: () => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              id: 2,
              role: "bot",
              text: "Здравствуйте. Боль усиливается при наклонах или ходьбе? Есть ли онемение в ноге?",
              time: "09:42",
              isAi: true,
            }
          ]);
        }
      },
      {
        delay: 5000,
        action: () => {
          setMessages(prev => prev.map(m => m.id === 2 ? { ...m, isVerified: true, isEdited: true } : m));
        }
      },
      {
        delay: 6500,
        action: () => {
          setMessages(prev => [
            ...prev,
            {
              id: 3,
              role: "user",
              text: "Да, при наклонах сильнее. Онемения вроде нет, но нога немного ноет.",
              time: "09:43",
            }
          ]);
          setIsTyping(true);
        }
      },
      {
        delay: 9500,
        action: () => {
          setIsTyping(false);
          setMessages(prev => [
            ...prev,
            {
              id: 4,
              role: "bot",
              text: "Похоже на мышечное растяжение или обострение остеохондроза. Рекомендую ограничить нагрузки на 2-3 дня. Можно использовать мази с НПВС. Если боль усилится или появится онемение — нужен очный осмотр невролога.",
              time: "09:44",
              isAi: true,
            }
          ]);
        }
      },
      {
        delay: 11500,
        action: () => {
          setMessages(prev => prev.map(m => m.id === 4 ? { ...m, isVerified: true, isEdited: true } : m));
        }
      },
      {
        delay: 15000,
        action: () => {
          setMessages([]);
          setIsTyping(false);
          setTimeout(() => {
            if (isMounted) runSync();
          }, 500);
        }
      }
    ];

    const runSync = () => {
      setMessages([]);
      setIsTyping(false);
      scenario.forEach(step => {
        timeoutIds.push(setTimeout(step.action, step.delay));
      });
    };

    runSync();

    return () => {
      isMounted = false;
      timeoutIds.forEach(clearTimeout);
    };
  }, [autoStart]);

  return (
    <TelegramFrame title="ИИ Терапевт" subtitle={isTyping ? "печатает..." : "online"} avatar="👨‍⚕️" light={light}>
      <div
        ref={scrollContainerRef}
        className="flex flex-col space-y-3 p-2 h-full overflow-y-auto pb-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-[15px] leading-5 relative ${msg.role === "user"
                ? bubbleStyles.user
                : bubbleStyles.bot
                }`}
            >
              <div className="whitespace-pre-wrap">
                {msg.text}
                {(msg.isAi || msg.isVerified) && (
                  <span className={`block text-[11px] ${bubbleStyles.botMeta} italic mt-1`}>
                    {msg.isAi && "Ответ ИИ"}
                    {msg.isAi && msg.isVerified && ". "}
                    {msg.isVerified && "Проверено врачом"}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-end gap-1 mt-1">
                {msg.isEdited && (
                  <span className={`text-[10px] ${bubbleStyles.botTime} mr-auto`}>изменено</span>
                )}
                <span className={`text-[11px] ${bubbleStyles.botTime}`}>{msg.time}</span>
                {msg.role === "user" && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className={`${bubbleStyles.typing} rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center h-9`}>
              <div className={`w-1.5 h-1.5 ${bubbleStyles.typingDot} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
              <div className={`w-1.5 h-1.5 ${bubbleStyles.typingDot} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
              <div className={`w-1.5 h-1.5 ${bubbleStyles.typingDot} rounded-full animate-bounce`}></div>
            </div>
          </div>
        )}
      </div>
    </TelegramFrame>
  );
}
