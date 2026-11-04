"use client";

// STUB sementara (CSS). Worker A menggantikan isi berkas ini dengan kubus WebGL.
const faces = ["front", "back", "right", "left", "top", "bottom"] as const;

function Faces() {
  return faces.map((f) => <div key={f} className={`cube-face f-${f}`} />);
}

export function GlassCubeLoader() {
  return (
    <div className="cube-scene">
      <div className="cube [--size:clamp(120px,min(22vw,30vh),300px)]">
        <Faces />
        <div className="cube-core">
          <Faces />
        </div>
      </div>
    </div>
  );
}
