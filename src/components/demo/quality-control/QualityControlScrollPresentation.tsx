"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { BadConsultationDemo } from "./slides/BadConsultationDemo";
import { QualityControlAdminDemo } from "./slides/QualityControlAdminDemo";
import { QualityControlNotificationDemo } from "./slides/QualityControlNotificationDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent } from "@/app/landingContent";
import { Search } from "lucide-react";

export function QualityControlScrollPresentation() {
  const content = landingContent.qualityControlPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <BadConsultationDemo autoStart={true} />,
      mobileConfig: {
        className: 'mt-8',
      },
    },
    {
      ...content.sections[1],
      demoComponent: <QualityControlAdminDemo autoStart={true} />,
      mobileConfig: {
        noScale: true,
        className: 'my-16',
        height: 'h-[40rem]',
      },
    },
    {
      ...content.sections[2],
      demoComponent: <QualityControlNotificationDemo autoStart={true} />,
      mobileConfig: {
        className: 'mt-8',
      },
    },
    {
      ...content.sections[3],
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
      headerIcon={<Search className="w-7 h-7" />}
      sections={sections}
    />
  );
}
