"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AmoCRMFrame } from "@/components/demo/shared/AmoCRMFrame";
import { landingContent } from "@/app/landingContent";

export function AmoCRMReviewNotificationDemo() {
  const [showNotification, setShowNotification] = useState(false);
  const content = landingContent.demoComponents.crm;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AmoCRMFrame>
      <div className="flex-1 p-4 overflow-x-auto flex gap-4 h-full">
        {/* Column: New Leads */}
        <div className="w-64 shrink-0 flex flex-col gap-3 h-full">
          <div className="font-bold text-gray-500 uppercase text-xs mb-1 flex justify-between">
            <span>{content.columns.leads}</span>
            <span className="bg-gray-200 px-1.5 rounded-full text-gray-600">
              {showNotification ? "4" : "3"}
            </span>
          </div>
          <div className="h-1 w-full bg-blue-400 rounded-full mb-2" />

          {/* New Task Notification Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={
              showNotification
                ? { opacity: 1, y: 0, height: "auto" }
                : { opacity: 0, y: -20, height: 0 }
            }
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white p-3 rounded-md shadow-sm border-l-4 border-red-500 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-800">
                {content.notification.title}
              </span>
              <span className="text-[10px] text-gray-400">Только что</span>
            </div>
            <div className="text-xs text-gray-600 mb-2 line-clamp-2">
              {content.notification.body}
            </div>
            <div className="flex gap-1 mt-2">
              {content.notification.tags.map((tag, i) => (
                <span key={i} className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${i === 0 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Existing Leads */}
          {content.otherLeads.slice(0, 2).map((lead, i) => (
            <div key={i} className="bg-white p-3 rounded-md shadow-sm border-l-4 border-gray-300">
              <div className="text-xs font-bold text-gray-800 mb-1">
                {lead.title}
              </div>
              <div className="text-xs text-gray-500">{lead.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Column: In Progress */}
        <div className="w-64 shrink-0 flex flex-col gap-3 opacity-60 h-full">
          <div className="font-bold text-gray-500 uppercase text-xs mb-1">
            {content.columns.negotiations}
          </div>
          <div className="h-1 w-full bg-yellow-400 rounded-full mb-2" />
          <div className="bg-white p-3 rounded-md shadow-sm border-l-4 border-gray-300">
            <div className="text-xs font-bold text-gray-800 mb-1">
              {content.otherLeads[2].title}
            </div>
            <div className="text-xs text-gray-500">{content.otherLeads[2].subtitle}</div>
          </div>
        </div>
      </div>
    </AmoCRMFrame>
  );
}
