import { Footer } from "~/components/sections/footer";
import { Header } from "~/components/sections/header";
import { HeroSection } from "~/components/sections/hero-section";
import { IntegrationsSection } from "~/components/sections/integrations-section";
import { PricingSection } from "~/components/sections/pricing-section";
import { StatsSection } from "~/components/sections/stats-section";
import { TestimonialSection } from "~/components/sections/testimonial-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntegrationsSection />
        <StatsSection />
        <TestimonialSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
