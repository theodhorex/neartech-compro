export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" fillOpacity="0.55" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      aria-label="NearTech Beranda"
      className={`inline-flex items-center gap-2.5 text-[#191919] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191919] rounded-sm ${className}`.trim()}
    >
      <LogoIcon className="w-6 h-6 text-[#191919] shrink-0" />
      <span className="font-semibold text-base tracking-tight text-[#191919]">
        NearTech
      </span>
    </a>
  );
}
