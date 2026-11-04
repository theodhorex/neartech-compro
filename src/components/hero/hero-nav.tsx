"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function HeroNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  // Focus restore & scroll lock & escape listener
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus close button on open
      closeButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setIsOpen(false);
          return;
        }

        // Focus trap
        if (e.key === "Tab" && overlayRef.current) {
          const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusables.length === 0) return;

          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="nav">
      <div className="brand">
        <Link href="/" className="brand" aria-label="NearTech Beranda">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3 22 20H2z" />
          </svg>
          <span className="brand-slash">/</span>
          <span className="brand-name">neartech</span>
        </Link>
        <nav className="links" aria-label="Navigasi utama">
          <a href="#tentang">Tentang</a>
          <a href="#layanan">Layanan</a>
        </nav>
      </div>

      <div className="right">
        {/* slot: language-switcher, theme-toggle */}
        <a href="#kontak" className="ask">
          Hubungi kami
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="icon-btn menu"
          aria-label="Buka menu"
          aria-expanded={isOpen}
          aria-controls="mobile-overlay"
          onClick={() => setIsOpen(true)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          ref={overlayRef}
          id="mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="mobile-overlay"
        >
          <div className="mobile-overlay-header">
            <Link
              href="/"
              className="brand"
              onClick={closeMenu}
              aria-label="NearTech Beranda"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3 22 20H2z" />
              </svg>
              <span className="brand-slash">/</span>
              <span className="brand-name">neartech</span>
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="icon-btn"
              aria-label="Tutup menu"
              onClick={closeMenu}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mobile-overlay-nav" aria-label="Navigasi mobile">
            <a
              href="#tentang"
              className="mobile-overlay-link"
              onClick={closeMenu}
            >
              Tentang
            </a>
            <a
              href="#layanan"
              className="mobile-overlay-link"
              onClick={closeMenu}
            >
              Layanan
            </a>
            <a
              href="#kontak"
              className="mobile-overlay-link"
              onClick={closeMenu}
            >
              Hubungi kami
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
