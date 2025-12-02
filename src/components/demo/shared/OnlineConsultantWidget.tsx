"use client";

import { ReactNode, useEffect, useRef } from "react";

export interface OnlineConsultantWidgetProps {
  variant?: "bot" | "operator";
  title?: string;
  statusText?: string;
  isTyping?: boolean;
  children: ReactNode;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  showInput?: boolean;
  className?: string;
}

export function OnlineConsultantWidget(props: OnlineConsultantWidgetProps) {
  const {
    variant = "bot",
    title,
    statusText,
    isTyping,
    children,
    inputPlaceholder,
    inputValue = "",
    onInputChange,
    showInput = true,
    className = "",
  } = props;

  const chatRef = useRef<HTMLDivElement | null>(null);

  // автоскролл к низу при новых сообщениях / индикаторе печати
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [children, isTyping]);

  const headerTitle = title ?? "Онлайн-консультант";
  const headerStatus =
    statusText ??
    (variant === "operator"
      ? "Подключён живой оператор"
      : "Бот отвечает за секунды");

  return (
    <div className={`w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 font-sans flex flex-col h-[600px] ${className}`}>
      {/* header */}
      <div className="bg-blue-600 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
          {variant === "operator" ? "👤" : "🤖"}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm sm:text-base">
            {headerTitle}
          </h3>
          <p className="text-blue-100 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            {headerStatus}
          </p>
        </div>
      </div>

      {/* chat area */}
      <div
        ref={chatRef}
        className="flex-1 bg-white p-4 overflow-y-auto flex flex-col gap-4"
      >
        {children}
      </div>

      {/* input */}
      {showInput && (
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <div
              className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-900 min-h-[44px] max-h-[88px] overflow-y-auto whitespace-pre-wrap wrap-break-words"
            >
              {inputValue || (
                <span className="text-gray-500">{inputPlaceholder ?? "Напишите сообщение..."}</span>
              )}
            </div>
            <button className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors self-end shrink-0">
              <svg
                className="w-5 h-5 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}