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

// Penghitung waktu bersama semua baris (hanya satu "keluar" tertunda pada satu waktu).
let leaveTimer: number | undefined;

export function ServiceRow({ num, label, href, zone }: ServiceRowProps) {
  const [isArtActive, setIsArtActive] = useState(false);

  useEffect(() => {
    const handleZone = (e: Event) => {
      const customEvent = e as CustomEvent<{ zone: ZoneKey | null; source: "art" | "ui" }>;
      if (customEvent.detail?.source === "art") {
        setIsArtActive(customEvent.detail.zone === zone);
      } else if (customEvent.detail?.zone && customEvent.detail.zone !== zone) {
        // Baris lain sedang di-hover: lepas status "dari gambar" yang tertinggal.
        setIsArtActive(false);
      }
    };

    window.addEventListener("nt:zone", handleZone);
    return () => window.removeEventListener("nt:zone", handleZone);
  }, [zone]);

  const emitUiZone = (targetZone: ZoneKey | null) => {
    // Saat kursor berpindah antar baris, "keluar" dari baris lama terjadi sebelum
    // "masuk" baris baru. Tunda sinyal keluar sebentar dan batalkan bila baris
    // lain keburu aktif, supaya latar tidak berkedip memudar-lalu-muncul.
    window.clearTimeout(leaveTimer);
    const send = () =>
      window.dispatchEvent(
        new CustomEvent("nt:zone", {
          detail: { zone: targetZone, source: "ui" },
        })
      );
    if (targetZone === null) {
      leaveTimer = window.setTimeout(send, 60);
    } else {
      send();
    }
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
      className={`group relative flex items-center justify-between transition-all duration-200 cursor-pointer px-4 sm:px-6 py-3.5 sm:py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        isArtActive ? "bg-bg-soft-hover" : "bg-bg-soft hover:bg-bg-soft-hover"
      }`}
    >
      <div className="flex items-center text-sm sm:text-base">
        <span className="text-ink/40">{num}</span>
        <span className="mx-2 text-ink/30">/</span>
        <span className="font-medium text-ink">{label}</span>
      </div>
      <ArrowRight
        className={`w-4 h-4 transition-all duration-200 shrink-0 ${
          isArtActive
            ? "text-ink translate-x-0.5"
            : "text-ink-faint group-hover:text-ink group-hover:translate-x-0.5"
        }`}
      />
      <span
        aria-hidden="true"
        style={isArtActive ? { transform: "scaleX(1)" } : undefined}
        className="feature-underline absolute bottom-0 left-0 right-0 h-0.5 bg-ink pointer-events-none"
      />
    </a>
  );
}
