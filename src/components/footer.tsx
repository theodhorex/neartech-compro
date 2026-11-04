import { Logo } from "@/components/logo";
import { ArrowUp } from "lucide-react";
import { contentId } from "@/content/id";

export function Footer() {
  const { tagline, nav, copyright, backToTop } = contentId.footer;

  return (
    <footer className="bg-[#F4F3F3] border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start pb-12 sm:pb-16 border-b border-gray-200">
          {/* Logo & Slogan */}
          <div className="md:col-span-7 space-y-3">
            <Logo />
            <p className="text-sm text-[#191919]/70 max-w-sm leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Kolom Tautan Navigasi (Jangkar) */}
          <div className="md:col-span-5 md:flex md:justify-end">
            <nav aria-label="Navigasi Footer" className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[#191919]/70 hover:text-[#191919] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-xs"
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
