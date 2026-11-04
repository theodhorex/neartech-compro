// Kaca diporting dari vercel-labs/vgpu (MIT License, Copyright (c) Vercel, Inc.), apps/docs/app/[lang]/(home)/components/prism-background
import * as THREE from "three";

/**
 * Shared GLSL fungsi analitik studio environment dan Fresnel Schlick.
 */
const STUDIO_GLSL = /* glsl */ `
const float IOR = 1.645;
const float F0 = ((1.645 - 1.0) / (1.645 + 1.0)) * ((1.645 - 1.0) / (1.645 + 1.0)); // ~0.059465

vec3 evalPanel(vec3 rayDir, vec3 panelDir, vec2 size, float feather, vec3 color) {
  vec3 pDir = normalize(panelDir);
  vec3 up = abs(pDir.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
  vec3 u = normalize(cross(pDir, up));
  vec3 v = cross(u, pDir);

  float forward = dot(rayDir, pDir);
  if (forward <= 0.0) return vec3(0.0);

  vec3 proj = rayDir / forward;
  float du = dot(proj, u) / size.x;
  float dv = dot(proj, v) / size.y;
  float d = max(abs(du), abs(dv));

  float edge0 = 1.0 - feather;
  float edge1 = 1.0 + feather;
  float atten = 1.0 - smoothstep(edge0, edge1, d);
  return color * atten * clamp(forward, 0.0, 1.0);
}

vec3 sampleStudio(vec3 dir) {
  vec3 d = normalize(dir);
  float floorLight = clamp(-d.y, 0.0, 1.0) * 0.008;
  float backDark = clamp(-d.z, 0.0, 1.0) * 0.002;
  vec3 c = max(vec3(0.003) + vec3(floorLight) - vec3(backDark), vec3(0.001));

  // Panel 1: dinding kiri-belakang dir(-0.82,0.08,0.57) size(1.35,1.1) feather .22 warna(.82,.84,.88)*0.011
  c += evalPanel(d, vec3(-0.82, 0.08, 0.57), vec2(1.35, 1.1), 0.22, vec3(0.82, 0.84, 0.88) * 0.011);
  // Panel 2: fill lembut dir(0,-0.707,0.707) size(.38,.62) feather .18 warna(1,.97,.91)*0.22
  c += evalPanel(d, vec3(0.0, -0.707, 0.707), vec2(0.38, 0.62), 0.18, vec3(1.0, 0.97, 0.91) * 0.22);
  // Panel 3: key dingin kanan dir(0.612,0.354,0.707) size(.5,.16) feather .035 warna(.76,.88,1)*20
  c += evalPanel(d, vec3(0.612, 0.354, 0.707), vec2(0.5, 0.16), 0.035, vec3(0.76, 0.88, 1.0) * 20.0);

  // c/(1+c), pow 1/2.2, sRGB->linear, * exposure 2.3
  c = c / (vec3(1.0) + c);
  c = pow(max(c, vec3(0.0)), vec3(1.0 / 2.2));
  vec3 lin = mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), c));
  return lin * 2.3;
}
`;

/**
 * 1. Fullscreen Quad Shader: latar opts.bg di-screen-blend dengan lightCanvas texture (Linear)
 */
export function createBgScreenMaterial(
  bgColorLinear: THREE.Color,
  lightTexture: THREE.Texture
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uBgColor: { value: bgColorLinear },
      uLightTexture: { value: lightTexture },
    },
    vertexShader: /* glsl */ `
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform vec3 uBgColor;
      uniform sampler2D uLightTexture;
      in vec2 vUv;
      out vec4 fragColor;

      void main() {
        vec4 light = texture(uLightTexture, vUv);
        // Canvas 2D is sRGB; convert to linear
        vec3 lightLinear = mix(light.rgb / 12.92, pow((light.rgb + 0.055) / 1.055, vec3(2.4)), step(vec3(0.04045), light.rgb));
        // Tekstur diunggah premultiplied (lihat glass.ts): rgb sudah dikali alpha,
        // jadi jangan dikali lagi (membagi alpha kecil menghasilkan derau 8-bit).
        // Screen blend: 1 - (1 - bg) * (1 - lightLinear)
        vec3 blended = vec3(1.0) - (vec3(1.0) - uBgColor) * (vec3(1.0) - lightLinear);
        fragColor = vec4(blended, 1.0);
      }
    `,
  });
}

