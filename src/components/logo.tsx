"use client";

import { useTranslations } from "next-intl";

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" fillOpacity="0.55" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  const t = useTranslations("common");

  return (
    <a
      href="#"
      aria-label={t("logoAriaLabel")}
      className={`inline-flex items-center gap-2.5 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink rounded-sm ${className}`.trim()}
    >
      <LogoIcon className="w-6 h-6 text-ink shrink-0" />
      <span className="font-semibold text-base tracking-tight text-ink">
        NearTech
      </span>
    </a>
  );
}
