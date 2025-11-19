"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RAGSchemaDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

interface DataSource {
  id: string;
  icon: string;
  title: string;
  isActive: boolean;
}

export function RAGSchemaDemo({
  autoStart = false,
  onComplete,
  startTrigger = true,
}: RAGSchemaDemoProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: "faq", icon: "❓", title: "FAQ", isActive: false },
    { id: "crm", icon: "📊", title: "CRM", isActive: false },
    { id: "history", icon: "📝", title: "История обращений", isActive: false },
    { id: "knowledge", icon: "📚", title: "База знаний", isActive: false },
    { id: "instructions", icon: "📋", title: "Инструкции для оператора", isActive: false },
  ]);

  useEffect(() => {
    if (!autoStart && !startTrigger) return;

    const timer1 = setTimeout(() => setActiveStep(1), 1000);
    const timer2 = setTimeout(() => setActiveStep(2), 2500);
    const timer3 = setTimeout(() => {
      setActiveStep(3);
      [0, 300, 600, 900, 1200].forEach((delay, idx) => {
        setTimeout(() => {
          setDataSources(prev => prev.map((source, i) =>
            i === idx ? { ...source, isActive: true } : source
          ));
        }, delay);
      });
    }, 4000);
    const timer4 = setTimeout(() => setActiveStep(4), 7000);
    const timer5 = setTimeout(() => {
      setActiveStep(5);
      setTimeout(() => onComplete?.(), 1500);
    }, 9000);

    return () => {
      [timer1, timer2, timer3, timer4, timer5].forEach(clearTimeout);
    };
  }, [autoStart, startTrigger, onComplete]);

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 flex flex-col">
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Как всё устроено</h3>
        <p className="text-gray-600 text-xs">Автоматический поиск информации для точных ответов</p>
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col items-center gap-2">
            {/* Вопрос клиента */}
            <motion.div
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ opacity: activeStep >= 1 ? 1 : 0.3, scale: activeStep >= 1 ? 1 : 0.95 }}
              transition={{ duration: 0.3 }}
              className={`w-48 px-4 py-2 rounded-xl text-center ${activeStep >= 1 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "bg-white text-gray-400 border-2 border-gray-200"
                }`}
            >
              <div className="text-lg mb-0.5">💬</div>
              <div className="font-bold text-sm">Вопрос клиента</div>
              <div className="text-[9px] opacity-90">в поддержку</div>
            </motion.div>

            <motion.svg initial={{ opacity: 0 }} animate={{ opacity: activeStep >= 1 ? 1 : 0 }} className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>

            {/* Анализ вопроса */}
            <motion.div
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ opacity: activeStep >= 2 ? 1 : 0.3, scale: activeStep >= 2 ? 1 : 0.95 }}
              transition={{ duration: 0.3 }}
              className={`w-52 px-4 py-2 rounded-xl text-center ${activeStep >= 2 ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" : "bg-white text-gray-400 border-2 border-gray-200"
                }`}
            >
              <div className="text-lg mb-0.5">🔍</div>
              <div className="font-bold text-sm">Анализ вопроса</div>
              <div className="text-[9px] opacity-90">Ключевые слова</div>
            </motion.div>

            <motion.svg initial={{ opacity: 0 }} animate={{ opacity: activeStep >= 2 ? 1 : 0 }} className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>

            {/* Поиск информации */}
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={{ opacity: 0.3, scale: 0.95 }}
                animate={{ opacity: activeStep >= 3 ? 1 : 0.3, scale: activeStep >= 3 ? 1 : 0.95 }}
                transition={{ duration: 0.3 }}
                className={`w-56 px-4 py-2 rounded-xl text-center ${activeStep >= 3 ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg" : "bg-white text-gray-400 border-2 border-gray-200"
                  }`}
              >
                <div className="text-lg mb-0.5">🔎</div>
                <div className="font-bold text-sm">Поиск информации</div>
                <div className="text-[9px] opacity-90">По базам компании</div>
              </motion.div>

              <div className="grid grid-cols-5 gap-1.5 w-full max-w-xl">
                {dataSources.map((source) => (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0.3, y: 3 }}
                    animate={{ opacity: source.isActive ? 1 : 0.3, y: source.isActive ? 0 : 3 }}
                    transition={{ duration: 0.4 }}
                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg ${source.isActive ? "bg-white shadow-md border-2 border-indigo-300" : "bg-white/50 border border-gray-200"
                      }`}
                  >
                    <div className={`text-lg ${source.isActive ? "" : "grayscale opacity-50"}`}>{source.icon}</div>
                    <div className={`text-[8px] font-semibold text-center leading-tight ${source.isActive ? "text-gray-900" : "text-gray-400"}`}>
                      {source.title}
                    </div>
                    {source.isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1 h-1 bg-green-500 rounded-full" />}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.svg initial={{ opacity: 0 }} animate={{ opacity: activeStep >= 4 ? 1 : 0 }} className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>

            {/* Генерация подсказки */}
            <motion.div
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ opacity: activeStep >= 4 ? 1 : 0.3, scale: activeStep >= 4 ? 1 : 0.95 }}
              transition={{ duration: 0.3 }}
              className={`w-52 px-4 py-2 rounded-xl text-center ${activeStep >= 4 ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" : "bg-white text-gray-400 border-2 border-gray-200"
                }`}
            >
              <div className="text-lg mb-0.5">✨</div>
              <div className="font-bold text-sm">Генерация подсказки</div>
              <div className="text-[9px] opacity-90">Для оператора</div>
            </motion.div>

            <motion.svg initial={{ opacity: 0 }} animate={{ opacity: activeStep >= 5 ? 1 : 0 }} className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>

            {/* Ответ пользователю */}
            <motion.div
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ opacity: activeStep >= 5 ? 1 : 0.3, scale: activeStep >= 5 ? 1 : 0.95 }}
              transition={{ duration: 0.3 }}
              className={`w-48 px-4 py-2 rounded-xl text-center ${activeStep >= 5 ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "bg-white text-gray-400 border-2 border-gray-200"
                }`}
            >
              <div className="text-lg mb-0.5">✅</div>
              <div className="font-bold text-sm">Ответ пользователю</div>
              <div className="text-[9px] opacity-90">Быстро и точно</div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm border border-gray-200">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-gray-600">Весь процесс ~2-3 секунды</span>
        </div>
      </div>
    </div>
  );
}