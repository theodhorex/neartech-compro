// Kaca diporting dari vercel-labs/vgpu (MIT License, Copyright (c) Vercel, Inc.),
// apps/docs/app/[lang]/(home)/components/prism-background

import type { Aim, LightRenderer, PrismLayout, Project, Vec2 } from "./types";

/**
 * 5a: Menghitung geometri prisma dan dpr kanvas cahaya.
 */
export function computeLayout(
  W: number,
  H: number,
  devicePixelRatio: number,
  copyBottom: number
): PrismLayout {
  const mobile = W < 820;
  const dpr = mobile
    ? Math.min(devicePixelRatio, 1.5)
    : Math.min(devicePixelRatio, 2.0);

  let S: number;
  let cx: number;
  let cy: number;

  if (mobile) {
    S = Math.min(W * 0.72, H * 0.4, 400);
    cx = W / 2;
    cy = Math.max(copyBottom + 30 + S * 0.62, (copyBottom + 30 + H) / 2);
  } else {
    S = Math.min(W * 0.36, H * 0.62);
    cx = 0.66 * W;
    cy = 0.53 * H;
  }

  const R = S / Math.sqrt(3);
  const depth = (S * 0.3) / 0.57;
  const radius = (S * 0.008) / 0.57;

  // Segitiga 2D (y ke bawah): atas, kanan, kiri
  const top: Vec2 = [cx, cy - R];
  const right: Vec2 = [cx + S / 2, cy + R / 2];
  const left: Vec2 = [cx - S / 2, cy + R / 2];

  return {
    W,
    H,
    dpr,
    mobile,
    S,
    cx,
    cy,
    R,
    depth,
    radius,
    top,
    right,
    left,
  };
}

/** Konstanta optik */
export const WAVELENGTH_COUNT = 72;
export const MIN_LAMBDA = 410; // nm
export const MAX_LAMBDA = 695; // nm

export interface WavelengthData {
  lambdaNm: number;
  n: number;
  vividRgb: [number, number, number];
  wbRgb: [number, number, number];
  weight: number;
}

/** Aproksimasi spektrum tampak (Bruton) vivid [0..1] */
function wavelengthToVividRgb(lambda: number): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;

  if (lambda < 440) {
    r = Math.max(0, Math.min(1, (440 - lambda) / 50));
    g = 0;
    b = 1;
  } else if (lambda < 490) {
    r = 0;
    g = (lambda - 440) / 50;
    b = 1;
  } else if (lambda < 510) {
    r = 0;
    g = 1;
    b = (510 - lambda) / 20;
  } else if (lambda < 580) {
    r = (lambda - 510) / 70;
    g = 1;
    b = 0;
  } else if (lambda < 645) {
    r = 1;
    g = (645 - lambda) / 65;
    b = 0;
  } else {
    r = 1;
    g = 0;
    b = 0;
  }

  return [r, g, b];
}

