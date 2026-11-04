import { bpStyle } from "./anim";
import { INK, CENTER_PAVILION, VIEWBOX } from "./constants";

export function CenterPavilionFacade() {
  const elements: React.ReactNode[] = [];

  // Floor levels from y=728 down to 560 (Levels 3 to 8)
  const floorYs: number[] = [];
  for (let y = CENTER_PAVILION.lobbyCeilingY; y >= CENTER_PAVILION.peakY + 4; y -= CENTER_PAVILION.floorHeight) {
    floorYs.push(y);
  }

  // Helper for window panes with chamfers
  const renderWindow = (
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    isChamfered: boolean
  ) => {
    if (isChamfered) {
      const c = 3.5;
      const pts = `${x + c},${y} ${x + w - c},${y} ${x + w},${y + c} ${x + w},${y + h - c} ${x + w - c},${y + h} ${x + c},${y + h} ${x},${y + h - c} ${x},${y + c}`;
      return (
        <g key={key}>
          <polygon
            points={pts}
            stroke={INK}
            strokeWidth="0.6"
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="ink-detail"
          />
          <line
            x1={x + w / 2}
            y1={y}
            x2={x + w / 2}
            y2={y + h}
            stroke={INK}
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
            className="ink-detail"
          />
        </g>
      );
    }
    return (
      <g key={key}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          stroke={INK}
          strokeWidth="0.6"
          fill="none"
          vectorEffect="non-scaling-stroke"
          className="ink-detail"
        />
        <line
          x1={x + w / 2}
          y1={y}
          x2={x + w / 2}
          y2={y + h}
          stroke={INK}
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          className="ink-detail"
        />
      </g>
    );
  };

  // Render upper floor windows (12 bays across 480 width = 40 wide each)
  const numBays = 12;
  const bayW = CENTER_PAVILION.width / numBays;
  for (let i = 0; i < floorYs.length - 1; i++) {
    const bottomY = floorYs[i];
    const topY = floorYs[i + 1];
    for (let bx = 0; bx < numBays; bx++) {
      const bayX = CENTER_PAVILION.x + bx * bayW;
      const isChamfer = (i + bx) % 3 === 2;
      elements.push(
        renderWindow(
          `cp-win-${i}-${bx}`,
          bayX + 3,
          topY + 3.5,
          bayW - 6,
          bottomY - topY - 7,
          isChamfer
        )
      );
    }
  }

  // Scale trees (circles + trunk line)
  const trees = [
    { cx: 505, trunkH: 35, r: 16 },
    { cx: 532, trunkH: 26, r: 12 },
    { cx: 1068, trunkH: 26, r: 12 },
    { cx: 1095, trunkH: 35, r: 16 },
  ];

  // Scale figures (minimalist stick lines)
  const figures = [
    { x: 722, y: VIEWBOX.groundY },
    { x: 735, y: VIEWBOX.groundY },
    { x: 865, y: VIEWBOX.groundY },
    { x: 880, y: VIEWBOX.groundY },
    { x: 785, y: CENTER_PAVILION.peakY }, // On roof terrace
  ];

  return (
    <g className="center-pavilion-facade">
      {/* Pavilion Main Outline (x: 560 to 1040, y: 560 to 780) */}
      <rect
        x={CENTER_PAVILION.x}
        y={CENTER_PAVILION.peakY}
        width={CENTER_PAVILION.width}
        height={VIEWBOX.groundY - CENTER_PAVILION.peakY}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        pathLength={1}
        className="bp-draw ink-main"
        style={bpStyle(1.20, 0.75)}
      />

      {/* Roof Parapet Line */}
      <line
        x1={CENTER_PAVILION.x - 4}
        y1={CENTER_PAVILION.peakY}
        x2={CENTER_PAVILION.rightX + 4}
        y2={CENTER_PAVILION.peakY}
        stroke={INK}
        strokeWidth="1.2"
        pathLength={1}
        className="bp-draw ink-main"
        style={bpStyle(1.35, 0.6)}
      />

      {/* Roof Terrace Glass Balustrade (y: 548 to 560) */}
      <g className="bp-fade" style={bpStyle(1.45, 0.5)}>
        <rect
          x={CENTER_PAVILION.x + 4}
          y={CENTER_PAVILION.peakY - 12}
          width={CENTER_PAVILION.width - 8}
          height={12}
          stroke={INK}
          strokeWidth="0.8"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {Array.from({ length: 11 }).map((_, r) => (
          <line
            key={`roof-post-${r}`}
            x1={CENTER_PAVILION.x + (r + 1) * 40}
            y1={CENTER_PAVILION.peakY - 12}
            x2={CENTER_PAVILION.x + (r + 1) * 40}
            y2={CENTER_PAVILION.peakY}
            stroke={INK}
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Architectural Pergola / Trellis on roof (x: 680 to 920, y: 536 to 560) */}
      <g className="roof-pergola bp-fade" style={bpStyle(1.55, 0.5)}>
        {/* Slender vertical posts */}
        {[680, 740, 800, 860, 920].map((px) => (
          <line
            key={`pergola-post-${px}`}
            x1={px}
            y1={536}
            x2={px}
            y2={CENTER_PAVILION.peakY}
            stroke={INK}
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* Horizontal trellis slats */}
        <line x1={670} y1={536} x2={930} y2={536} stroke={INK} strokeWidth="1.0" vectorEffect="non-scaling-stroke" />
        <line x1={670} y1={540} x2={930} y2={540} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <line x1={670} y1={544} x2={930} y2={544} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </g>

      {/* Double-Height Grand Entrance Lobby (y: 728 to 780) */}
      <g className="lobby-facade">
        {/* Lobby Ceiling / Spandrel beam */}
        <line
          x1={CENTER_PAVILION.x}
          y1={CENTER_PAVILION.lobbyCeilingY}
          x2={CENTER_PAVILION.rightX}
          y2={CENTER_PAVILION.lobbyCeilingY}
          stroke={INK}
          strokeWidth="1.2"
          pathLength={1}
          className="bp-draw ink-main"
          style={bpStyle(1.30, 0.6)}
        />

        {/* Tall Lobby Curtain Wall Mullions */}
        <g className="bp-fade" style={bpStyle(1.45, 0.5)}>
          {Array.from({ length: 15 }).map((_, m) => {
            const lx = CENTER_PAVILION.x + (m + 1) * 30;
            return (
              <line
                key={`lobby-mullion-${m}`}
                x1={lx}
                y1={CENTER_PAVILION.lobbyCeilingY}
                x2={lx}
                y2={VIEWBOX.groundY}
                stroke={INK}
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
                className="ink-detail"
              />
            );
          })}
        </g>

        {/* Grand Entrance Canopy (x: 740 to 860, y: 724 to 728) */}
        <g className="entrance-canopy">
          {/* Canopy Fascia Beam */}
          <rect
            x={CENTER_PAVILION.canopyX}
            y={CENTER_PAVILION.canopyY - 4}
            width={CENTER_PAVILION.canopyWidth}
            height={5}
            stroke={INK}
            strokeWidth="1.2"
            fill="none"
            pathLength={1}
            className="bp-draw ink-main"
            style={bpStyle(1.50, 0.5)}
          />
          {/* Suspension Tension Tie Rods */}
          <line
            x1={750}
            y1={CENTER_PAVILION.canopyY - 4}
            x2={780}
            y2={676}
            stroke={INK}
            strokeWidth="0.8"
            pathLength={1}
            className="bp-draw"
            style={bpStyle(1.60, 0.5)}
          />
          <line
            x1={850}
            y1={CENTER_PAVILION.canopyY - 4}
            x2={820}
            y2={676}
            stroke={INK}
            strokeWidth="0.8"
            pathLength={1}
            className="bp-draw"
            style={bpStyle(1.60, 0.5)}
          />
          {/* Anchor connection brackets */}
          <g className="bp-fade" style={bpStyle(1.70, 0.4)}>
            <circle cx="780" cy="676" r="2.5" stroke={INK} strokeWidth="0.8" fill="none" />
            <circle cx="820" cy="676" r="2.5" stroke={INK} strokeWidth="0.8" fill="none" />

            {/* Architectural Signage "NT" */}
            <g className="signage-nt">
              {/* Backplate box */}
              <rect
                x={786}
                y={706}
                width={28}
                height={14}
                stroke={INK}
                strokeWidth="0.8"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Letter 'N' */}
              <polyline
                points="791,717 791,709 797,717 797,709"
                stroke={INK}
                strokeWidth="1.0"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              {/* Letter 'T' */}
              <line x1="801" y1="709" x2="809" y2="709" stroke={INK} strokeWidth="1.0" vectorEffect="non-scaling-stroke" />
              <line x1="805" y1="709" x2="805" y2="717" stroke={INK} strokeWidth="1.0" vectorEffect="non-scaling-stroke" />
            </g>

            {/* Central Revolving Doors */}
            <rect
              x={785}
              y={746}
              width={30}
              height={34}
              stroke={INK}
              strokeWidth="0.8"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Revolving door wings */}
            <line x1={800} y1={746} x2={800} y2={780} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
            <ellipse cx="800" cy="746" rx="14" ry="3" stroke={INK} strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke" />
          </g>
        </g>
      </g>

      {/* Upper floor window panes (fades in as detail wave) */}
      <g className="bp-fade" style={bpStyle(2.10, 0.5)}>
        {elements}
      </g>

      {/* Flagpoles at entrance plaza */}
      <g className="flagpoles">
        <line
          x1={710}
          y1={VIEWBOX.groundY}
          x2={710}
          y2={710}
          stroke={INK}
          strokeWidth="0.8"
          pathLength={1}
          className="bp-draw"
          style={bpStyle(2.20, 0.5)}
        />
        <line
          x1={890}
          y1={VIEWBOX.groundY}
          x2={890}
          y2={710}
          stroke={INK}
          strokeWidth="0.8"
          pathLength={1}
          className="bp-draw"
          style={bpStyle(2.20, 0.5)}
        />
        <g className="bp-fade" style={bpStyle(2.35, 0.4)}>
          <circle cx={710} cy={708} r={2} fill={INK} stroke="none" />
          <line x1={710} y1={714} x2={722} y2={717} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          <line x1={722} y1={717} x2={710} y2={721} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          <circle cx={890} cy={708} r={2} fill={INK} stroke="none" />
          <line x1={890} y1={714} x2={902} y2={717} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
          <line x1={902} y1={717} x2={890} y2={721} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </g>
      </g>

      {/* Minimalist Sketch Trees */}
      <g className="plaza-trees bp-fade" style={bpStyle(2.60, 0.5)}>
        {trees.map((t, idx) => (
          <g key={`tree-${idx}`}>
            {/* Trunk */}
            <line
              x1={t.cx}
              y1={VIEWBOX.groundY - t.trunkH}
              x2={t.cx}
              y2={VIEWBOX.groundY}
              stroke={INK}
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            {/* Crown circle */}
            <circle
              cx={t.cx}
              cy={VIEWBOX.groundY - t.trunkH - t.r}
              r={t.r}
              stroke={INK}
              strokeWidth="0.8"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            {/* Inner canopy concentric circle */}
            <circle
              cx={t.cx}
              cy={VIEWBOX.groundY - t.trunkH - t.r}
              r={t.r * 0.6}
              stroke={INK}
              strokeWidth="0.6"
              strokeDasharray="2 3"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </g>

      {/* Minimalist Human Scale Silhouettes */}
      <g className="scale-figures bp-fade" style={bpStyle(2.75, 0.5)}>
        {figures.map((fig, idx) => (
          <g key={`fig-${idx}`}>
            {/* Head circle */}
            <circle cx={fig.x} cy={fig.y - 15} r={2} stroke={INK} strokeWidth="0.6" fill="none" />
            {/* Spine */}
            <line x1={fig.x} y1={fig.y - 13} x2={fig.x} y2={fig.y - 6} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            {/* Legs */}
            <line x1={fig.x} y1={fig.y - 6} x2={fig.x - 2} y2={fig.y} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            <line x1={fig.x} y1={fig.y - 6} x2={fig.x + 2} y2={fig.y} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </g>
    </g>
  );
}

export function CenterPavilionStructure() {
  const columns = [
    CENTER_PAVILION.x + 8,
    CENTER_PAVILION.x + 80,
    CENTER_PAVILION.x + 160,
    CENTER_PAVILION.x + 240,
    CENTER_PAVILION.x + 320,
    CENTER_PAVILION.x + 400,
    CENTER_PAVILION.rightX - 8,
  ];

  return (
    <g className="center-pavilion-structure">
      {/* Structural floor slab lines (drawn bottom-to-top) */}
      {Array.from({ length: 9 }).map((_, f) => {
        const fy = VIEWBOX.groundY - f * CENTER_PAVILION.floorHeight;
        if (fy < CENTER_PAVILION.peakY) return null;
        return (
          <g key={`cp-slab-${f}`}>
            <line
              x1={CENTER_PAVILION.x}
              y1={fy}
              x2={CENTER_PAVILION.rightX}
              y2={fy}
              pathLength={1}
              className="bp-draw ink-main"
              style={bpStyle(1.30 + f * 0.06, 0.5)}
              stroke={INK}
              strokeWidth="0.8"
            />
            <line
              x1={CENTER_PAVILION.x + 2}
              y1={fy - 4}
              x2={CENTER_PAVILION.rightX - 2}
              y2={fy - 4}
              stroke={INK}
              strokeWidth="0.6"
              strokeDasharray="4 2"
              vectorEffect="non-scaling-stroke"
              className="ink-dash bp-fade"
              style={bpStyle(1.35 + f * 0.06, 0.45)}
            />
          </g>
        );
      })}

      {/* Structural Columns (dashed) */}
      <g className="bp-fade" style={bpStyle(1.80, 0.5)}>
        {columns.map((cx, idx) => (
          <line
            key={`cp-col-${idx}`}
            x1={cx}
            y1={CENTER_PAVILION.peakY}
            x2={cx}
            y2={VIEWBOX.groundY}
            stroke={INK}
            strokeWidth="1.0"
            strokeDasharray="16 4 4 4"
            strokeOpacity="0.75"
            vectorEffect="non-scaling-stroke"
            className="ink-dash"
          />
        ))}
      </g>

      {/* Structural transfer beam above double-height lobby (y=728, dashed) */}
      <line
        x1={CENTER_PAVILION.x}
        y1={CENTER_PAVILION.lobbyCeilingY + 6}
        x2={CENTER_PAVILION.rightX}
        y2={CENTER_PAVILION.lobbyCeilingY + 6}
        stroke={INK}
        strokeWidth="0.8"
        strokeDasharray="6 3"
        vectorEffect="non-scaling-stroke"
        className="ink-dash bp-fade"
        style={bpStyle(1.60, 0.5)}
      />
    </g>
  );
}
