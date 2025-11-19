"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function AmoCRMReviewNotificationDemo() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-[#f5f5f5] rounded-xl shadow-lg overflow-hidden flex flex-col font-sans text-sm border border-gray-200">
      {/* AmoCRM Sidebar (Simplified) */}
      <div className="flex h-full">
        <div className="w-12 bg-[#2c3e50] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <div className="w-6 h-6 bg-white/10 rounded-md" />
          <div className="w-6 h-6 bg-white/10 rounded-md" />
          <div className="w-6 h-6 bg-white/10 rounded-md" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="font-bold text-gray-700">Сделки</div>
            <div className="flex gap-2">
              <div className="w-24 h-8 bg-gray-100 rounded-md" />
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white">
                +
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="flex-1 p-4 overflow-x-auto flex gap-4">
            {/* Column: New Leads */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-3">
              <div className="font-bold text-gray-500 uppercase text-xs mb-1 flex justify-between">
                <span>Неразобранное</span>
                <span className="bg-gray-200 px-1.5 rounded-full text-gray-600">
                  {showNotification ? "4" : "3"}
                </span>
              </div>
              <div className="h-1 w-full bg-blue-400 rounded-full mb-2" />

              {/* New Task Notification Animation */}
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={
                  showNotification
                    ? { opacity: 1, y: 0, height: "auto" }
                    : { opacity: 0, y: -20, height: 0 }
                }
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-white p-3 rounded-md shadow-sm border-l-4 border-red-500 overflow-hidden"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-gray-800">
                    Негативный отзыв Ozon
                  </span>
                  <span className="text-[10px] text-gray-400">Только что</span>
                </div>
                <div className="text-xs text-gray-600 mb-2 line-clamp-2">
                  Клиент Иван П. оставил отзыв 1 звезда. "Ужасное качество!
                  Пришла поцарапанная..."
                </div>
                <div className="flex gap-1 mt-2">
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] rounded-full font-medium">
                    Срочно
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded-full font-medium">
                    Бот ответил
                  </span>
                </div>
              </motion.div>

              {/* Existing Leads */}
              <div className="bg-white p-3 rounded-md shadow-sm border-l-4 border-gray-300">
                <div className="text-xs font-bold text-gray-800 mb-1">
                  Заявка с сайта #1023
                </div>
                <div className="text-xs text-gray-500">15 000 ₽</div>
              </div>
              <div className="bg-white p-3 rounded-md shadow-sm border-l-4 border-gray-300">
                <div className="text-xs font-bold text-gray-800 mb-1">
                  Вопрос в WhatsApp
                </div>
                <div className="text-xs text-gray-500">Ожидает ответа</div>
              </div>
            </div>

            {/* Column: In Progress */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-3 opacity-60">
              <div className="font-bold text-gray-500 uppercase text-xs mb-1">
                Переговоры
              </div>
              <div className="h-1 w-full bg-yellow-400 rounded-full mb-2" />
              <div className="bg-white p-3 rounded-md shadow-sm border-l-4 border-gray-300">
                <div className="text-xs font-bold text-gray-800 mb-1">
                  ООО "Вектор"
                </div>
                <div className="text-xs text-gray-500">540 000 ₽</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
