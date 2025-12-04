"use client";

import { ScrollBasedDemo } from "@/components/demo/ScrollBasedDemo";
import { OzonReviewDemo } from "./slides/OzonReviewDemo";
import { ReviewProcessingFlowDemo } from "./slides/ReviewProcessingFlowDemo";
import { AmoCRMReviewNotificationDemo } from "./slides/AmoCRMReviewNotificationDemo";
import { BotReviewResolutionDemo } from "./slides/BotReviewResolutionDemo";
import { CTASection } from "@/components/demo/shared/CTASection";
import { landingContent } from "@/app/landingContent";

import { Star } from "lucide-react";

export function MarketplaceReviewsScrollPresentation() {
  const content = landingContent.marketplacePresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <OzonReviewDemo />,
      mobileConfig: {
        height: "h-[40rem]",
      },
    },
    {
      ...content.sections[1],
      demoComponent: <ReviewProcessingFlowDemo />,
      mobileConfig: {
        height: "h-[35rem]",
      },
    },
    {
      ...content.sections[2],
      demoComponent: <AmoCRMReviewNotificationDemo />,
      mobileConfig: {
        height: "h-[30rem]",
      },
    },
    {
      ...content.sections[3],
      demoComponent: <BotReviewResolutionDemo />,
      mobileConfig: {
        height: "h-[40rem]",
      },
    },
    {
      ...content.sections[4],
      demoComponent: (
        <CTASection
          colorScheme="blue-purple-indigo"
          {...landingContent.demoComponents.common.customTexts.marketplaceReviews}
        />
      ),
      mobileConfig: {
        fullWidth: true, // Full-width CTA on mobile
        noScale: true, // No scaling needed
      },
    },
  ];

  return (
    <ScrollBasedDemo
      headerTitle={content.headerTitle}
      headerSubtitle={content.headerSubtitle}
      headerIcon={<Star className="w-7 h-7" />}
      sections={sections}
    />
  );
}
