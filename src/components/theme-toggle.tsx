"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        aria-label="Ganti tema"
        className={`w-9 h-9 inline-flex items-center justify-center rounded-md opacity-0 pointer-events-none ${className}`.trim()}
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const currentTheme = theme || "light";
  const labelText =
    currentTheme === "dark"
      ? "Ganti tema (saat ini Gelap)"
      : currentTheme === "system"
        ? "Ganti tema (saat ini Sistem)"
        : "Ganti tema (saat ini Terang)";

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