/** Inisialisasi data 72 panjang gelombang dan bobot white balance */
function createWavelengthTable(): WavelengthData[] {
  const table: WavelengthData[] = [];
  let sumR = 0;
  let sumG = 0;
  let sumB = 0;

  for (let i = 0; i < WAVELENGTH_COUNT; i++) {
    const lambdaNm =
      MIN_LAMBDA + (i * (MAX_LAMBDA - MIN_LAMBDA)) / (WAVELENGTH_COUNT - 1);
    const lambdaUm = lambdaNm / 1000;
    // Cauchy: n(λ) = 1.2 + 0.1 / λ²
    const n = 1.2 + 0.1 / (lambdaUm * lambdaUm);
    // Tema monochrome (keputusan Theo 5 Nov 2026): dispersi tetap menyebarkan
    // sinar secara geometris, tetapi warna diganti skala abu-abu (gradasi halus
    // menurut panjang gelombang) supaya pita terlihat berlapis tanpa pelangi.
    void wavelengthToVividRgb;
    const tone = 0.6 + 0.35 * (i / (WAVELENGTH_COUNT - 1));
    const vivid: [number, number, number] = [tone, tone, tone];
    sumR += vivid[0];
    sumG += vivid[1];
    sumB += vivid[2];

    table.push({
      lambdaNm,
      n,
      vividRgb: vivid,
      wbRgb: [0, 0, 0],
      weight: 0,
    });
  }

  // Normalisasi agar sum(wbRgb * weight) = putih
  for (let i = 0; i < WAVELENGTH_COUNT; i++) {
    const entry = table[i];
    const rNorm = entry.vividRgb[0] / sumR;
    const gNorm = entry.vividRgb[1] / sumG;
    const bNorm = entry.vividRgb[2] / sumB;
    const w = (rNorm + gNorm + bNorm) / 3;

    // Skala agar komponen warna cocok untuk 0..255 di canvas
    const maxVal = Math.max(rNorm / w, gNorm / w, bNorm / w, 1e-4);
    entry.wbRgb = [
      Math.min(255, Math.round((rNorm / (w * maxVal)) * 255)),
      Math.min(255, Math.round((gNorm / (w * maxVal)) * 255)),
      Math.min(255, Math.round((bNorm / (w * maxVal)) * 255)),
    ];
    entry.weight = w * maxVal;
  }

  return table;
}

const WAVELENGTHS = createWavelengthTable();

export interface RaySegment {
  lambdaIndex: number;
  p0: Vec2;
  p1: Vec2;
  energy: number;
  isInside: boolean;
  isExit: boolean;
  pathKey: string;
}

export interface EdgeGlint {
  sideIndex: number;
  point: Vec2;
  energy: number;
}

export interface TraceResult {
  incomingStart: Vec2;
  incomingEnd: Vec2;
  segments: RaySegment[];
  pathGroups: Map<string, RaySegment[]>;
  glints: EdgeGlint[];
}

/** Hitung arah dan titik datang lampu dari kanan (5b vgpu lampForIncidence) */
function computeLamp(layout: PrismLayout, aim: Aim) {
  // Sudut datang pointer y [0..1]: -35 deg (atas) -> 60 deg (tengah) -> 75 deg (bawah)
  const y = Math.max(0, Math.min(1, aim.incidence));
  let deg: number;
  if (y <= 0.5) {
    const t = y / 0.5;
    deg = -35 + t * 95;
  } else {
    const t = (y - 0.5) / 0.5;
    deg = 60 + t * 15;
  }
  const rad = (deg * Math.PI) / 180;

  // Titik masuk lerp sepanjang sisi kanan (0.08 .. 0.92)
  const entryParam = 0.08 + Math.max(0, Math.min(1, aim.entry)) * (0.92 - 0.08);
  const top = layout.top;
  const right = layout.right;
  const entryPoint: Vec2 = [
    top[0] + entryParam * (right[0] - top[0]),
    top[1] + entryParam * (right[1] - top[1]),
  ];

  // Normal masuk sisi kanan: outward normal = (sqrt(3)/2, -0.5), inward = (-sqrt(3)/2, 0.5)
  const inNormX = -Math.sqrt(3) / 2;
  const inNormY = 0.5;

  // Diputar +sudut datang (ruang y-bawah)
  const cosT = Math.cos(rad);
  const sinT = Math.sin(rad);
  const dirX = inNormX * cosT - inNormY * sinT;
  const dirY = inNormX * sinT + inNormY * cosT;
  const dirLen = Math.hypot(dirX, dirY) || 1;
  const dir: Vec2 = [dirX / dirLen, dirY / dirLen];

  const diag = Math.hypot(layout.W, layout.H);
  const far = 1.5 * diag;
  const sourcePoint: Vec2 = [entryPoint[0] - dir[0] * far, entryPoint[1] - dir[1] * far];

  return { entryPoint, dir, sourcePoint, far };
}

