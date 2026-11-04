import { Logo } from "@/components/logo";
import { ArrowUp } from "lucide-react";
import { contentId } from "@/content/id";

export function Footer() {
  const { tagline, nav, copyright, backToTop } = contentId.footer;
  const { email, phone, location, hours } = contentId.contact.direct;

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-gray-200">
          {/* Logo & Slogan */}
          <div className="md:col-span-5 space-y-3">
            <Logo />
            <p className="text-sm text-[#191919]/70 max-w-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Rincian Kontak */}
          <div className="md:col-span-4 space-y-2 text-xs sm:text-sm text-[#191919]/70">
            <span className="text-[11px] uppercase tracking-wider font-mono text-[#191919]/50 block mb-2">
              Kontak
            </span>
            <p>
              <a
                href={`mailto:${email}`}
                className="hover:text-[#191919] transition-colors font-mono focus-visible:outline-2 focus-visible:outline-[#191919] rounded-xs"
              >
                {email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="hover:text-[#191919] transition-colors font-mono focus-visible:outline-2 focus-visible:outline-[#191919] rounded-xs"
              >
                {phone}
              </a>
            </p>
            <p className="pt-1 text-[#191919]/60 leading-relaxed">
              {location}
            </p>
            <p className="text-xs text-[#191919]/50">
              {hours}
            </p>
          </div>

          {/* Kolom Tautan Navigasi (Jangkar) */}
          <div className="md:col-span-3 md:flex md:justify-end">
            <nav aria-label="Navigasi Footer" className="flex flex-col gap-2.5">
              <span className="text-[11px] uppercase tracking-wider font-mono text-[#191919]/50 block mb-1">
                Menu
              </span>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs sm:text-sm text-[#191919]/70 hover:text-[#191919] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-xs"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Kembali ke Atas */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#191919]/50">
          <span>{copyright}</span>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[#191919]/70 hover:text-[#191919] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-xs"
          >
            <span>{backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
