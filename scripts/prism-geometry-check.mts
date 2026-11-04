// @ts-expect-error Node strip-types requires explicit .ts extension
import { buildPrismMesh } from "../src/components/prism/glass-geometry.ts";

function runGeometryCheck() {
  const S = 320;
  const depth = (S * 0.3) / 0.57;
  const radius = (S * 0.008) / 0.57;

  console.log(`Checking prism geometry with S=${S}, depth=${depth.toFixed(2)}, radius=${radius.toFixed(2)}...`);

  const geometry = buildPrismMesh(S, depth, radius);
  const posAttr = geometry.getAttribute("position");
  const normAttr = geometry.getAttribute("normal");
  const index = geometry.getIndex();

  if (!posAttr || !normAttr || !index) {
    throw new Error("Geometry missing position, normal, or index buffer");
  }

  const numVertices = posAttr.count;
  const numIndices = index.count;

  console.log(`Vertices: ${numVertices}, Indices: ${numIndices}, Triangles: ${numIndices / 3}`);

  // 1. Jumlah vertex/indeks > 0
  if (numVertices <= 0 || numIndices <= 0) {
    throw new Error(`Invalid vertex/index count: ${numVertices}/${numIndices}`);
  }

  // 2. Indeks <= 65535 dan semua indeks < jumlah vertex
  for (let i = 0; i < numIndices; i++) {
    const idx = index.getX(i);
    if (idx > 65535) {
      throw new Error(`Index ${idx} at ${i} exceeds Uint16 max (65535)`);
    }
    if (idx >= numVertices) {
      throw new Error(`Index ${idx} at ${i} >= vertex count ${numVertices}`);
    }
  }

  // 3. Tanpa NaN dan normal ternormalisasi (panjang ~ 1)
  let maxNormDev = 0;
  for (let i = 0; i < numVertices; i++) {
    const px = posAttr.getX(i);
    const py = posAttr.getY(i);
    const pz = posAttr.getZ(i);

    if (Number.isNaN(px) || Number.isNaN(py) || Number.isNaN(pz)) {
      throw new Error(`NaN found in position at vertex ${i}: [${px}, ${py}, ${pz}]`);
    }

    const nx = normAttr.getX(i);
    const ny = normAttr.getY(i);
    const nz = normAttr.getZ(i);

    if (Number.isNaN(nx) || Number.isNaN(ny) || Number.isNaN(nz)) {
      throw new Error(`NaN found in normal at vertex ${i}: [${nx}, ${ny}, ${nz}]`);
    }

    const normLen = Math.hypot(nx, ny, nz);
    const dev = Math.abs(normLen - 1.0);
    if (dev > maxNormDev) {
      maxNormDev = dev;
    }
    if (dev > 1e-4) {
      throw new Error(`Normal not unit length at vertex ${i}: length=${normLen}`);
    }
  }

  // 4. Bounding box z ≈ ±depth/2
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox;
  if (!bbox) {
    throw new Error("Bounding box computation failed");
  }

  const expectedHalfDepth = depth / 2;
  const zMinDiff = Math.abs(bbox.min.z - (-expectedHalfDepth));
  const zMaxDiff = Math.abs(bbox.max.z - expectedHalfDepth);

  console.log(`Bounding box:
  X: [${bbox.min.x.toFixed(2)}, ${bbox.max.x.toFixed(2)}]
  Y: [${bbox.min.y.toFixed(2)}, ${bbox.max.y.toFixed(2)}]
  Z: [${bbox.min.z.toFixed(2)}, ${bbox.max.z.toFixed(2)}] (expected +/-${expectedHalfDepth.toFixed(2)})
  Max normal length deviation: ${maxNormDev.toExponential(3)}`);

  if (zMinDiff > 1e-2 || zMaxDiff > 1e-2) {
    throw new Error(`Bounding box z does not match expected depth/2: minDiff=${zMinDiff}, maxDiff=${zMaxDiff}`);
  }

  console.log("All prism geometry checks PASSED successfully!");
}

runGeometryCheck();
