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
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      <div id="messengers" className="snap-start">
        <MessengerAutoreviewScrollPresentation />
      </div>
      <div id="reviews">
        <MarketplaceReviewsScrollPresentation />
      </div>
      <div id="ecommerce">
        <ConsultantBotScrollPresentation />
      </div>
      <div id="operator-souffleur">
        <OperatorPrompterScrollPresentation />
      </div>
      <div id="internal-assistant">
        <InternalAssistantScrollPresentation />
      </div>
      <div id="hr-bot">
        <HrBotScrollPresentation />
      </div>
      <div id="doc-bot">
        <DocumentBotScrollPresentation />
      </div>
      <div id="quality-control">
        <QualityControlScrollPresentation />
      </div>

      <ProductsVerticals verticals={landingContent.verticals} />

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
