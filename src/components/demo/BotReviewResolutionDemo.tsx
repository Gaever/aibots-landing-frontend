"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function BotReviewResolutionDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Initial state (Negative review)
      await new Promise((r) => setTimeout(r, 1000));
      // Step 1: Bot replies
      setStep(1);
      await new Promise((r) => setTimeout(r, 2500));
      // Step 2: User updates rating
      setStep(2);
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col font-sans text-sm p-4">
      {/* Review Thread */}
      <div className="flex-1 space-y-4">
        {/* Original Review */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs">
                И
              </div>
              <div>
                <div className="font-medium text-gray-900">Иван П.</div>
                <AnimatePresence mode="wait">
                  {step < 2 ? (
                    <motion.div
                      key="bad-rating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex text-red-500 text-xs"
                    >
                      {"★".repeat(1)}
                      <span className="text-gray-300">{"★".repeat(4)}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="good-rating"
                      initial={{ opacity: 0, scale: 1.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex text-yellow-400 text-xs"
                    >
                      {"★".repeat(5)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              {step === 2 ? "Изменено только что" : "10 мин назад"}
            </div>
          </div>
          <AnimatePresence mode="wait">
            {step < 2 ? (
              <motion.p
                key="bad-text"
                exit={{ opacity: 0, height: 0 }}
                className="text-gray-800"
              >
                Ужасное качество! Пришла поцарапанная, коробка мятая. Включается
                через раз. Не советую покупать.
              </motion.p>
            ) : (
              <motion.p
                key="good-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-800"
              >
                Проблема решена! Продавец связался, извинился и оперативно
                заменил товар на новый. Колонка отличная, звук супер. Спасибо за
                сервис!
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Bot Reply */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" }}
              className="ml-8 bg-blue-50 border border-blue-100 rounded-xl p-4 relative"
            >
              {/* Connector Line */}
              <div className="absolute -left-4 top-6 w-4 h-4 border-l border-b border-gray-200 rounded-bl-lg" />

              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px]">
                  🤖
                </div>
                <div className="font-bold text-blue-700 text-xs">
                  Представитель бренда (AI Bot)
                </div>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                Иван, здравствуйте! Нам очень жаль, что вы столкнулись с такой
                ситуацией. 😔 Это недопустимо. Мы уже оформили для вас отправку
                новой колонки (трек-номер отправили в личные сообщения), а также
                дарим промокод на скидку 20% на следующую покупку. Надеемся, вы
                дадите нам второй шанс! 🙏
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
