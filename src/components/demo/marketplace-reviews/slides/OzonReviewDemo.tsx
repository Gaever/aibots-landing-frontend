"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { landingContent } from "@/app/landingContent";

export function OzonReviewDemo() {
  const [showReview, setShowReview] = useState(false);
  const content = landingContent.demoComponents;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReview(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-xl overflow-hidden flex flex-col font-sans text-sm border border-gray-200">
      {/* Header imitating Generic Marketplace header */}
      <div className="bg-blue-500 text-white p-3 min-h-10 flex items-center justify-between">
        {/* <div className="font-bold text-lg">{content.common.marketplaceHeader}</div> */}
        {/* <div className="text-xs">9:41</div> */}
      </div>

      {/* Product Info */}
      <div className="p-4 border-b border-gray-100 flex gap-3">
        <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0 flex items-center justify-center text-gray-400 text-xs">
          Фото
        </div>
        <div>
          <div className="font-medium text-gray-900 line-clamp-2">
            {content.common.productName}
          </div>
          <div className="text-xs text-gray-500 mt-1">Артикул: 12345678</div>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-yellow-400 text-xs">
              {"★".repeat(4)}
              <span className="text-gray-300">★</span>
            </div>
            <span className="text-xs text-gray-400">{content.common.reviewCount}</span>
          </div>
        </div>
      </div>

      {/* Reviews Header */}
      <div className="p-4 pb-2">
        <h3 className="font-bold text-lg text-gray-900">{content.common.reviewsHeader}</h3>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {content.common.filters.map((filter, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium whitespace-nowrap">
              {filter}
            </span>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-6">
        {/* Existing positive review (background) */}
        <div className="opacity-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                {content.reviews.positive.author[0]}
              </div>
              <div>
                <div className="font-medium text-gray-900">{content.reviews.positive.author}</div>
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(5)}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">{content.reviews.positive.date}</div>
          </div>
          <p className="text-gray-600">
            {content.reviews.positive.text}
          </p>
        </div>

        {/* New Negative Review Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={showReview ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-red-50 border border-red-100 rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xs">
                {content.reviews.negative.author[0]}
              </div>
              <div>
                <div className="font-medium text-gray-900">{content.reviews.negative.author}</div>
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(1)}
                  <span className="text-gray-300">{"★".repeat(4)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400">{content.reviews.negative.date}</div>
          </div>
          <p className="text-gray-800 font-medium mb-1">{content.reviews.negative.title}</p>
          <p className="text-gray-600">
            {content.reviews.negative.text}
          </p>
          <div className="mt-3 flex gap-2">
            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">
              Фото 1
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
