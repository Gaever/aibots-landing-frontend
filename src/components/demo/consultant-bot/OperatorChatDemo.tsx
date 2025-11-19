"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot" | "operator" | "system";
  type?: "text" | "product" | "system";
  product?: {
    name: string;
    price: string;
    url: string;
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
        url: "https://shop.example.com/products/soundpro-x1",
      },
    },
    {
      id: 3,
      text: "А есть что-то похожее, но в белом цвете? И чтобы микрофон был хороший для созвонов.",
      sender: "user",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  // автоскролл к низу при новых сообщениях / индикаторе печати
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 font-sans flex flex-col h-[500px]">
      {/* Header - тот же виджет онлайн-консультанта, но с подписью про оператора */}
      <div className="bg-blue-600 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
          🤖
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm sm:text-base">
            Онлайн-консультант
          </h3>
          <p className="text-blue-100 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Подключён живой оператор
          </p>
        </div>
      </div>

      {/* Chat History */}
      <div
        ref={chatRef}
        className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === "user"
                  ? "items-end"
                  : msg.sender === "system"
                    ? "items-center"
                    : "items-start"
                }`}
            >
              {msg.sender === "system" ? (
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full my-2">
                  {msg.text}
                </span>
              ) : (
                <>
                  <span className="text-xs text-gray-400 mb-1 mx-1 self-start">
                    {msg.sender === "user"
                      ? "Клиент"
                      : msg.sender === "bot"
                        ? "Бот"
                        : "Анна (оператор)"}
                  </span>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : msg.sender === "bot"
                          ? "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                          : "bg-purple-600 text-white rounded-tl-none"
                      }`}
                  >
                    <p>{msg.text}</p>
                    {msg.type === "product" &&
                      msg.product && (
                        <div className="mt-2 p-2 bg-white/20 rounded border border-white/30">
                          <p className="font-bold">
                            {msg.product.name}
                          </p>
                          <p className="opacity-80">
                            {msg.product.price}
                          </p>
                          <a
                            href={msg.product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block text-xs underline break-all"
                          >
                            {msg.product.url}
                          </a>
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
              className="flex flex-col items-start"
            >
              <span className="text-xs text-gray-400 mb-1 mx-1">
                Анна (оператор)
              </span>
              <div className="bg-purple-600 p-3 rounded-2xl rounded-tl-none">
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
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-gray-100 rounded-xl px-4 py-2 min-h-[40px] flex items-center">
            <p className="text-sm text-gray-400">
              Написать ответ клиенту...
            </p>
          </div>
          <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
            <svg
              className="w-5 h-5 transform rotate-90"
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
