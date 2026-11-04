// Kaca diporting dari vercel-labs/vgpu (MIT License, Copyright (c) Vercel, Inc.), apps/docs/app/[lang]/(home)/components/prism-background
import * as THREE from "three";

/**
 * Membangun geometri prisma segitiga sama sisi dengan 9 tepi bulat (fillet)
 * Posisi dan normal di-interleave dalam satu buffer, indeks Uint16.
 */
export function buildPrismMesh(
  S: number,
  depth: number,
  radius: number
): THREE.BufferGeometry {
  const R = S / Math.sqrt(3);
  const V0: [number, number] = [0, R];
  const V1: [number, number] = [S / 2, -R / 2];
  const V2: [number, number] = [-S / 2, -R / 2];

  const factor = 1 - (2 * radius) / R;
  const C0: [number, number] = [V0[0] * factor, V0[1] * factor];
  const C1: [number, number] = [V1[0] * factor, V1[1] * factor];
  const C2: [number, number] = [V2[0] * factor, V2[1] * factor];

  const contourPts: [number, number][] = [];
  const contourNorms: [number, number][] = [];

  // Sudut 0 (Puncak atas): 4 segmen
  for (let i = 0; i < 4; i++) {
    const t = i / 4;
    const phi = (5 * Math.PI) / 6 - t * ((2 * Math.PI) / 3);
    const nx = Math.cos(phi);
    const ny = Math.sin(phi);
    contourPts.push([C0[0] + radius * nx, C0[1] + radius * ny]);
    contourNorms.push([nx, ny]);
  }

  // Tepi 1 (Sisi kanan atas -> kanan bawah): 16 segmen
  const T0_out: [number, number] = [
    C0[0] + radius * Math.cos(Math.PI / 6),
    C0[1] + radius * Math.sin(Math.PI / 6),
  ];
  const T1_in: [number, number] = [
    C1[0] + radius * Math.cos(Math.PI / 6),
    C1[1] + radius * Math.sin(Math.PI / 6),
  ];
  const n1: [number, number] = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)];
  for (let i = 0; i < 16; i++) {
    const t = i / 16;
    contourPts.push([
      T0_out[0] + t * (T1_in[0] - T0_out[0]),
      T0_out[1] + t * (T1_in[1] - T0_out[1]),
    ]);
    contourNorms.push([n1[0], n1[1]]);
  }

  // Sudut 1 (Kanan bawah): 4 segmen
  for (let i = 0; i < 4; i++) {
    const t = i / 4;
    const phi = Math.PI / 6 - t * ((2 * Math.PI) / 3);
    const nx = Math.cos(phi);
    const ny = Math.sin(phi);
    contourPts.push([C1[0] + radius * nx, C1[1] + radius * ny]);
    contourNorms.push([nx, ny]);
  }

  // Tepi 2 (Alas kanan -> alas kiri): 16 segmen
  const T1_out: [number, number] = [
    C1[0] + radius * Math.cos(-Math.PI / 2),
    C1[1] + radius * Math.sin(-Math.PI / 2),
  ];
  const T2_in: [number, number] = [
    C2[0] + radius * Math.cos(-Math.PI / 2),
    C2[1] + radius * Math.sin(-Math.PI / 2),
  ];
  const n2: [number, number] = [0, -1];
  for (let i = 0; i < 16; i++) {
    const t = i / 16;
    contourPts.push([
      T1_out[0] + t * (T2_in[0] - T1_out[0]),
      T1_out[1] + t * (T2_in[1] - T1_out[1]),
    ]);
    contourNorms.push([n2[0], n2[1]]);
  }

  // Sudut 2 (Kiri bawah): 4 segmen
  for (let i = 0; i < 4; i++) {
    const t = i / 4;
    const phi = -Math.PI / 2 - t * ((2 * Math.PI) / 3);
    const nx = Math.cos(phi);
    const ny = Math.sin(phi);
    contourPts.push([C2[0] + radius * nx, C2[1] + radius * ny]);
    contourNorms.push([nx, ny]);
  }

  // Tepi 0 (Sisi kiri bawah -> kiri atas): 16 segmen
  const T2_out: [number, number] = [
    C2[0] + radius * Math.cos((-7 * Math.PI) / 6),
    C2[1] + radius * Math.sin((-7 * Math.PI) / 6),
  ];
  const T0_in: [number, number] = [
    C0[0] + radius * Math.cos((5 * Math.PI) / 6),
    C0[1] + radius * Math.sin((5 * Math.PI) / 6),
  ];
  const n0: [number, number] = [Math.cos((5 * Math.PI) / 6), Math.sin((5 * Math.PI) / 6)];
  for (let i = 0; i < 16; i++) {
    const t = i / 16;
    contourPts.push([
      T2_out[0] + t * (T0_in[0] - T2_out[0]),
      T2_out[1] + t * (T0_in[1] - T2_out[1]),
    ]);
    contourNorms.push([n0[0], n0[1]]);
  }

  const numContour = contourPts.length; // 60 titik kontur
  const maxTheta = Math.PI / 2 - 0.06;
  const numBevelSegments = 4;

  const rings: { pos: [number, number, number]; norm: [number, number, number] }[][] = [];

  // Cincin bevel belakang: k dari 4 ke 0
  for (let k = numBevelSegments; k >= 0; k--) {
    const theta = (k / numBevelSegments) * maxTheta;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const z = -depth / 2 + radius * (1 - sinT);
    const ring: { pos: [number, number, number]; norm: [number, number, number] }[] = [];
    for (let j = 0; j < numContour; j++) {
      const p2d = contourPts[j];
      const n2d = contourNorms[j];
      const x = p2d[0] - radius * (1 - cosT) * n2d[0];
      const y = p2d[1] - radius * (1 - cosT) * n2d[1];
      const nx = n2d[0] * cosT;
      const ny = n2d[1] * cosT;
      const nz = -sinT;
      ring.push({ pos: [x, y, z], norm: [nx, ny, nz] });
    }
    rings.push(ring);
  }

  // Cincin bevel depan: k dari 0 ke 4
  for (let k = 0; k <= numBevelSegments; k++) {
    const theta = (k / numBevelSegments) * maxTheta;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const z = depth / 2 - radius * (1 - sinT);
    const ring: { pos: [number, number, number]; norm: [number, number, number] }[] = [];
    for (let j = 0; j < numContour; j++) {
      const p2d = contourPts[j];
      const n2d = contourNorms[j];
      const x = p2d[0] - radius * (1 - cosT) * n2d[0];
      const y = p2d[1] - radius * (1 - cosT) * n2d[1];
      const nx = n2d[0] * cosT;
      const ny = n2d[1] * cosT;
      const nz = sinT;
      ring.push({ pos: [x, y, z], norm: [nx, ny, nz] });
    }
    rings.push(ring);
  }

  const numRings = rings.length;
  const vertexData: number[] = [];
  const indices: number[] = [];

  // Masukkan vertex cincin (posisi x,y,z dan normal nx,ny,nz interleaved)
  for (let r = 0; r < numRings; r++) {
    for (let j = 0; j < numContour; j++) {
      const v = rings[r][j];
      vertexData.push(v.pos[0], v.pos[1], v.pos[2], v.norm[0], v.norm[1], v.norm[2]);
    }
  }

  // Hubungkan cincin bersebelahan dengan quad (2 segitiga berarah keluar)
  for (let r = 0; r < numRings - 1; r++) {
    const r0 = r * numContour;
    const r1 = (r + 1) * numContour;
    for (let j = 0; j < numContour; j++) {
      const jNext = (j + 1) % numContour;
      const v00 = r0 + j;
      const v10 = r0 + jNext;
      const v01 = r1 + j;
      const v11 = r1 + jNext;
      indices.push(v00, v10, v11);
      indices.push(v00, v11, v01);
    }
  }

  // Titik tengah tutup belakang
  const backCenterIdx = vertexData.length / 6;
  vertexData.push(0, 0, -depth / 2, 0, 0, -1);
  for (let j = 0; j < numContour; j++) {
    const jNext = (j + 1) % numContour;
    indices.push(backCenterIdx, jNext, j);
  }

  // Titik tengah tutup depan
  const frontCenterIdx = vertexData.length / 6;
  vertexData.push(0, 0, depth / 2, 0, 0, 1);
  const frontRingOffset = (numRings - 1) * numContour;
  for (let j = 0; j < numContour; j++) {
    const jNext = (j + 1) % numContour;
    indices.push(frontCenterIdx, frontRingOffset + j, frontRingOffset + jNext);
  }

  const totalVertices = vertexData.length / 6;
  if (totalVertices > 65535) {
    throw new Error(`Prism vertex count exceeds Uint16 limit: ${totalVertices}`);
  }

  const floatArray = new Float32Array(vertexData);
  const interleavedBuffer = new THREE.InterleavedBuffer(floatArray, 6);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0)
  );
  geometry.setAttribute(
    "normal",
    new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 3)
  );
  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
  geometry.computeBoundingBox();

  return geometry;
}
