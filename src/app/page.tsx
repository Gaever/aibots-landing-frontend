"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { ConsultantBotScrollPresentation } from "@/components/demo/consultant-bot/ConsultantBotScrollPresentation";
import { DocumentBotScrollPresentation } from "@/components/demo/document-bot/DocumentBotScrollPresentation";
import { HrBotScrollPresentation } from "@/components/demo/hr-bot/HrBotScrollPresentation";
import { InternalAssistantScrollPresentation } from "@/components/demo/internal-assistant/InternalAssistantScrollPresentation";
import { MarketplaceReviewsScrollPresentation } from "@/components/demo/marketplace-reviews/MarketplaceReviewsScrollPresentation";
import { MessengerAutoreviewScrollPresentation } from "@/components/demo/messenger-autoresponse/MessengerAutoreviewScrollPresentation";
import { QualityControlScrollPresentation } from "@/components/demo/quality-control/QualityControlScrollPresentation";
import { OperatorPrompterScrollPresentation } from "@/components/demo/operator-prompter/OperatorPrompterScrollPresentation";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { TableOfContents } from "@/components/TableOfContents";
import { landingContent } from "./landingContent";

export default function Home() {
  const [showAllDemos, setShowAllDemos] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    // For zero-height anchor elements we want strict alignment at viewport top
    const isAnchor = element.classList.contains("toc-anchor") || element.offsetHeight === 0;
    const offset = isAnchor ? 0 : window.innerWidth >= 1280 ? 144 : window.innerWidth >= 1024 ? 120 : 88;

    const targetTop = Math.max(absoluteTop - offset, 0);
    const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

    if (isSmallScreen) {
      // On mobile: jump instantly to avoid sluggish smooth scrolling
      window.scrollTo({ top: targetTop, behavior: "auto" });
      // Single-frame correction after layout settles
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const desired = Math.max(window.scrollY + r.top - offset, 0);
        if (Math.abs(desired - window.scrollY) > 1) {
          window.scrollTo({ top: desired, behavior: "auto" });
        }
      });
      return;
    }

    window.scrollTo({ top: targetTop, behavior: "smooth" });

    // Post-scroll settling correction (handles sticky headers, animations)
    const start = performance.now();
    const durationMs = 400;
    const correct = () => {
      const now = performance.now();
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const desired = Math.max(window.scrollY + r.top - offset, 0);
      if (Math.abs(desired - window.scrollY) > 2) {
        window.scrollTo({ top: desired, behavior: "auto" });
      }
      if (now - start < durationMs) requestAnimationFrame(correct);
    };
    requestAnimationFrame(correct);
  };

  useEffect(() => {
    if (!pendingScrollId) return;
    if (!showAllDemos) return;

    scrollToSection(pendingScrollId);
    setPendingScrollId(null);
  }, [pendingScrollId, showAllDemos]);

  const handleTocClick = (id: string) => {
    const alwaysVisibleIds = ["messengers", "reviews"];

    if (!showAllDemos && !alwaysVisibleIds.includes(id)) {
      setShowAllDemos(true);
      setPendingScrollId(id);
      return;
    }

    scrollToSection(id);
  };

  return (
    <main className="min-h-screen bg-white">
      <Hero title="ИИ-боты для клиентов и сотрудников под ключ" subtitle={landingContent.hero.subtitle} />

      <PainPoints
        title={landingContent.pains.title}
        items={landingContent.pains.items}
        growthBlock={landingContent.growthBlock}
      />

      {/* <Strategy title={landingContent.strategy.title} paragraphs={landingContent.strategy.paragraphs} /> */}

      <TableOfContents verticals={landingContent.verticals} scrollToSection={handleTocClick} />

      <div id="messengers" className="toc-anchor h-0" />
      <MessengerAutoreviewScrollPresentation />

      <div id="reviews" className="toc-anchor h-0" />
      <MarketplaceReviewsScrollPresentation />

      {!showAllDemos && (
        <div className="py-12">
          <button
            type="button"
            onClick={() => setShowAllDemos(true)}
            className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 py-6 px-8 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg md:text-xl font-semibold shadow-2xl cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] hover:brightness-110 transition duration-200 ease-out"
          >
            Показать ещё примеры
          </button>
        </div>
      )}

      {showAllDemos && (
        <>
          <div id="ecommerce" className="toc-anchor h-0" />
          <ConsultantBotScrollPresentation />

          <div id="operator-souffleur" className="toc-anchor h-0" />
          <OperatorPrompterScrollPresentation />

          <div id="internal-assistant" className="toc-anchor h-0" />
          <InternalAssistantScrollPresentation />

          <div id="hr-bot" className="toc-anchor h-0" />
          <HrBotScrollPresentation />

          <div id="doc-bot" className="toc-anchor h-0" />
          <DocumentBotScrollPresentation />

          <div id="quality-control" className="toc-anchor h-0" />
          <QualityControlScrollPresentation />
        </>
      )}

      <ContactForm
        title={landingContent.closingCta.title}
        subtitle={landingContent.closingCta.subtitle}
        note={landingContent.closingCta.note}
        footnote={landingContent.closingCta.footnote}
        stillDoubting={landingContent.form.stillDoubting}
        demoText={landingContent.form.demoText}
        labels={{
          name: landingContent.form.nameLabel,
          email: landingContent.form.emailLabel,
          phone: landingContent.form.phoneLabel,
          service: landingContent.form.serviceLabel,
          submit: landingContent.form.submitLabel,
          projectDescription: landingContent.form.projectDescriptionLabel,
        }}
        placeholders={{
          name: landingContent.form.namePlaceholder,
          email: landingContent.form.emailPlaceholder,
          phone: landingContent.form.phonePlaceholder,
          service: landingContent.form.servicePlaceholder,
          projectDescription: landingContent.form.projectDescriptionPlaceholder,
        }}
        serviceOptions={landingContent.form.serviceOptions}
        messages={landingContent.form.messages}
      />

      <FAQ items={landingContent.faqItems} />

      <Footer text={landingContent.footer.text} />
    </main>
  );
}
