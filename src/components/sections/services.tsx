import { Compass, Layout, Cpu } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

const SERVICE_ICONS = [Compass, Layout, Cpu];

type ServiceItem = {
  num: string;
  title: string;
  description: string;
  points: string[];
};

export async function ServicesSection() {
  const t = await getTranslations("services");
  const label = t("label");
  const title = t("title");
  const intro = t("intro");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="layanan"
      className="scroll-mt-24 py-20 md:py-32 border-b border-line bg-bg-soft"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
              {label}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-ink">
              {title}
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink/70 leading-relaxed">
              {intro}
            </p>
          </div>
        </Reveal>

        {/* 3 Kartu Layanan */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Compass;
            return (
              <Reveal key={service.num} delay={index * 120}>
                <div
                  tabIndex={0}
                  className="group relative h-full flex flex-col justify-between bg-bg border border-line p-6 sm:p-8 hover:-translate-y-1 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-all duration-300"
                >
                  <div>
                    {/* Header Kartu: Nomor & Ikon */}
                    <div className="flex items-center justify-between pb-6 border-b border-line">
                      <div className="flex items-center text-xs tracking-wider text-ink/50 font-mono">
                        <span>{service.num}</span>
                        <span className="mx-1.5 text-ink/30">/</span>
                      </div>
                      <Icon
                        className="w-5 h-5 text-ink/70 group-hover:text-ink transition-colors duration-200"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Judul & Deskripsi */}
                    <h3 className="mt-6 text-xl sm:text-2xl font-serif font-normal text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Garis Tipis Pemisah Poin */}
                    <div
                      className="my-6 h-px bg-line w-full"
                      role="separator"
                      aria-hidden="true"
                    />

                    {/* 4 Poin Rincian */}
                    <ul className="space-y-3">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-ink/80 leading-snug"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full bg-ink/40 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Garis bawah animasi hover/fokus */}
                  <span
                    aria-hidden="true"
                    className="feature-underline absolute bottom-0 left-0 right-0 h-0.5 bg-ink pointer-events-none"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
