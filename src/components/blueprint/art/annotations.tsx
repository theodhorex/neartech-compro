import { INK, VIEWBOX, LEFT_TOWER, CENTER_PAVILION, RIGHT_TOWER } from "./constants";

const MONO_FONT = "ui-monospace, 'SF Mono', Menlo, monospace";

export function PaperGrid() {
  return (
    <g className="paper-grid" aria-hidden="true">
      <defs>
        <pattern
          id="sheet-grid-pattern"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="20"
            y2="0"
            stroke={INK}
            strokeWidth="0.4"
            strokeOpacity="0.12"
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="20"
            stroke={INK}
            strokeWidth="0.4"
            strokeOpacity="0.12"
          />
          {/* 10-unit fine subdivision tick */}
          <line
            x1="10"
            y1="9"
            x2="10"
            y2="11"
            stroke={INK}
            strokeWidth="0.3"
            strokeOpacity="0.1"
          />
          <line
            x1="9"
            y1="10"
            x2="11"
            y2="10"
            stroke={INK}
            strokeWidth="0.3"
            strokeOpacity="0.1"
          />
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        width={VIEWBOX.width}
        height={VIEWBOX.height}
        fill="url(#sheet-grid-pattern)"
      />

      {/* Grid crosshair marks at major 100-unit intersections */}
      {Array.from({ length: 15 }).map((_, i) => {
        const cx = 100 + i * 100;
        return (
          <g key={`major-grid-x-${cx}`}>
            <line
              x1={cx - 4}
              y1={20}
              x2={cx + 4}
              y2={20}
              stroke={INK}
              strokeWidth="0.6"
              strokeOpacity="0.25"
            />
            <line
              x1={cx}
              y1={16}
              x2={cx}
              y2={24}
              stroke={INK}
              strokeWidth="0.6"
              strokeOpacity="0.25"
            />
          </g>
        );
      })}
    </g>
  );
}

