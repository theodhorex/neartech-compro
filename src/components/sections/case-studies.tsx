import { ArrowRight } from "lucide-react";
import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";

function SchematicSvg({ index }: { index: number }) {
  if (index === 0) {
    // Rantai Pasok & Logistik: Diagram rute & titik armada
    return (
      <svg
        viewBox="0 0 280 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-24 text-[#191919]/30"
        aria-hidden="true"
      >
        <line x1="20" y1="20" x2="260" y2="20" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="20" y1="60" x2="260" y2="60" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="20" y1="100" x2="260" y2="100" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="140" y1="10" x2="140" y2="110" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="220" y1="10" x2="220" y2="110" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        {/* Rute vektor */}
        <polyline
          points="40,80 90,40 160,70 240,30"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#191919]/70"
        />
        <circle cx="40" cy="80" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-[#191919]" />
        <circle cx="90" cy="40" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-[#191919]" />
        <circle cx="160" cy="70" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-[#191919]" />
        <circle cx="240" cy="30" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-[#191919]" />
        <text x="44" y="94" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-[#191919]/50">NODE-A</text>
        <text x="220" y="24" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-[#191919]/50">NODE-B</text>
      </svg>
    );
  }

  if (index === 1) {
    // Portofolio Finansial: Sumbu analitik & grafik performa bertingkat
    return (
      <svg
        viewBox="0 0 280 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-24 text-[#191919]/30"
        aria-hidden="true"
      >
        <line x1="30" y1="105" x2="260" y2="105" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="15" x2="30" y2="105" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="45" x2="260" y2="45" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="30" y1="75" x2="260" y2="75" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        {/* Garis tren analitik */}
        <path
          d="M 30 95 Q 80 80, 110 65 T 180 50 T 250 25"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#191919]/70"
        />
        <rect x="245" y="20" width="10" height="10" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-[#191919]" />
        <text x="36" y="26" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-[#191919]/50">INDEX +240%</text>
        <text x="210" y="115" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-[#191919]/50">Q4 METRIC</text>
      </svg>
    );
  }

  // Pengadaan B2B: Diagram skematik modul dan aliran verifikasi
  return (
    <svg
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-24 text-[#191919]/30"
      aria-hidden="true"
    >
      <rect x="25" y="35" width="55" height="45" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-[#191919]/70" />
      <rect x="110" y="35" width="60" height="45" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-[#191919]/70" />
      <rect x="200" y="35" width="55" height="45" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-[#191919]/70" />
      <line x1="80" y1="58" x2="110" y2="58" stroke="currentColor" strokeWidth="1.2" />
      <line x1="170" y1="58" x2="200" y2="58" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="108,55 113,58 108,61" fill="currentColor" className="text-[#191919]/70" />
      <polygon points="198,55 203,58 198,61" fill="currentColor" className="text-[#191919]/70" />
      <text x="35" y="60" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-[#191919]/60">INPUT</text>
      <text x="120" y="60" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-[#191919]/60">VERIFY</text>
      <text x="212" y="60" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-[#191919]/60">OUTPUT</text>
      <line x1="25" y1="95" x2="255" y2="95" stroke="currentColor" strokeDasharray="3 3" strokeWidth="0.8" />
      <text x="25" y="107" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-[#191919]/40">AUTO-PIPELINE 0.8s</text>
    </svg>
  );
}

export function CaseStudiesSection() {
  const { label, title, intro, items } = contentId.caseStudies;

  return (
    <section
      id="studi-kasus"
      className="scroll-mt-24 py-20 md:py-32 border-b border-gray-200 bg-[#F4F3F3]"
    >
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
              {intro}
            </p>
          </div>
        </Reveal>

        {/* 3 Kartu Studi Kasus Bergaya Blueprint */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((project, idx) => (
            <Reveal key={project.num} delay={idx * 120}>
              <div
                tabIndex={0}
                className="group relative h-full flex flex-col justify-between bg-white border border-gray-200 p-6 sm:p-8 hover:-translate-y-1 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] transition-all duration-300"
              >
                <div>
                  {/* Header Kartu: Nomor & Industri */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-xs font-mono tracking-wider text-[#191919]/50">
                      {project.num} /
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-mono text-[#191919]/60">
                      {project.industry}
                    </span>
                  </div>

                  {/* Skematik Garis Vektor Dekoratif (Tanpa Foto) */}
                  <div className="my-5 py-3 px-2 bg-[#F4F3F3]/50 border border-dashed border-gray-200 flex items-center justify-center">
                    <SchematicSvg index={idx} />
                  </div>

                  {/* Judul & Tantangan */}
                  <h3 className="text-xl font-serif font-normal text-[#191919] group-hover:text-black transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#191919]/70 leading-relaxed">
                    {project.challenge}
                  </p>

                  {/* Hasil Terukur */}
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-[#191919]/50 block">
                      Hasil Nyata
                    </span>
                    <p className="mt-1 font-serif text-base font-medium text-[#191919]">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* Footer Kartu: Tag Layanan & Panah Geser */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#F4F3F3] text-[#191919]/70 border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-[#191919]/60 group-hover:text-[#191919] group-hover:translate-x-1 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Garis bawah animasi hover/fokus */}
                <span
                  aria-hidden="true"
                  className="feature-underline absolute bottom-0 left-0 right-0 h-0.5 bg-[#191919] pointer-events-none"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
