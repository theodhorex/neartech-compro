import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";

export async function ContactSection() {
  const tCta = await getTranslations("contact.cta");
  const tDirect = await getTranslations("contact.direct");

  return (
    <section
      id="kontak"
      className="scroll-mt-24 py-20 md:py-32 border-b border-line bg-bg-soft"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blok Ajakan Besar (CTA Header) */}
        <Reveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
              {tCta("label")}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-ink">
              {tCta("title")}
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink/70 leading-relaxed">
              {tCta("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Grid Formulir dan Blok Kontak Langsung */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Formulir Kontak (Klien) */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>

          {/* Blok Kontak Langsung (Samping) */}
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="bg-bg border border-line p-6 sm:p-8 space-y-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium block">
                    {tDirect("title")}
                  </span>
                  <h3 className="mt-2 text-xl font-serif font-normal text-ink">
                    {tDirect("channelTitle")}
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Surel */}
                  <div className="flex items-start gap-3.5">
                    <Mail
                      className="w-5 h-5 text-ink/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-ink/50 block">
                        {tDirect("emailLabel")}
                      </span>
                      <a
                        href={`mailto:${tDirect("email")}`}
                        className="text-sm font-mono text-ink hover:underline focus-visible:outline-2 focus-visible:outline-ink rounded-xs mt-0.5 inline-block"
                      >
                        {tDirect("email")}
                      </a>
                    </div>
                  </div>

                  {/* Telepon */}
                  <div className="flex items-start gap-3.5">
                    <Phone
                      className="w-5 h-5 text-ink/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-ink/50 block">
                        {tDirect("phoneLabel")}
                      </span>
                      <a
                        href={`tel:${tDirect("phone").replace(/\s+/g, "")}`}
                        className="text-sm font-mono text-ink hover:underline focus-visible:outline-2 focus-visible:outline-ink rounded-xs mt-0.5 inline-block"
                      >
                        {tDirect("phone")}
                      </a>
                    </div>
                  </div>

                  {/* Lokasi */}
                  <div className="flex items-start gap-3.5">
                    <MapPin
                      className="w-5 h-5 text-ink/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-ink/50 block">
                        {tDirect("locationLabel")}
                      </span>
                      <p className="text-sm text-ink/80 mt-0.5 leading-relaxed">
                        {tDirect("location")}
                      </p>
                    </div>
                  </div>

                  {/* Jam Kerja */}
                  <div className="flex items-start gap-3.5 pt-4 border-t border-line">
                    <Clock
                      className="w-5 h-5 text-ink/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider font-mono text-ink/50 block">
                          {tDirect("hoursLabel")}
                        </span>
                        <p className="text-sm text-ink/80 mt-0.5">
                          {tDirect("hours")}
                        </p>
                      </div>
                      <p className="text-xs text-ink/60 leading-relaxed pt-1">
                        {tDirect("responseCommitment")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
