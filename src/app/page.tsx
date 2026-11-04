import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/sections/services";
import { ApproachSection } from "@/components/sections/approach";
import { WhyUsSection } from "@/components/sections/why-us";
import { AboutSection } from "@/components/sections/about";
import { FaqSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ApproachSection />
      <WhyUsSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}