/** Tiga sisi segitiga beserta normal luarnya */
function getPrismSides(layout: PrismLayout): {
  p0: Vec2;
  p1: Vec2;
  normal: Vec2;
}[] {
  return [
    // Sisi 0: sisi kanan (atas -> kanan)
    {
      p0: layout.top,
      p1: layout.right,
      normal: [Math.sqrt(3) / 2, -0.5],
    },
    // Sisi 1: alas (kanan -> kiri)
    {
      p0: layout.right,
      p1: layout.left,
      normal: [0, 1],
    },
    // Sisi 2: sisi kiri (kiri -> atas)
    {
      p0: layout.left,
      p1: layout.top,
      normal: [-Math.sqrt(3) / 2, -0.5],
    },
  ];
}

/** Perpotongan sinar 2D dengan segmen sisi segitiga */
function intersectSides(
  origin: Vec2,
  dir: Vec2,
  sides: { p0: Vec2; p1: Vec2; normal: Vec2 }[],
  ignoreSide = -1
): { t: number; sideIndex: number; hitPoint: Vec2 } | null {
  let closestT = Infinity;
  let hitSide = -1;
  let hitPt: Vec2 | null = null;

  for (let s = 0; s < 3; s++) {
    if (s === ignoreSide) continue;
    const { p0, p1 } = sides[s];
    const dx = p1[0] - p0[0];
    const dy = p1[1] - p0[1];

    const det = dx * dir[1] - dy * dir[0];
    if (Math.abs(det) < 1e-9) continue;

    const t = ((origin[0] - p0[0]) * dy - (origin[1] - p0[1]) * dx) / det;
    const u = (dir[0] * (p0[1] - origin[1]) - dir[1] * (p0[0] - origin[0])) / det;

    if (t > 1e-4 && u >= -1e-5 && u <= 1 + 1e-5 && t < closestT) {
      closestT = t;
      hitSide = s;
      hitPt = [origin[0] + dir[0] * t, origin[1] + dir[1] * t];
    }
  }

  if (hitSide !== -1 && hitPt) {
    return { t: closestT, sideIndex: hitSide, hitPoint: hitPt };
  }
  return null;
}

/**
 * Pelacakan sinar 2D untuk satu panjang gelombang (Snell, Fresnel unpolarized, TIR).
 */
