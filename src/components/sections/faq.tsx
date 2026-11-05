import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

type FaqItem = {
  question: string;
  answer: string;
};

export async function FaqSection() {
  const t = await getTranslations("faq");
  const label = t("label");
  const title = t("title");
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="py-20 md:py-32 border-b border-line bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Kolom Kiri: Judul */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
                {label}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-ink">
                {title}
              </h2>
            </Reveal>
          </div>

          {/* Kolom Kanan: Akordeon Aksesibel (<details> & <summary>) */}
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <div className="border-t border-line divide-y divide-line">
                {items.map((item, idx) => (
                  <details
                    key={idx}
                    className="faq-item group py-5 sm:py-6 focus-within:outline-none"
                  >
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink rounded-xs">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xs font-mono text-ink/40 shrink-0">
                          0{idx + 1}
                        </span>
                        <h3 className="text-base sm:text-lg font-medium text-ink group-hover:text-ink transition-colors leading-snug">
                          {item.question}
                        </h3>
                      </div>
                      <span className="p-1 text-ink/40 group-hover:text-ink transition-colors shrink-0">
                        <ChevronDown className="w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180" />
                      </span>
                    </summary>
                    <div className="mt-3 pl-7 pr-4 sm:pr-8 text-sm sm:text-base text-ink/70 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