export function DimensionAnnotations() {
  // Horizontal dimension string at y = 840 (beneath ground)
  const dimY1 = 840;
  const segments = [
    { x1: LEFT_TOWER.x, x2: LEFT_TOWER.rightX, text: "86.40" },
    { x1: LEFT_TOWER.rightX, x2: CENTER_PAVILION.x, text: "18.00" },
    { x1: CENTER_PAVILION.x, x2: CENTER_PAVILION.rightX, text: "96.00" },
    { x1: CENTER_PAVILION.rightX, x2: RIGHT_TOWER.x, text: "18.00" },
    { x1: RIGHT_TOWER.x, x2: RIGHT_TOWER.rightX, text: "82.00" },
  ];

  // Helper for 45-degree dimension tick
  const renderTick = (x: number, y: number, key: string) => (
    <line
      key={key}
      x1={x - 4}
      y1={y + 4}
      x2={x + 4}
      y2={y - 4}
      stroke={INK}
      strokeWidth="1.0"
      vectorEffect="non-scaling-stroke"
    />
  );

  return (
    <g className="dimension-annotations">
      {/* Witness lines extending down from building masses */}
      {[
        LEFT_TOWER.x,
        LEFT_TOWER.rightX,
        CENTER_PAVILION.x,
        CENTER_PAVILION.rightX,
        RIGHT_TOWER.x,
        RIGHT_TOWER.rightX,
      ].map((wx, idx) => (
        <line
          key={`wit-${idx}`}
          x1={wx}
          y1={VIEWBOX.groundY + 2}
          x2={wx}
          y2={dimY1 + 10}
          stroke={INK}
          strokeWidth="0.6"
          strokeDasharray="3 3"
          strokeOpacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Continuous horizontal dimension line */}
      <line
        x1={LEFT_TOWER.x}
        y1={dimY1}
        x2={RIGHT_TOWER.rightX}
        y2={dimY1}
        stroke={INK}
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />

      {/* Segment ticks and dimension text */}
      {segments.map((seg, idx) => (
        <g key={`dim-seg-${idx}`}>
          {renderTick(seg.x1, dimY1, `tick-start-${idx}`)}
          {renderTick(seg.x2, dimY1, `tick-end-${idx}`)}
          <text
            x={(seg.x1 + seg.x2) / 2}
            y={dimY1 - 5}
            textAnchor="middle"
            style={{
              fontFamily: MONO_FONT,
              fontSize: 10,
              fill: INK,
              stroke: "none",
              fontWeight: 500,
            }}
          >
            {seg.text}
          </text>
        </g>
      ))}

      {/* Overall total dimension at y = 870 */}
      <line
        x1={LEFT_TOWER.x}
        y1={870}
        x2={RIGHT_TOWER.rightX}
        y2={870}
        stroke={INK}
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
      {renderTick(LEFT_TOWER.x, 870, "tick-tot-left")}
      {renderTick(RIGHT_TOWER.rightX, 870, "tick-tot-right")}
      <text
        x={(LEFT_TOWER.x + RIGHT_TOWER.rightX) / 2}
        y={866}
        textAnchor="middle"
        style={{
          fontFamily: MONO_FONT,
          fontSize: 10.5,
          fill: INK,
          stroke: "none",
          fontWeight: 600,
          letterSpacing: "0.06em",
        }}
      >
        300.40 TOTAL CAMPUS SPAN
      </text>

      {/* Vertical height dimension strings on right side (x = 1565) */}
      <g className="height-dimensions">
        <line
          x1={1565}
          y1={VIEWBOX.groundY}
          x2={1565}
          y2={RIGHT_TOWER.peakY}
          stroke={INK}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        {renderTick(1565, VIEWBOX.groundY, "tick-ht-bot")}
        {renderTick(1565, RIGHT_TOWER.peakY, "tick-ht-top")}
        <text
          x={1572}
          y={(VIEWBOX.groundY + RIGHT_TOWER.peakY) / 2}
          textAnchor="start"
          style={{
            fontFamily: MONO_FONT,
            fontSize: 10,
            fill: INK,
            stroke: "none",
          }}
        >
          126.00
        </text>

        {/* Mast height */}
        <line
          x1={1565}
          y1={RIGHT_TOWER.peakY}
          x2={1565}
          y2={RIGHT_TOWER.antennaTopY}
          stroke={INK}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        {renderTick(1565, RIGHT_TOWER.antennaTopY, "tick-ht-mast")}
        <text
          x={1572}
          y={(RIGHT_TOWER.peakY + RIGHT_TOWER.antennaTopY) / 2 + 3}
          textAnchor="start"
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9.5,
            fill: INK,
            stroke: "none",
          }}
        >
          16.00
        </text>
      </g>
    </g>
  );
}

export function ElevationAnnotations() {
  // Elevation triangles and technical labels
  const elevations = [
    { y: VIEWBOX.groundY, x: 50, value: "+0.00", desc: "GROUND DATUM" },
    { y: 728, x: 540, value: "+12.60", desc: "LOBBY LEVEL" },
    { y: CENTER_PAVILION.peakY, x: 540, value: "+26.00", desc: "PAVILION PARAPET" },
    { y: LEFT_TOWER.setback1Y, x: 490, value: "+38.40", desc: "SETBACK 01" },
    { y: LEFT_TOWER.setback2Y, x: 430, value: "+54.00", desc: "SETBACK 02" },
    { y: LEFT_TOWER.peakY, x: 50, value: "+68.00", desc: "T1 ROOF" },
    { y: RIGHT_TOWER.peakY, x: 1110, value: "+86.40", desc: "T2 CROWN" },
    { y: RIGHT_TOWER.antennaTopY, x: 1350, value: "+98.00", desc: "MAST PINNACLE" },
  ];

  return (
    <g className="elevation-annotations">
      {elevations.map((el, idx) => (
        <g key={`elev-${idx}`}>
          {/* Level datum triangle pointing to elevation */}
          <polygon
            points={`${el.x},${el.y} ${el.x + 8},${el.y - 7} ${el.x + 8},${el.y + 7}`}
            stroke={INK}
            strokeWidth="0.8"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={el.x + 8}
            y1={el.y}
            x2={el.x + 38}
            y2={el.y}
            stroke={INK}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={el.x + 42}
            y={el.y - 2}
            textAnchor="start"
            style={{
              fontFamily: MONO_FONT,
              fontSize: 10,
              fill: INK,
              stroke: "none",
              fontWeight: 600,
            }}
          >
            {el.value}
          </text>
          <text
            x={el.x + 42}
            y={el.y + 8}
            textAnchor="start"
            style={{
              fontFamily: MONO_FONT,
              fontSize: 8.5,
              fill: INK,
              stroke: "none",
              letterSpacing: "0.05em",
            }}
          >
            {el.desc}
          </text>
        </g>
      ))}
    </g>
  );
}

