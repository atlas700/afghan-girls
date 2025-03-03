import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { SubjectsSection } from "@/components/layout/sections/services";
import { TestimonialSection } from "@/components/layout/sections/testimonial";

export default function Home() {
  return (
    <div className="container">
      <HeroSection />
      {/* <SponsorsSection /> */}
      <BenefitsSection />
      <FeaturesSection />
      <SubjectsSection />
      <TestimonialSection />
      {/* <TeamSection /> */}
      {/* <CommunitySection /> */}
      {/* <PricingSection /> */}
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
