"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AmoCRMFrame } from "./AmoCRMFrame";

interface AmoCRMDemoProps {
  autoStart?: boolean;
}

export function AmoCRMDemo({ autoStart = false }: AmoCRMDemoProps) {
  const [leads, setLeads] = useState<
    Array<{ id: number; name: string; price: string; status: string }>
  >([
    { id: 1, name: "Заявка с сайта #1023", price: "15 000 ₽", status: "new" },
    { id: 2, name: "Вопрос в WhatsApp", price: "Ожидает", status: "new" },
  ]);

  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      setLeads((prev) => [
        {
          id: 3,
          name: "Новая сделка (Telegram)",
          price: "5 400 ₽",
          status: "new",
        },
        ...prev,
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoStart]);

  return (
    <AmoCRMFrame>
      <div className="flex-1 p-4 overflow-x-auto flex gap-4 h-full">
        {/* Column: New Leads */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 h-full">
          <div className="font-bold text-gray-500 uppercase text-xs mb-1 flex justify-between">
            <span>Неразобранное</span>
            <span className="bg-gray-200 px-1.5 rounded-full text-gray-600">
              {leads.length}
            </span>
          </div>
          <div className="h-1 w-full bg-blue-400 rounded-full mb-2" />

          {leads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={lead.id === 3 ? { opacity: 0, y: -20, height: 0 } : {}}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.4 }}
              className={`bg-white p-3 rounded-md shadow-sm border-l-4 ${lead.id === 3 ? "border-green-500" : "border-gray-300"
                }`}
            >
              <div className="text-xs font-bold text-gray-800 mb-1">
                {lead.name}
              </div>
              <div className="text-xs text-gray-500">{lead.price}</div>
              {lead.id === 3 && (
                <div className="mt-2 flex gap-1">
                  <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] rounded-full font-medium">
                    Бот
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] rounded-full font-medium">
                    Новая
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Column: In Progress */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 opacity-60 h-full">
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
    </AmoCRMFrame>
  );
}
