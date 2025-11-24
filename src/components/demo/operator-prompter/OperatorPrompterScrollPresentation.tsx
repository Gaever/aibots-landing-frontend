"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { OmniChannelChatDemo } from "./slides/OmniChannelChatDemo";
import { RAGSchemaDemo } from "./slides/RAGSchemaDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent, operatorPrompterPresentation } from "@/app/landingContent";

export function OperatorPrompterScrollPresentation() {
  const content = operatorPrompterPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <OmniChannelChatDemo autoStart={true} />,
    },
    {
      ...content.sections[1],
      demoComponent: <RAGSchemaDemo autoStart={true} />,
    },
    {
      ...content.sections[2],
      demoComponent: <CTASection colorScheme="indigo-purple-pink" />,
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