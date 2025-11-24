"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { StoreChatDemo } from "./slides/StoreChatDemo";
import { OperatorChatDemo } from "./slides/OperatorChatDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent } from "@/app/landingContent";

export function ConsultantBotScrollPresentation() {
  const content = landingContent.consultantPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <StoreChatDemo autoStart={true} />,
    },
    {
      ...content.sections[1],
      demoComponent: <OperatorChatDemo autoStart={true} />,
    },
    {
      ...content.sections[2],
      demoComponent: <CTASection colorScheme="blue-purple-indigo" />,
      mobileConfig: {
        fullWidth: true,
        noScale: true,
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
