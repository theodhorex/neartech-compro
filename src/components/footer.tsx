import { Logo } from "@/components/logo";
import { ArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const tFooter = await getTranslations("footer");
  const tDirect = await getTranslations("contact.direct");

  const navItems = [
    { href: "#layanan", label: tFooter("nav.services") },
    { href: "#pendekatan", label: tFooter("nav.approach") },
    { href: "#tentang", label: tFooter("nav.about") },
    { href: "#kontak", label: tFooter("nav.contact") },
  ];

  return (
    <footer className="bg-bg border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start pb-12 sm:pb-16 border-b border-line">
          {/* Logo & Slogan */}
          <div className="md:col-span-5 space-y-3">
            <Logo />
            <p className="text-sm text-ink/70 max-w-sm leading-relaxed">
              {tFooter("tagline")}
            </p>
          </div>

          {/* Rincian Kontak */}
          <div className="md:col-span-4 space-y-2 text-xs sm:text-sm text-ink/70">
            <span className="text-[11px] uppercase tracking-wider font-mono text-ink/50 block mb-2">
              {tFooter("contactTitle")}
            </span>
            <p>
              <a
                href={`mailto:${tDirect("email")}`}
                className="hover:text-ink transition-colors font-mono focus-visible:outline-2 focus-visible:outline-ink rounded-xs"
              >
                {tDirect("email")}
              </a>
            </p>
            <p>
              <a
                href={`tel:${tDirect("phone").replace(/\s+/g, "")}`}
                className="hover:text-ink transition-colors font-mono focus-visible:outline-2 focus-visible:outline-ink rounded-xs"
              >
                {tDirect("phone")}
              </a>
            </p>
            <p className="pt-1 text-ink/60 leading-relaxed">
              {tDirect("location")}
            </p>
            <p className="text-xs text-ink/50">
              {tDirect("hours")}
            </p>
          </div>

          {/* Kolom Tautan Navigasi (Jangkar) */}
          <div className="md:col-span-3 md:flex md:justify-end">
            <nav aria-label={tFooter("navAriaLabel")} className="flex flex-col gap-2.5">
              <span className="text-[11px] uppercase tracking-wider font-mono text-ink/50 block mb-1">
                {tFooter("menuTitle")}
              </span>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs sm:text-sm text-ink/70 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-xs"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Kembali ke Atas */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink/50">
          <span>{tFooter("copyright")}</span>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-ink/70 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-xs"
          >
            <span>{tFooter("backToTop")}</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
