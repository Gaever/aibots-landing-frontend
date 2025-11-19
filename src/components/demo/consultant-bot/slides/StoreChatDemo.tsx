"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnlineConsultantWidget } from "@/components/demo/shared/OnlineConsultantWidget";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  type?: "text" | "product";
  product?: {
    name: string;
    price: string;
    image: string;
    url: string;
  };
}

export function StoreChatDemo({ autoStart = false }: { autoStart?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    const scenario = [
      {
        delay: 1000,
        action: () => {
          setMessages([
            {
              id: 1,
              text: "Здравствуйте! Подскажите, есть ли у вас беспроводные наушники с шумоподавлением?",
              sender: "user",
            },
          ]);
        },
      },
      {
        delay: 2000,
        action: () => setIsTyping(true),
      },
      {
        delay: 3500,
        action: () => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: 2,
              text: "Здравствуйте! Да, конечно. Рекомендую модель SoundPro X1. Отличное шумоподавление и 24 часа работы без подзарядки.",
              sender: "bot",
              type: "product",
              product: {
                name: "SoundPro X1",
                price: "12 990 ₽",
                image: "🎧",
                url: "https://shop.example.com/products/soundpro-x1",
              },
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
      variant="bot"
      isTyping={isTyping}
      inputPlaceholder="Напишите сообщение..."
    >
      <AnimatePresence mode="popLayout">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user"
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none"
                }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>

              {msg.type === "product" && msg.product && (
                <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                      {msg.product.image}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900">
                        {msg.product.name}
                      </p>
                      <p className="text-blue-600 font-bold text-sm">
                        {msg.product.price}
                      </p>
                    </div>
                  </div>
                  <a
                    href={msg.product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline break-all"
                  >
                    {msg.product.url}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex justify-start"
          >
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </OnlineConsultantWidget>
  );
}
