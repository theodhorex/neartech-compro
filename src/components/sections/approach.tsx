import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";

export function ApproachSection() {
  const { label, title, intro, steps, principles } = contentId.approach;

  return (
    <section
      id="pendekatan"
      className="scroll-mt-24 py-20 md:py-32 border-b border-line bg-bg"
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

        {/* Garis Waktu 4 Langkah (Blueprint Timeline) */}
        <div className="mt-16 sm:mt-20">
          {/* Garis penghubung mendatar di desktop */}
          <div className="hidden lg:block relative mb-8">
            <div
              className="absolute top-2.5 left-0 right-0 h-px bg-line"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 relative">
            {steps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 100}>
                <div className="relative pl-6 lg:pl-0 border-l lg:border-l-0 border-line lg:border-none">
                  {/* Titik jangkar timeline (motif blueprint) */}
                  <div
                    className="absolute -left-[5px] top-1 lg:static lg:mb-4 w-2.5 h-2.5 rounded-full border-2 border-bg bg-ink ring-2 ring-line"
                    aria-hidden="true"
                  />

                  {/* Nomor Langkah */}
                  <div className="flex items-center text-xs tracking-wider text-ink/40 font-mono mb-2">
                    <span>{step.num}</span>
                    <span className="mx-1.5 text-ink/30">/</span>
                  </div>

                  {/* Judul & Deskripsi */}
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-ink/70 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Kotak Hasil (Blueprint Deliverable) */}
                  <div className="mt-4 pt-3 border-t border-dashed border-line">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-ink/50 block">
                      Hasil
                    </span>
                    <span className="text-xs font-medium text-ink/80 mt-0.5 block leading-snug">
                      {step.result}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 3 Prinsip dalam baris kecil */}
        <Reveal delay={200}>
          <div className="mt-16 sm:mt-24 pt-10 sm:pt-12 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {principles.map((principle) => (
              <div key={principle.title} className="space-y-1.5">
                <h4 className="font-medium text-sm text-ink">
                  {principle.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
