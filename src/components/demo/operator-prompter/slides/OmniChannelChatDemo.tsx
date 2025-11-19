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

  const [aiStatus, setAiStatus] = useState<"idle" | "processing" | "ready">("idle");
  const [suggestedResponses, setSuggestedResponses] = useState<SuggestedResponse[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [typingText, setTypingText] = useState("");

  useEffect(() => {
    if (!autoStart && !startTrigger) return;

    // Шаг 1: Новое сообщение от пользователя (2s)
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

    // Шаг 2: AI переходит в статус обработки (3s)
    const timer2 = setTimeout(() => {
      setAiStatus("processing");
    }, 3000);

    // Шаг 3: Показываем базу знаний (6s)
    const timer3 = setTimeout(() => {
      setKnowledgeBase([
        {
          title: "Программа лояльности: Уровни",
          snippet: "Bronze (3%), Silver (5%), Gold (7%) - кэшбэк от покупок",
        },
      ]);
    }, 6000);

    // Шаг 4: AI готов с предложениями (7.5s)
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

    // Шаг 5: Анимация клика на первую кнопку (10s)
    const timer5 = setTimeout(() => {
      setClickedButton(1);
    }, 10000);

    // Шаг 6: Вставляем текст в инпут (10.5s)
    const timer6 = setTimeout(() => {
      setInputText(
        "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход автоматический при достижении суммы покупок."
      );
      setIsEditing(true);
      setClickedButton(null);
    }, 10500);

    // Шаг 7: Редактируем одно слово - меняем "автоматический" на "происходит автоматически" (12s)
    const timer7 = setTimeout(() => {
      const editedText =
        "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход происходит автоматически при достижении суммы покупок.";

      // Анимация замены слова
      let currentText = "3 уровня: Bronze (3%), Silver (5%), Gold (7%). Переход ";
      setInputText(currentText);

      const newWord = "происходит автоматически";
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex <= newWord.length) {
          setInputText(currentText + newWord.slice(0, charIndex) + " при достижении суммы покупок.");
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    }, 12000);

    // Шаг 8: Задержка перед отправкой (14s)
    const timer8 = setTimeout(() => {
      // Просто показываем что готовимся отправить
    }, 14000);

    // Шаг 9: Отправляем сообщение (15.5s)
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
      // НЕ очищаем виджет AI - оставляем информацию видимой
      // setAiStatus("idle");
      // setSuggestedResponses([]);
      // setKnowledgeBase([]);

      // Вызываем onComplete
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }, 15500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
      clearTimeout(timer8);
      clearTimeout(timer9);
    };
  }, [autoStart, startTrigger, onComplete]);

  return (
    <div className="w-full max-w-6xl mx-auto h-[600px] flex gap-4 p-4">
      {/* Main Chat using OnlineConsultantWidget */}
      <div className="flex-1">
        <OnlineConsultantWidget
          variant="operator"
          title="Анна Петрова • ID: 847392"
          statusText="Telegram • Online"
          inputValue={inputText}
          onInputChange={setInputText}
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={message.isNew ? { opacity: 0, y: 20 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex ${message.type === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${message.type === "user"
                    ? "bg-white text-gray-800 rounded-tl-sm shadow-md border border-gray-100"
                    : "bg-blue-600 text-white rounded-tr-sm shadow-md"
                  }`}
              >
                <div className="text-sm whitespace-pre-line leading-relaxed">{message.text}</div>
                <div
                  className={`text-[10px] mt-1 ${message.type === "user" ? "text-gray-500" : "text-blue-100"
                    }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </motion.div>
          ))}
        </OnlineConsultantWidget>
      </div>

      {/* AI Assistant Widget */}
      <div className="w-80 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
        {/* Widget Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
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

        {/* Widget Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {aiStatus === "processing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
              {/* Knowledge Base Results */}
              <AnimatePresence>
                {knowledgeBase.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
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
                        <div className="text-xs font-semibold text-purple-900 mb-1">{item.title}</div>
                        <div className="text-xs text-purple-700">{item.snippet}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Suggested Responses */}
              <AnimatePresence>
                {suggestedResponses.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
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
                          scale: { duration: 0.1 }
                        }}
                        className={`w-full text-left bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border rounded-lg p-3 transition-all group relative ${clickedButton === response.id
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
                        <div className="text-xs text-gray-700 line-clamp-3 group-hover:line-clamp-none transition-all">
                          {response.text}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {aiStatus === "idle" && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <svg className="w-16 h-16 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p className="text-sm">Ожидание нового сообщения</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}