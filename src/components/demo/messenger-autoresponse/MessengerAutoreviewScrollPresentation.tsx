"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { TelegramChatDemo } from "./slides/TelegramChatDemo";
import { ManagerTelegramDemo } from "./slides/ManagerTelegramDemo";
import { AmoCRMDemo } from "./slides/AmoCRMDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent } from "@/app/landingContent";

import { MessagesSquare } from "lucide-react";

export function MessengerAutoreviewScrollPresentation() {
  const content = landingContent.messengerPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <TelegramChatDemo autoStart={true} />,
      mobileConfig: {
        className: 'mt-8',
      },
    },
    {
      ...content.sections[1],
      demoComponent: <AmoCRMDemo autoStart={true} />,
      mobileConfig: {
        noScale: true, // amoCRM demo displays well at full size on mobile
        className: 'my-16',
        height: 'h-[25rem]',
      },
    },
    {
      ...content.sections[2],
      demoComponent: <ManagerTelegramDemo autoStart={true} />,
      mobileConfig: {
        className: 'mt-8',
      },
    },
    {
      ...content.sections[3],
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
      headerIcon={<MessagesSquare className="w-7 h-7" />}
      sections={sections}
    />
  );
}
