"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ReviewProcessingFlowDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      id: "api",
      label: "Ozon API",
      icon: "🛍️",
      color: "bg-blue-100 text-blue-600 border-blue-200",
    },
    {
      id: "server",
      label: "Bot Server",
      icon: "🤖",
      color: "bg-purple-100 text-purple-600 border-purple-200",
    },
    {
      id: "llm",
      label: "LLM Analysis",
      icon: "🧠",
      color: "bg-indigo-100 text-indigo-600 border-indigo-200",
    },
    {
      id: "result",
      label: "Negative Detected",
      icon: "⚠️",
      color: "bg-red-100 text-red-600 border-red-200",
    },
  ];

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">
        {steps.map((s, index) => (
          <div key={s.id} className="relative flex items-center gap-4">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 -z-10">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: step > index ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-green-500"
                />
              </div>
            )}

            {/* Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: step >= index ? 1 : 0.8,
                opacity: step >= index ? 1 : 0.5,
                borderColor: step === index ? "rgb(34 197 94)" : "", // Green border when active
              }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 z-10 bg-white ${step >= index ? s.color : "border-gray-200 text-gray-300"
                }`}
            >
              {s.icon}
            </motion.div>

            {/* Label & Details */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: step >= index ? 1 : 0.3, x: 0 }}
              className="flex-1 bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
            >
              <div className="font-bold text-gray-800">{s.label}</div>
              {index === 0 && (
                <div className="text-xs text-gray-500">
                  New review received: ID #9921
                </div>
              )}
              {index === 1 && (
                <div className="text-xs text-gray-500">
                  Processing payload...
                </div>
              )}
              {index === 2 && (
                <div className="text-xs text-gray-500">
                  Sentiment: Negative (0.98)
                  <br />
                  Topic: Product Quality
                </div>
              )}
              {index === 3 && (
                <div className="text-xs text-red-500 font-medium">
                  Action: Trigger Alert
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: step === 4 ? 1 : 0, y: step === 4 ? 0 : 20 }}
        className="absolute bottom-8 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 font-medium flex items-center gap-2"
      >
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Process Complete
      </motion.div>
    </div>
  );
}
