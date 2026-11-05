"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface TimelineRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pembungkus garis waktu: selama berada di viewport, kelas `is-running` dipasang
 * sehingga garis tersapu dari kiri ke kanan dan titik (.tl-dot-N) menyala
 * berurutan, bertahan, memudar, lalu berulang (looping). Gerak diatur penuh lewat CSS.
 */
export function TimelineReveal({ children, className = "" }: TimelineRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Berjalan hanya saat terlihat; keluar-masuk viewport memulai ulang siklus.
        setRunning(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`timeline ${running ? "is-running" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
