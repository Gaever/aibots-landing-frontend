"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
  const [animationKey, setAnimationKey] = useState(0);
  const conversationContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom when conversation is shown
  useEffect(() => {
    if (selectedLeadId && conversationContainerRef.current) {
      // Scroll the chat container to bottom without animation
      conversationContainerRef.current.scrollTop = conversationContainerRef.current.scrollHeight;
    }
  }, [selectedLeadId]);

  // Initialize leads from landingContent
  useEffect(() => {
    const initialLeads = content.demoLeads.slice(0, 2).map((lead, index) => ({
      id: index + 1,
      name: lead.name,
      price: lead.price,
      status: lead.status,
    }));
    setLeads(initialLeads);
  }, [animationKey]);

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
        const container = containerRef.current;
        if (leadCard && container) {
          const cardRect = leadCard.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          // Calculate position relative to container instead of viewport
          setClickPosition({
            x: cardRect.left - containerRect.left + cardRect.width / 2,
            y: cardRect.top - containerRect.top + cardRect.height / 2,
          });
          setShowClickEffect(true);

          setTimeout(() => {
            setShowClickEffect(false);
            setSelectedLeadId(3);

            // Call onComplete after task view is shown
            setTimeout(() => {
              onComplete?.();

              // Wait 4 seconds then restart animation
              setTimeout(() => {
                setSelectedLeadId(null);
                setLeads([]);
                setAnimationKey(prev => prev + 1);
              }, 4000);
            }, 1000);
          }, 500);
        }
      }, 1200);
    }, 1000);

    return () => clearTimeout(timer1);
  }, [autoStart, startTrigger, onComplete, animationKey]);

  const handleLeadClick = (leadId: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      setClickPosition({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
      setShowClickEffect(true);

      setTimeout(() => {
        setShowClickEffect(false);
        setSelectedLeadId(leadId);
      }, 500);
    }
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
            <h2 className="text-base font-bold font-sans text-gray-800 mb-1">
              {content.demoLeads[2].name}
            </h2>
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
          <div ref={conversationContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
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

          {/* Telegram Button */}
          <div className="p-3 border-t border-gray-200">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2.5 text-xs font-medium transition-colors">
              Открыть диалог в Telegram
            </button>
          </div>
        </motion.div>
      </AmoCRMFrame>
    );
  }

  return (
    <AmoCRMFrame>
      <div ref={containerRef} className="flex-1 p-4 overflow-hidden md:overflow-x-auto flex gap-4 h-full overscroll-none relative">
        {/* Click Effect */}
        <AnimatePresence>
          {showClickEffect && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-16 h-16 rounded-full bg-blue-400 pointer-events-none z-50"
              style={{
                left: clickPosition.x - 32,
                top: clickPosition.y - 32,
              }}
            />
          )}
        </AnimatePresence>

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
