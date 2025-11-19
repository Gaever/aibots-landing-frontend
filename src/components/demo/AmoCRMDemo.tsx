"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: number;
  name: string;
  budget: string;
  status: string;
  timestamp: string;
  tags: string[];
  company: string;
}

interface AmoCRMDemoProps {
  autoStart?: boolean;
  onComplete?: () => void;
  startTrigger?: boolean;
}

export function AmoCRMDemo({ autoStart = true, onComplete, startTrigger = true }: AmoCRMDemoProps = {}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    if (!startTrigger) return;

    const timer = setTimeout(() => {
      const newLead: Lead = {
        id: 142345,
        name: "Заявка с сайта #42",
        budget: "8 990 ₽",
        status: "Неразобранное",
        timestamp: "14:30",
        tags: ["Сайт", "Парка"],
        company: "Иван Петров",
      };
      
      setLeads((prev) => [...prev, newLead]);

      // Вызываем onComplete через 3 секунды после появления
      setTimeout(() => {
        onComplete?.();
      }, 3000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [startTrigger, onComplete]);

  const stages = [
    { id: "unsorted", name: "Неразобранное", color: "#99CCFF" },
    { id: "initial", name: "Первичный контакт", color: "#FFFF99" },
    { id: "negotiation", name: "Переговоры", color: "#FFCC99" },
    { id: "decision", name: "Принимают решение", color: "#FF9999" },
  ];

  return (
    <div className="w-full h-[500px] bg-[#f5f5f5] rounded-xl shadow-2xl overflow-hidden flex text-[10px] md:text-xs font-sans">
      {/* Sidebar */}
      <div className="w-10 md:w-14 bg-[#2c3643] flex flex-col items-center py-4 gap-4 flex-shrink-0 z-10">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
        <div className="flex flex-col gap-3 mt-2 w-full items-center">
           {/* Mock Icons */}
           {[...Array(5)].map((_, i) => (
             <div key={i} className={`w-full h-8 flex items-center justify-center border-l-2 ${i === 1 ? 'border-blue-500 bg-[#354050]' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                <div className="w-4 h-4 bg-gray-400 rounded-sm" />
             </div>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
           <div className="flex items-center gap-4">
             <h1 className="font-bold text-gray-700 text-sm md:text-base truncate">Сделки</h1>
             <div className="hidden md:flex items-center bg-gray-100 rounded px-2 py-1 gap-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                <span className="text-gray-500">Поиск и фильтр</span>
             </div>
           </div>
           <div className="flex items-center gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors">
                + Новая сделка
              </button>
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
           </div>
        </div>

        {/* Pipeline (Kanban) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
          <div className="flex h-full gap-3 min-w-max">
            {stages.map((stage) => (
              <div key={stage.id} className="w-48 md:w-56 flex flex-col h-full">
                {/* Column Header */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1 px-1">
                    <span className="font-bold text-gray-700 uppercase truncate">{stage.name}</span>
                    <span className="text-gray-400 text-[10px]">
                      {stage.id === "unsorted" ? leads.length : 0} сделок
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full" style={{ backgroundColor: stage.color }}></div>
                </div>

                {/* Column Content */}
                <div className="flex-1 bg-transparent rounded-lg flex flex-col gap-2 overflow-y-auto pb-2">
                  {stage.id === "unsorted" && leads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer animate-slideInLeft"
                    >
                      <div className="flex flex-wrap gap-1 mb-2">
                        {lead.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="font-medium text-blue-600 mb-1 truncate">{lead.name}</div>
                      <div className="text-gray-900 font-bold mb-2">{lead.budget}</div>
                      
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                        <div className="w-4 h-4 bg-gray-200 rounded-full flex-shrink-0"></div>
                        <div className="text-gray-500 truncate">{lead.company}</div>
                        <div className="ml-auto text-gray-400 text-[10px]">{lead.timestamp}</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty State Placeholder for visual structure */}
                  {stage.id !== "unsorted" && (
                     <div className="h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center opacity-30">
                        <span className="text-gray-400">Пусто</span>
                     </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
