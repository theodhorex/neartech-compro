"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ZoneKey } from "@/components/blueprint/use-pointer-loop";

interface ServiceRowProps {
  num: string;
  label: string;
  href: string;
  zone: ZoneKey;
}

export function ServiceRow({ num, label, href, zone }: ServiceRowProps) {
  const [isArtActive, setIsArtActive] = useState(false);

  useEffect(() => {
    const handleZone = (e: Event) => {
      const customEvent = e as CustomEvent<{ zone: ZoneKey | null; source: "art" | "ui" }>;
      if (customEvent.detail?.source === "art") {
        setIsArtActive(customEvent.detail.zone === zone);
      }
    };

    window.addEventListener("nt:zone", handleZone);
    return () => window.removeEventListener("nt:zone", handleZone);
  }, [zone]);

  const emitUiZone = (targetZone: ZoneKey | null) => {
    window.dispatchEvent(
      new CustomEvent("nt:zone", {
        detail: { zone: targetZone, source: "ui" },
      })
    );
  };

  return (
    <a
      href={href}
      aria-label={`Layanan ${num}: ${label}`}
      aria-current={isArtActive ? "true" : undefined}
      onPointerEnter={() => emitUiZone(zone)}
      onPointerLeave={() => emitUiZone(null)}
      onFocus={() => emitUiZone(zone)}
      onBlur={() => emitUiZone(null)}
      className={`group relative flex items-center justify-between transition-all duration-200 cursor-pointer px-4 sm:px-6 py-3.5 sm:py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] ${
        isArtActive ? "bg-[#eaeaea]" : "bg-[#F4F3F3] hover:bg-[#eaeaea]"
      }`}
    >
      <div className="flex items-center text-sm sm:text-base">
        <span className="text-[#191919]/40">{num}</span>
        <span className="mx-2 text-[#191919]/30">/</span>
        <span className="font-medium text-[#191919]">{label}</span>
      </div>
      <ArrowRight
        className={`w-4 h-4 transition-all duration-200 shrink-0 ${
          isArtActive
            ? "text-gray-700 translate-x-0.5"
            : "text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5"
        }`}
      />
      <span
        aria-hidden="true"
        style={isArtActive ? { transform: "scaleX(1)" } : undefined}
        className="feature-underline absolute bottom-0 left-0 right-0 h-0.5 bg-[#191919] pointer-events-none"
      />
    </a>
  );
}
