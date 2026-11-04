import { DimensionAnnotations, ElevationAnnotations, PaperGrid, SheetMetaAnnotations } from "./annotations";
import { bpStyle } from "./anim";
import { INK, VIEWBOX, LEFT_TOWER, CENTER_PAVILION, RIGHT_TOWER } from "./constants";

export function StrategyZone({ variant }: { variant: "base" | "reveal" }) {
  // Ground hatch lines at 45 degrees beneath y=780 to y=800
  const hatchLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const hatchSpacing = 10;
  for (let x = 0; x <= VIEWBOX.width + 20; x += hatchSpacing) {
    hatchLines.push({
      x1: x,
      y1: VIEWBOX.groundY,
      x2: x - 20,
      y2: VIEWBOX.hatchBottomY,
    });
  }

  // Foundation pile caps and drilled piers
  const pileCapLocations = [
    // Left tower piles
    { x: 90, depth: 845, width: 34 },
    { x: 170, depth: 855, width: 34 },
    { x: 250, depth: 860, width: 40 },
    { x: 330, depth: 855, width: 34 },
    { x: 410, depth: 850, width: 34 },
    { x: 450, depth: 840, width: 28 },
    // Center pavilion piles
    { x: 590, depth: 835, width: 30 },
    { x: 670, depth: 840, width: 30 },
    { x: 750, depth: 845, width: 36 },
    { x: 850, depth: 845, width: 36 },
    { x: 930, depth: 840, width: 30 },
    { x: 1010, depth: 835, width: 30 },
    // Right tower piles (heavy load)
    { x: 1155, depth: 850, width: 34 },
    { x: 1235, depth: 865, width: 40 },
    { x: 1315, depth: 870, width: 44 },
    { x: 1395, depth: 865, width: 40 },
    { x: 1475, depth: 855, width: 36 },
    { x: 1515, depth: 845, width: 30 },
  ];

  // Grid axes (vertical centerline/grid lines)
  const gridAxes = [
    { id: "1", x: LEFT_TOWER.x, label: "GL-01" },
    { id: "2", x: 270, label: "GL-02" },
    { id: "3", x: LEFT_TOWER.rightX, label: "GL-03" },
    { id: "4", x: CENTER_PAVILION.x, label: "GL-04" },
    { id: "5", x: 800, label: "GL-05" },
    { id: "6", x: CENTER_PAVILION.rightX, label: "GL-06" },
    { id: "7", x: RIGHT_TOWER.x, label: "GL-07" },
    { id: "8", x: 1335, label: "GL-08" },
    { id: "9", x: RIGHT_TOWER.rightX, label: "GL-09" },
  ];

  // Level datum markers
  const datumLevels = [
    { y: VIEWBOX.groundY, label: "±0.00 BASELINE", code: "L01" },
    { y: 728, label: "+12.60 LOBBY CEIL", code: "L02" },
    { y: CENTER_PAVILION.peakY, label: "+22.00 PAVILION RF", code: "L08" },
    { y: LEFT_TOWER.setback1Y, label: "+33.80 TOWER TERRACE", code: "L14" },
    { y: LEFT_TOWER.peakY, label: "+55.00 T1 ROOF", code: "L22" },
    { y: RIGHT_TOWER.peakY, label: "+63.00 T2 ROOF", code: "L25" },
    { y: RIGHT_TOWER.antennaTopY, label: "+71.00 MAST PINNACLE", code: "TOP" },
  ];

  const renderPile = (
    pile: { x: number; depth: number; width: number },
    key: string
  ) => (
    <g key={key}>
      {/* Pile cap pad */}
      <rect
        x={pile.x - pile.width / 2}
        y={VIEWBOX.groundY + 12}
        width={pile.width}
        height={18}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Drilled pier shaft */}
      <line
        x1={pile.x - 7}
        y1={VIEWBOX.groundY + 30}
        x2={pile.x - 7}
        y2={pile.depth}
        stroke={INK}
        strokeWidth="0.6"
        strokeDasharray="4 2"
        vectorEffect="non-scaling-stroke"
        className="ink-dash"
      />
      <line
        x1={pile.x + 7}
        y1={VIEWBOX.groundY + 30}
        x2={pile.x + 7}
        y2={pile.depth}
        stroke={INK}
        strokeWidth="0.6"
        strokeDasharray="4 2"
        vectorEffect="non-scaling-stroke"
        className="ink-dash"
      />
      <line
        x1={pile.x - 7}
        y1={pile.depth}
        x2={pile.x + 7}
        y2={pile.depth}
        stroke={INK}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
        className="ink-detail"
      />
      {/* Pile rebar center tick */}
      <line
        x1={pile.x}
        y1={VIEWBOX.groundY + 12}
        x2={pile.x}
        y2={pile.depth - 4}
        stroke={INK}
        strokeWidth="0.6"
        strokeDasharray="2 4"
        vectorEffect="non-scaling-stroke"
        className="ink-detail"
      />
    </g>
  );

  return (
    <g data-zone="strategi">
      <g className="zone-art">
        {/* Fine paper grid in reveal variant (fades in with annotations) */}
        {variant === "reveal" && (
          <g className="bp-fade" style={bpStyle(3.8, 0.6)}>
            <PaperGrid />
          </g>
        )}

        {/* Foundation sub-grade outline & basement slab (dashed, fade) */}
        <g className="bp-fade" style={bpStyle(0.3, 0.6)}>
          <line
            x1="40"
            y1="810"
            x2="1560"
            y2="810"
            stroke={INK}
            strokeWidth="0.8"
            strokeDasharray="6 3"
            vectorEffect="non-scaling-stroke"
            className="ink-dash"
          />
          <line
            x1="40"
            y1="835"
            x2="1560"
            y2="835"
            stroke={INK}
            strokeWidth="0.6"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            className="ink-detail"
          />
        </g>

        {/* Foundation pile caps and piers (grouped by mass into 3 waves) */}
        <g className="bp-fade" style={bpStyle(0.35, 0.5)}>
          {pileCapLocations.slice(0, 6).map((pile, idx) => renderPile(pile, `pile-left-${idx}`))}
        </g>
        <g className="bp-fade" style={bpStyle(0.50, 0.5)}>
          {pileCapLocations.slice(6, 12).map((pile, idx) => renderPile(pile, `pile-center-${idx}`))}
        </g>
        <g className="bp-fade" style={bpStyle(0.65, 0.5)}>
          {pileCapLocations.slice(12).map((pile, idx) => renderPile(pile, `pile-right-${idx}`))}
        </g>

        {/* Diagonal soil hatch lines in 3 quick waves */}
        <g className="bp-fade" style={bpStyle(0.3, 0.5)}>
          {hatchLines.filter((h) => h.x1 < 540).map((h, i) => (
            <line
              key={`hatch-l-${i}`}
              x1={h.x1}
              y1={h.y1}
              x2={h.x2}
              y2={h.y2}
              stroke={INK}
              strokeWidth="0.6"
              strokeOpacity="0.45"
              vectorEffect="non-scaling-stroke"
              className="ink-detail"
            />
          ))}
        </g>
        <g className="bp-fade" style={bpStyle(0.45, 0.5)}>
          {hatchLines.filter((h) => h.x1 >= 540 && h.x1 < 1080).map((h, i) => (
            <line
              key={`hatch-c-${i}`}
              x1={h.x1}
              y1={h.y1}
              x2={h.x2}
              y2={h.y2}
              stroke={INK}
              strokeWidth="0.6"
              strokeOpacity="0.45"
              vectorEffect="non-scaling-stroke"
              className="ink-detail"
            />
          ))}
        </g>
        <g className="bp-fade" style={bpStyle(0.60, 0.5)}>
          {hatchLines.filter((h) => h.x1 >= 1080).map((h, i) => (
            <line
              key={`hatch-r-${i}`}
              x1={h.x1}
              y1={h.y1}
              x2={h.x2}
              y2={h.y2}
              stroke={INK}
              strokeWidth="0.6"
              strokeOpacity="0.45"
              vectorEffect="non-scaling-stroke"
              className="ink-detail"
            />
          ))}
        </g>

        {/* Soil sub-grade boundary line (drawn left to right) */}
        <line
          x1="0"
          y1={VIEWBOX.hatchBottomY}
          x2={VIEWBOX.width}
          y2={VIEWBOX.hatchBottomY}
          pathLength={1}
          className="bp-draw ink-detail"
          style={bpStyle(0.2, 0.75)}
          stroke={INK}
          strokeWidth="0.8"
        />

        {/* Main ground line (y=780, drawn left to right) */}
        <line
          x1="0"
          y1={VIEWBOX.groundY}
          x2={VIEWBOX.width}
          y2={VIEWBOX.groundY}
          pathLength={1}
          className="bp-draw ink-main"
          style={bpStyle(0.0, 0.85)}
          stroke={INK}
          strokeWidth="1.6"
        />

        {/* Vertical Grid Axis Lines across elevation */}
        {gridAxes.map((axis, idx) => (
          <g key={`axis-${axis.id}`} className="bp-fade" style={bpStyle(0.50 + idx * 0.08, 0.6)}>
            <line
              x1={axis.x}
              y1={50}
              x2={axis.x}
              y2={VIEWBOX.groundY + 50}
              stroke={INK}
              strokeWidth="0.6"
              strokeDasharray="14 4 3 4"
              strokeOpacity="0.4"
              vectorEffect="non-scaling-stroke"
              className="ink-dash"
            />
            {/* Grid bubble at bottom */}
            <circle
              cx={axis.x}
              cy={VIEWBOX.groundY + 68}
              r={9}
              stroke={INK}
              strokeWidth="0.8"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={axis.x}
              y={VIEWBOX.groundY + 72}
              textAnchor="middle"
              style={{
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: 10,
                fill: INK,
                fontWeight: 500,
              }}
            >
              {axis.id}
            </text>
          </g>
        ))}

        {/* Level Datum Reference Lines */}
        {datumLevels.map((lvl, idx) => (
          <g key={`datum-${idx}`} className="bp-fade" style={bpStyle(0.65 + idx * 0.06, 0.5)}>
            <line
              x1="20"
              y1={lvl.y}
              x2="55"
              y2={lvl.y}
              stroke={INK}
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            <polygon
              points={`45,${lvl.y} 55,${lvl.y - 4} 55,${lvl.y + 4}`}
              fill={INK}
              stroke="none"
            />
            {/* Datum level code for base */}
            <text
              x="16"
              y={lvl.y + 3}
              textAnchor="end"
              style={{
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: 8.5,
                fill: INK,
                letterSpacing: "0.05em",
              }}
            >
              {lvl.code}
            </text>
          </g>
        ))}

        {/* Reveal-only Technical Annotations (fade in at ~3.8s) */}
        {variant === "reveal" && (
          <g className="bp-fade" style={bpStyle(3.8, 0.6)}>
            <DimensionAnnotations />
            <ElevationAnnotations />
            <SheetMetaAnnotations />
          </g>
        )}
      </g>

      {/* Zone label: callout line and text (REVEAL ONLY, controlled by active-zone V3b) */}
      {variant === "reveal" && (
        <g className="zone-label">
          {/* Leader line pointing to ground / foundation */}
          <polyline
            points="240,780 210,810 120,810"
            fill="none"
            stroke={INK}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="240" cy="780" r="2.5" fill={INK} />
          <text
            x="115"
            y="807"
            textAnchor="end"
            style={{
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: 10,
              fill: INK,
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            01 STRATEGI — DENAH & FONDASI
          </text>
        </g>
      )}

      {/* Zone Hit Area (both variants) */}
      <g className="zone-hit">
        <rect
          x="0"
          y="750"
          width="1600"
          height="150"
          fill="transparent"
        />
        <rect
          x="0"
          y="50"
          width="70"
          height="750"
          fill="transparent"
        />
      </g>
    </g>
  );
}
