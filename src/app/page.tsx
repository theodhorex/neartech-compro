import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/sections/stats";
import { ClientsSection } from "@/components/sections/clients";
import { ServicesSection } from "@/components/sections/services";
import { ApproachSection } from "@/components/sections/approach";
import { CaseStudiesSection } from "@/components/sections/case-studies";
import { WhyUsSection } from "@/components/sections/why-us";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { TechStackSection } from "@/components/sections/tech-stack";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ClientsSection />
      <ServicesSection />
      <ApproachSection />
      <CaseStudiesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <AboutSection />
      <TechStackSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
