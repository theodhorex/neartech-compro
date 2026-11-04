import { INK, LEFT_TOWER, VIEWBOX } from "./constants";

export function LeftTowerFacade() {
  const elements: React.ReactNode[] = [];

  // Tier 1: Ground to Setback 1 (y: 780 down to 442)
  const tier1FloorYs: number[] = [];
  for (let y = VIEWBOX.groundY; y >= LEFT_TOWER.setback1Y; y -= LEFT_TOWER.floorHeight) {
    tier1FloorYs.push(y);
  }

  // Tier 2: Setback 1 to Setback 2 (y: 442 down to 312)
  const tier2FloorYs: number[] = [];
  for (let y = LEFT_TOWER.setback1Y; y >= LEFT_TOWER.setback2Y; y -= LEFT_TOWER.floorHeight) {
    tier2FloorYs.push(y);
  }

  // Tier 3: Setback 2 to Roof (y: 312 down to 234)
  const tier3FloorYs: number[] = [];
  for (let y = LEFT_TOWER.setback2Y; y >= LEFT_TOWER.peakY + 4; y -= LEFT_TOWER.floorHeight) {
    tier3FloorYs.push(y);
  }

  // Helper to generate chamfered polygon or rect
  const renderWindow = (
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    isChamfered: boolean
  ) => {
    if (isChamfered) {
      const c = 4; // chamfer offset
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
          {/* Inner mullion split */}
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

  // Render Tier 1 Windows & Mullions (x: 70 to 470, 10 bays of 40)
  for (let i = 0; i < tier1FloorYs.length - 1; i++) {
    const bottomY = tier1FloorYs[i];
    const topY = tier1FloorYs[i + 1];
    const isGroundLobby = i < 2; // Ground 2 levels have tall glazing
    if (!isGroundLobby) {
      for (let bx = 0; bx < 10; bx++) {
        const bayX = LEFT_TOWER.x + bx * LEFT_TOWER.mullionWidth;
        const isChamfer = (i + bx) % 3 === 0;
        elements.push(
          renderWindow(
            `t1-win-${i}-${bx}`,
            bayX + 4,
            topY + 4,
            LEFT_TOWER.mullionWidth - 8,
            bottomY - topY - 8,
            isChamfer
          )
        );
      }
    }
  }

  // Render Tier 2 Windows (x: 70 to 410, 8.5 bays)
  for (let i = 0; i < tier2FloorYs.length - 1; i++) {
    const bottomY = tier2FloorYs[i];
    const topY = tier2FloorYs[i + 1];
    for (let bx = 0; bx < 8; bx++) {
      const bayX = LEFT_TOWER.x + bx * 42.5;
      const isChamfer = (i + bx) % 4 === 1;
      elements.push(
        renderWindow(
          `t2-win-${i}-${bx}`,
          bayX + 4,
          topY + 4,
          42.5 - 8,
          bottomY - topY - 8,
          isChamfer
        )
      );
    }
  }

  // Render Tier 3 Windows (x: 90 to 370, 7 bays of 40)
  for (let i = 0; i < tier3FloorYs.length - 1; i++) {
    const bottomY = tier3FloorYs[i];
    const topY = tier3FloorYs[i + 1];
    for (let bx = 0; bx < 7; bx++) {
      const bayX = LEFT_TOWER.setback2LeftX + bx * 40;
      const isChamfer = (i + bx) % 3 === 2;
      elements.push(
        renderWindow(
          `t3-win-${i}-${bx}`,
          bayX + 4,
          topY + 4,
          40 - 8,
          bottomY - topY - 8,
          isChamfer
        )
      );
    }
  }

  return (
    <g className="left-tower-facade">
      {/* Tier 1 Facade Outline & Mullions */}
      <rect
        x={LEFT_TOWER.x}
        y={LEFT_TOWER.setback1Y}
        width={LEFT_TOWER.width}
        height={VIEWBOX.groundY - LEFT_TOWER.setback1Y}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Tier 1 Vertical Mullions */}
      {Array.from({ length: 9 }).map((_, bx) => (
        <line
          key={`t1-mullion-${bx}`}
          x1={LEFT_TOWER.x + (bx + 1) * LEFT_TOWER.mullionWidth}
          y1={LEFT_TOWER.setback1Y}
          x2={LEFT_TOWER.x + (bx + 1) * LEFT_TOWER.mullionWidth}
          y2={VIEWBOX.groundY}
          stroke={INK}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          className="ink-detail"
        />
      ))}

      {/* Tier 2 Facade Outline (x: 70 to 410, y: 442 down to 312) */}
      <rect
        x={LEFT_TOWER.x}
        y={LEFT_TOWER.setback2Y}
        width={340}
        height={LEFT_TOWER.setback1Y - LEFT_TOWER.setback2Y}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Setback 1 Terrace (x: 410 to 470 at y=442) */}
      <line
        x1={410}
        y1={LEFT_TOWER.setback1Y}
        x2={470}
        y2={LEFT_TOWER.setback1Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Setback 1 Glass Railing / Balustrade */}
      <rect
        x={412}
        y={LEFT_TOWER.setback1Y - 12}
        width={56}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={440}
        y1={LEFT_TOWER.setback1Y - 12}
        x2={440}
        y2={LEFT_TOWER.setback1Y}
        stroke={INK}
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />

      {/* Tier 3 Facade Outline (x: 90 to 370, y: 312 down to 234) */}
      <rect
        x={LEFT_TOWER.setback2LeftX}
        y={LEFT_TOWER.peakY + 4}
        width={280}
        height={LEFT_TOWER.setback2Y - (LEFT_TOWER.peakY + 4)}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Setback 2 Terraces (left x: 70-90, right x: 370-410 at y=312) */}
      <line
        x1={70}
        y1={LEFT_TOWER.setback2Y}
        x2={90}
        y2={LEFT_TOWER.setback2Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={72}
        y={LEFT_TOWER.setback2Y - 12}
        width={16}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={370}
        y1={LEFT_TOWER.setback2Y}
        x2={410}
        y2={LEFT_TOWER.setback2Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={372}
        y={LEFT_TOWER.setback2Y - 12}
        width={36}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />

      {/* Roof Parapet & Glass Crown (y: 230 to 234) */}
      <line
        x1={LEFT_TOWER.setback2LeftX - 4}
        y1={LEFT_TOWER.peakY}
        x2={LEFT_TOWER.setback2RightX + 4}
        y2={LEFT_TOWER.peakY}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      <line
        x1={LEFT_TOWER.setback2LeftX - 4}
        y1={LEFT_TOWER.peakY + 4}
        x2={LEFT_TOWER.setback2RightX + 4}
        y2={LEFT_TOWER.peakY + 4}
        stroke={INK}
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />

      {/* Window panes */}
      {elements}

      {/* External Fire Escape Stairs on left side (x: 52 to 70, y: 442 to 780) */}
      <g className="external-stair">
        <line
          x1={54}
          y1={LEFT_TOWER.setback1Y}
          x2={54}
          y2={VIEWBOX.groundY}
          stroke={INK}
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        {Array.from({ length: 7 }).map((_, s) => {
          const sy1 = LEFT_TOWER.setback1Y + s * 48;
          const sy2 = sy1 + 24;
          const sy3 = sy1 + 48;
          return (
            <g key={`stair-${s}`}>
              {/* Landings */}
              <line
                x1={54}
                y1={sy1}
                x2={70}
                y2={sy1}
                stroke={INK}
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={54}
                y1={sy2}
                x2={70}
                y2={sy2}
                stroke={INK}
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
              {/* Diagonal flights */}
              <line
                x1={56}
                y1={sy1}
                x2={68}
                y2={sy2}
                stroke={INK}
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={68}
                y1={sy2}
                x2={56}
                y2={sy3}
                stroke={INK}
                strokeWidth="0.6"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </g>
    </g>
  );
}

export function LeftTowerStructure() {
  // Columns and structural core (for engineering zone)
  const columns = [
    LEFT_TOWER.x + 8,
    LEFT_TOWER.x + 80,
    LEFT_TOWER.x + 160,
    LEFT_TOWER.x + 240,
    LEFT_TOWER.x + 320,
    LEFT_TOWER.x + 392,
  ];

  return (
    <g className="left-tower-structure">
      {/* Structural floor slab lines */}
      {Array.from({ length: 22 }).map((_, f) => {
        const fy = VIEWBOX.groundY - f * LEFT_TOWER.floorHeight;
        if (fy < LEFT_TOWER.peakY) return null;
        const leftX = fy < LEFT_TOWER.setback2Y ? LEFT_TOWER.setback2LeftX : LEFT_TOWER.x;
        const rightX =
          fy < LEFT_TOWER.setback2Y
            ? LEFT_TOWER.setback2RightX
            : fy < LEFT_TOWER.setback1Y
            ? LEFT_TOWER.setback1RightX
            : LEFT_TOWER.rightX;
        return (
          <g key={`t1-slab-${f}`}>
            <line
              x1={leftX}
              y1={fy}
              x2={rightX}
              y2={fy}
              stroke={INK}
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
              className="ink-main"
            />
            {/* Ceiling plenum line */}
            <line
              x1={leftX + 2}
              y1={fy - 4}
              x2={rightX - 2}
              y2={fy - 4}
              stroke={INK}
              strokeWidth="0.6"
              strokeDasharray="4 2"
              vectorEffect="non-scaling-stroke"
              className="ink-dash"
            />
          </g>
        );
      })}

      {/* Primary Structural Columns */}
      {columns.map((cx, idx) => (
        <line
          key={`t1-col-${idx}`}
          x1={cx}
          y1={LEFT_TOWER.setback1Y}
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

      {/* Internal Concrete Shear Core (dashed walls) */}
      <rect
        x={200}
        y={LEFT_TOWER.peakY + 10}
        width={80}
        height={VIEWBOX.groundY - (LEFT_TOWER.peakY + 10)}
        stroke={INK}
        strokeWidth="0.8"
        strokeDasharray="8 4"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-dash"
      />
      <line
        x1={240}
        y1={LEFT_TOWER.peakY + 10}
        x2={240}
        y2={VIEWBOX.groundY}
        stroke={INK}
        strokeWidth="0.6"
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
        className="ink-dash"
      />

      {/* Rooftop Elevator Machine Room / Plant Box (x: 180 to 280, y: 206 to 230) */}
      <rect
        x={180}
        y={206}
        width={100}
        height={24}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Rooftop louvers */}
      {Array.from({ length: 5 }).map((_, l) => (
        <line
          key={`t1-louver-${l}`}
          x1={186}
          y1={210 + l * 4}
          x2={274}
          y2={210 + l * 4}
          stroke={INK}
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          className="ink-detail"
        />
      ))}
    </g>
  );
}
