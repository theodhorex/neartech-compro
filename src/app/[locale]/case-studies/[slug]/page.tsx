import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { hasLocale, routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CASE_STUDY_SLUGS, caseStudyIndex } from "@/lib/case-studies";
import { CaseStudySchematic } from "@/components/sections/case-study-schematic";
import { LogoIcon } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

type Detail = {
  num: string;
  title: string;
  industry: string;
  result: string;
  services: string[];
  summary: string;
  client: string;
  duration: string;
  challengeDetail: string;
  solution: { title: string; description: string }[];
  metrics: { value: string; label: string }[];
  stack: string[];
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CASE_STUDY_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const idx = caseStudyIndex(slug);
  if (!hasLocale(locale) || idx < 0) return {};

  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const item = t.raw("items")[idx] as Detail;

  return {
    title: `${item.title} | NearTech`,
    description: item.summary,
    alternates: {
      canonical: `/${locale}/case-studies/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/case-studies/${slug}`])
      ),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const idx = caseStudyIndex(slug);
  if (!hasLocale(locale) || idx < 0) notFound();

  setRequestLocale(locale);
  const t = await getTranslations("caseStudies");
  const items = t.raw("items") as Detail[];
  const item = items[idx];
  const next = items[(idx + 1) % items.length];
  const nextSlug = CASE_STUDY_SLUGS[(idx + 1) % items.length];
  const tc = await getTranslations("common");
  const tf = await getTranslations("footer");

  const metaRows = [
    { label: t("detail.client"), value: item.client },
    { label: t("detail.duration"), value: item.duration },
    { label: t("detail.services"), value: item.services.join(" · ") },
  ];

  return (
    <>
      <header className="border-b border-line bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            aria-label={tc("logoAriaLabel")}
            className="inline-flex items-center gap-2.5 text-ink rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <LogoIcon className="w-6 h-6 shrink-0" />
            <span className="font-semibold text-base tracking-tight">NearTech</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20 md:pb-28">
          <Link
            href="/#studi-kasus"
            className="inline-flex items-center gap-2 text-sm text-ink/70 hover:text-ink transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {t("detail.back")}
          </Link>

          {/* Kepala */}
          <Reveal>
            <div className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-mono tracking-wider text-ink/50">
                <span>{item.num} /</span>
                <span className="uppercase">{item.industry}</span>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-ink">
                {item.title}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-ink/70 leading-relaxed">
                {item.summary}
              </p>
            </div>
          </Reveal>

          {/* Skematik + info meta */}
          <Reveal delay={100}>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-7 bg-bg-soft/50 border border-dashed border-line p-6 sm:p-10 flex items-center justify-center">
                <CaseStudySchematic index={idx} className="w-full h-40 sm:h-52 text-ink/40" />
              </div>
              <dl className="lg:col-span-5 border border-line divide-y divide-line bg-bg">
                {metaRows.map((row) => (
                  <div key={row.label} className="px-5 py-4">
                    <dt className="text-[10px] uppercase tracking-wider font-mono text-ink/50">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Tantangan */}
          <Reveal>
            <section className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 border-t border-line pt-10">
              <h2 className="lg:col-span-4 text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
                {t("detail.challenge")}
              </h2>
              <p className="lg:col-span-8 text-base sm:text-lg text-ink/80 leading-relaxed">
                {item.challengeDetail}
              </p>
            </section>
          </Reveal>

          {/* Solusi */}
          <section className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 border-t border-line pt-10">
            <h2 className="lg:col-span-4 text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
              {t("detail.solution")}
            </h2>
            <div className="lg:col-span-8 space-y-8">
              {item.solution.map((step, i) => (
                <Reveal key={step.title} delay={i * 100}>
                  <div className="flex gap-5">
                    <span className="text-xs font-mono text-ink/40 pt-1.5 shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-serif font-normal text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-ink/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Hasil */}
          <section className="mt-12 sm:mt-16 border-t border-line pt-10">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
              {t("detail.results")}
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line">
              {item.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 100} className="bg-bg">
                  <div className="p-6 sm:p-8 h-full">
                    <div className="font-serif text-3xl sm:text-4xl text-ink">{m.value}</div>
                    <p className="mt-2 text-sm text-ink/70 leading-snug">{m.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Teknologi */}
          <section className="mt-12 sm:mt-16 border-t border-line pt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium sm:w-1/3">
              {t("detail.stack")}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <li
                  key={tech}
                  className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 bg-bg-soft text-ink/70 border border-line"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Studi kasus berikutnya */}
          <Link
            href={`/case-studies/${nextSlug}`}
            className="group mt-16 sm:mt-20 flex items-center justify-between gap-6 border border-line bg-bg-soft p-6 sm:p-8 hover:border-ink/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-ink/50">
                {t("detail.next")}
              </span>
              <p className="mt-1 font-serif text-xl sm:text-2xl text-ink">{next.title}</p>
            </div>
            <ArrowRight
              className="w-5 h-5 shrink-0 text-ink/60 group-hover:text-ink group-hover:translate-x-1 transition-all duration-200"
              aria-hidden="true"
            />
          </Link>

          {/* CTA */}
          <div className="mt-16 sm:mt-20 text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-ink">
              {t("detail.ctaTitle")}
            </h2>
            <p className="mt-3 text-ink/70 leading-relaxed">{t("detail.ctaText")}</p>
            <div className="mt-6">
              <Button href={`/${locale}#kontak`}>{t("detail.ctaButton")}</Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-line bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-xs text-ink/50">
          {tf("copyright")}
        </div>
      </footer>
    </>
  );
}
