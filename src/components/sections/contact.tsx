import { Mail, MapPin, Clock } from "lucide-react";
import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";

export function ContactSection() {
  const { cta, direct } = contentId.contact;

  return (
    <section
      id="kontak"
      className="scroll-mt-24 py-20 md:py-32 border-b border-gray-200 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Blok Ajakan Besar (CTA Header) */}
        <Reveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              KONTAK KAMI
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
              {cta.title}
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#191919]/70 leading-relaxed">
              {cta.subtitle}
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
              <div className="bg-[#F4F3F3] border border-gray-200 p-6 sm:p-8 space-y-8">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium block">
                    {direct.title}
                  </span>
                  <h3 className="mt-2 text-xl font-serif font-normal text-[#191919]">
                    Kanal Komunikasi
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Surel Placeholder Jujur */}
                  <div className="flex items-start gap-3.5">
                    <Mail
                      className="w-5 h-5 text-[#191919]/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#191919]/50 block">
                        Alamat Surel
                      </span>
                      <p className="text-sm font-mono text-[#191919]/60 mt-0.5">
                        {direct.emailPlaceholder}
                      </p>
                    </div>
                  </div>

                  {/* Lokasi Placeholder Jujur */}
                  <div className="flex items-start gap-3.5">
                    <MapPin
                      className="w-5 h-5 text-[#191919]/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#191919]/50 block">
                        Lokasi
                      </span>
                      <p className="text-sm font-mono text-[#191919]/60 mt-0.5">
                        {direct.locationPlaceholder}
                      </p>
                    </div>
                  </div>

                  {/* Jam / Komitmen Balasan */}
                  <div className="flex items-start gap-3.5 pt-4 border-t border-gray-200">
                    <Clock
                      className="w-5 h-5 text-[#191919]/50 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-[#191919]/50 block">
                        Waktu Tanggapan
                      </span>
                      <p className="text-sm text-[#191919]/80 mt-0.5 leading-relaxed">
                        {direct.responseCommitment}
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
