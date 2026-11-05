"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const t = useTranslations("themeToggle");
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  const cycleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const next =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextResolved = next === "system" ? (prefersDark ? "dark" : "light") : next;
    const currentResolved =
      document.documentElement.getAttribute("data-theme") ?? "light";

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Tanpa dukungan View Transitions, gerak dikurangi, atau tampilan tidak
    // berubah (mis. system -> light saat OS sudah terang): ganti langsung.
    if (
      !document.startViewTransition ||
      reduceMotion ||
      nextResolved === currentResolved
    ) {
      setTheme(next);
      return;
    }

    // Lingkaran mengembang dari titik tombol sampai menutupi sudut terjauh.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Tepi lingkaran dibuat lembut (feather) lewat mask, bukan potongan keras.
    const feather = 120;
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);

    const transition = document.startViewTransition(() => {
      // Atribut diatur langsung agar snapshot "baru" pasti sudah bertema baru,
      // lalu state next-themes disinkronkan.
      root.setAttribute("data-theme", nextResolved);
      root.style.colorScheme = nextResolved;
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        root.animate(
          { "--vt-r": ["0px", `${radius + feather}px`] },
          {
            duration: 900,
            easing: "cubic-bezier(0.45, 0, 0.15, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {});
  };

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        aria-label={t("changeTheme")}
        className={`w-9 h-9 inline-flex items-center justify-center rounded-md opacity-0 pointer-events-none ${className}`.trim()}
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const currentTheme = theme || "light";
  const labelText =
    currentTheme === "dark"
      ? t("currentDark")
      : currentTheme === "system"
        ? t("currentSystem")
        : t("currentLight");

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={labelText}
      title={labelText}
      className={`relative w-9 h-9 inline-flex items-center justify-center rounded-md text-ink hover:text-ink hover:bg-bg-soft transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`.trim()}
    >
      <Sun
        className={`w-4 h-4 transition-all duration-200 ${
          currentTheme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "absolute -rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        className={`w-4 h-4 transition-all duration-200 ${
          currentTheme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "absolute rotate-90 scale-0 opacity-0"
        }`}
      />
      <Monitor
        className={`w-4 h-4 transition-all duration-200 ${
          currentTheme === "system"
            ? "rotate-0 scale-100 opacity-100"
            : "absolute rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
