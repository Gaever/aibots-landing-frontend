"use client";

import { ReactNode } from "react";

interface TelegramFrameProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showInput?: boolean;
  inputPlaceholder?: string;
  avatar?: string;
}

export function TelegramFrame({
  title,
  subtitle = "online",
  children,
  showInput = true,
  inputPlaceholder = "Сообщение",
  avatar = "🤖",
}: TelegramFrameProps) {
  return (
    <div className="w-full max-w-[390px] mx-auto">
      {/* Полная имитация мобильного экрана */}
      <div
        className="relative bg-[#17212b] rounded-[40px] overflow-hidden shadow-2xl"
        style={{ aspectRatio: "390/844" }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[37px] bg-black rounded-[20px] z-50" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-11 bg-[#17212b] flex items-center justify-between px-6 pt-2 z-40">
          <span className="text-white text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            {/* Signal */}
            <div className="flex gap-[2px] items-end">
              <div className="w-[3px] h-[3px] bg-white rounded-full" />
              <div className="w-[3px] h-[6px] bg-white rounded-full" />
              <div className="w-[3px] h-[9px] bg-white rounded-full" />
              <div className="w-[3px] h-[12px] bg-white rounded-full" />
            </div>
            {/* WiFi */}
            <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            {/* Battery */}
            <div className="w-6 h-3 border border-white rounded-sm ml-1 relative">
              <div className="absolute inset-0.5 bg-white rounded-sm" />
              <div className="absolute right-[-3px] top-1/2 transform -translate-y-1/2 w-[2px] h-[6px] bg-white rounded-r" />
            </div>
          </div>
        </div>

        {/* Telegram Header */}
        <div className="absolute top-11 left-0 right-0 bg-[#17212b] px-4 py-2.5 flex items-center gap-3 z-30">
          {/* Back button */}
          <button className="text-[#8BBEF6] flex items-center -ml-1">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Avatar and name */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-lg font-semibold">
              {avatar}
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-base">{title}</div>
              <div className="text-[#8BBEF6] text-xs">{subtitle}</div>
            </div>
          </div>

          {/* Menu button */}
          <button className="text-[#8E8E93] -mr-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div
          className="absolute left-0 right-0 bg-[#0E1621] overflow-y-auto px-3 pt-4 pb-8"
          style={{
            top: "105px",
            bottom: showInput ? "60px" : "6px",
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "100px 100px",
            }}
          />

          <div className="relative h-full">{children}</div>
        </div>

        {/* Input Area */}
        {showInput && (
          <div className="absolute bottom-6 left-0 right-0 bg-[#17212b] px-2 py-2 flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center text-[#8E8E93]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <div className="flex-1 bg-[#232E3C] rounded-3xl px-4 py-2 flex items-center min-h-[36px]">
              <div className="flex-1 text-[#8E8E93] text-[15px]">{inputPlaceholder}</div>
            </div>

            <button className="w-9 h-9 flex items-center justify-center text-[#8E8E93]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>
          </div>
        )}

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}
