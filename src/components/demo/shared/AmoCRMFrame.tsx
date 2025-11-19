"use client";

import { ReactNode } from "react";

interface AmoCRMFrameProps {
  children: ReactNode;
  sidebarActiveItem?: string;
  headerTitle?: string;
}

export function AmoCRMFrame({
  children,
  sidebarActiveItem = "leads",
  headerTitle = "Сделки",
}: AmoCRMFrameProps) {
  return (
    <div className="w-full h-full bg-[#f5f5f5] rounded-xl overflow-hidden flex flex-col font-sans text-sm border border-gray-200">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-12 bg-[#2c3e50] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <div
            className={`w-6 h-6 rounded-md ${sidebarActiveItem === "dashboard" ? "bg-white/20" : "bg-white/10"
              }`}
          />
          <div
            className={`w-6 h-6 rounded-md ${sidebarActiveItem === "leads" ? "bg-white/20" : "bg-white/10"
              }`}
          />
          <div
            className={`w-6 h-6 rounded-md ${sidebarActiveItem === "tasks" ? "bg-white/20" : "bg-white/10"
              }`}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
            <div className="font-bold text-gray-700">{headerTitle}</div>
            <div className="flex gap-2">
              <div className="w-24 h-8 bg-gray-100 rounded-md" />
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white">
                +
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative">{children}</div>
        </div>
      </div>
    </div>
  );
}
