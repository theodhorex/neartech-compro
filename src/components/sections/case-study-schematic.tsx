export function CaseStudySchematic({
  index,
  className = "w-full h-24 text-ink/30",
}: {
  index: number;
  className?: string;
}) {
  if (index === 0) {
    // Rantai Pasok & Logistik: Diagram rute & titik armada
    return (
      <svg
        viewBox="0 0 280 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <line x1="20" y1="20" x2="260" y2="20" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="20" y1="60" x2="260" y2="60" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="20" y1="100" x2="260" y2="100" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="140" y1="10" x2="140" y2="110" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="220" y1="10" x2="220" y2="110" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        {/* Rute vektor */}
        <polyline
          points="40,80 90,40 160,70 240,30"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink/70"
        />
        <circle cx="40" cy="80" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-ink" />
        <circle cx="90" cy="40" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-ink" />
        <circle cx="160" cy="70" r="3" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-ink" />
        <circle cx="240" cy="30" r="4" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-ink" />
        <text x="44" y="94" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-ink/50">NODE-A</text>
        <text x="220" y="24" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-ink/50">NODE-B</text>
      </svg>
    );
  }

  if (index === 1) {
    // Portofolio Finansial: Sumbu analitik & grafik performa bertingkat
    return (
      <svg
        viewBox="0 0 280 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <line x1="30" y1="105" x2="260" y2="105" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="15" x2="30" y2="105" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="45" x2="260" y2="45" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        <line x1="30" y1="75" x2="260" y2="75" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1" />
        {/* Garis tren analitik */}
        <path
          d="M 30 95 Q 80 80, 110 65 T 180 50 T 250 25"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-ink/70"
        />
        <rect x="245" y="20" width="10" height="10" fill="white" stroke="currentColor" strokeWidth="1.5" className="text-ink" />
        <text x="36" y="26" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-ink/50">INDEX +240%</text>
        <text x="210" y="115" fill="currentColor" fontSize="8" fontFamily="monospace" className="text-ink/50">Q4 METRIC</text>
      </svg>
    );
  }

  // Pengadaan B2B: Diagram skematik modul dan aliran verifikasi
  return (
    <svg
      viewBox="0 0 280 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="25" y="35" width="55" height="45" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-ink/70" />
      <rect x="110" y="35" width="60" height="45" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-ink/70" />
      <rect x="200" y="35" width="55" height="45" fill="white" stroke="currentColor" strokeWidth="1.2" className="text-ink/70" />
      <line x1="80" y1="58" x2="110" y2="58" stroke="currentColor" strokeWidth="1.2" />
      <line x1="170" y1="58" x2="200" y2="58" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="108,55 113,58 108,61" fill="currentColor" className="text-ink/70" />
      <polygon points="198,55 203,58 198,61" fill="currentColor" className="text-ink/70" />
      <text x="35" y="60" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-ink/60">INPUT</text>
      <text x="120" y="60" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-ink/60">VERIFY</text>
      <text x="212" y="60" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-ink/60">OUTPUT</text>
      <line x1="25" y1="95" x2="255" y2="95" stroke="currentColor" strokeDasharray="3 3" strokeWidth="0.8" />
      <text x="25" y="107" fill="currentColor" fontSize="7" fontFamily="monospace" className="text-ink/40">AUTO-PIPELINE 0.8s</text>
    </svg>
  );
}
