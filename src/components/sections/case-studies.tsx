import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import { CaseStudySchematic } from "@/components/sections/case-study-schematic";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";

type CaseStudyItem = {
  num: string;
  title: string;
  industry: string;
  challenge: string;
  result: string;
  services: string[];
};

export async function CaseStudiesSection() {
  const t = await getTranslations("caseStudies");
  const label = t("label");
  const title = t("title");
  const intro = t("intro");
  const resultLabel = t("resultLabel");
  const items = t.raw("items") as CaseStudyItem[];
  const openCase = t("detail.openCase");

  return (
    <section
      id="studi-kasus"
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

        {/* 3 Kartu Studi Kasus Bergaya Blueprint */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((project, idx) => (
            <Reveal key={project.num} delay={idx * 120}>
              <Link
                href={`/case-studies/${CASE_STUDY_SLUGS[idx]}`}
                aria-label={`${openCase}: ${project.title}`}
                className="group relative h-full flex flex-col justify-between bg-bg border border-line p-6 sm:p-8 hover:-translate-y-1 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-all duration-300"
              >
                <div>
                  {/* Header Kartu: Nomor & Industri */}
                  <div className="flex items-center justify-between pb-4 border-b border-line">
                    <span className="text-xs font-mono tracking-wider text-ink/50">
                      {project.num} /
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-mono text-ink/60">
                      {project.industry}
                    </span>
                  </div>

                  {/* Skematik Garis Vektor Dekoratif (Tanpa Foto) */}
                  <div className="my-5 py-3 px-2 bg-bg-soft/50 border border-dashed border-line flex items-center justify-center">
                    <CaseStudySchematic index={idx} />
                  </div>

                  {/* Judul & Tantangan */}
                  <h3 className="text-xl font-serif font-normal text-ink group-hover:text-ink transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-ink/70 leading-relaxed">
                    {project.challenge}
                  </p>

                  {/* Hasil Terukur */}
                  <div className="mt-5 pt-4 border-t border-line">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-ink/50 block">
                      {resultLabel}
                    </span>
                    <p className="mt-1 font-serif text-base font-medium text-ink">
                      {project.result}
                    </p>
                  </div>
                </div>

                {/* Footer Kartu: Tag Layanan & Panah Geser */}
                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-bg-soft text-ink/70 border border-line"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-ink/60 group-hover:text-ink group-hover:translate-x-1 transition-all duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Garis bawah animasi hover/fokus */}
                <span
                  aria-hidden="true"
                  className="feature-underline absolute bottom-0 left-0 right-0 h-0.5 bg-ink pointer-events-none"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
