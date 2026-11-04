const partners = [
  "Nusantara Group",
  "Kopi Kita",
  "Arunika",
  "Bumi Logistik",
  "Lentera",
  "Sinergi Bank",
  "Garuda Retail",
  "Cakra Media",
];

const faces = ["front", "back", "right", "left", "top", "bottom"] as const;

function Faces() {
  return faces.map((f) => <div key={f} className={`cube-face f-${f}`} />);
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-[#020204] text-white">
      {/* Latar: berkas cahaya + kubus kaca */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="beam beam-right" />
        <div className="beam beam-left" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_64%_34%,transparent_0%,rgba(2,2,4,0.3)_70%,#020204_100%)]" />
        <div className="cube-scene absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 md:left-[68%] md:top-[36%]">
          <div
            className="cube [--size:clamp(120px,min(22vw,30vh),300px)]"
          >
            <Faces />
            <div className="cube-core">
              <Faces />
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020204] via-[#020204]/70 to-transparent" />
      </div>

      {/* Navigasi */}
      <header className="rise relative z-10 grid grid-cols-3 items-center px-5 py-5 md:px-10">
        <button
          type="button"
          className="w-fit rounded-full border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur transition hover:border-white/50"
        >
          Menu
        </button>
        <a
          href="#"
          className="justify-self-center text-lg font-semibold tracking-[0.3em]"
        >
          NEARTECH
        </a>
        <nav className="flex items-center justify-self-end gap-2 text-xs font-medium uppercase tracking-widest">
          <a
            href="#tentang"
            className="hidden rounded-full border border-white/20 px-4 py-1.5 text-white/80 backdrop-blur transition hover:border-white/50 sm:block"
          >
            Tentang
          </a>
          <a
            href="#layanan"
            className="hidden px-3 py-1.5 text-white/80 transition hover:text-white md:block"
          >
            Layanan
          </a>
          <a
            href="#kontak"
            className="rounded-full bg-white px-4 py-1.5 text-black transition hover:bg-white/80"
          >
            Mulai
          </a>
        </nav>
      </header>

      {/* Konten utama */}
      <div className="relative z-10 mt-auto flex flex-col gap-6 px-5 pb-10 md:px-10">
        <p
          className="rise flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70"
          style={{ animationDelay: "0.15s" }}
        >
          <span aria-hidden>→</span> Solusi digital untuk bisnis yang tumbuh
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1
            className="rise max-w-3xl text-[clamp(2.4rem,6.2vw,5.2rem)] leading-[1.02] tracking-tight"
            style={{ animationDelay: "0.3s" }}
          >
            Membangun teknologi yang
            <br />
            <em className="font-serif font-normal italic">dekat</em> dengan
            bisnis Anda
          </h1>

          <div
            className="rise flex max-w-sm items-center gap-5"
            style={{ animationDelay: "0.5s" }}
          >
            <div
              role="img"
              aria-label="Tingkat kepuasan klien 98 persen"
              className="grid size-16 shrink-0 place-items-center rounded-full border border-white/25 text-xs font-medium"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(255,255,255,0.9) 0 98%, transparent 98% 100%)",
                WebkitMask:
                  "radial-gradient(circle, transparent 27px, #000 28px)",
                mask: "radial-gradient(circle, transparent 27px, #000 28px)",
              }}
            />
            <p className="text-sm leading-relaxed text-white/65">
              <strong className="mr-1 font-semibold text-white">98%</strong>
              klien puas. Kami mendampingi organisasi dari strategi hingga
              produk digital yang berjalan dan terukur.
            </p>
          </div>
        </div>

        <div className="rise mt-6" style={{ animationDelay: "0.7s" }}>
          <div className="mb-4 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
            <span>Mitra kami</span>
            <span>Dipercaya 30+ perusahaan</span>
          </div>
          <div
            className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
          >
            <div className="marquee-track">
              {[...partners, ...partners].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  aria-hidden={i >= partners.length}
                  className="px-8 text-sm font-medium tracking-wide text-white/60"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
