"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { OmniChannelChatDemo } from "./slides/OmniChannelChatDemo";
import { RAGSchemaDemo } from "./slides/RAGSchemaDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent, operatorPrompterPresentation } from "@/app/landingContent";

import { Headphones } from "lucide-react";

export function OperatorPrompterScrollPresentation() {
  const content = operatorPrompterPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <OmniChannelChatDemo autoStart={true} />,
      mobileConfig: {
        // scale: 0.95,
        noScale: true,
        marginBottom: "",
        height: 'h-[40rem]',
        className: "shadow-none",
      },
    },
    {
      ...content.sections[1],
      demoComponent: <RAGSchemaDemo autoStart={true} />,
      mobileConfig: {
        fullWidth: true,
        noScale: true,
        className: "bg-transparent shadow-none rounded-2xl",
        height: 'h-[45rem]',
      },
    },
    {
      ...content.sections[2],
      demoComponent: <CTASection colorScheme="indigo-purple-pink" />,
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
      headerIcon={<Headphones className="w-7 h-7" />}
      sections={sections}
    />
  );
}
