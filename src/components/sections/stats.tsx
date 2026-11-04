import { contentId } from "@/content/id";
import { StatCounter } from "@/components/stat-counter";

export function StatsSection() {
  const stats = contentId.stats;

  return (
    <section
      aria-label="Statistik Kinerja"
      className="bg-[#F4F3F3] border-b border-gray-200 py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col border-l border-gray-300 pl-4 sm:pl-6"
            >
              <span className="font-mono text-xs text-[#191919]/40 mb-1">
                0{idx + 1}
              </span>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#191919] tracking-tight">
                <StatCounter value={item.value} suffix={item.suffix} />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-[#191919]/70 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
