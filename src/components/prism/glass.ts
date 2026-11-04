// Kaca diporting dari vercel-labs/vgpu (MIT License, Copyright (c) Vercel, Inc.), apps/docs/app/[lang]/(home)/components/prism-background
import * as THREE from "three";
import type { GlassRenderer, Orbit, PrismLayout, Project, Vec2 } from "./types";
import { buildPrismMesh } from "./glass-geometry";
import {
  createBgScreenMaterial,
  createCopyScreenMaterial,
  createGlassBackMaterial,
  createGlassFrontMaterial,
} from "./glass-shaders";

export { buildPrismMesh };

function isWebGL2Available(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext("webgl2")
    );
  } catch {
    return false;
  }
}

/**
 * Membuat renderer kaca 3D Three.js sesuai spesifikasi 5d & 5e.
 * Mengembalikan null bila WebGL2 tidak tersedia.
 */
export function createGlass(opts: {
  canvas: HTMLCanvasElement;
  lightCanvas: HTMLCanvasElement;
  layout: PrismLayout;
  bg: string;
}): GlassRenderer | null {
  if (!isWebGL2Available()) {
    return null;
  }

  let currentLayout = opts.layout;
  const dpr = Math.min(
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    2
  );

  // 1. Inisialisasi WebGLRenderer
  const renderer = new THREE.WebGLRenderer({
    canvas: opts.canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.autoClear = false;
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setPixelRatio(dpr);
  renderer.setSize(currentLayout.W, currentLayout.H, false);

  // Error recovery & logging sesuai skill debugging-and-error-recovery
  renderer.debug.checkShaderErrors = true;
  renderer.debug.onShaderError = (gl, _program, glVertexShader, glFragmentShader) => {
    const vLog = gl.getShaderInfoLog(glVertexShader);
    const fLog = gl.getShaderInfoLog(glFragmentShader);
    console.error("Prism shader compile error:\nVertex:", vLog, "\nFragment:", fLog);
  };

  // 2. Render target HalfFloat seukuran canvas * dpr
  let rtWidth = Math.round(currentLayout.W * dpr);
  let rtHeight = Math.round(currentLayout.H * dpr);
  const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    depthBuffer: true,
  });

  // 3. CanvasTexture dari lightCanvas
  const lightTexture = new THREE.CanvasTexture(opts.lightCanvas);
  lightTexture.minFilter = THREE.LinearFilter;
  lightTexture.magFilter = THREE.LinearFilter;
  lightTexture.generateMipmaps = false;
  lightTexture.premultiplyAlpha = true;

  // 4. Geometri prisma
  let prismMeshGeometry = buildPrismMesh(
    currentLayout.S,
    currentLayout.depth,
    currentLayout.radius
  );

  // 5. Lima bidang ideal (normal keluar, offset)
  const dSide = currentLayout.R / 2;
  const planes = [
    new THREE.Vector4(Math.sqrt(3) / 2, 0.5, 0, dSide), // Sisi kanan
    new THREE.Vector4(0, -1, 0, dSide), // Sisi bawah (alas)
    new THREE.Vector4(-Math.sqrt(3) / 2, 0.5, 0, dSide), // Sisi kiri
    new THREE.Vector4(0, 0, 1, currentLayout.depth / 2), // Tutup depan
    new THREE.Vector4(0, 0, -1, currentLayout.depth / 2), // Tutup belakang
  ];

  const reflectionStrength = 2.14;

  // 6. Materials
  const bgColorLinear = new THREE.Color(opts.bg).convertSRGBToLinear();
  const bgScreenMaterial = createBgScreenMaterial(bgColorLinear, lightTexture);
  const backMaterial = createGlassBackMaterial(planes, reflectionStrength);
  const copyScreenMaterial = createCopyScreenMaterial(renderTarget.texture);
  const frontMaterial = createGlassFrontMaterial(
    planes,
    reflectionStrength,
    currentLayout.S,
    currentLayout.depth,
    renderTarget.texture
  );

  // 7. Kamera & Scenes
  const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quadGeometry = new THREE.PlaneGeometry(2, 2);

  const bgQuadScene = new THREE.Scene();
  bgQuadScene.add(new THREE.Mesh(quadGeometry, bgScreenMaterial));

  const copyQuadScene = new THREE.Scene();
  copyQuadScene.add(new THREE.Mesh(quadGeometry, copyScreenMaterial));

  const backScene = new THREE.Scene();
  const backMesh = new THREE.Mesh(prismMeshGeometry, backMaterial);
  backScene.add(backMesh);

  const frontScene = new THREE.Scene();
  const frontMesh = new THREE.Mesh(prismMeshGeometry, frontMaterial);
  frontScene.add(frontMesh);

  // Kamera perspektif 48 derajat
  let cameraDistance =
    currentLayout.H / 2 / Math.tan((24 * Math.PI) / 180);
  const camera = new THREE.PerspectiveCamera(
    48,
    currentLayout.W / currentLayout.H,
    0.1,
    10000
  );
  camera.setViewOffset(
    currentLayout.W,
    currentLayout.H,
    currentLayout.W / 2 - currentLayout.cx,
    currentLayout.H / 2 - currentLayout.cy,
    currentLayout.W,
    currentLayout.H
  );

  let currentOrbit: Orbit = { x: 0, y: 0 };
  const maxOrbitRad = (3.5 * Math.PI) / 180;

  function updateCameraTransform(): void {
    const yaw = currentOrbit.x * maxOrbitRad;
    const pitch = currentOrbit.y * maxOrbitRad;

    const x = cameraDistance * Math.sin(yaw) * Math.cos(pitch);
    const y = cameraDistance * Math.sin(pitch);
    const z = cameraDistance * Math.cos(yaw) * Math.cos(pitch);

    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
  }

  updateCameraTransform();

  // Optimasi: alokasikan vektor & matriks sekali di closure, tanpa alokasi per frame
  const scratchProjVec = new THREE.Vector3();
  const viewProjMatrix = new THREE.Matrix4();

  const project: Project = (stageX: number, stageY: number): Vec2 => {
    // Stage px CSS -> koordinat dunia relatif pusat prisma (sumbu y dibalik)
    const worldX = stageX - currentLayout.cx;
    const worldY = currentLayout.cy - stageY;
    scratchProjVec.set(worldX, worldY, 0);
    scratchProjVec.project(camera);

    // NDC [-1..1] -> px CSS stage
    const screenX = (scratchProjVec.x + 1) * 0.5 * currentLayout.W;
    const screenY = (1 - scratchProjVec.y) * 0.5 * currentLayout.H;
    return [screenX, screenY];
  };

  const setOrbit = (orbit: Orbit): void => {
    currentOrbit = orbit;
    updateCameraTransform();
  };

  const render = (): void => {
    lightTexture.needsUpdate = true;

    // Hitung uViewProj untuk shader sisi depan
    viewProjMatrix.multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frontMaterial.uniforms.uViewProj.value.copy(viewProjMatrix);

    // 1. Quad layar penuh: latar di-screen-blend dengan texture cahaya -> renderTarget
    renderer.setRenderTarget(renderTarget);
    renderer.clear(true, true, false);
    renderer.render(bgQuadScene, quadCamera);

    // 2. Sisi belakang: BackSide TIR & multi-bounce -> renderTarget
    renderer.render(backScene, camera);

    // 3. Salin render target ke layar (linear -> sRGB)
    renderer.setRenderTarget(null);
    renderer.clear(true, true, false);
    renderer.render(copyQuadScene, quadCamera);

    // 4. Sisi depan: pantulan & refraksi tembus render target -> layar
    renderer.render(frontScene, camera);
  };

  const resize = (newLayout: PrismLayout): void => {
    currentLayout = newLayout;
    const W = currentLayout.W;
    const H = currentLayout.H;
    const currentDpr = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      2
    );

    renderer.setPixelRatio(currentDpr);
    renderer.setSize(W, H, false);

    rtWidth = Math.round(W * currentDpr);
    rtHeight = Math.round(H * currentDpr);
    renderTarget.setSize(rtWidth, rtHeight);

    // Rebuild geometri prisma
    prismMeshGeometry.dispose();
    prismMeshGeometry = buildPrismMesh(
      currentLayout.S,
      currentLayout.depth,
      currentLayout.radius
    );
    backMesh.geometry = prismMeshGeometry;
    frontMesh.geometry = prismMeshGeometry;

    // Perbarui kamera
    cameraDistance = H / 2 / Math.tan((24 * Math.PI) / 180);
    camera.aspect = W / H;
    camera.setViewOffset(
      W,
      H,
      W / 2 - currentLayout.cx,
      H / 2 - currentLayout.cy,
      W,
      H
    );
    camera.updateProjectionMatrix();

    // Perbarui uniform bidang ideal
    const newDSide = currentLayout.R / 2;
    planes[0].set(Math.sqrt(3) / 2, 0.5, 0, newDSide);
    planes[1].set(0, -1, 0, newDSide);
    planes[2].set(-Math.sqrt(3) / 2, 0.5, 0, newDSide);
    planes[3].set(0, 0, 1, currentLayout.depth / 2);
    planes[4].set(0, 0, -1, currentLayout.depth / 2);

    frontMaterial.uniforms.uS.value = currentLayout.S;
    frontMaterial.uniforms.uDepth.value = currentLayout.depth;

    updateCameraTransform();
  };

  const dispose = (): void => {
    prismMeshGeometry.dispose();
    quadGeometry.dispose();

    bgScreenMaterial.dispose();
    backMaterial.dispose();
    copyScreenMaterial.dispose();
    frontMaterial.dispose();

    lightTexture.dispose();
    renderTarget.texture.dispose();
    renderTarget.dispose();

    renderer.dispose();
    renderer.forceContextLoss();
  };

  return {
    resize,
    setOrbit,
    project,
    render,
    dispose,
  };
}
