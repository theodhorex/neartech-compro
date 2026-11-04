"use client";

import { useEffect, useRef, useState } from "react";

interface ServiceTab {
  id: string;
  label: string;
  cmd: string;
}

const TABS: ServiceTab[] = [
  {
    id: "strategi",
    label: "Strategi",
    cmd: "Menyusun peta jalan digital yang terukur.",
  },
  {
    id: "produk",
    label: "Produk",
    cmd: "Merancang produk bernilai tinggi untuk pengguna.",
  },
  {
    id: "rekayasa",
    label: "Rekayasa",
    cmd: "Membangun arsitektur teknologi andal dan cepat.",
  },
  {
    id: "dukungan",
    label: "Dukungan",
    cmd: "Pendampingan sistem berkelanjutan pasca rilis.",
  },
];

export function HeroTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayText, setDisplayText] = useState(TABS[0].cmd);
  const [isSwapping, setIsSwapping] = useState(false);
  const swapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    return () => {
      if (swapTimeoutRef.current) {
        clearTimeout(swapTimeoutRef.current);
      }
    };
  }, []);

  const selectTab = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsSwapping(true);

    if (swapTimeoutRef.current) {
      clearTimeout(swapTimeoutRef.current);
    }

    swapTimeoutRef.current = setTimeout(() => {
      setDisplayText(TABS[index].cmd);
      setIsSwapping(false);
    }, 160);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = -1;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        targetIndex = (currentIndex + 1) % TABS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        targetIndex = (currentIndex - 1 + TABS.length) % TABS.length;
        break;
      case "Home":
        e.preventDefault();
        targetIndex = 0;
        break;
      case "End":
        e.preventDefault();
        targetIndex = TABS.length - 1;
        break;
      default:
        return;
    }

    if (targetIndex >= 0) {
      tabRefs.current[targetIndex]?.focus();
      selectTab(targetIndex);
    }
  };

  return (
    <>
      <div className="tabs rise" role="tablist" aria-label="Layanan NearTech">
        {TABS.map((tab, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <span key={tab.id} className="inline-flex items-center gap-2">
              <button
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls="cmd-panel"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                data-cmd={tab.cmd}
                className="tab"
                onClick={() => selectTab(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                {tab.label}
              </button>
              {idx < TABS.length - 1 && (
                <span className="dot" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          );
        })}
      </div>

      <div
        id="cmd-panel"
        role="tabpanel"
        aria-labelledby={`tab-${TABS[activeIndex].id}`}
        className="cmd rise"
      >
        <span
          id="cmd"
          className={`cmd-text${isSwapping ? " swap" : ""}`}
        >
          {displayText}
        </span>
        <a href="#kontak" className="copy-btn">
          Hubungi kami →
        </a>
      </div>
    </>
  );
}
