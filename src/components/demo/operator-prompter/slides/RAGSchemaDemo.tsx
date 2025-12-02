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

export function RAGSchemaDemo({ autoStart = false, onComplete, startTrigger = true }: RAGSchemaDemoProps) {
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

    const timer1 = setTimeout(() => setActiveStep(1), 50);
    const timer2 = setTimeout(() => setActiveStep(2), 100);
    const timer3 = setTimeout(() => {
      setActiveStep(3);
      [0, 30, 60, 90, 120].forEach((delay, idx) => {
        setTimeout(() => {
          setDataSources((prev) => prev.map((source, i) => (i === idx ? { ...source, isActive: true } : source)));
        }, delay);
      });
    }, 200);
    const timer4 = setTimeout(() => setActiveStep(4), 350);
    const timer5 = setTimeout(() => {
      setActiveStep(5);
      setTimeout(() => onComplete?.(), 150);
    }, 500);

    return () => {
      [timer1, timer2, timer3, timer4, timer5].forEach(clearTimeout);
    };
  }, [autoStart, startTrigger, onComplete]);

  return (
    <div className="w-full max-w-5xl mx-auto md:h-[600px] h-auto bg-white rounded-2xl p-4 md:p-8 flex items-center justify-center">
      <div className="w-full flex flex-col items-center gap-2 md:gap-3">
        {/* Row 1: Request Processing */}
        <div className="flex md:flex-row flex-col items-center md:items-center gap-2 md:gap-2">
          <motion.div
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: activeStep >= 1 ? 1 : 0.3, scale: activeStep >= 1 ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-xl text-center font-bold text-sm ${activeStep >= 1
              ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-white text-gray-400 border-2 border-gray-200"
              }`}
          >
            Вопрос клиента
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep >= 1 ? 1 : 0 }}
            className="w-6 h-6 text-gray-400 hidden md:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep >= 1 ? 1 : 0 }}
            className="w-6 h-6 text-gray-400 md:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: activeStep >= 2 ? 1 : 0.3, scale: activeStep >= 2 ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-xl text-center font-bold text-sm ${activeStep >= 2
              ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-sm"
              : "bg-white text-gray-400 border-2 border-gray-200"
              }`}
          >
            Анализ вопроса
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep >= 2 ? 1 : 0 }}
            className="w-6 h-6 text-gray-400 hidden md:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep >= 2 ? 1 : 0 }}
            className="w-6 h-6 text-gray-400 md:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: activeStep >= 3 ? 1 : 0.3, scale: activeStep >= 3 ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-xl text-center font-bold text-sm ${activeStep >= 3
              ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-sm"
              : "bg-white text-gray-400 border-2 border-gray-200"
              }`}
          >
            Поиск информации
          </motion.div>
        </div>

        {/* Arrow down */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: activeStep >= 3 ? 1 : 0 }}
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>

        {/* Row 2: Data Sources */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-2 md:gap-2">
          {dataSources.map((source) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0.3, scale: 0.95 }}
              animate={{ opacity: source.isActive ? 1 : 0.3, scale: source.isActive ? 1 : 0.95 }}
              transition={{ duration: 0.4 }}
              className={`flex flex-col items-center gap-2 px-3 md:px-4 py-3 rounded-xl md:min-w-[100px] ${source.isActive
                ? "bg-white shadow-sm"
                : "bg-white/50"
                }`}
            >
              <div className={`text-xl md:text-2xl ${source.isActive ? "" : "grayscale opacity-50"}`}>
                {source.icon}
              </div>
              <div
                className={`text-[10px] md:text-xs font-semibold text-center leading-tight ${source.isActive ? "text-gray-900" : "text-gray-400"
                  }`}
              >
                {source.title}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Arrow down */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: activeStep >= 4 ? 1 : 0 }}
          className="w-6 h-6 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>

        {/* Row 3: Generation and Response */}
        <div className="flex md:flex-row flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: activeStep >= 4 ? 1 : 0.3, scale: activeStep >= 4 ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-xl text-center font-bold text-sm ${activeStep >= 4
              ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-sm"
              : "bg-white text-gray-400 border-2 border-gray-200"
              }`}
          >
            Генерация подсказки
          </motion.div>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep >= 4 ? 1 : 0 }}
            className="w-6 h-6 text-gray-400 hidden md:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>

          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: activeStep >= 4 ? 1 : 0 }}
            className="w-6 h-6 text-gray-400 md:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0.3, scale: 0.95 }}
            animate={{ opacity: activeStep >= 5 ? 1 : 0.3, scale: activeStep >= 5 ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            className={`px-6 py-3 rounded-xl text-center font-bold text-sm ${activeStep >= 5
              ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-white text-gray-400 border-2 border-gray-200"
              }`}
          >
            Ответ пользователю
          </motion.div>
        </div>
      </div>
    </div>
  );
}
