// Kontrak antarmodul mesin prisma. DIATUR PM; worker TIDAK mengubah berkas ini
// (bila perlu perubahan, laporkan di laporan dan jangan edit).

export type Vec2 = [number, number];

/** Layout dalam px CSS (lihat spesifikasi 5a). Bidang cahaya: y ke bawah. */
export interface PrismLayout {
  W: number;
  H: number;
  /** dpr kanvas cahaya (mobile: min(dpr,1.5)); dpr renderer WebGL = min(devicePixelRatio,2) */
  dpr: number;
  mobile: boolean;
  /** panjang sisi */
  S: number;
  /** pusat massa */
  cx: number;
  cy: number;
  /** S/sqrt(3) */
  R: number;
  /** S*0.3/0.57 */
  depth: number;
  /** S*0.008/0.57 */
  radius: number;
  /** titik sudut segitiga: atas, kanan, kiri (y bawah) */
  top: Vec2;
  right: Vec2;
  left: Vec2;
}

/** Bidang 2D (px CSS di stage) -> posisi layar (px CSS) lewat kamera 3D saat ini. */
export type Project = (x: number, y: number) => Vec2;

/** Target pointer ternormalisasi 0..1 (sudah diperhalus oleh pemanggil). */
export interface Aim {
  /** tinggi pointer 0 (atas) .. 1 (bawah): menentukan sudut datang */
  incidence: number;
  /** lebar pointer 0 (kiri) .. 1 (kanan): menentukan titik masuk di sisi kanan */
  entry: number;
}

/** Orbit kamera, masing-masing -1..1 (dikali 3.5 derajat di dalam glass). */
export interface Orbit {
  x: number;
  y: number;
}

/** Dikembalikan optics.ts */
export interface LightRenderer {
  /** Ukuran/dpr kanvas #fx mengikuti layout baru. */
  resize(layout: PrismLayout): void;
  /**
   * Gambar frame cahaya ke kanvas #fx (offscreen -> bloom ke #fx).
   * `project` memetakan bidang 2D ke layar lewat kamera saat ini.
   * `timeMs` untuk kedip debu.
   */
  draw(aim: Aim, project: Project, timeMs: number): void;
}

/** Dikembalikan glass.ts (null bila WebGL2 tidak tersedia). */
export interface GlassRenderer {
  resize(layout: PrismLayout): void;
  /** Perbarui kamera dari orbit; harus dipanggil SEBELUM `project` dipakai di frame itu. */
  setOrbit(orbit: Orbit): void;
  /** Memakai kamera dari setOrbit terakhir. */
  project: Project;
  /** Render satu frame (menandai texture dari lightCanvas needsUpdate). */
  render(): void;
  dispose(): void;
}
