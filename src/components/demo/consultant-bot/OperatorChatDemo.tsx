"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnlineConsultantWidget } from "@/components/demo/OnlineConsultantWidget";

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
              text: "Добрый день! Меня зовут Анна. Да, SoundPro X1 есть в белом цвете, и у них отличная система микрофонов с шумоподавлением, идеально для созвонов. Оформим заказ?",
              sender: "operator",
            },
          ]);
        },
      },
    ];

    let timeouts: NodeJS.Timeout[] = [];
    let currentTime = 0;

    scenario.forEach((item) => {
      currentTime += item.delay;
      const timeout = setTimeout(item.action, currentTime);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [autoStart]);

  return (
    <OnlineConsultantWidget
      variant="operator"
      isTyping={isTyping}
      statusText="Подключён живой оператор"
      inputPlaceholder="Написать ответ клиенту..."
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

                  {msg.type === "product" && msg.product && (
                    <div className="mt-2 p-2 bg-white/20 rounded border border-white/30">
                      <p className="font-bold">{msg.product.name}</p>
                      <p className="opacity-80">{msg.product.price}</p>
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
    </OnlineConsultantWidget>
  );
}
