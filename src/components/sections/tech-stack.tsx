import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";

export function TechStackSection() {
  const { label, title, description, items } = contentId.techStack;

  return (
    <section
      aria-label="Fondasi Teknologi"
      className="py-16 sm:py-20 border-b border-gray-200 bg-[#F4F3F3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Label & Penjelasan Singkat */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                {label}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-normal text-[#191919] tracking-tight">
                {title}
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#191919]/70 leading-relaxed">
                {description}
              </p>
            </Reveal>
          </div>

          {/* Kolom Kanan: Lencana Teks Teknologi Tanpa Logo Merek */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div
                role="list"
                aria-label="Daftar teknologi yang digunakan"
                className="flex flex-wrap items-center gap-2.5 sm:gap-3"
              >
                {items.map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="inline-flex items-center px-3.5 py-2 bg-white border border-gray-200 text-xs sm:text-sm font-mono text-[#191919]/80 select-none hover:border-[#191919] hover:text-[#191919] transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[#191919]/30 mr-2 shrink-0"
                    />
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
