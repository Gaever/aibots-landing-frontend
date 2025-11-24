"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { InternalChatDemo } from "./InternalChatDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent } from "@/app/landingContent";

export function InternalAssistantScrollPresentation() {
  const content = landingContent.internalAssistantPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <InternalChatDemo autoStart={true} />,
    },
    {
      ...content.sections[1],
      demoComponent: <CTASection colorScheme="purple-indigo-blue" />,
      mobileConfig: {
        fullWidth: true,
        noScale: true,
      }
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
