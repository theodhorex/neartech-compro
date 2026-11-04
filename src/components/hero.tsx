import "@/components/blueprint/blueprint-smooth.css";
import { BlueprintBackdrop } from "@/components/blueprint/blueprint-backdrop";
import { InfoPanel } from "@/components/info-panel";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden h-screen min-h-svh w-full bg-bg">
      {/* Latar blueprint gedung (statis) + interaksi */}
      {/* Zona bersih: gambar memudar di belakang blok teks utama agar judul,
          subjudul, dan tombol selalu terbaca (lihat .hero-art-mask). */}
      <div aria-hidden="true" className="hero-art-mask absolute inset-0 z-0">
        <BlueprintBackdrop />
      </div>

      {/* Navbar Tetap */}
      <Navbar />

      {/* Blok Teks Tengah (Hero Copy) */}
      <div
        data-hero-ui
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 max-w-6xl"
      >
        <h1 className="text-knockout font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tighter text-ink font-normal">
          <span className="block overflow-hidden">
            <span className="block animate-mask-line-1">
              Teknologi yang dekat
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block animate-mask-line-2">
              dengan bisnis Anda.
            </span>
          </span>
        </h1>

        <p className="text-knockout max-w-sm sm:max-w-md mt-5 sm:mt-6 md:mt-8 text-sm md:text-base text-ink-muted leading-relaxed animate-fade-up-sub">
          Mitra teknologi untuk bisnis yang sedang bertumbuh, dari strategi dan
          produk digital hingga rekayasa dan dukungan berkelanjutan.
        </p>

        <div className="animate-fade-up-btn">
          <Button
            href="#kontak"
            size="md"
            className="mt-6 sm:mt-8 md:mt-10"
            aria-label="Hubungi Kami untuk konsultasi proyek"
          >
            Hubungi Kami
          </Button>
        </div>
      </div>

      {/* Panel Info Bawah (Menempel di dasar viewport) */}
      <InfoPanel />
    </main>
  );
}
