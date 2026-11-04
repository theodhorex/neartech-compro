import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";

export function AboutSection() {
  const { label, title, paragraphs, valuesHeading, values, team } =
    contentId.about;

  return (
    <section
      id="tentang"
      className="scroll-mt-24 py-20 md:py-32 border-b border-gray-200 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Bagian Atas: Cerita & Nilai Kami (2 Kolom di Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kolom Kiri: Judul dan Paragraf */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                {label}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
                {title}
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4 text-base sm:text-lg text-[#191919]/75 leading-relaxed">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Kolom Kanan: Blok Nilai Kami */}
          <div className="lg:col-span-5 bg-[#F4F3F3] border border-gray-200/80 p-6 sm:p-8">
            <Reveal delay={150}>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium block mb-6">
                {valuesHeading}
              </span>
              <div className="divide-y divide-gray-200/80">
                {values.map((val) => (
                  <div key={val.num} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-[#191919]/40">
                        {val.num}
                      </span>
                      <h3 className="text-base font-serif font-medium text-[#191919]">
                        {val.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-[#191919]/70 leading-relaxed pl-5">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Garis Pemisah Menuju Tim */}
        <div
          className="my-16 sm:my-20 h-px bg-gray-200 w-full"
          role="separator"
          aria-hidden="true"
        />

        {/* Tim Pendiri: Kartu Placeholder Jujur (Tanpa Klaim Palsu) */}
        <div>
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium block mb-8">
              TIM PENDIRI
            </span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {team.map((member, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="border border-gray-200 p-6 bg-white flex items-center gap-4">
                  {/* Kotak Inisial Netral (tanpa foto palsu) */}
                  <div
                    aria-hidden="true"
                    className="w-14 h-14 rounded-xs bg-[#F4F3F3] border border-gray-200 flex items-center justify-center font-mono text-xs text-[#191919]/40 shrink-0"
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-medium text-base text-[#191919]">
                      {member.role}
                    </h3>
                    <p className="text-xs text-[#191919]/50 font-mono mt-0.5">
                      {member.placeholderText}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
