"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LOCALE_LABELS: Record<Locale, string> = {
  id: "Indonesia",
  en: "English",
  zh: "简体中文",
  "zh-TW": "繁體中文 (台灣)",
  ko: "한국어",
};

interface LanguageSwitcherProps {
  className?: string;
  dropDirection?: "down" | "up";
}

export function LanguageSwitcher({
  className = "",
  dropDirection = "down",
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const locales = routing.locales;

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Atur fokus saat navigasi keyboard
  useEffect(() => {
    if (isOpen && activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  const selectLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    setIsOpen(false);
    triggerRef.current?.focus();

    // Pertahankan hash URL saat berganti bahasa
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";

    startTransition(() => {
      router.replace(
        currentHash ? `${pathname}${currentHash}` : pathname,
        { locale }
      );
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
        const idx = locales.indexOf(currentLocale);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % locales.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + locales.length) % locales.length);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(locales.length - 1);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative inline-block text-left ${className}`.trim()}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={t("label")}
        onClick={() => {
          setIsOpen((prev) => {
            const next = !prev;
            if (next) {
              const idx = locales.indexOf(currentLocale);
              setActiveIndex(idx >= 0 ? idx : 0);
            }
            return next;
          });
        }}
        disabled={isPending}
        className="h-9 px-3 inline-flex items-center gap-1.5 rounded-md border border-line bg-bg text-xs font-medium text-ink hover:bg-bg-soft transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-ink/60" aria-hidden="true" />
        <span className="font-mono tracking-tight">{LOCALE_LABELS[currentLocale]}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-ink/40 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={t("label")}
          className={`absolute ${
            dropDirection === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } right-0 z-50 w-44 rounded-md border border-line bg-bg py-1 shadow-lg backdrop-blur-md animate-fade-in focus:outline-none`}
        >
          {locales.map((locale, index) => {
            const isSelected = locale === currentLocale;
            return (
              <button
                key={locale}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="menuitem"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => selectLocale(locale)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                  isSelected
                    ? "font-medium text-ink bg-bg-soft"
                    : "text-ink/80 hover:bg-bg-soft hover:text-ink focus:bg-bg-soft focus:text-ink outline-none"
                }`}
              >
                <span>{LOCALE_LABELS[locale]}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
