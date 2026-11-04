import { ServiceRow } from "@/components/ui/service-row";
import type { ZoneKey } from "@/components/blueprint/use-pointer-loop";

const SERVICES: {
  num: string;
  label: string;
  href: string;
  zone: ZoneKey;
}[] = [
  { num: "01", label: "Strategi", href: "#layanan", zone: "strategi" },
  { num: "02", label: "Produk", href: "#layanan", zone: "produk" },
  { num: "03", label: "Rekayasa", href: "#layanan", zone: "rekayasa" },
];

export function InfoPanel() {
  return (
    <div data-hero-ui className="w-full max-w-5xl px-4 sm:px-6 z-10 animate-panel-up">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 border-b-0 pt-8 sm:pt-12 md:pt-16 px-5 sm:px-8 md:px-12 pb-0 shadow-sm">
        {/* Baris 1, 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-16 items-end">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              APA YANG KAMI KERJAKAN?
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
              Teknologi yang membantu{" "}
              <span className="sm:block">bisnis bergerak maju</span>
            </h2>
          </div>
          <div>
            <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed md:self-end">
              Kami merancang, membangun, dan merawat produk digital. Komunikasi
              langsung, proses yang jelas, dan hasil yang bisa diukur.
            </p>
          </div>
        </div>

        {/* Garis rambut */}
        <div
          className="mt-6 sm:mt-8 md:mt-10 h-px bg-gray-200 w-full"
          role="separator"
        />

        {/* Baris 2, tiga baris interaktif */}
        <div className="mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {SERVICES.map((item) => (
            <ServiceRow
              key={item.num}
              num={item.num}
              label={item.label}
              href={item.href}
              zone={item.zone}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
