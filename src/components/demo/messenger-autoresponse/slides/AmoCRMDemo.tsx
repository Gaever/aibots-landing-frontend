"use client";

import { motion } from "framer-motion";
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

    const timer = setTimeout(() => {
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

      // Call onComplete after animation
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoStart, startTrigger, onComplete]);

  return (
    <AmoCRMFrame>
      <div className="flex-1 p-4 overflow-hidden md:overflow-x-auto flex gap-4 h-full">
        {/* Column: New Leads */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 h-full">
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
              initial={lead.id === 3 ? { opacity: 0, y: -20, height: 0 } : {}}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              transition={{ duration: 0.4 }}
              className={`bg-white p-3 rounded-md shadow-sm border-l-4 ${lead.id === 3 ? "border-green-500" : "border-gray-300"
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
        <div className="w-64 flex-shrink-0 flex flex-col gap-3 opacity-60 h-full">
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
