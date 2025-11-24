"use client";

import { ScrollBasedDemo } from "../ScrollBasedDemo";
import { FinancialReportDemo } from "./slides/FinancialReportDemo";
import { EmailArchiveDemo } from "./slides/EmailArchiveDemo";
import { ContractReviewDemo } from "./slides/ContractReviewDemo";
import { CTASection } from "../shared/CTASection";
import { landingContent } from "@/app/landingContent";

export function DocumentBotScrollPresentation() {
  const content = landingContent.documentBotPresentation;
  const sections = [
    {
      ...content.sections[0],
      demoComponent: <FinancialReportDemo autoStart={true} />,
    },
    {
      ...content.sections[1],
      demoComponent: <EmailArchiveDemo autoStart={true} />,
    },
    {
      ...content.sections[2],
      demoComponent: <ContractReviewDemo autoStart={true} />,
    },
    {
      ...content.sections[3],
      demoComponent: <CTASection colorScheme="emerald-teal-cyan" />,
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