/**
 * 2. Sisi Belakang (BackSide) Shader: TIR, multi-bounce internal, studio sampling
 */
export function createGlassBackMaterial(
  planes: THREE.Vector4[],
  reflectionStrength: number
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.CustomBlending,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    blendEquation: THREE.AddEquation,
    uniforms: {
      uPlanes: { value: planes },
      uReflectionStrength: { value: reflectionStrength },
    },
    vertexShader: /* glsl */ `
      out vec3 vWorldPos;
      out vec3 vNormal;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      precision highp int;

      uniform vec4 uPlanes[5];
      uniform float uReflectionStrength;

      in vec3 vWorldPos;
      in vec3 vNormal;
      out vec4 fragColor;

      ${STUDIO_GLSL}

      void main() {
        vec3 V = normalize(vWorldPos - cameraPosition);
        vec3 N = normalize(vNormal);

        // Ray exits glass into air at normal N_trans (pointing with V)
        vec3 N_trans = dot(N, V) >= 0.0 ? N : -N;
        float cosIn = clamp(dot(N_trans, V), 0.0, 1.0);

        // Glass to air: eta = 1.645
        float sin2_t = (1.645 * 1.645) * (1.0 - cosIn * cosIn);
        bool isTIR = sin2_t > 1.0;

        float weight = 1.0;
        if (!isTIR) {
          float cos_t = sqrt(max(0.0, 1.0 - sin2_t));
          float F = F0 + (1.0 - F0) * pow(1.0 - cos_t, 5.0);
          weight = F;
        }

        // Ray reflected internally inside glass
        vec3 rayDir = reflect(V, -N_trans);
        vec3 P = vWorldPos;
        int lastPlane = -1;
        vec3 accumEnv = vec3(0.0);

        // Trace up to 3 bounces against ideal planes
        for (int bounce = 0; bounce < 3; bounce++) {
          float minT = 1e9;
          int hitPlane = -1;
          for (int i = 0; i < 5; i++) {
            if (i == lastPlane) continue;
            float denom = dot(uPlanes[i].xyz, rayDir);
            if (denom > 1e-4) {
              float t = (uPlanes[i].w - dot(uPlanes[i].xyz, P)) / denom;
              if (t > 0.01 && t < minT) {
                minT = t;
                hitPlane = i;
              }
            }
          }
          if (hitPlane < 0) break;

          P = P + rayDir * minT;
          vec3 planeNorm = uPlanes[hitPlane].xyz;
          lastPlane = hitPlane;

          float cosHit = clamp(dot(planeNorm, rayDir), 0.0, 1.0);
          float s2_t = (1.645 * 1.645) * (1.0 - cosHit * cosHit);
          if (s2_t <= 1.0) {
            float c_t = sqrt(max(0.0, 1.0 - s2_t));
            float F_exit = F0 + (1.0 - F0) * pow(1.0 - c_t, 5.0);
            vec3 exitDir = refract(rayDir, planeNorm, 1.645);
            vec3 envSample = sampleStudio(exitDir);
            accumEnv += envSample * (1.0 - F_exit);
          }

          rayDir = reflect(rayDir, -planeNorm);
        }

        vec3 outputCol = accumEnv * uReflectionStrength * weight;
        fragColor = vec4(outputCol, weight);
      }
    `,
  });
}

/**
 * 3. Copy Screen Shader: salin render target ke layar (Linear -> sRGB)
 */
export function createCopyScreenMaterial(
  renderTargetTexture: THREE.Texture
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uRenderTarget: { value: renderTargetTexture },
    },
    vertexShader: /* glsl */ `
      out vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform sampler2D uRenderTarget;
      in vec2 vUv;
      out vec4 fragColor;

      void main() {
        vec3 color = texture(uRenderTarget, vUv).rgb;
        // Linear to sRGB conversion
        vec3 srgb = mix(color * 12.92, 1.055 * pow(max(color, 0.0), vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), color));
        fragColor = vec4(srgb, 1.0);
      }
    `,
  });
}

