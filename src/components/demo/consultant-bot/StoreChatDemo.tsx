"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  type?: "text" | "product";
  product?: {
    name: string;
    price: string;
    image: string;
  };
}

export function StoreChatDemo({ autoStart = false }: { autoStart?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);

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
              },
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 font-sans">
      {/* Header */}
      <div className="bg-blue-600 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
          🤖
        </div>
        <div>
          <h3 className="text-white font-bold">Онлайн-консультант</h3>
          <p className="text-blue-100 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Online
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[400px] bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4">
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
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 items-center">
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
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Напишите сообщение..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 placeholder-gray-500"
            disabled
          />
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
