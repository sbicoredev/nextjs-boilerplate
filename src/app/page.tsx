import { FooterSection } from "~/components/footer-section";
import { HeroSection } from "~/components/hero-section";
import { IntegrationsSection } from "~/components/integrations-section";
import { PricingSection } from "~/components/pricing-section";
import { StatsSection } from "~/components/stats-section";
import { TestimonialsSection } from "~/components/testimonials-section";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <IntegrationsSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}
