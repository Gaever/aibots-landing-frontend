"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AmoCRMFrame } from "@/components/demo/shared/AmoCRMFrame";
import { landingContent } from "@/app/landingContent";

interface AmoCRMDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

export function AmoCRMDemo({ autoStart = false, onComplete, startTrigger = true }: AmoCRMDemoProps) {
  const content = landingContent.demoComponents.crm;
  const [leads, setLeads] = useState<
    Array<{ id: number; name: string; price: string; status: string; tags?: string[] }>
  >([]);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [showClickEffect, setShowClickEffect] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  // Initialize leads from landingContent
  useEffect(() => {
    const initialLeads = content.demoLeads.slice(0, 2).map((lead, index) => ({
      id: index + 1,
      name: lead.name,
      price: lead.price,
      status: lead.status,
    }));
    setLeads(initialLeads);
  }, []);

  useEffect(() => {
    if (!autoStart && !startTrigger) return;

    // Step 1: Add new lead
    const timer1 = setTimeout(() => {
      const newLead = content.demoLeads[2];
      setLeads((prev) => [
        {
          id: 3,
          name: newLead.name,
          price: newLead.price,
          status: newLead.status,
          tags: newLead.tags,
        },
        ...prev,
      ]);

      // Step 2: Click on the new lead after it appears
      setTimeout(() => {
        // Get the lead card element position for click effect
        const leadCard = document.querySelector('[data-lead-id="3"]');
        if (leadCard) {
          const rect = leadCard.getBoundingClientRect();
          setClickPosition({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
          setShowClickEffect(true);

          setTimeout(() => {
            setShowClickEffect(false);
            setSelectedLeadId(3);

            // Call onComplete after task view is shown
            setTimeout(() => {
              onComplete?.();
            }, 1000);
          }, 500);
        }
      }, 1200);
    }, 1000);

    return () => clearTimeout(timer1);
  }, [autoStart, startTrigger, onComplete]);

  const handleLeadClick = (leadId: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setShowClickEffect(true);

    setTimeout(() => {
      setShowClickEffect(false);
      setSelectedLeadId(leadId);
    }, 500);
  };

  if (selectedLeadId) {
    return (
      <AmoCRMFrame>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col h-full bg-white"
        >
          {/* Task Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setSelectedLeadId(null)}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                ← Назад
              </button>
            </div>
            <h2 className="text-base font-bold text-gray-800 mb-1">
              {content.demoLeads[2].name}
            </h2>
            <div className="flex gap-2 items-center text-xs text-gray-500">
              <span className="font-semibold text-green-600">{content.demoLeads[2].price}</span>
              <span>•</span>
              <span>Telegram</span>
            </div>
            <div className="mt-2 flex gap-1">
              {content.demoLeads[2].tags?.map((tag, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${tag === "Бот" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                    }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {content.conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`flex ${message.role === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 ${message.role === "client"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                    }`}
                >
                  <div className="text-xs whitespace-pre-line">{message.text}</div>
                  <div
                    className={`text-[10px] mt-1 ${message.role === "client" ? "text-blue-100" : "text-gray-500"
                      }`}
                  >
                    {message.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            <div className="bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-400">
              Написать сообщение...
            </div>
          </div>
        </motion.div>
      </AmoCRMFrame>
    );
  }

  return (
    <AmoCRMFrame>
      {/* Click Effect */}
      <AnimatePresence>
        {showClickEffect && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed w-16 h-16 rounded-full bg-blue-400 pointer-events-none z-50"
            style={{
              left: clickPosition.x - 32,
              top: clickPosition.y - 32,
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex-1 p-4 overflow-hidden md:overflow-x-auto flex gap-4 h-full overscroll-none">
        {/* Column: New Leads */}
        <div className="w-64 shrink-0 flex flex-col gap-3 h-full">
          <div className="font-bold text-gray-500 uppercase text-xs mb-1 flex justify-between">
            <span>{content.columns.leads}</span>
            <span className="bg-gray-200 px-1.5 rounded-full text-gray-600">
              {leads.length}
            </span>
          </div>
          <div className="h-1 w-full bg-blue-400 rounded-full mb-2" />

          {leads.map((lead) => (
            <motion.div
              key={lead.id}
              data-lead-id={lead.id}
              initial={lead.id === 3 ? { opacity: 0, y: -20, height: 0 } : {}}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.4 }}
              onClick={(e) => lead.id === 3 && handleLeadClick(lead.id, e)}
              className={`bg-white p-3 rounded-md shadow-sm border-l-4 ${lead.id === 3 ? "border-green-500 cursor-pointer hover:shadow-md transition-shadow" : "border-gray-300"
                }`}
            >
              <div className="text-xs font-bold text-gray-800 mb-1">
                {lead.name}
              </div>
              <div className="text-xs text-gray-500">{lead.price}</div>
              {lead.tags && (
                <div className="mt-2 flex gap-1">
                  {lead.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-[10px] rounded-full font-medium ${tag === "Бот" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
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
