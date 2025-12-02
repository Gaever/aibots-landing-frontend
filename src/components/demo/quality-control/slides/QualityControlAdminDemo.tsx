"use client";

import { landingContent } from "@/app/landingContent";
import { AlertTriangle } from "lucide-react";

export function QualityControlAdminDemo({ autoStart = false }: { autoStart?: boolean }) {
  const { chatAnalysis } = landingContent.qualityControlPresentation.demo;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 font-sans flex h-[600px]">
      {/* Sidebar (AmoCRM style) */}
      <div className="w-12 bg-[#2c3e50] flex flex-col items-center py-4 gap-4 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
          A
        </div>
        <div className="w-6 h-6 rounded-md bg-white/10" />
        <div className="w-6 h-6 rounded-md bg-white/20" /> {/* Active state simulation */}
        <div className="w-6 h-6 rounded-md bg-white/10" />
      </div>

      {/* Main Content: Chat Analysis */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex justify-between items-center px-6 flex-shrink-0">
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Сделка #4821</h3>
            <p className="text-xs text-gray-500">Ответственный: Игорь М.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full font-medium border border-red-100 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Критический риск
            </span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatAnalysis.messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === "client" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-sm mb-1 leading-relaxed shadow-sm ${msg.role === "client"
                    ? "bg-[#ebf3ff] text-gray-800 rounded-tr-none" // AmoCRM client style (light blueish)
                    : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                  }`}
              >
                {msg.text}
              </div>

              {/* Tags/Annotations - Explicitly shown under messages */}
              {msg.tags && (
                <div className="flex flex-wrap gap-1.5 animate-fade-in mt-1" style={{ animationDelay: `${idx * 0.2}s`, animationFillMode: 'forwards' }}>
                  {msg.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-medium flex items-center gap-1 ${tag.includes("Негатив") || tag.includes("Грубость") || tag.includes("Критическая")
                          ? "bg-red-50 text-red-600 border-red-100"
                          : tag.includes("Сухой") || tag.includes("Нет")
                            ? "bg-orange-50 text-orange-600 border-orange-100"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        }`}
                    >
                      {tag.includes("Критическая") && <AlertTriangle className="w-3 h-3" />}
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Summary Footer */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="bg-red-50 rounded-xl p-3 border border-red-100 flex gap-3 items-start">
            <div className="bg-red-100 p-1.5 rounded-lg shrink-0">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-900 mb-0.5 uppercase tracking-wide">Вердикт ИИ</h4>
              <p className="text-sm text-gray-800 leading-snug">
                {chatAnalysis.analysisResult.summary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
