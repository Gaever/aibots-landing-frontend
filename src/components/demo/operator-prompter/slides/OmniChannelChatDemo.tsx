"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { OnlineConsultantWidget } from "@/components/demo/shared/OnlineConsultantWidget";

interface Message {
  id: number;
  type: "user" | "operator";
  text: string;
  timestamp: string;
  isNew?: boolean;
}

interface SuggestedResponse {
  id: number;
  text: string;
  category: string;
}

interface KnowledgeItem {
  title: string;
  snippet: string;
}

interface OmniChannelChatDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

export function OmniChannelChatDemo({
  autoStart = false,
  onComplete,
  startTrigger = true,
}: OmniChannelChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "user",
      text: "Здравствуйте! Хочу узнать про вашу программу лояльности",
      timestamp: "14:23",
    },
    {
      id: 2,
      type: "operator",
      text: "Здравствуйте! Сейчас уточню информацию...",
      timestamp: "14:24",
    },
  ]);

  const [aiStatus, setAiStatus] =
    useState<"idle" | "processing" | "ready">("idle");
  const [suggestedResponses, setSuggestedResponses] = useState<
    SuggestedResponse[]
  >([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [clickedButton, setClickedButton] = useState<number | null>(null);

  useEffect(() => {
    if (!autoStart && !startTrigger) return;

    const timer1 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 3,
          type: "user",
          text: "Какие у вас есть уровни участия и какие преимущества на каждом уровне?",
          timestamp: "14:25",
          isNew: true,
        },
      ]);
    }, 2000);

    const timer2 = setTimeout(() => setAiStatus("processing"), 3000);

    const timer3 = setTimeout(() => {
      setKnowledgeBase([
        {
          title: "Программа лояльности: Уровни",
          snippet:
            "Bronze (3%), Silver (5%), Gold (7%) — кэшбэк от покупок",
        },
      ]);
    }, 6000);

    const timer4 = setTimeout(() => {
      setAiStatus("ready");
      setSuggestedResponses([
        {
          id: 1,
          text: "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход автоматический при достижении суммы покупок.",
          category: "Рекомендация",
        },
      ]);
    }, 7500);

    const timer5 = setTimeout(() => setClickedButton(1), 10000);

    const timer6 = setTimeout(() => {
      setInputText(
        "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход автоматический при достижении суммы покупок."
      );
      setIsEditing(true);
      setClickedButton(null);
    }, 10500);

    const timer7 = setTimeout(() => {
      let currentText = "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход ";
      setInputText(currentText);

      const newWord = "происходит автоматически";
      let i = 0;

      const interval = setInterval(() => {
        if (i <= newWord.length) {
          setInputText(
            currentText +
            newWord.slice(0, i) +
            " при достижении суммы покупок."
          );
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }, 12000);

    const timer9 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 4,
          type: "operator",
          text: "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход происходит автоматически при достижении суммы покупок.",
          timestamp: "14:26",
        },
      ]);
      setInputText("");
      setIsEditing(false);

      setTimeout(() => onComplete?.(), 1000);
    }, 15500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer9);
    };
  }, [autoStart, startTrigger, onComplete]);

  return (
    <div className="w-full max-w-6xl mx-auto md:h-[600px] flex flex-col md:flex-row gap-4">

      {/* ---------- AI WIDGET (BELOW CHAT ON MOBILE) ---------- */}
      <div className="order-2 md:order-2 w-full md:w-80 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">ИИ Суфлёр</div>
              <div className="text-xs opacity-90">
                {aiStatus === "idle" && "Ожидание"}
                {aiStatus === "processing" && "Анализирую..."}
                {aiStatus === "ready" && "Готов помочь"}
              </div>
            </div>

            <div
              className={`w-3 h-3 rounded-full ${aiStatus === "idle"
                ? "bg-gray-400"
                : aiStatus === "processing"
                  ? "bg-yellow-400 animate-pulse"
                  : "bg-green-400"
                }`}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {aiStatus === "processing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span>Анализ входящего сообщения...</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <span>Поиск по базе знаний...</span>
              </div>
            </motion.div>
          )}

          {aiStatus === "ready" && (
            <>
              {/* KNOWLEDGE BASE */}
              {/* {knowledgeBase.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                    База знаний
                  </div>

                  {knowledgeBase.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="bg-purple-50 border border-purple-200 rounded-lg p-2.5"
                    >
                      <div className="text-xs font-semibold text-purple-900 mb-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-purple-700">
                        {item.snippet}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )} */}

              {/* SUGGESTED RESPONSES */}
              {suggestedResponses.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                    Варианты ответа
                  </div>

                  {suggestedResponses.map((response, idx) => (
                    <motion.button
                      key={response.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: clickedButton === response.id ? 0.95 : 1,
                      }}
                      transition={{
                        delay: 0.6 + idx * 0.15,
                      }}
                      className={`w-full text-left bg-linear-to-br from-indigo-50 to-purple-50 border rounded-lg p-3 relative ${clickedButton === response.id
                        ? "border-indigo-500 ring-2 ring-indigo-300"
                        : "border-indigo-200"
                        }`}
                    >
                      {clickedButton === response.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [0, 1.5, 0] }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 bg-indigo-300 rounded-lg opacity-30"
                        />
                      )}

                      <div className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide mb-1">
                        {response.category}
                      </div>
                      <div className="text-xs text-gray-700">
                        {response.text}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}

          {aiStatus === "idle" && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              Ожидание нового сообщения
            </div>
          )}
        </div>
      </div>

      {/* ---------- CHAT WIDGET (TOP ON MOBILE) ---------- */}
      <div className="order-1 md:order-1 flex-1">
        <OnlineConsultantWidget
          variant="operator"
          title="Анна Петрова • ID: 847392"
          statusText="Telegram • Online"
          inputValue={inputText}
          onInputChange={setInputText}
          className="h-[400px]! md:h-[600px]!"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={message.isNew ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${message.type === "user"
                ? "justify-start"
                : "justify-end"
                }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${message.type === "user"
                  ? "bg-white text-gray-800 rounded-tl-sm shadow-md border border-gray-100"
                  : "bg-blue-600 text-white rounded-tr-sm shadow-md"
                  }`}
              >
                <div className="text-sm whitespace-pre-line leading-relaxed">
                  {message.text}
                </div>
                <div
                  className={`text-[10px] mt-1 ${message.type === "user"
                    ? "text-gray-500"
                    : "text-blue-100"
                    }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
        </OnlineConsultantWidget>
      </div>
    </div>
  );
}
