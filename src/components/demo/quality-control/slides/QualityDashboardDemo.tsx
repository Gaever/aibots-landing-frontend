"use client";

import { motion } from "framer-motion";
import { landingContent } from "@/app/landingContent";

export function QualityDashboardDemo() {
  const content = landingContent.qualityControlPresentation.demo.dashboard;

  return (
    <div className="w-full h-full bg-gray-50 rounded-2xl overflow-hidden shadow-xl border border-gray-200 flex flex-col font-sans p-6">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg">Дашборд качества</h3>
        <p className="text-sm text-gray-500">Отчет за неделю</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {content.stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs"
          >
            <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div
                className={`text-xs font-medium mb-1 ${(stat.change.startsWith("+") && !stat.isGood) || (stat.change.startsWith("-") && stat.isGood)
                    ? "text-green-600"
                    : stat.isGood
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
              >
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Operators List */}
      <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 font-medium text-sm text-gray-700">
          Рейтинг операторов
        </div>
        <div className="divide-y divide-gray-100">
          {content.operators.map((op, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${op.status === "top"
                      ? "bg-yellow-400"
                      : op.status === "critical"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                >
                  {op.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{op.name}</div>
                  <div className="text-xs text-gray-500">{op.chats} диалогов</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-sm font-bold ${op.score >= 90
                      ? "text-green-600"
                      : op.score < 50
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                >
                  {op.score}%
                </div>
                <div className="text-[10px] text-gray-400">Quality Score</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
