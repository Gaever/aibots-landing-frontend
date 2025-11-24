"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { landingContent } from "@/app/landingContent";

export function ChatAnalysisDemo({ autoStart = false }: { autoStart?: boolean }) {
  const [step, setStep] = useState(0);
  const content = landingContent.qualityControlPresentation.demo.chatAnalysis;

  useEffect(() => {
    if (!autoStart) return;

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= content.messages.length + 1) return 0;
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [autoStart, content.messages.length]);

  return (
    <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            🤖
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{content.header.title}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {content.header.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        <AnimatePresence>
          {content.messages.map((msg, idx) => (
            step > idx && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === "client" ? "items-start" : "items-end"
                  }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "client"
                      ? "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                      : "bg-blue-600 text-white rounded-tr-none"
                    }`}
                >
                  {msg.text}
                </div>

                {/* Analysis Tags */}
                {msg.tags && step > idx + 0.5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-2 flex flex-wrap gap-2 ${msg.role === "client" ? "justify-start" : "justify-end"
                      }`}
                  >
                    {msg.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`text-[10px] px-2 py-1 rounded-full font-medium border ${msg.role === "operator" && (tag.includes("Критическая") || tag.includes("Грубость"))
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {msg.score !== undefined && (
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold border ${msg.score < 5
                          ? "bg-red-100 text-red-700 border-red-300"
                          : "bg-green-100 text-green-700 border-green-300"
                        }`}>
                        Score: {msg.score}/10
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Final Result */}
        {step > content.messages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🚨</div>
              <div>
                <h4 className="font-bold text-red-800 text-sm mb-1">
                  Обнаружено нарушение
                </h4>
                <p className="text-xs text-red-700 leading-relaxed">
                  {content.analysisResult.summary}
                </p>
                <div className="mt-2 text-xs font-mono bg-white/50 px-2 py-1 rounded inline-block text-red-600">
                  Total Score: {content.analysisResult.score}/100
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