function traceRayWavelength(
  lambdaIdx: number,
  start: Vec2,
  dir: Vec2,
  initialEnergy: number,
  sides: { p0: Vec2; p1: Vec2; normal: Vec2 }[],
  far: number,
  segments: RaySegment[],
  glints: EdgeGlint[]
) {
  const nGlass = WAVELENGTHS[lambdaIdx].n;

  // Rekursi fungsi pelacak
  function step(
    p: Vec2,
    d: Vec2,
    energy: number,
    depth: number,
    isInside: boolean,
    pathKey: string,
    lastSide: number
  ) {
    if (depth > 7 || energy <= 0.08) return;

    if (isInside) {
      // Cari perpotongan dengan sisi segitiga berikutnya
      const hit = intersectSides(p, d, sides, lastSide);
      if (!hit) return;

      const { sideIndex, hitPoint } = hit;
      const currentSegment: RaySegment = {
        lambdaIndex: lambdaIdx,
        p0: p,
        p1: hitPoint,
        energy,
        isInside: true,
        isExit: false,
        pathKey,
      };
      segments.push(currentSegment);

      // Sinar mengenai batas kaca -> udara
      const sideNormal = sides[sideIndex].normal;
      // Normal berlawanan arah datang
      const dot = d[0] * sideNormal[0] + d[1] * sideNormal[1];
      const norm: Vec2 = dot > 0 ? [-sideNormal[0], -sideNormal[1]] : [sideNormal[0], sideNormal[1]];
      const n1 = nGlass;
      const n2 = 1.0;
      const eta = n1 / n2;
      const c1 = -(d[0] * norm[0] + d[1] * norm[1]);
      const sin2T2 = eta * eta * (1 - c1 * c1);

      // Arah pantul
      const reflDir: Vec2 = [d[0] + 2 * c1 * norm[0], d[1] + 2 * c1 * norm[1]];

      if (sin2T2 > 1) {
        // Pantulan internal total (TIR)
        const tirEnergy = energy;
        if (depth < 7 && tirEnergy > 0.12) {
          step(
            hitPoint,
            reflDir,
            tirEnergy,
            depth + 1,
            true,
            `${pathKey}-R${sideIndex}`,
            sideIndex
          );
        }
      } else {
        // Snell refraction
        const c2 = Math.sqrt(1 - sin2T2);
        const transDir: Vec2 = [
          eta * d[0] + (eta * c1 - c2) * norm[0],
          eta * d[1] + (eta * c1 - c2) * norm[1],
        ];

        // Fresnel tak terpolarisasi
        const rs = (n1 * c1 - n2 * c2) / (n1 * c1 + n2 * c2);
        const rp = (n2 * c1 - n1 * c2) / (n2 * c1 + n1 * c2);
        const R_fresnel = (rs * rs + rp * rp) / 2;
        const T_fresnel = 1 - R_fresnel;

        const transEnergy = energy * T_fresnel;
        const reflEnergy = energy * R_fresnel;

        // Sinar tembus keluar prisma
        if (transEnergy > 0.08) {
          const exitEnd: Vec2 = [
            hitPoint[0] + transDir[0] * far,
            hitPoint[1] + transDir[1] * far,
          ];
          segments.push({
            lambdaIndex: lambdaIdx,
            p0: hitPoint,
            p1: exitEnd,
            energy: transEnergy,
            isInside: false,
            isExit: true,
            pathKey: `${pathKey}-T${sideIndex}`,
          });

          // Kilau pada sisi keluar (simpan sekali per berkas keluar kuat)
          if (lambdaIdx === 36) {
            glints.push({
              sideIndex,
              point: hitPoint,
              energy: transEnergy,
            });
          }
        }

        // Pantulan internal berlanjut
        if (depth < 7 && reflEnergy > 0.12) {
          step(
            hitPoint,
            reflDir,
            reflEnergy,
            depth + 1,
            true,
            `${pathKey}-R${sideIndex}`,
            sideIndex
          );
        }
      }
    } else {
      // Masuk pertama kali ke prisma pada sisi kanan (side 0)
      const sideNormal = sides[0].normal;
      const dot = d[0] * sideNormal[0] + d[1] * sideNormal[1];
      const norm: Vec2 = dot > 0 ? [-sideNormal[0], -sideNormal[1]] : [sideNormal[0], sideNormal[1]];
      const n1 = 1.0;
      const n2 = nGlass;
      const eta = n1 / n2;
      const c1 = -(d[0] * norm[0] + d[1] * norm[1]);
      const sin2T2 = eta * eta * (1 - c1 * c1);

      if (sin2T2 <= 1) {
        const c2 = Math.sqrt(1 - sin2T2);
        const transDir: Vec2 = [
          eta * d[0] + (eta * c1 - c2) * norm[0],
          eta * d[1] + (eta * c1 - c2) * norm[1],
        ];

        const rs = (n1 * c1 - n2 * c2) / (n1 * c1 + n2 * c2);
        const rp = (n2 * c1 - n1 * c2) / (n2 * c1 + n1 * c2);
        const R_fresnel = (rs * rs + rp * rp) / 2;
        const T_fresnel = 1 - R_fresnel;

        const transEnergy = energy * T_fresnel;
        const reflEnergy = energy * R_fresnel;

        if (lambdaIdx === 36) {
          glints.push({
            sideIndex: 0,
            point: p,
            energy: 1.0,
          });
        }

        // Pantulan luar di permukaan (keluar menjauhi prisma)
        if (reflEnergy > 0.12) {
          const reflDir: Vec2 = [d[0] + 2 * c1 * norm[0], d[1] + 2 * c1 * norm[1]];
          const reflEnd: Vec2 = [p[0] + reflDir[0] * far, p[1] + reflDir[1] * far];
          segments.push({
            lambdaIndex: lambdaIdx,
            p0: p,
            p1: reflEnd,
            energy: reflEnergy,
            isInside: false,
            isExit: true,
            pathKey: "R0_ext",
          });
        }

        // Terus ke dalam prisma
        if (transEnergy > 0.08) {
          step(p, transDir, transEnergy, depth + 1, true, "T0", 0);
        }
      }
    }
  }

  step(start, dir, initialEnergy, 1, false, "IN", -1);
}

