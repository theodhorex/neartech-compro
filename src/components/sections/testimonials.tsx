"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { contentId } from "@/content/id";
import { Reveal } from "@/components/ui/reveal";

export function TestimonialsSection() {
  const { label, title, items } = contentId.testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((current) =>
      current === 0 ? items.length - 1 : current - 1
    );
  };

  const next = () => {
    setCurrentIndex((current) =>
      current === items.length - 1 ? 0 : current + 1
    );
  };

  const activeItem = items[currentIndex];

  return (
    <section
      aria-label="Testimoni Klien"
      className="py-20 md:py-32 border-b border-gray-200 bg-[#F4F3F3]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <Reveal>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
              {label}
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight tracking-tight text-[#191919]">
              {title}
            </h2>
          </div>
        </Reveal>

        {/* Carousel Wadah Utama */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Ulasan mitra kerja"
          className="bg-white border border-gray-200 p-8 sm:p-12 md:p-16 relative"
        >
          {/* Ikon Kutipan Dekoratif Blueprint */}
          <div className="mb-6 sm:mb-8 text-[#191919]/30" aria-hidden="true">
            <Quote className="w-10 h-10 stroke-[1.25]" />
          </div>

          {/* Area Teks Kutipan Besar Serif */}
          <div
            aria-live="polite"
            className="min-h-[160px] sm:min-h-[140px] flex flex-col justify-between"
          >
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-[#191919] font-normal leading-snug sm:leading-relaxed">
              &ldquo;{activeItem.quote}&rdquo;
            </blockquote>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <cite className="not-italic font-medium text-base text-[#191919] block">
                  {activeItem.author}
                </cite>
                <span className="text-xs sm:text-sm font-mono text-[#191919]/60 block mt-0.5">
                  {activeItem.role}
                </span>
              </div>

              {/* Kontrol Navigasi Geser (Aksesibel, Manual, Tanpa Autoplay) */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#191919]/50 select-none">
                  0{currentIndex + 1} / 0{items.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Kutipan sebelumnya"
                    className="p-2.5 border border-gray-200 hover:border-[#191919] hover:bg-[#F4F3F3] text-[#191919] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-xs cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Kutipan berikutnya"
                    className="p-2.5 border border-gray-200 hover:border-[#191919] hover:bg-[#F4F3F3] text-[#191919] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-xs cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
