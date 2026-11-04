import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

type ValueItem = {
  num: string;
  title: string;
  description: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export async function AboutSection() {
  const t = await getTranslations("about");
  const label = t("label");
  const title = t("title");
  const paragraphs = t.raw("paragraphs") as string[];
  const valuesHeading = t("valuesHeading");
  const values = t.raw("values") as ValueItem[];
  const teamHeading = t("teamHeading");
  const team = t.raw("team") as TeamMember[];

  return (
    <section
      id="tentang"
      className="scroll-mt-24 py-20 md:py-32 border-b border-line bg-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Bagian Atas: Cerita & Nilai Kami (2 Kolom di Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Kolom Kiri: Judul dan Paragraf */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium">
                {label}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-ink">
                {title}
              </h2>
              <div className="mt-6 sm:mt-8 space-y-4 text-base sm:text-lg text-ink/75 leading-relaxed">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Kolom Kanan: Blok Nilai Kami */}
          <div className="lg:col-span-5 bg-bg-soft border border-line p-6 sm:p-8">
            <Reveal delay={150}>
              <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium block mb-6">
                {valuesHeading}
              </span>
              <div className="divide-y divide-line">
                {values.map((val) => (
                  <div key={val.num} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-mono text-ink/40">
                        {val.num}
                      </span>
                      <h3 className="text-base font-serif font-medium text-ink">
                        {val.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-ink/70 leading-relaxed pl-5">
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
          className="my-16 sm:my-20 h-px bg-line w-full"
          role="separator"
          aria-hidden="true"
        />

        {/* Tim Inti: 4 Kartu Tim (Tanpa Foto Palsu, Inisial Netral) */}
        <div>
          <Reveal>
            <span className="text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium block mb-8">
              {teamHeading}
            </span>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {team.map((member, idx) => (
              <Reveal key={member.name} delay={idx * 100}>
                <div className="border border-line p-6 bg-bg flex flex-col sm:flex-row items-start gap-4 h-full">
                  {/* Kotak Inisial Netral (tanpa foto palsu) */}
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-xs bg-bg-soft border border-line flex items-center justify-center font-mono text-xs font-medium text-ink/60 shrink-0"
                  >
                    {member.initials}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-serif font-medium text-lg text-ink">
                        {member.name}
                      </h3>
                    </div>
                    <p className="text-xs font-mono uppercase tracking-wider text-ink/60">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-ink/70 leading-relaxed pt-1">
                      {member.bio}
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
