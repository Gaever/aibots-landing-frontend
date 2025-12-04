"use client";

import { useEffect, useState, useRef } from "react";
import { landingContent } from "@/app/landingContent";
import { AvitoFrame } from "../../shared/AvitoFrame";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ScenarioStep {
  delay: number;
  action: "user-typing" | "user-send" | "typing" | "bot";
  text?: string;
}

interface AvitoChatDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

export function AvitoChatDemo({ autoStart = true, onComplete, startTrigger = true }: AvitoChatDemoProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const content = landingContent.demoComponents;
  const avitoContent = content.avitoChat;
  const telegramContent = content.telegramChat;

  // Transform landingContent scenario to the format required by the component
  const DEMO_SCENARIO: ScenarioStep[] = [
    {
      delay: 800,
      action: "user-typing",
      text: telegramContent.scenario[0].text,
    },
    {
      delay: 300,
      action: "user-send",
      text: telegramContent.scenario[0].text,
    },
    {
      delay: 800,
      action: "typing",
    },
    {
      delay: 2000,
      action: "bot",
      text: telegramContent.scenario[1].text,
    },
    {
      delay: 2500,
      action: "user-typing",
      text: telegramContent.scenario[2].text,
    },
    {
      delay: 300,
      action: "user-send",
      text: telegramContent.scenario[2].text,
    },
    {
      delay: 600,
      action: "typing",
    },
    {
      delay: 1800,
      action: "bot",
      text: telegramContent.scenario[3].text,
    },
    {
      delay: 2500,
      action: "user-typing",
      text: telegramContent.scenario[4].text,
    },
    {
      delay: 300,
      action: "user-send",
      text: telegramContent.scenario[4].text,
    },
    {
      delay: 500,
      action: "typing",
    },
    {
      delay: 1500,
      action: "bot",
      text: telegramContent.scenario[5].text,
    },
  ];

  useEffect(() => {
    if (autoStart && startTrigger) {
      const timer = setTimeout(() => {
        runDemo();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoStart, startTrigger]);

  // Auto-scroll handled by AvitoFrame via scrollTrigger prop

  const runDemo = () => {
    setMessages([]);
    setIsTyping(false);
    setCurrentStep(0);
    setInputText("");
    setIsUserTyping(false);
  };

  useEffect(() => {
    if (currentStep < DEMO_SCENARIO.length) {
      const step = DEMO_SCENARIO[currentStep];

      if (step.action === "user-typing" && step.text) {
        const startTimer = setTimeout(() => {
          setIsUserTyping(true);
          setInputText("");
          let charIndex = 0;
          const typingInterval = setInterval(() => {
            if (charIndex < (step.text || "").length) {
              const nextText = (step.text || "").substring(0, charIndex + 1);
              // console.log("Typing:", nextText);
              setInputText(nextText);
              charIndex++;
            } else {
              clearInterval(typingInterval);
              setTimeout(() => {
                setCurrentStep((prev) => prev + 1);
              }, 200);
            }
          }, 30);
        }, step.delay);

        return () => clearTimeout(startTimer);
      } else {
        const timer = setTimeout(() => {
          if (step.action === "user-send" && step.text) {
            setIsUserTyping(false);
            const newMessage: Message = {
              id: Date.now() + Math.random(),
              text: step.text,
              isBot: false,
              timestamp: new Date().toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            setMessages((prev) => [...prev, newMessage]);
            setInputText("");
          } else if (step.action === "typing") {
            setIsTyping(true);
          } else if (step.action === "bot" && step.text) {
            setIsTyping(false);
            const newMessage: Message = {
              id: Date.now() + Math.random(),
              text: step.text,
              isBot: true,
              timestamp: new Date().toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
            setMessages((prev) => [...prev, newMessage]);
          }
          setCurrentStep((prev) => prev + 1);
        }, step.delay);

        return () => clearTimeout(timer);
      }
    } else if (currentStep >= DEMO_SCENARIO.length) {
      onComplete?.();
      if (autoStart) {
        const resetTimer = setTimeout(() => {
          runDemo();
        }, 3000);
        return () => clearTimeout(resetTimer);
      }
    }
  }, [currentStep]);

  return (
    <AvitoFrame
      title={avitoContent.header.title}
      subtitle={avitoContent.header.subtitle}
      rating={avitoContent.header.rating}
      avatar={avitoContent.header.avatar}
      inputPlaceholder={avitoContent.ui.inputPlaceholder}
      inputValue={inputText}
      isUserTyping={isUserTyping}
      scrollTrigger={messages}
    >
      <div className="space-y-4 pb-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-messageSlide`}
          >
            {message.isBot && (
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 shrink-0 overflow-hidden">
                {/* Small avatar next to message */}
                <div className="w-full h-full flex items-center justify-center text-xs">🤖</div>
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 relative ${message.isBot
                ? "bg-[#F2F2F2] text-black rounded-tl-none"
                : "bg-[#D1E8FF] text-black rounded-tr-none"
                }`}
            >
              <p className="text-[15px] leading-[20px] whitespace-pre-line pb-1">{message.text}</p>
              <div className="flex justify-end items-center gap-1">
                <span className="text-[11px] text-gray-400">
                  {message.timestamp}
                </span>
                {!message.isBot && (
                  // Blue double ticks for user messages
                  <svg className="w-3 h-3 text-[#00AAFF]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-messageSlide">
            <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 shrink-0 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-xs">🤖</div>
            </div>
            <div className="bg-[#F2F2F2] rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1.5">
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typingDot"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typingDot"
                  style={{ animationDelay: "160ms" }}
                />
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-typingDot"
                  style={{ animationDelay: "320ms" }}
                />
              </div>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes typingDot {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-8px);
          }
        }
        .animate-messageSlide {
          animation: messageSlide 0.3s ease-out;
        }
        .animate-typingDot {
          animation: typingDot 1.4s ease-in-out infinite;
        }
      `}</style>
    </AvitoFrame>
  );
}
