"use client";

import { useRef } from "react";
import { BlueprintArt } from "./blueprint-art";
import { usePointerLoop } from "./use-pointer-loop";
import "./blueprint.css";

export function BlueprintBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);

  usePointerLoop({
    backdropRef,
    baseLayerRef,
    revealLayerRef,
    reticleRef,
    coordsRef,
  });

  return (
    <div
      ref={backdropRef}
      aria-hidden="true"
      className="blueprint-backdrop absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* 1. Kertas: grid blueprint halus murni CSS */}
      <div className="blueprint-paper absolute inset-0 pointer-events-none" />

      {/* 2. Base layer: opacity 0.30 */}
      <div
        ref={baseLayerRef}
        className="blueprint-layer blueprint-layer-base absolute inset-0 pointer-events-none"
      >
        <BlueprintArt variant="base" />
      </div>

      {/* 3. Reveal layer: opacity 1, masked with radial cursor gradient */}
      <div
        ref={revealLayerRef}
        className="blueprint-layer blueprint-layer-reveal absolute inset-0 pointer-events-none"
      >
        <BlueprintArt variant="reveal" />
      </div>

      {/* 4. Lapisan highlight zona aktif: unmasked reveal (hanya aktif saat data-zone-active) */}
      <div className="blueprint-layer blueprint-layer-highlight absolute inset-0 pointer-events-none">
        <BlueprintArt variant="reveal" />
      </div>

      {/* 5. Retikel kursor: garis silang tipis + label koordinat monospace X/Y */}
      <div ref={reticleRef} className="blueprint-reticle">
        <div className="blueprint-reticle-h" />
        <div className="blueprint-reticle-v" />
        <span ref={coordsRef} className="blueprint-reticle-coords">
          X 0800 / Y 0540
        </span>
      </div>
    </div>
  );
}