/** Jalankan seluruh pelacak 2D untuk layout dan aim */
export function traceRays(layout: PrismLayout, aim: Aim): TraceResult {
  const lamp = computeLamp(layout, aim);
  const sides = getPrismSides(layout);
  const segments: RaySegment[] = [];
  const glints: EdgeGlint[] = [];

  for (let i = 0; i < WAVELENGTH_COUNT; i++) {
    traceRayWavelength(
      i,
      lamp.entryPoint,
      lamp.dir,
      1.0,
      sides,
      lamp.far,
      segments,
      glints
    );
  }

  // Kelompokkan menurut pathKey
  const pathGroups = new Map<string, RaySegment[]>();
  for (const seg of segments) {
    let group = pathGroups.get(seg.pathKey);
    if (!group) {
      group = [];
      pathGroups.set(seg.pathKey, group);
    }
    group.push(seg);
  }

  return {
    incomingStart: lamp.sourcePoint,
    incomingEnd: lamp.entryPoint,
    segments,
    pathGroups,
    glints,
  };
}

/**
 * Fungsi pembantu untuk uji tanpa peramban (scripts/prism-optics-check.mts)
 */
export function traceForTest(layout: PrismLayout, aim: Aim) {
  const result = traceRays(layout, aim);
  const exitSegments = result.segments.filter((s) => s.isExit);
  return {
    totalSegments: result.segments.length,
    exitCount: exitSegments.length,
    segments: result.segments,
    exitSegments,
    pathCount: result.pathGroups.size,
  };
}

/**
 * 5c: Renderer cahaya ke kanvas offscreen dan bloom ke #fx.
 */
