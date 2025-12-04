"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
// import { TelegramChatDemo } from "./slides/TelegramChatDemo";
import { AvitoChatDemo } from "./slides/AvitoChatDemo";
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
      demoComponent: <AvitoChatDemo autoStart={true} />,
      mobileConfig: {
        className: "mt-8",
        scale: 0.75,
        // containerClassName: 'h-[F500px]',
        // transformOrigin: 'center center'
      },
    },
    {
      ...content.sections[1],
      demoComponent: <AmoCRMDemo autoStart={true} />,
      mobileConfig: {
        noScale: true, // amoCRM demo displays well at full size on mobile
        className: "my-16",
        height: "h-[35rem]",
        // scale: 0.75,
      },
    },
    {
      ...content.sections[2],
      demoComponent: <ManagerTelegramDemo autoStart={true} />,
      mobileConfig: {
        className: "mt-8",
        scale: 0.75,
      },
    },
    {
      ...content.sections[3],
      demoComponent: (
        <CTASection
          colorScheme="blue-purple-indigo"
          {...landingContent.demoComponents.common.customTexts.messengerAutoresponse}
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
      headerIcon={<MessagesSquare className="w-7 h-7" />}
      sections={sections}
    />
  );
}
