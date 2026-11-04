import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale, routing } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

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