export function createLightRenderer(
  fx: HTMLCanvasElement,
  initialLayout: PrismLayout
): LightRenderer {
  let currentLayout = initialLayout;

  // Kanvas offscreen untuk rendering additive
  const offscreen = document.createElement("canvas");
  const offCtx = offscreen.getContext("2d");
  const fxCtx = fx.getContext("2d");

  // Tiga buffer resolusi rendah untuk fallback bloom
  const buf16 = document.createElement("canvas");
  const buf6 = document.createElement("canvas");
  const buf2 = document.createElement("canvas");
  const b16Ctx = buf16.getContext("2d");
  const b6Ctx = buf6.getContext("2d");
  const b2Ctx = buf2.getContext("2d");

  // Ukuran kanvas
  function updateDimensions(layout: PrismLayout) {
    currentLayout = layout;
    const cw = Math.round(layout.W * layout.dpr);
    const ch = Math.round(layout.H * layout.dpr);

    fx.width = cw;
    fx.height = ch;
    fx.style.width = "100%";
    fx.style.height = "100%";

    offscreen.width = cw;
    offscreen.height = ch;

    buf16.width = Math.max(1, Math.round(cw / 16));
    buf16.height = Math.max(1, Math.round(ch / 16));

    buf6.width = Math.max(1, Math.round(cw / 6));
    buf6.height = Math.max(1, Math.round(ch / 6));

    buf2.width = Math.max(1, Math.round(cw / 2));
    buf2.height = Math.max(1, Math.round(ch / 2));
  }

  updateDimensions(initialLayout);

  // 70 butir debu stabil
  interface DustParticle {
    t: number; // posisi di sepanjang berkas [0..1]
    offsetFactor: number; // offset lateral
    radius: number; // 0.5 .. 1.6
    speed: number;
    phase: number;
    freq: number;
  }

  const dustParticles: DustParticle[] = [];
  for (let i = 0; i < 70; i++) {
    // Sebaran acak terdistribusi teratur
    const seed = (i * 9301 + 49297) % 233280;
    const r1 = seed / 233280;
    const r2 = ((seed * 9301 + 49297) % 233280) / 233280;
    const r3 = ((r2 * 233280 * 9301 + 49297) % 233280) / 233280;

    dustParticles.push({
      t: (i + r1) / 70,
      offsetFactor: (r2 - 0.5) * 2,
      radius: 0.5 + r3 * 1.1,
      speed: 0.00003 + r1 * 0.00005,
      phase: r2 * Math.PI * 2,
      freq: 0.002 + r3 * 0.003,
    });
  }

  // Cache tracer
  let cachedAim: Aim | null = null;
  let cachedTrace: TraceResult | null = null;

  function getTrace(aim: Aim): TraceResult {
    if (
      cachedTrace &&
      cachedAim &&
      Math.abs(aim.incidence - cachedAim.incidence) < 0.0005 &&
      Math.abs(aim.entry - cachedAim.entry) < 0.0005
    ) {
      return cachedTrace;
    }
    cachedAim = { incidence: aim.incidence, entry: aim.entry };
    cachedTrace = traceRays(currentLayout, aim);
    return cachedTrace;
  }

  return {
    resize(layout: PrismLayout) {
      updateDimensions(layout);
      cachedAim = null;
      cachedTrace = null;
    },

    draw(aim: Aim, project: Project, timeMs: number) {
      if (!offCtx || !fxCtx) return;

      const dpr = currentLayout.dpr;
      const trace = getTrace(aim);

      // Bersihkan kanvas offscreen
      offCtx.save();
      offCtx.setTransform(1, 0, 0, 1, 0, 0);
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      offCtx.globalCompositeOperation = "lighter";

      // 1. Berkas masuk (goresan putih 12px @ 0.3 + 4.5px @ 1; x0.8 mobile)
      const scale = currentLayout.mobile ? 0.8 : 1.0;
      const pStart = project(trace.incomingStart[0], trace.incomingStart[1]);
      const pEnd = project(trace.incomingEnd[0], trace.incomingEnd[1]);

      offCtx.lineCap = "round";

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      offCtx.lineWidth = 12 * scale;
      offCtx.beginPath();
      offCtx.moveTo(pStart[0], pStart[1]);
      offCtx.lineTo(pEnd[0], pEnd[1]);
      offCtx.stroke();

      offCtx.strokeStyle = "rgba(255, 255, 255, 1.0)";
      offCtx.lineWidth = 4.5 * scale;
      offCtx.beginPath();
      offCtx.moveTo(pStart[0], pStart[1]);
      offCtx.lineTo(pEnd[0], pEnd[1]);
      offCtx.stroke();

      // 2. 70 debu berkedip di sepanjang berkas masuk
      const inDx = trace.incomingStart[0] - trace.incomingEnd[0];
      const inDy = trace.incomingStart[1] - trace.incomingEnd[1];
      const inLen = Math.hypot(inDx, inDy) || 1;
      const perpX = -inDy / inLen;
      const perpY = inDx / inLen;

      for (let i = 0; i < dustParticles.length; i++) {
        const dust = dustParticles[i];
        // Gerakan perlahan di sepanjang berkas
        const currentT = (dust.t + timeMs * dust.speed) % 1.0;
        // Menyebar lebih lebar menjauhi prisma
        const spreadWidth = 4 + currentT * 26;
        const lateral = dust.offsetFactor * spreadWidth;

        const stageX = trace.incomingEnd[0] + currentT * inDx + perpX * lateral;
        const stageY = trace.incomingEnd[1] + currentT * inDy + perpY * lateral;
        const proj = project(stageX, stageY);

        // Alpha berkedip 0.3 .. 1 x 0.75
        const blink =
          0.3 + 0.7 * (0.5 + 0.5 * Math.sin(timeMs * dust.freq + dust.phase));
        const alpha = blink * 0.75;

        offCtx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        offCtx.beginPath();
        offCtx.arc(proj[0], proj[1], dust.radius, 0, Math.PI * 2);
        offCtx.fill();
      }

      // 3. Kelompok jalur: garis inti + quad warna vivid antar panjang gelombang
      for (const [, group] of trace.pathGroups) {
        if (group.length === 0) continue;

        const isInside = group[0].isInside;
        const isExit = group[0].isExit;

        // Gambar quad isian antar λ bertetangga terlebih dahulu
        for (let j = 0; j < group.length - 1; j++) {
          const seg0 = group[j];
          const seg1 = group[j + 1];

          // Hanya hubungkan indeks berdekatan
          if (Math.abs(seg0.lambdaIndex - seg1.lambdaIndex) > 2) continue;

          const p0A = project(seg0.p0[0], seg0.p0[1]);
          const p0B = project(seg0.p1[0], seg0.p1[1]);
          const p1B = project(seg1.p1[0], seg1.p1[1]);
          const p1A = project(seg1.p0[0], seg1.p0[1]);

          const midLambda = Math.round((seg0.lambdaIndex + seg1.lambdaIndex) / 2);
          const rgb = WAVELENGTHS[midLambda].vividRgb;
          const r = Math.round(rgb[0] * 255);
          const g = Math.round(rgb[1] * 255);
          const b = Math.round(rgb[2] * 255);

          const avgEnergy = (seg0.energy + seg1.energy) / 2;

          offCtx.beginPath();
          offCtx.moveTo(p0A[0], p0A[1]);
          offCtx.lineTo(p0B[0], p0B[1]);
          offCtx.lineTo(p1B[0], p1B[1]);
          offCtx.lineTo(p1A[0], p1A[1]);
          offCtx.closePath();

          if (isExit) {
            // Gradien keluar: alpha 1 -> 0.75 (30%) -> 0.25 (70%) -> 0
            const startMidX = (p0A[0] + p1A[0]) / 2;
            const startMidY = (p0A[1] + p1A[1]) / 2;
            const endMidX = (p0B[0] + p1B[0]) / 2;
            const endMidY = (p0B[1] + p1B[1]) / 2;

            const grad = offCtx.createLinearGradient(
              startMidX,
              startMidY,
              endMidX,
              endMidY
            );
            const baseA = avgEnergy * 0.34;
            grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${baseA.toFixed(3)})`);
            grad.addColorStop(
              0.3,
              `rgba(${r}, ${g}, ${b}, ${(baseA * 0.75).toFixed(3)})`
            );
            grad.addColorStop(
              0.7,
              `rgba(${r}, ${g}, ${b}, ${(baseA * 0.25).toFixed(3)})`
            );
            grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            offCtx.fillStyle = grad;
          } else {
            const fillAlpha = isInside ? avgEnergy * 0.28 : avgEnergy * 0.34;
            offCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fillAlpha.toFixed(3)})`;
          }

          offCtx.fill();
        }

        // Garis inti per λ (white-balanced)
        const coreWidth = isInside ? 4 : 3.4;
        offCtx.lineWidth = coreWidth * scale;

        for (let j = 0; j < group.length; j++) {
          const seg = group[j];
          const wl = WAVELENGTHS[seg.lambdaIndex];
          const alpha = Math.min(1.0, wl.weight * seg.energy * 0.9);
          if (alpha < 0.005) continue;

          const pA = project(seg.p0[0], seg.p0[1]);
          const pB = project(seg.p1[0], seg.p1[1]);

          offCtx.strokeStyle = `rgba(${wl.wbRgb[0]}, ${wl.wbRgb[1]}, ${
            wl.wbRgb[2]
          }, ${alpha.toFixed(3)})`;

          offCtx.beginPath();
          offCtx.moveTo(pA[0], pA[1]);
          offCtx.lineTo(pB[0], pB[1]);
          offCtx.stroke();
        }
      }

      // 4. Kilau tepi (Edge glints)
      const sides = getPrismSides(currentLayout);
      const glintRadius = 0.2 * currentLayout.S;

      for (const glint of trace.glints) {
        const side = sides[glint.sideIndex];
        const pGlint = project(glint.point[0], glint.point[1]);
        const pSide0 = project(side.p0[0], side.p0[1]);
        const pSide1 = project(side.p1[0], side.p1[1]);

        // Gradien radial pada sisi
        const radialGrad = offCtx.createRadialGradient(
          pGlint[0],
          pGlint[1],
          0,
          pGlint[0],
          pGlint[1],
          glintRadius
        );
        radialGrad.addColorStop(
          0,
          `rgba(255, 255, 255, ${(0.8 * glint.energy).toFixed(2)})`
        );
        radialGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        offCtx.strokeStyle = radialGrad;
        offCtx.lineWidth = 2;
        offCtx.beginPath();
        offCtx.moveTo(pSide0[0], pSide0[1]);
        offCtx.lineTo(pSide1[0], pSide1[1]);
        offCtx.stroke();

        // Titik putih 2.6px
        offCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
        offCtx.beginPath();
        offCtx.arc(pGlint[0], pGlint[1], 2.6, 0, Math.PI * 2);
        offCtx.fill();
      }

      offCtx.restore();

      // 5. Komposit bloom lembut ke #fx: tiga lintasan blur 34/12/3.2px
      fxCtx.save();
      fxCtx.setTransform(1, 0, 0, 1, 0, 0);
      fxCtx.clearRect(0, 0, fx.width, fx.height);
      fxCtx.globalCompositeOperation = "lighter";

      const hasFilterSupport =
        typeof fxCtx.filter === "string" && fxCtx.filter !== undefined;

      if (hasFilterSupport) {
        // Tiga lintasan blur dengan ctx.filter
        fxCtx.filter = `blur(${34 * dpr}px)`;
        fxCtx.globalAlpha = 0.6;
        fxCtx.drawImage(offscreen, 0, 0);

        fxCtx.filter = `blur(${12 * dpr}px)`;
        fxCtx.globalAlpha = 0.9;
        fxCtx.drawImage(offscreen, 0, 0);

        fxCtx.filter = `blur(${3.2 * dpr}px)`;
        fxCtx.globalAlpha = 1.0;
        fxCtx.drawImage(offscreen, 0, 0);

        fxCtx.filter = "none";
      } else {
        // Fallback bila ctx.filter tak didukung: buffer 1/16, 1/6, 1/2
        if (b16Ctx && b6Ctx && b2Ctx) {
          b16Ctx.clearRect(0, 0, buf16.width, buf16.height);
          b16Ctx.drawImage(offscreen, 0, 0, buf16.width, buf16.height);
          fxCtx.globalAlpha = 0.6;
          fxCtx.drawImage(buf16, 0, 0, fx.width, fx.height);

          b6Ctx.clearRect(0, 0, buf6.width, buf6.height);
          b6Ctx.drawImage(offscreen, 0, 0, buf6.width, buf6.height);
          fxCtx.globalAlpha = 0.9;
          fxCtx.drawImage(buf6, 0, 0, fx.width, fx.height);

          b2Ctx.clearRect(0, 0, buf2.width, buf2.height);
          b2Ctx.drawImage(offscreen, 0, 0, buf2.width, buf2.height);
          fxCtx.globalAlpha = 1.0;
          fxCtx.drawImage(buf2, 0, 0, fx.width, fx.height);
        } else {
          fxCtx.globalAlpha = 1.0;
          fxCtx.drawImage(offscreen, 0, 0);
        }
      }

      fxCtx.restore();
    },
  };
}
