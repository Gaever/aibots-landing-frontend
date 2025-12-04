"use client";

import { ReactNode, useRef, useEffect } from "react";
import { usePlatform } from "@/hooks/usePlatform";

interface AvitoFrameProps {
  title: string;
  subtitle?: string;
  rating?: string;
  children: ReactNode;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  isUserTyping?: boolean;
  avatar?: string;
  scrollTrigger?: any;
}

export function AvitoFrame({
  title,
  subtitle,
  rating = "4,9",
  children,
  showInput = true,
  inputPlaceholder = "Сообщение",
  inputValue,
  isUserTyping,
  avatar,
  scrollTrigger,
}: AvitoFrameProps) {
  const platform = usePlatform();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [scrollTrigger]);

  return (
    <div className="w-full max-w-[390px] mx-auto">
      {/* Полная имитация мобильного экрана */}
      <div
        className={`relative bg-white ${platform === 'ios' ? 'rounded-[40px]' : 'rounded-[24px]'} overflow-hidden shadow-2xl font-sans`}
        style={{ aspectRatio: "390/844" }}
      >
        {/* Notch / Camera */}
        {platform === 'ios' ? (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-50" />
        ) : (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full z-50" />
        )}

        {/* Status bar */}
        {/* Status bar */}
        {platform === 'ios' ? (
          <div className="absolute top-0 left-0 right-0 h-11 bg-white flex items-center justify-between px-6 pt-2 z-40">
            <span className="text-black text-sm font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              {/* Signal */}
              <div className="flex gap-[2px] items-end">
                <div className="w-[3px] h-[3px] bg-black rounded-full" />
                <div className="w-[3px] h-[6px] bg-black rounded-full" />
                <div className="w-[3px] h-[9px] bg-black rounded-full" />
                <div className="w-[3px] h-[12px] bg-black rounded-full" />
              </div>
              {/* WiFi */}
              <svg className="w-4 h-4 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              {/* Battery */}
              <div className="w-6 h-3 border border-black rounded-sm ml-1 relative">
                <div className="absolute inset-0.5 bg-black rounded-sm" />
                <div className="absolute right-[-3px] top-1/2 transform -translate-y-1/2 w-[2px] h-[6px] bg-black rounded-r" />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 right-0 h-8 bg-white flex items-center justify-between px-4 z-40">
            <span className="text-black text-xs font-medium">12:30</span>
            <div className="flex items-center gap-1.5">
              {/* WiFi */}
              <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              {/* Signal */}
              <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 22h20V2z" />
              </svg>
              {/* Battery */}
              <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
              </svg>
            </div>
          </div>
        )}

        {/* Avito Header */}
        <div className={`absolute ${platform === 'ios' ? 'top-11' : 'top-8'} left-0 right-0 bg-white px-4 py-2 flex items-center gap-3 z-30 border-b border-gray-100`}>
          {/* Back button */}
          {/* Back button */}
          <button className="text-black -ml-1">
            {platform === 'ios' ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
            )}
          </button>

          {/* Avatar and Info */}
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            <div className="w-10 h-10 min-w-[40px] rounded-full bg-gray-100 overflow-hidden border border-gray-100">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  Logo
                </div>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1">
                <div className="text-black font-bold text-[15px] truncate leading-tight">
                  {title}
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  <svg className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-black font-semibold text-xs">{rating}</span>
                </div>
              </div>
              <div className="text-gray-500 text-xs truncate leading-tight">
                {subtitle}
              </div>
            </div>
          </div>

          {/* Phone button */}
          <button className="text-black -mr-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>

        {/* Chat Messages Area */}
        <div
          ref={scrollContainerRef}
          className="absolute left-0 right-0 bg-white overflow-y-auto px-4 pt-4 pb-8"
          style={{
            top: platform === 'ios' ? "105px" : "92px",
            bottom: showInput ? (platform === 'ios' ? "70px" : "110px") : (platform === 'ios' ? "6px" : "54px"),
          }}
        >
          <div className="relative h-full flex flex-col justify-end min-h-0">
            <div className="flex-1"></div>
            {children}
          </div>
        </div>

        {/* Input Area */}
        {showInput && (
          <div className={`absolute ${platform === 'ios' ? 'bottom-6' : 'bottom-12'} left-0 right-0 bg-white px-3 py-2 flex items-center gap-3 border-t border-gray-100`}>
            {/* Plus button */}
            {/* Plus/Paperclip button */}
            <button className="text-black">
              {platform === 'ios' ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              )}
            </button>

            {/* Input field */}
            <div className="flex-1 bg-[#F2F2F2] rounded-2xl px-4 py-2.5 flex items-center min-h-[44px]">
              {inputValue ? (
                <div className="flex-1 text-black text-[16px] w-full wrap-break-words">{inputValue}</div>
              ) : (
                <div className="flex-1 text-gray-500 text-[16px] w-full">{inputPlaceholder}</div>
              )}
              {isUserTyping && <div className="w-[2px] h-[20px] bg-blue-500 animate-blink ml-0.5" />}
            </div>

            {/* Camera button */}
            <button className="text-black">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Mic button */}
            <button className="text-black">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        )}

        {/* Home indicator */}
        {/* Home indicator / Navigation */}
        {platform === 'ios' ? (
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full" />
        ) : (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-white flex items-center justify-around px-12 z-50 border-t border-gray-100">
            {/* Back (Triangle) */}
            <svg className="w-5 h-5 text-gray-600 transform -rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L22 19H2L12 2Z" />
            </svg>
            {/* Home (Circle) */}
            <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
            {/* Recent (Square) */}
            <div className="w-4 h-4 border-2 border-gray-600 rounded-[2px]" />
          </div>
        )}

        <style jsx>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-end infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