/**
 * 4. Sisi Depan (FrontSide) Shader: refraksi, marching ke bidang ideal, penyerapan Beer-Lambert,
 * highlight panel, soft shoulder > 0.8, linear -> sRGB
 */
export function createGlassFrontMaterial(
  planes: THREE.Vector4[],
  reflectionStrength: number,
  S: number,
  depth: number,
  renderTargetTexture: THREE.Texture
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    glslVersion: THREE.GLSL3,
    side: THREE.FrontSide,
    transparent: false,
    depthWrite: true,
    depthTest: true,
    uniforms: {
      uPlanes: { value: planes },
      uReflectionStrength: { value: reflectionStrength },
      uS: { value: S },
      uDepth: { value: depth },
      uViewProj: { value: new THREE.Matrix4() },
      uRenderTarget: { value: renderTargetTexture },
    },
    vertexShader: /* glsl */ `
      out vec3 vWorldPos;
      out vec3 vNormal;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      precision highp int;

      uniform vec4 uPlanes[5];
      uniform float uReflectionStrength;
      uniform float uS;
      uniform float uDepth;
      uniform mat4 uViewProj;
      uniform sampler2D uRenderTarget;

      in vec3 vWorldPos;
      in vec3 vNormal;
      out vec4 fragColor;

      ${STUDIO_GLSL}

      void main() {
        vec3 V = normalize(vWorldPos - cameraPosition);
        vec3 N = normalize(vNormal);
        float facing = clamp(-dot(V, N), 0.0, 1.0);
        float F = F0 + (1.0 - F0) * pow(1.0 - facing, 5.0);

        // 1. Refleksi ke studio
        vec3 R = reflect(V, N);
        vec3 env = sampleStudio(R) * uReflectionStrength;
        vec3 reflected = env;

        // 2. Refraksi ke kaca (1 / ior)
        float eta = 1.0 / 1.645;
        vec3 T = refract(V, N, eta);

        // 3. Marching ke bidang ideal terdekat
        float minT = 1e9;
        for (int i = 0; i < 5; i++) {
          float denom = dot(uPlanes[i].xyz, T);
          if (denom > 1e-4) {
            float t = (uPlanes[i].w - dot(uPlanes[i].xyz, vWorldPos)) / denom;
            if (t > 0.01 && t < minT) {
              minT = t;
            }
          }
        }
        if (minT > 1e8) {
          minT = uDepth;
        }
        vec3 exitPoint = vWorldPos + T * minT;

        // 4. Proyeksikan titik keluar dengan uViewProj ke UV
        vec4 clip = uViewProj * vec4(exitPoint, 1.0);
        vec2 ndc = clip.xy / clip.w;
        vec2 uv = ndc * 0.5 + 0.5;

        // 5. Sampel render target dan Beer-Lambert absorption
        vec4 bgSample = texture(uRenderTarget, uv);
        vec3 absorption = vec3(1.0, 1.0, 0.54) * (0.57 / uS);
        vec3 transmitFactor = exp(-absorption * minT);
        vec3 transmitted = bgSample.rgb * transmitFactor;

        // 6. Highlight panel
        float lum = dot(env, vec3(0.2126, 0.7152, 0.0722));
        float hl = smoothstep(0.5, 0.82, lum) * clamp(uReflectionStrength * 0.4, 0.0, 0.7) * (0.65 + 0.35 * pow(1.0 - facing, 1.5));
        vec3 highlight = env * hl;

        // 7. Kombinasi warna
        vec3 color = transmitted * (1.0 - F) + reflected * F + highlight;

        // 8. Bahu lembut di atas 0.8
        vec3 shoulder = vec3(1.0) - vec3(0.2) * exp(-max(color - 0.8, 0.0) / 0.2);
        color = mix(color, shoulder, step(vec3(0.8), color));

        // 9. Linear -> sRGB
        vec3 srgb = mix(color * 12.92, 1.055 * pow(max(color, 0.0), vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), color));
        fragColor = vec4(srgb, 1.0);
      }
    `,
  });
}
