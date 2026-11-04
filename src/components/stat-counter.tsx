"use client";

import { useEffect, useRef } from "react";

export function StatCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hormati pengaturan prefers-reduced-motion pengguna
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Set tampilan awal ke 0 sebelum mulai hitung naik
    el.textContent = `0${suffix}`;

    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animated) {
          animated = true;
          const duration = 1200; // ms
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic: cepat di awal lalu melambat halus di akhir
            const ease = 1 - Math.pow(1 - progress, 3);
            const val = Math.round(ease * value);
            if (el) {
              el.textContent = `${val}${suffix}`;
            }

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
