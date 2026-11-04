import { getTranslations } from "next-intl/server";
import { StatCounter } from "@/components/stat-counter";

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

export async function StatsSection() {
  const t = await getTranslations("stats");
  const stats = t.raw("items") as StatItem[];

  return (
    <section
      aria-label={t("ariaLabel")}
      className="bg-bg-soft border-b border-line py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col border-l border-line pl-4 sm:pl-6"
            >
              <span className="font-mono text-xs text-ink/40 mb-1">
                0{idx + 1}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-ink tracking-tight">
                <StatCounter value={item.value} suffix={item.suffix} />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-ink/70 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
