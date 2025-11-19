"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot" | "operator" | "system";
  type?: "text" | "product" | "system";
  product?: {
    name: string;
    price: string;
  };
}

export function OperatorChatDemo({ autoStart = false }: { autoStart?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Здравствуйте! Подскажите, есть ли у вас беспроводные наушники с шумоподавлением?",
      sender: "user",
    },
    {
      id: 2,
      text: "Здравствуйте! Да, конечно. Рекомендую модель SoundPro X1. Отличное шумоподавление и 24 часа работы без подзарядки.",
      sender: "bot",
      type: "product",
      product: {
        name: "SoundPro X1",
        price: "12 990 ₽",
      },
    },
    {
      id: 3,
      text: "А есть что-то похожее, но в белом цвете? И чтобы микрофон был хороший для созвонов.",
      sender: "user",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    const scenario = [
      {
        delay: 1000,
        action: () => {
          setMessages((prev) => [
            ...prev,
            {
              id: 4,
              text: "Подключаю оператора для консультации...",
              sender: "bot",
              type: "system",
            },
          ]);
        },
      },
      {
        delay: 2500,
        action: () => setIsTyping(true),
      },
      {
        delay: 4000,
        action: () => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: 5,
              text: "Добрый день! Меня зовут Анна. Да, SoundPro X1 есть в белом цвете, и у них отличная система микрофонов с шумоподавлением, идеально для Zoom. Оформим заказ?",
              sender: "operator",
            },
          ]);
        },
      },
    ];

    let timeouts: NodeJS.Timeout[] = [];

    const runScenario = () => {
      let currentTime = 0;
      scenario.forEach((item) => {
        currentTime += item.delay;
        const timeout = setTimeout(item.action, currentTime);
        timeouts.push(timeout);
      });
    };

    runScenario();

    return () => timeouts.forEach(clearTimeout);
  }, [autoStart]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 font-sans flex flex-col h-[500px]">
      {/* CRM Header */}
      <div className="bg-gray-900 text-white p-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center font-bold">
            AM
          </div>
          <div>
            <h3 className="text-sm font-bold">Чат с клиентом #4821</h3>
            <p className="text-gray-400 text-xs">SoundPro Store</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30">
            Активен
          </span>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === "user"
                ? "items-start"
                : msg.sender === "system"
                  ? "items-center"
                  : "items-end"
                }`}
            >
              {msg.sender === "system" ? (
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full my-2">
                  {msg.text}
                </span>
              ) : (
                <>
                  <span className="text-xs text-gray-400 mb-1 ml-1">
                    {msg.sender === "user"
                      ? "Клиент"
                      : msg.sender === "bot"
                        ? "Бот"
                        : "Анна (Вы)"}
                  </span>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                      ? "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                      : msg.sender === "bot"
                        ? "bg-gray-100 text-gray-800 rounded-tr-none"
                        : "bg-purple-600 text-white rounded-tr-none"
                      }`}
                  >
                    <p>{msg.text}</p>
                    {msg.type === "product" && msg.product && (
                      <div className="mt-2 p-2 bg-white/50 rounded border border-black/5">
                        <p className="font-bold">{msg.product.name}</p>
                        <p className="opacity-70">{msg.product.price}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-end"
            >
              <span className="text-xs text-gray-400 mb-1 mr-1">Анна (Вы)</span>
              <div className="bg-purple-600 p-3 rounded-2xl rounded-tr-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce"></span>
                  <span
                    className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-gray-100 rounded-lg p-2 min-h-[40px]">
            <p className="text-sm text-gray-400">Написать сообщение...</p>
          </div>
          <button className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white hover:bg-purple-700">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
