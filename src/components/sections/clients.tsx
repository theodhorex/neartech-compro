import { contentId } from "@/content/id";

const WORDMARK_STYLES: Record<number, string> = {
  0: "font-sans font-bold tracking-wider uppercase text-xs sm:text-sm",
  1: "font-serif italic font-normal text-sm sm:text-base tracking-normal",
  2: "font-mono font-medium tracking-tight uppercase text-xs sm:text-sm",
  3: "font-serif font-normal text-sm sm:text-base tracking-wide",
  4: "font-sans font-semibold tracking-widest uppercase text-[11px] sm:text-xs",
  5: "font-sans font-medium tracking-tight text-sm sm:text-base",
};

export function ClientsSection() {
  const { note, items } = contentId.clients;
  // Gandakan item untuk marquee berulang mulus tanpa jeda
  const marqueeItems = [...items, ...items];

  return (
    <section
      aria-label="Klien dan Mitra"
      className="bg-bg border-b border-line py-10 sm:py-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] font-mono text-ink/50">
          {note}
        </p>
      </div>

      {/* Marquee Ticker */}
      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          tabIndex={0}
          aria-label="Daftar mitra kerja sama"
          className="animate-marquee flex items-center gap-10 sm:gap-16 py-2 px-4 focus-visible:outline-2 focus-visible:outline-ink"
        >
          {marqueeItems.map((name, idx) => {
            const styleIdx = idx % items.length;
            const style = WORDMARK_STYLES[styleIdx] ?? "font-sans font-medium text-sm";
            return (
              <div
                key={`${name}-${idx}`}
                className={`text-ink/60 hover:text-ink transition-colors whitespace-nowrap select-none flex items-center gap-8 ${style}`}
              >
                <span>{name}</span>
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-line shrink-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
