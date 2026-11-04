import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

type WhyUsItem = {
  title: string;
  description: string;
};

export async function WhyUsSection() {
  const t = await getTranslations("whyUs");
  const label = t("label");
  const title = t("title");
  const paragraph = t("paragraph");
  const items = t.raw("items") as WhyUsItem[];

  return (
    <section className="py-20 md:py-32 bg-bg border-b border-line">
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
              {paragraph}
            </p>
          </div>
        </Reveal>

        {/* Grid 2x2 Nilai Pembeda */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 100}>
              <div className="h-full bg-bg-soft border border-line p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-ink/40 mb-3">
                    <span>0{idx + 1}</span>
                    <span className="text-ink/30">/</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
