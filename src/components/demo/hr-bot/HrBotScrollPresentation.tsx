"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { HrInterviewChatDemo } from "./HrInterviewChatDemo";
import { HuntflowCrmDemo } from "./HuntflowCrmDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent } from "@/app/landingContent";

import { Users } from "lucide-react";

export function HrBotScrollPresentation() {
  const content = landingContent.hrBotPresentation;

  // Fallback if content is not yet loaded/defined
  if (!content) return null;

  const sections = [
    {
      ...content.sections[0],
      demoComponent: <HrInterviewChatDemo autoStart={true} />,
    },
    {
      ...content.sections[1],
      demoComponent: <HuntflowCrmDemo autoStart={true} />,
    },
    {
      ...content.sections[2],
      demoComponent: <CTASection colorScheme="teal-emerald-green" />,
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
      headerIcon={<Users className="w-7 h-7" />}
      sections={sections}
    />
  );
}
