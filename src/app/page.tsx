"use client";

import { ContactForm } from "@/components/ContactForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { ProductsVerticals } from "@/components/ProductsVerticals";
import { TableOfContents } from "@/components/TableOfContents";
import { landingContent } from "./landingContent";
import { MessengerAutoreviewScrollPresentation } from "@/components/demo/messenger-autoresponse/MessengerAutoreviewScrollPresentation";
import { InternalAssistantScrollPresentation } from "@/components/demo/internal-assistant/InternalAssistantScrollPresentation";
import { MarketplaceReviewsScrollPresentation } from "@/components/demo/marketplace-reviews/MarketplaceReviewsScrollPresentation";
import { ConsultantBotScrollPresentation } from "@/components/demo/consultant-bot/ConsultantBotScrollPresentation";
import { OperatorPrompterScrollPresentation } from "@/components/demo/operator-prompter/OperatorPrompterScrollPresentation";
import { HrBotScrollPresentation } from "@/components/demo/hr-bot/HrBotScrollPresentation";
import { DocumentBotScrollPresentation } from "@/components/demo/document-bot/DocumentBotScrollPresentation";
import { QualityControlScrollPresentation } from "@/components/demo/quality-control/QualityControlScrollPresentation";
// import { OperatorPrompterScrollPresentation } from "@/components/demo/operator-prompter/OperatorPrompterScrollPresentation";

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const offset = window.innerWidth >= 1280 ? 144 : window.innerWidth >= 1024 ? 120 : 88;

    const targetTop = Math.max(absoluteTop - offset, 0);
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    // Post-scroll settling correction (handles sticky headers, animations)
    const start = performance.now();
    const durationMs = 800;
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

  return (
    <main className="min-h-screen bg-white">
      <Hero title="ИИ-боты для клиентов и сотрудников под ключ" subtitle={landingContent.hero.subtitle} />

      <PainPoints
        title={landingContent.pains.title}
        items={landingContent.pains.items}
        growthBlock={landingContent.growthBlock}
      />

      {/* <Strategy title={landingContent.strategy.title} paragraphs={landingContent.strategy.paragraphs} /> */}

      <TableOfContents verticals={landingContent.verticals} scrollToSection={scrollToSection} />

      <div id="messengers" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <MessengerAutoreviewScrollPresentation />

      <div id="reviews" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <MarketplaceReviewsScrollPresentation />

      <div id="ecommerce" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <ConsultantBotScrollPresentation />

      <div id="operator-souffleur" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <OperatorPrompterScrollPresentation />

      <div id="internal-assistant" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <InternalAssistantScrollPresentation />

      <div id="hr-bot" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <HrBotScrollPresentation />

      <div id="doc-bot" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      <DocumentBotScrollPresentation />

      <div id="quality-control" className="scroll-mt-28 md:scroll-mt-32 lg:scroll-mt-40 xl:scroll-mt-48 h-0" />
      {/* <QualityControlScrollPresentation /> */}

      {/* <ProductsVerticals verticals={landingContent.verticals} /> */}

      <FAQ items={landingContent.faqItems} />

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
          link: landingContent.form.linkLabel,
          revenue: landingContent.form.revenueLabel,
          service: landingContent.form.serviceLabel,
          submit: landingContent.form.submitLabel,
        }}
        placeholders={{
          name: landingContent.form.namePlaceholder,
          email: landingContent.form.emailPlaceholder,
          phone: landingContent.form.phonePlaceholder,
          link: landingContent.form.linkPlaceholder,
          revenue: landingContent.form.revenuePlaceholder,
          service: landingContent.form.servicePlaceholder,
        }}
        revenueOptions={landingContent.form.revenueOptions}
        serviceOptions={landingContent.form.serviceOptions}
      />

      <Footer text={landingContent.footer.text} />
    </main>
  );
}
