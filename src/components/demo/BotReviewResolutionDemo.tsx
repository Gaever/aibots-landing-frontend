"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { landingContent } from "@/app/landingContent";

export function BotReviewResolutionDemo() {
  const [step, setStep] = useState(0);
  const content = landingContent.demoComponents;

  useEffect(() => {
    const sequence = async () => {
      // Step 0: Initial state (Negative review)
      await new Promise((r) => setTimeout(r, 1000));
      // Step 1: Bot replies
      setStep(1);
      await new Promise((r) => setTimeout(r, 3000));
      // Step 2: User adds new positive comment
      setStep(2);
    };
    sequence();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden flex flex-col font-sans text-sm p-4 overflow-y-auto border border-gray-200">
      {/* Review Thread */}
      <div className="flex-1 space-y-6">
        {/* Original Negative Review */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs">
                {content.reviews.negative.author[0]}
              </div>
              <div>
                <div className="font-medium text-gray-900">{content.reviews.negative.author}</div>
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(1)}
                  <span className="text-gray-300">{"★".repeat(4)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">10 мин назад</div>
          </div>
          <p className="text-gray-800">
            {content.reviews.negative.title} {content.reviews.negative.text}
          </p>
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
                  {content.reviews.botReply.author}
                </div>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                {content.reviews.botReply.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User New Positive Comment */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
              className="bg-green-50 border border-green-100 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                    {content.reviews.resolution.author[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{content.reviews.resolution.author}</div>
                    <div className="flex text-yellow-400 text-xs">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{content.reviews.resolution.date}</div>
              </div>
              <p className="text-gray-800">
                {content.reviews.resolution.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
