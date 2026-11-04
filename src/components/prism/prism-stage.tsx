"use client";

import { useEffect, useRef } from "react";
import { computeLayout, createLightRenderer } from "./optics";
import { createGlass } from "./glass";
import type { Aim, GlassRenderer, Orbit, PrismLayout, Project } from "./types";

const BG = "#151517";
const IDLE_MS = 6000;

/** Easing tak bergantung frame-rate: faktor `k` didefinisikan per frame 60Hz. */
function ease(current: number, target: number, k: number, dtMs: number) {
  const f = 1 - Math.pow(1 - k, (dtMs / 1000) * 60);
  return current + (target - current) * f;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function PrismStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Kanvas dibuat imperatif agar aman terhadap StrictMode (konteks WebGL
    // yang sudah di-dispose tidak bisa dipakai ulang pada elemen yang sama).
    const glCanvas = document.createElement("canvas");
    glCanvas.id = "gl";
    const fxCanvas = document.createElement("canvas");
    fxCanvas.id = "fx";
    stage.append(glCanvas, fxCanvas);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let layout: PrismLayout;
    let glass: GlassRenderer | null = null;
    let raf = 0;
    let disposed = false;

    const measure = (): PrismLayout => {
      const rect = stage.getBoundingClientRect();
      const copy = document.querySelector("[data-hero-copy]");
      const copyBottom = copy
        ? copy.getBoundingClientRect().bottom - rect.top
        : 0;
      return computeLayout(
        Math.max(1, rect.width),
        Math.max(1, rect.height),
        window.devicePixelRatio || 1,
        copyBottom,
      );
    };

    layout = measure();
    const light = createLightRenderer(fxCanvas, layout);
    glass = createGlass({
      canvas: glCanvas,
      lightCanvas: fxCanvas,
      layout,
      bg: BG,
    });
    if (glass) {
      fxCanvas.style.display = "none"; // dipakai hanya sebagai texture
    } else {
      glCanvas.style.display = "none"; // fallback 2D: #fx tampil sendiri
    }

    const identity: Project = (x, y) => [x, y];
    const fx2d = fxCanvas.getContext("2d");

    // --- Pointer ---
    const pointer = { x: 0.5, y: 0.5 }; // target ternormalisasi
    const aim: Aim = { incidence: 0.5, entry: 0.5 };
    const orbit: Orbit = { x: 0, y: 0 };
    let lastMove = -Infinity;
    let pointerInside = false;

    const onPointer = (e: PointerEvent | Touch) => {
      const rect = stage.getBoundingClientRect();
      pointer.x = clamp01((e.clientX - rect.left) / rect.width);
      pointer.y = clamp01((e.clientY - rect.top) / rect.height);
      lastMove = performance.now();
      pointerInside = true;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.isPrimary) onPointer(e);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.isPrimary) onPointer(e);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onPointer(t);
    };
    const onLeave = () => {
      pointerInside = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    // --- Resize (debounce 60ms) ---
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const applyResize = () => {
      if (disposed) return;
      layout = measure();
      light.resize(layout);
      glass?.resize(layout);
    };
    const scheduleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 60);
    };
    const ro = new ResizeObserver(scheduleResize);
    ro.observe(stage);
    window.addEventListener("resize", scheduleResize);
    void document.fonts?.ready.then(scheduleResize);

    // --- Loop ---
    let prev = performance.now();
    const frame = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        prev = now;
        return;
      }
      const dt = Math.min(100, now - prev);
      prev = now;

      let tx = pointer.x;
      let ty = pointer.y;
      let orbitX = pointerInside ? pointer.x * 2 - 1 : 0;
      let orbitY = pointerInside ? pointer.y * 2 - 1 : 0;

      const auto =
        !reduceMotion && (layout.mobile || now - lastMove > IDLE_MS);
      if (auto) {
        const a = ((now / 1000) / 18) * Math.PI * 2;
        tx = 0.5 + Math.cos(a) * 0.34;
        ty = 0.5 + Math.sin(a) * 0.34;
        orbitX = 0;
        orbitY = 0;
      }
      if (layout.mobile) {
        orbitX = 0;
        orbitY = 0;
      }

      aim.entry = ease(aim.entry, tx, 0.12, dt);
      aim.incidence = ease(aim.incidence, ty, 0.12, dt);
      orbit.x = ease(orbit.x, orbitX, 0.08, dt);
      orbit.y = ease(orbit.y, orbitY, 0.08, dt);

      let project: Project = identity;
      if (glass) {
        glass.setOrbit(orbit);
        project = glass.project;
      }
      light.draw(aim, project, now);

      if (glass) {
        glass.render();
      } else if (fx2d) {
        // Fallback 2D: garis tepi segitiga tipis
        fx2d.save();
        fx2d.setTransform(layout.dpr, 0, 0, layout.dpr, 0, 0);
        fx2d.globalCompositeOperation = "source-over";
        fx2d.strokeStyle = "rgba(255,255,255,0.35)";
        fx2d.lineWidth = 1;
        fx2d.beginPath();
        fx2d.moveTo(layout.top[0], layout.top[1]);
        fx2d.lineTo(layout.right[0], layout.right[1]);
        fx2d.lineTo(layout.left[0], layout.left[1]);
        fx2d.closePath();
        fx2d.stroke();
        fx2d.restore();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      glass?.dispose();
      glCanvas.remove();
      fxCanvas.remove();
    };
  }, []);

  return <div className="stage" aria-hidden="true" ref={stageRef} />;
}
