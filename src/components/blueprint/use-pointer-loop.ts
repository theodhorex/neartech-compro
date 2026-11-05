"use client";

import { useEffect, useRef } from "react";

export type ZoneKey = "strategi" | "produk" | "rekayasa";
const ZONE_KEYS: ZoneKey[] = ["strategi", "produk", "rekayasa"];

interface UsePointerLoopProps {
  backdropRef: React.RefObject<HTMLDivElement | null>;
  baseLayerRef: React.RefObject<HTMLDivElement | null>;
  revealLayerRef: React.RefObject<HTMLDivElement | null>;
  reticleRef: React.RefObject<HTMLDivElement | null>;
  coordsRef: React.RefObject<HTMLSpanElement | null>;
}

export function usePointerLoop({
  backdropRef,
  baseLayerRef,
  revealLayerRef,
  reticleRef,
  coordsRef,
}: UsePointerLoopProps): void {
  // Pinned state (DOM + ref)
  const pinnedZoneRef = useRef<ZoneKey | null>(null);
  // Current active art-detected zone
  const currentArtZoneRef = useRef<ZoneKey | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check fine pointer support
    const finePointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Cache hit elements
    const getZoneHitElements = (): Record<ZoneKey, SVGGeometryElement | null> => {
      const container = baseLayerRef.current;
      return {
        strategi: container?.querySelector('g[data-zone="strategi"] .zone-hit') ?? null,
        produk: container?.querySelector('g[data-zone="produk"] .zone-hit') ?? null,
        rekayasa: container?.querySelector('g[data-zone="rekayasa"] .zone-hit') ?? null,
      };
    };

    let cachedZoneHits = getZoneHitElements();

    // PERFORMA: getScreenCTM()/getBBox() memaksa layout. Hasilnya di-cache dan
    // dibuang hanya saat resize/scroll (satu-satunya yang menggeser matriks layar).
    type HitGeom = { inv: DOMMatrix; bbox: DOMRect };
    let hitGeomCache = new WeakMap<SVGGeometryElement, HitGeom | null>();
    let svgInvCache: DOMMatrix | null | undefined;

    const invalidateGeometry = () => {
      hitGeomCache = new WeakMap();
      svgInvCache = undefined;
    };

    const getHitGeom = (el: SVGGeometryElement): HitGeom | null => {
      const cached = hitGeomCache.get(el);
      if (cached !== undefined) return cached;
      let geom: HitGeom | null = null;
      try {
        const ctm = el.getScreenCTM();
        if (ctm) geom = { inv: ctm.inverse(), bbox: el.getBBox() };
      } catch {
        geom = null;
      }
      hitGeomCache.set(el, geom);
      return geom;
    };

    const isPointInZone = (
      el: SVGGeometryElement,
      clientX: number,
      clientY: number
    ): boolean => {
      const geom = getHitGeom(el);
      if (!geom) return false;
      const localPt = new DOMPoint(clientX, clientY).matrixTransform(geom.inv);

      // 1. SVGGeometryElement.isPointInFill (bila elemen mendukung)
      if (typeof el.isPointInFill === "function") {
        try {
          if (el.isPointInFill(localPt)) return true;
        } catch {
          // lanjut ke pemeriksaan kotak
        }
      }

      // 2. Fallback: kotak pembatas (bbox) elemen
      const b = geom.bbox;
      return (
        localPt.x >= b.x &&
        localPt.x <= b.x + b.width &&
        localPt.y >= b.y &&
        localPt.y <= b.y + b.height
      );
    };

    // Helper to format 4-digit coordinate string
    const formatCoord = (val: number): string =>
      String(Math.max(0, Math.min(9999, Math.round(val)))).padStart(4, "0");

    // Coordinates tracking
    const initialX = window.innerWidth * 0.5;
    const initialY = window.innerHeight * 0.6;
    let targetX = initialX;
    let targetY = initialY;
    let currX = initialX;
    let currY = initialY;
    let lastMoveTime = performance.now();
    let lastTickTime = performance.now();
    let rafId: number | null = null;

    // Apply initial coordinates to CSS variables
    revealLayerRef.current?.style.setProperty("--mx", `${currX.toFixed(1)}px`);
    revealLayerRef.current?.style.setProperty("--my", `${currY.toFixed(1)}px`);
    reticleRef.current?.style.setProperty("--px", `${currX.toFixed(1)}px`);
    reticleRef.current?.style.setProperty("--py", `${currY.toFixed(1)}px`);

    let lastCoordsText = "";
    const writeCoords = (text: string) => {
      if (text === lastCoordsText || !coordsRef.current) return;
      lastCoordsText = text;
      coordsRef.current.textContent = text;
    };

    const updateCoordsText = (x: number, y: number) => {
      if (!coordsRef.current) return;
      const svg = baseLayerRef.current?.querySelector("svg");
      if (svg) {
        if (svgInvCache === undefined) {
          try {
            const ctm = svg.getScreenCTM();
            svgInvCache = ctm ? ctm.inverse() : null;
          } catch {
            svgInvCache = null;
          }
        }
        if (svgInvCache) {
          const svgPt = new DOMPoint(x, y).matrixTransform(svgInvCache);
          const vx = Math.max(0, Math.min(1600, Math.round(svgPt.x)));
          const vy = Math.max(0, Math.min(900, Math.round(svgPt.y)));
          writeCoords(`X ${formatCoord(vx)} / Y ${formatCoord(vy)}`);
          return;
        }
      }
    };

    const tick = (now: number) => {
      if (document.hidden) {
        rafId = null;
        return;
      }

      const dt = Math.min(Math.max((now - lastTickTime) / 1000, 0.001), 0.1);
      lastTickTime = now;

      const isReduced = reducedMotionMedia.matches;
      if (isReduced) {
        currX = targetX;
        currY = targetY;
      } else {
        // Frame-rate independent lerp 0.18 at 60Hz: factor = 1 - (1 - 0.18)^(dt * 60)
        const factor = 1 - Math.pow(0.82, dt * 60);
        currX += (targetX - currX) * factor;
        currY += (targetY - currY) * factor;
      }

      const rx = currX.toFixed(1);
      const ry = currY.toFixed(1);

      revealLayerRef.current?.style.setProperty("--mx", `${rx}px`);
      revealLayerRef.current?.style.setProperty("--my", `${ry}px`);
      reticleRef.current?.style.setProperty("--px", `${rx}px`);
      reticleRef.current?.style.setProperty("--py", `${ry}px`);

      updateCoordsText(currX, currY);

      // Stop loop when cursor idle > 1s and position settled
      const dist = Math.abs(targetX - currX) + Math.abs(targetY - currY);
      if (now - lastMoveTime > 1000 && dist < 0.3) {
        currX = targetX;
        currY = targetY;
        revealLayerRef.current?.style.setProperty("--mx", `${targetX.toFixed(1)}px`);
        revealLayerRef.current?.style.setProperty("--my", `${targetY.toFixed(1)}px`);
        reticleRef.current?.style.setProperty("--px", `${targetX.toFixed(1)}px`);
        reticleRef.current?.style.setProperty("--py", `${targetY.toFixed(1)}px`);
        updateCoordsText(targetX, targetY);
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (rafId === null) {
        lastTickTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };

    const isInteractiveElement = (target: EventTarget | null): boolean => {
      if (!(target instanceof Element)) return false;
      return !!target.closest("a, button, [role=tab], [data-hero-ui], input, select, textarea");
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!finePointerMedia.matches) return;
      if (e.pointerType === "touch") return;

      targetX = e.clientX;
      targetY = e.clientY;
      lastMoveTime = performance.now();

      const target = e.target;
      const isOverInteractive = isInteractiveElement(target);

      // Reticle visibility: hide over interactive elements
      if (isOverInteractive) {
        reticleRef.current?.setAttribute("data-hidden", "true");
      } else {
        reticleRef.current?.removeAttribute("data-hidden");
      }

      // Kursor masuk panel/UI (bukan baris layanan, yang mengatur zonanya sendiri):
      // hapus zona gambar yang tertinggal agar tab tidak menyala sendiri.
      if (
        isOverInteractive &&
        pinnedZoneRef.current === null &&
        currentArtZoneRef.current !== null &&
        !(target instanceof Element && target.closest("a"))
      ) {
        currentArtZoneRef.current = null;
        backdropRef.current?.removeAttribute("data-zone-active");
        window.dispatchEvent(
          new CustomEvent("nt:zone", { detail: { zone: null, source: "art" } })
        );
      }

      // Hit-test zone detection when not over interactive element and not pinned
      if (!isOverInteractive && pinnedZoneRef.current === null) {
        // Refresh cached elements if any missing
        if (!cachedZoneHits.strategi || !cachedZoneHits.produk || !cachedZoneHits.rekayasa) {
          cachedZoneHits = getZoneHitElements();
        }

        let detectedZone: ZoneKey | null = null;
        for (const key of ZONE_KEYS) {
          const hitEl = cachedZoneHits[key];
          if (hitEl && isPointInZone(hitEl, e.clientX, e.clientY)) {
            detectedZone = key;
            break;
          }
        }

        if (detectedZone !== currentArtZoneRef.current) {
          currentArtZoneRef.current = detectedZone;
          if (detectedZone) {
            backdropRef.current?.setAttribute("data-zone-active", detectedZone);
          } else {
            backdropRef.current?.removeAttribute("data-zone-active");
          }
          window.dispatchEvent(
            new CustomEvent("nt:zone", {
              detail: { zone: detectedZone, source: "art" },
            })
          );
        }
      }

      startLoop();
    };

    const handleClick = (e: MouseEvent) => {
      if (isInteractiveElement(e.target)) return;

      const hoveredZone = currentArtZoneRef.current;
      const currentPinned = pinnedZoneRef.current;

      if (currentPinned !== null) {
        if (hoveredZone === currentPinned || hoveredZone === null) {
          // Toggle off: unpin
          pinnedZoneRef.current = null;
          backdropRef.current?.removeAttribute("data-zone-pinned");
          if (!hoveredZone) {
            backdropRef.current?.removeAttribute("data-zone-active");
            window.dispatchEvent(
              new CustomEvent("nt:zone", {
                detail: { zone: null, source: "art" },
              })
            );
          }
        } else {
          // Pin the new hovered zone
          pinnedZoneRef.current = hoveredZone;
          backdropRef.current?.setAttribute("data-zone-pinned", "true");
          backdropRef.current?.setAttribute("data-zone-active", hoveredZone);
          window.dispatchEvent(
            new CustomEvent("nt:zone", {
              detail: { zone: hoveredZone, source: "art" },
            })
          );
        }
      } else if (hoveredZone !== null) {
        // Pin the hovered zone
        pinnedZoneRef.current = hoveredZone;
        backdropRef.current?.setAttribute("data-zone-pinned", "true");
        backdropRef.current?.setAttribute("data-zone-active", hoveredZone);
        window.dispatchEvent(
          new CustomEvent("nt:zone", {
            detail: { zone: hoveredZone, source: "art" },
          })
        );
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && pinnedZoneRef.current !== null) {
        pinnedZoneRef.current = null;
        backdropRef.current?.removeAttribute("data-zone-pinned");
        const currentHover = currentArtZoneRef.current;
        if (currentHover) {
          backdropRef.current?.setAttribute("data-zone-active", currentHover);
          window.dispatchEvent(
            new CustomEvent("nt:zone", {
              detail: { zone: currentHover, source: "art" },
            })
          );
        } else {
          backdropRef.current?.removeAttribute("data-zone-active");
          window.dispatchEvent(
            new CustomEvent("nt:zone", {
              detail: { zone: null, source: "art" },
            })
          );
        }
      }
    };

    const handleNtZone = (e: Event) => {
      const customEvent = e as CustomEvent<{ zone: ZoneKey | null; source: "art" | "ui" }>;
      if (!customEvent.detail || customEvent.detail.source !== "ui") return;

      const uiZone = customEvent.detail.zone;
      if (uiZone) {
        backdropRef.current?.setAttribute("data-zone-active", uiZone);
      } else {
        // Restoring after UI hover/focus ends
        if (pinnedZoneRef.current) {
          backdropRef.current?.setAttribute("data-zone-active", pinnedZoneRef.current);
        } else if (currentArtZoneRef.current) {
          backdropRef.current?.setAttribute("data-zone-active", currentArtZoneRef.current);
        } else {
          backdropRef.current?.removeAttribute("data-zone-active");
        }
      }
    };

    const handleResize = () => {
      cachedZoneHits = getZoneHitElements();
      invalidateGeometry();
    };

    const handleVisibilityChange = () => {
      if (document.hidden && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // PERFORMA: setelah animasi masuk (gambar bertahap + fade) selesai, lepas
    // ~600 animasi fill-forwards yang selesai tetapi masih membebani hitung gaya.
    // CSS pada [data-intro-done] menggantinya dengan keadaan akhir statis.
    const introFrame = requestAnimationFrame(() => {
      const root = backdropRef.current;
      if (!root) return;
      const running = root.getAnimations({ subtree: true });
      Promise.allSettled(running.map((a) => a.finished)).then(() => {
        backdropRef.current?.setAttribute("data-intro-done", "true");
      });
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", invalidateGeometry, { passive: true });
    window.addEventListener("nt:zone", handleNtZone);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      cancelAnimationFrame(introFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", invalidateGeometry);
      window.removeEventListener("nt:zone", handleNtZone);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [backdropRef, baseLayerRef, revealLayerRef, reticleRef, coordsRef]);
}