export function SheetMetaAnnotations() {
  return (
    <g className="sheet-meta-annotations">
      {/* Title Block in top-right corner (x: 1320 to 1560, y: 25 to 105) */}
      <g className="title-block">
        <rect
          x={1320}
          y={25}
          width={240}
          height={80}
          stroke={INK}
          strokeWidth="1.2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Subdivision lines */}
        <line x1={1320} y1={50} x2={1560} y2={50} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <line x1={1320} y1={75} x2={1560} y2={75} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <line x1={1440} y1={50} x2={1440} y2={105} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

        {/* Text lines in title block */}
        <text
          x={1330}
          y={41}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 11,
            fill: INK,
            stroke: "none",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          NEARTECH
        </text>
        <text
          x={1450}
          y={41}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9.5,
            fill: INK,
            stroke: "none",
            letterSpacing: "0.05em",
          }}
        >
          ELEVATION A
        </text>

        <text
          x={1330}
          y={66}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9.5,
            fill: INK,
            stroke: "none",
          }}
        >
          SHEET 01
        </text>
        <text
          x={1450}
          y={66}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9.5,
            fill: INK,
            stroke: "none",
          }}
        >
          SCALE 1:200
        </text>

        <text
          x={1330}
          y={93}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            fill: INK,
            stroke: "none",
          }}
        >
          REV: 03
        </text>
        <text
          x={1450}
          y={93}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            fill: INK,
            stroke: "none",
          }}
        >
          TENDER ISSUE
        </text>
      </g>

      {/* North Arrow in top-left corner (x: 80, y: 70) */}
      <g className="north-arrow">
        <circle cx={80} cy={70} r={22} stroke={INK} strokeWidth="1.0" fill="none" vectorEffect="non-scaling-stroke" />
        <line x1={80} y1={44} x2={80} y2={96} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <line x1={54} y1={70} x2={106} y2={70} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        {/* Compass needle */}
        <polygon points="80,50 74,70 80,66" fill={INK} stroke="none" />
        <polygon points="80,50 86,70 80,66" fill="none" stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <polygon points="80,90 74,70 80,74" fill="none" stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <polygon points="80,90 86,70 80,74" fill="none" stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <text
          x={80}
          y={40}
          textAnchor="middle"
          style={{
            fontFamily: MONO_FONT,
            fontSize: 11,
            fill: INK,
            stroke: "none",
            fontWeight: 700,
          }}
        >
          N
        </text>
      </g>

      {/* Graphic Scale Bar "0 5 10 20 m" at bottom-left (x: 80, y: 840) */}
      <g className="scale-bar">
        {/* Scale segments */}
        {/* 0 to 5m (24px) */}
        <rect x={80} y={840} width={24} height={4} fill={INK} stroke={INK} strokeWidth="0.6" />
        {/* 5 to 10m (24px) */}
        <rect x={104} y={840} width={24} height={4} fill="none" stroke={INK} strokeWidth="0.6" />
        {/* 10 to 20m (48px) */}
        <rect x={128} y={840} width={48} height={4} fill={INK} stroke={INK} strokeWidth="0.6" />
        <line x1={80} y1={838} x2={80} y2={846} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <line x1={104} y1={838} x2={104} y2={846} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <line x1={128} y1={838} x2={128} y2={846} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <line x1={176} y1={838} x2={176} y2={846} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <text x={80} y={835} textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9, fill: INK, stroke: "none" }}>0</text>
        <text x={104} y={835} textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9, fill: INK, stroke: "none" }}>5</text>
        <text x={128} y={835} textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9, fill: INK, stroke: "none" }}>10</text>
        <text x={176} y={835} textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9, fill: INK, stroke: "none" }}>20 m</text>
      </g>

      {/* Section Callout "A" with circle and arrows (x: 510, y: 140) */}
      <g className="section-marker">
        {/* Vertical cutting line */}
        <line
          x1={510}
          y1={160}
          x2={510}
          y2={VIEWBOX.groundY}
          stroke={INK}
          strokeWidth="1.0"
          strokeDasharray="16 4 4 4"
          strokeOpacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Top callout circle */}
        <circle cx={510} cy={140} r={14} stroke={INK} strokeWidth="1.2" fill="#FFFFFF" vectorEffect="non-scaling-stroke" />
        <line x1={496} y1={140} x2={524} y2={140} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <text
          x={510}
          y={136}
          textAnchor="middle"
          style={{ fontFamily: MONO_FONT, fontSize: 10, fill: INK, stroke: "none", fontWeight: 700 }}
        >
          A
        </text>
        <text
          x={510}
          y={150}
          textAnchor="middle"
          style={{ fontFamily: MONO_FONT, fontSize: 8.5, fill: INK, stroke: "none" }}
        >
          AR-04
        </text>
        {/* Direction arrow pointing right */}
        <polygon points="526,140 536,134 536,146" fill={INK} stroke="none" />
      </g>

      {/* Technical Notes: TYP. and FFL Callouts */}
      <g className="typ-notes">
        <text
          x={LEFT_TOWER.x + 12}
          y={LEFT_TOWER.setback1Y + 20}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            fill: INK,
            stroke: "none",
            letterSpacing: "0.08em",
          }}
        >
          TYP. GLAZING CW-01
        </text>
        <text
          x={RIGHT_TOWER.x + 12}
          y={RIGHT_TOWER.setback1Y + 20}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            fill: INK,
            stroke: "none",
            letterSpacing: "0.08em",
          }}
        >
          TYP. SPANDREL SP-02
        </text>
        <text
          x={CENTER_PAVILION.x + 16}
          y={CENTER_PAVILION.lobbyCeilingY - 8}
          style={{
            fontFamily: MONO_FONT,
            fontSize: 9,
            fill: INK,
            stroke: "none",
            letterSpacing: "0.08em",
          }}
        >
          FFL +12.60 ATRIUM
        </text>
      </g>

      {/* Numbered Detail Callout Bubbles */}
      <g className="detail-callouts">
        {/* Callout 01 at Left Tower Setback */}
        <g>
          <polyline points="440,432 460,400 480,400" fill="none" stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <circle cx="440" cy="432" r="2" fill={INK} />
          <circle cx="494" cy="400" r="12" stroke={INK} strokeWidth="0.8" fill="#FFFFFF" vectorEffect="non-scaling-stroke" />
          <text x="494" y="403.5" textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9.5, fill: INK, stroke: "none", fontWeight: 600 }}>01</text>
        </g>
        {/* Callout 02 at Canopy Tie-Rod */}
        <g>
          <polyline points="780,676 750,650 720,650" fill="none" stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <circle cx="780" cy="676" r="2" fill={INK} />
          <circle cx="706" cy="650" r="12" stroke={INK} strokeWidth="0.8" fill="#FFFFFF" vectorEffect="non-scaling-stroke" />
          <text x="706" y="653.5" textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9.5, fill: INK, stroke: "none", fontWeight: 600 }}>02</text>
        </g>
        {/* Callout 03 at Roof Equipment */}
        <g>
          <polyline points="1440,130 1460,110 1480,110" fill="none" stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <circle cx="1440" cy="130" r="2" fill={INK} />
          <circle cx="1494" cy="110" r="12" stroke={INK} strokeWidth="0.8" fill="#FFFFFF" vectorEffect="non-scaling-stroke" />
          <text x="1494" y="113.5" textAnchor="middle" style={{ fontFamily: MONO_FONT, fontSize: 9.5, fill: INK, stroke: "none", fontWeight: 600 }}>03</text>
        </g>
      </g>
    </g>
  );
}
