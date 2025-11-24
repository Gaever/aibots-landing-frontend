"use client";

import { ScrollBasedDemo } from "@/components/demo/ScrollBasedDemo";
import { OzonReviewDemo } from "./slides/OzonReviewDemo";
import { ReviewProcessingFlowDemo } from "./slides/ReviewProcessingFlowDemo";
import { AmoCRMReviewNotificationDemo } from "./slides/AmoCRMReviewNotificationDemo";
import { BotReviewResolutionDemo } from "./slides/BotReviewResolutionDemo";
import { CTASection } from "@/components/demo/shared/CTASection";
import { landingContent } from "@/app/landingContent";

export function MarketplaceReviewsScrollPresentation() {
  const content = landingContent.marketplacePresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <OzonReviewDemo />,
    },
    {
      ...content.sections[1],
      demoComponent: <ReviewProcessingFlowDemo />,
    },
    {
      ...content.sections[2],
      demoComponent: <AmoCRMReviewNotificationDemo />,
    },
    {
      ...content.sections[3],
      demoComponent: <BotReviewResolutionDemo />,
    },
    {
      ...content.sections[4],
      demoComponent: <CTASection colorScheme="blue-purple-indigo" />,
      mobileConfig: {
        fullWidth: true,  // Full-width CTA on mobile
        noScale: true,    // No scaling needed
      },
    },
  ];

  return (
    <ScrollBasedDemo
      headerTitle={content.headerTitle}
      headerSubtitle={content.headerSubtitle}
      sections={sections}
    />
  );
}
