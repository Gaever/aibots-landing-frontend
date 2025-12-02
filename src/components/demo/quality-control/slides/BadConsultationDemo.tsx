"use client";

import { OnlineConsultantWidget } from "../../shared/OnlineConsultantWidget";
import { useEffect, useState, useRef } from "react";
import { landingContent } from "@/app/landingContent";

export function BadConsultationDemo({ autoStart = false }: { autoStart?: boolean }) {
  // Initial state has the first client message
  const [messages, setMessages] = useState<Array<{ role: "client" | "operator"; text: string }>>([
    { role: "client", text: "Здравствуйте. Сколько стоит доставка в Казань?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scenario = landingContent.qualityControlPresentation.demo.chatAnalysis.messages;

  useEffect(() => {
    if (!autoStart) return;

    // Start from index 1 since index 0 is already shown
    let currentIndex = 1;
    let timeoutId: NodeJS.Timeout;

    const playNextMessage = () => {
      if (currentIndex >= scenario.length) return;

      const message = scenario[currentIndex];

      if (message.role === "operator") {
        // Operator typing simulation
        setIsTyping(true);
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "operator", text: message.text }]);
          currentIndex++;
          timeoutId = setTimeout(playNextMessage, 1500);
        }, 1500);
      } else {
        // Client typing simulation (in input field)
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex <= message.text.length) {
            setInputValue(message.text.slice(0, charIndex));
            charIndex++;
            timeoutId = setTimeout(typeChar, 30); // Typing speed
          } else {
            // Send message
            setTimeout(() => {
              setInputValue("");
              setMessages((prev) => [...prev, { role: "client", text: message.text }]);
              currentIndex++;
              timeoutId = setTimeout(playNextMessage, 1000);
            }, 300);
          }
        };
        typeChar();
      }
    };

    // Initial delay before the second message sequence starts
    timeoutId = setTimeout(playNextMessage, 1000);

    return () => clearTimeout(timeoutId);
  }, [autoStart]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <OnlineConsultantWidget
      variant="operator"
      title="Чат с оператором"
      statusText="Игорь М. (online)"
      isTyping={isTyping}
      showInput={true}
      inputValue={inputValue}
      className="h-[450px]"
    >
      <div ref={scrollRef} className="flex flex-col gap-3 h-full overflow-y-auto pr-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "client" ? "justify-end" : "justify-start"
              } animate-fade-in-up`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === "client"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 flex gap-1 items-center h-[44px]">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>
    </OnlineConsultantWidget>
  );
}
