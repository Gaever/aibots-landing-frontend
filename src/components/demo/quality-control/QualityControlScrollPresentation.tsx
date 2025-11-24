"use client";

import { ScrollBasedDemo } from "@/components/demo/ScrollBasedDemo";
import { ChatAnalysisDemo } from "./slides/ChatAnalysisDemo";
import { QualityDashboardDemo } from "./slides/QualityDashboardDemo";
import { CTASection } from "@/components/demo/shared/CTASection";
import { landingContent } from "@/app/landingContent";

import { ShieldCheck } from "lucide-react";

export function QualityControlScrollPresentation() {
  const content = landingContent.qualityControlPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: (
        <div className="flex items-center justify-center h-full">
          <div className="text-9xl opacity-20 select-none">🔍</div>
        </div>
      ),
    },
    {
      ...content.sections[1],
      demoComponent: <ChatAnalysisDemo autoStart={true} />,
    },
    {
      ...content.sections[2],
      demoComponent: <QualityDashboardDemo />,
    },
    {
      ...content.sections[3],
      demoComponent: <CTASection colorScheme="blue-purple-indigo" />,
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
      headerIcon={<ShieldCheck className="w-7 h-7" />}
      sections={sections}
    />
  );
}
