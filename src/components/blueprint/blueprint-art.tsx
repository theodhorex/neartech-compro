import { CenterPavilionFacade, CenterPavilionStructure } from "./art/center-pavilion";
import { LeftTowerFacade, LeftTowerStructure } from "./art/left-tower";
import { RightTowerFacade, RightTowerStructure } from "./art/right-tower";
import { StrategyZone } from "./art/strategy-zone";

export function BlueprintArt({ variant }: { variant: "base" | "reveal" }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden="true"
      data-variant={variant}
    >
      <StrategyZone variant={variant} />

      <g data-zone="produk">
        <g className="zone-art">
          <LeftTowerFacade />
          <CenterPavilionFacade />
          <RightTowerFacade />
        </g>
        {variant === "reveal" && (
          <g className="zone-label">
            <polyline
              points="760,724 730,680 610,680"
              fill="none"
              stroke="#191919"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="760" cy="724" r="2.5" fill="#191919" />
            <text
              x="605"
              y="677"
              textAnchor="end"
              style={{
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: 10,
                fill: "#191919",
                stroke: "none",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              02 PRODUK — FASAD & PENGALAMAN
            </text>
          </g>
        )}
        <g className="zone-hit">
          <rect x="70" y="230" width="400" height="550" fill="transparent" />
          <rect x="560" y="560" width="480" height="220" fill="transparent" />
          <rect x="1130" y="150" width="410" height="630" fill="transparent" />
        </g>
      </g>

      <g data-zone="rekayasa">
        <g className="zone-art">
          <LeftTowerStructure />
          <CenterPavilionStructure />
          <RightTowerStructure />
        </g>
        {variant === "reveal" && (
          <g className="zone-label">
            <polyline
              points="1325,145 1360,175 1460,175"
              fill="none"
              stroke="#191919"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="1325" cy="145" r="2.5" fill="#191919" />
            <text
              x="1465"
              y="172"
              textAnchor="start"
              style={{
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: 10,
                fill: "#191919",
                stroke: "none",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              03 REKAYASA — STRUKTUR & SISTEM
            </text>
          </g>
        )}
        <g className="zone-hit">
          <rect x="180" y="200" width="100" height="34" fill="transparent" />
          <rect x="640" y="560" width="320" height="220" fill="transparent" />
          <rect x="1130" y="70" width="410" height="710" fill="transparent" />
        </g>
      </g>
    </svg>
  );
}
