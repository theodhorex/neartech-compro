"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#layanan", label: "Layanan" },
  { href: "#pendekatan", label: "Pendekatan" },
  { href: "#tentang", label: "Tentang" },
  { href: "#kontak", label: "Kontak" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 animate-nav-down ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Navigasi Utama"
        className="w-full px-6 sm:px-10 md:px-14 py-4 sm:py-5 flex items-center justify-between"
      >
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#191919]/70 hover:text-[#191919] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center">
          <Button href="#kontak" size="sm" aria-label="Hubungi Kami">
            Hubungi Kami
          </Button>
        </div>
      </nav>
    </header>
  );
}
