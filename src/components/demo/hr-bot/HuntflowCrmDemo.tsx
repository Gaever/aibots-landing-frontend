"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Candidate {
  id: number;
  name: string;
  role: string;
  company: string;
  initial: string;
  isNew?: boolean;
}

export function HuntflowCrmDemo({ autoStart = false }: { autoStart?: boolean }) {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: "Щерица Василий", role: "Дизайнер интерфейсов", company: "Актион-Диджитал", initial: "Щ" },
    { id: 2, name: "Крюков Сергей", role: "Ведущий дизайнер", company: "Циан", initial: "К" },
    { id: 3, name: "Рогачев Роман", role: "Дизайнер продукта", company: "Яндекс", initial: "Р" },
    { id: 4, name: "Шептухин Виталий", role: "Помощник главного", company: "", initial: "Ш" },
  ]);

  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      setCandidates(prev => [
        { id: 5, name: "Glibin Vitaly", role: "Frontend Developer", company: "Action Digital", initial: "G", isNew: true },
        ...prev
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [autoStart]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden font-sans text-sm flex flex-col sm:flex-row h-[400px]">
      {/* Mobile Header */}
      <div className="bg-[#2c2d32] text-white p-4 font-bold text-lg sm:hidden shrink-0">
        Хантфлоу
      </div>

      {/* Sidebar (Dark) */}
      <div className="w-64 bg-[#2c2d32] text-[#9a9b9d] flex-col shrink-0 hidden sm:flex">
        <div className="p-4 text-white font-bold text-lg border-b border-gray-700">Хантфлоу</div>
        <div className="p-4 space-y-6 overflow-y-auto">
          <div>
            <div className="text-xs uppercase font-semibold tracking-wider mb-2 text-[#5e6063]">База</div>
            <div className="text-white">Все кандидаты</div>
          </div>
          <div>
            <div className="text-xs uppercase font-semibold tracking-wider mb-2 text-[#5e6063]">Мои вакансии</div>
            <div className="space-y-2">
              <div className="text-white font-medium">Python Developer</div>
              <div className="text-sm">RnD</div>
              <div className="text-sm">Senior UX Designer</div>
              <div className="text-sm">Бренд-менеджер</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main List Area */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Header/Tabs */}
        <div className="flex text-xs border-b border-gray-200">
          <div className="px-4 py-3 font-bold text-[#2c2d32] border-b-2 border-[#00a6eb]">Все 146</div>
          <div className="px-4 py-3 text-gray-500">Новые 34</div>
          <div className="px-4 py-3 text-gray-500">Резюме у заказчика 7</div>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 p-4">
          <AnimatePresence initial={false}>
            {candidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                initial={candidate.isNew ? { opacity: 0, x: -20, backgroundColor: "#e6f7ff" } : false}
                animate={{ opacity: 1, x: 0, backgroundColor: candidate.isNew ? "#e6f7ff" : "#ffffff" }}
                transition={{ duration: 0.5 }}
                className={`p-4 mb-2 rounded border border-gray-100 flex gap-4 items-center ${candidate.isNew ? 'border-[#00a6eb]' : ''}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${candidate.isNew ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                  {candidate.initial}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{candidate.name}</div>
                      <div className="text-gray-600">{candidate.role}</div>
                      <div className="text-gray-400 text-xs mt-1">{candidate.company}</div>
                    </div>
                    {candidate.isNew && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase"
                      >
                        Новый
                      </motion.div>
                    )}
                  </div>

                  {candidate.isNew && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.5 }}
                      className="mt-3 bg-white/50 p-2 rounded text-xs text-gray-600 border border-blue-100 flex gap-2 items-center"
                    >
                      <span>🤖</span>
                      <span><strong>HR-Бот:</strong> Провел интервью. Опыт 3 года. Рекомендую.</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
