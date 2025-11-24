"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { landingContent } from "@/app/landingContent";
import { TelegramFrame } from "@/components/demo/shared/TelegramFrame";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

export function HrInterviewChatDemo({ autoStart = false }: { autoStart?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scenario = landingContent.hrBotPresentation?.demo?.chat?.scenario || [];

  useEffect(() => {
    if (!autoStart) return;

    let timeout: NodeJS.Timeout;

    const processStep = async () => {
      if (step >= scenario.length) {
        // Reset after delay
        timeout = setTimeout(() => {
          setMessages([]);
          setStep(0);
        }, 5000);
        return;
      }

      const currentMessage = scenario[step];
      const delay = step === 0 ? 500 : 1000;

      if (currentMessage.role === "bot") {
        setIsTyping(true);
        timeout = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: currentMessage.text, isBot: true },
          ]);
          setStep((s) => s + 1);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: currentMessage.text, isBot: false },
          ]);
          setStep((s) => s + 1);
        }, delay);
      }
    };

    processStep();

    return () => clearTimeout(timeout);
  }, [autoStart, step, scenario]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <TelegramFrame
      title="HR-Ассистент"
      subtitle="bot"
      avatar="HR"
    >
      <div ref={scrollRef} className="h-full overflow-y-auto space-y-2 pr-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-[15px] leading-snug relative ${msg.isBot
                    ? "bg-[#182533] text-white rounded-tl-none"
                    : "bg-[#2b5278] text-white rounded-tr-none"
                  }`}
              >
                {msg.text.split('\n').map((line, i) => (
                  <div key={i} className={line ? "min-h-[1.2em]" : "h-[0.5em]"}>
                    {line}
                  </div>
                ))}
                <div className={`text-[11px] text-right mt-1 ${msg.isBot ? "text-[#6c7883]" : "text-[#7fa2c2]"}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex justify-start"
          >
            <div className="bg-[#182533] p-3 rounded-2xl rounded-tl-none flex gap-1 items-center h-10">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </div>
    </TelegramFrame>
  );
}
