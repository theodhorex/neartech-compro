import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";

export function WhyUsSection() {
  const { label, title, paragraph, items } = contentId.whyUs;

  return (
    <section className="py-20 md:py-32 bg-[#F4F3F3] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              {label}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
              {title}
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#191919]/70 leading-relaxed">
              {paragraph}
            </p>
          </div>
        </Reveal>

        {/* Grid 2x2 Nilai Pembeda */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 100}>
              <div className="h-full bg-white border border-gray-200/90 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#191919]/40 mb-3">
                    <span>0{idx + 1}</span>
                    <span className="text-gray-300">/</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#191919]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#191919]/70 leading-relaxed">
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
