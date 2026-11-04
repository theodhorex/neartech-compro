import { INK, RIGHT_TOWER, VIEWBOX } from "./constants";

export function RightTowerFacade() {
  const elements: React.ReactNode[] = [];

  // Floor levels
  const tier1Floors: number[] = [];
  for (let y = VIEWBOX.groundY; y >= RIGHT_TOWER.setback1Y; y -= RIGHT_TOWER.floorHeight) {
    tier1Floors.push(y);
  }

  const tier2Floors: number[] = [];
  for (let y = RIGHT_TOWER.setback1Y; y >= RIGHT_TOWER.setback2Y; y -= RIGHT_TOWER.floorHeight) {
    tier2Floors.push(y);
  }

  const tier3Floors: number[] = [];
  for (let y = RIGHT_TOWER.setback2Y; y >= RIGHT_TOWER.peakY + 4; y -= RIGHT_TOWER.floorHeight) {
    tier3Floors.push(y);
  }

  // Helper for window panes with chamfer
  const renderWindow = (
    key: string,
    x: number,
    y: number,
    w: number,
    h: number,
    isChamfered: boolean
  ) => {
    if (isChamfered) {
      const c = 4;
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

  // Tier 1 Windows (10 bays across 410 width)
  const bayW1 = RIGHT_TOWER.width / 10;
  for (let i = 0; i < tier1Floors.length - 1; i++) {
    const bottomY = tier1Floors[i];
    const topY = tier1Floors[i + 1];
    for (let bx = 0; bx < 10; bx++) {
      const bayX = RIGHT_TOWER.x + bx * bayW1;
      const isChamfer = (i + bx) % 3 === 1;
      elements.push(
        renderWindow(
          `rt1-win-${i}-${bx}`,
          bayX + 3,
          topY + 4,
          bayW1 - 6,
          bottomY - topY - 8,
          isChamfer
        )
      );
    }
  }

  // Tier 2 Windows (9 bays across 370 width)
  const tier2W = RIGHT_TOWER.setback1RightX - RIGHT_TOWER.setback1LeftX;
  const bayW2 = tier2W / 9;
  for (let i = 0; i < tier2Floors.length - 1; i++) {
    const bottomY = tier2Floors[i];
    const topY = tier2Floors[i + 1];
    for (let bx = 0; bx < 9; bx++) {
      const bayX = RIGHT_TOWER.setback1LeftX + bx * bayW2;
      const isChamfer = (i + bx) % 4 === 2;
      elements.push(
        renderWindow(
          `rt2-win-${i}-${bx}`,
          bayX + 3,
          topY + 4,
          bayW2 - 6,
          bottomY - topY - 8,
          isChamfer
        )
      );
    }
  }

  // Tier 3 Windows (8 bays across 300 width)
  const tier3W = RIGHT_TOWER.setback2RightX - RIGHT_TOWER.setback2LeftX;
  const bayW3 = tier3W / 8;
  for (let i = 0; i < tier3Floors.length - 1; i++) {
    const bottomY = tier3Floors[i];
    const topY = tier3Floors[i + 1];
    for (let bx = 0; bx < 8; bx++) {
      const bayX = RIGHT_TOWER.setback2LeftX + bx * bayW3;
      const isChamfer = (i + bx) % 3 === 0;
      elements.push(
        renderWindow(
          `rt3-win-${i}-${bx}`,
          bayX + 3,
          topY + 4,
          bayW3 - 6,
          bottomY - topY - 8,
          isChamfer
        )
      );
    }
  }

  return (
    <g className="right-tower-facade">
      {/* Tier 1 Outline (x: 1130 to 1540, y: 416 to 780) */}
      <rect
        x={RIGHT_TOWER.x}
        y={RIGHT_TOWER.setback1Y}
        width={RIGHT_TOWER.width}
        height={VIEWBOX.groundY - RIGHT_TOWER.setback1Y}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />

      {/* Tier 2 Outline (x: 1150 to 1520, y: 260 to 416) */}
      <rect
        x={RIGHT_TOWER.setback1LeftX}
        y={RIGHT_TOWER.setback2Y}
        width={tier2W}
        height={RIGHT_TOWER.setback1Y - RIGHT_TOWER.setback2Y}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Tier 1 Setback Terraces with Railings */}
      <line
        x1={RIGHT_TOWER.x}
        y1={RIGHT_TOWER.setback1Y}
        x2={RIGHT_TOWER.setback1LeftX}
        y2={RIGHT_TOWER.setback1Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={RIGHT_TOWER.x + 2}
        y={RIGHT_TOWER.setback1Y - 12}
        width={16}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={RIGHT_TOWER.setback1RightX}
        y1={RIGHT_TOWER.setback1Y}
        x2={RIGHT_TOWER.rightX}
        y2={RIGHT_TOWER.setback1Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={RIGHT_TOWER.setback1RightX + 2}
        y={RIGHT_TOWER.setback1Y - 12}
        width={16}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />

      {/* Tier 3 Outline (x: 1180 to 1480, y: 154 to 260) */}
      <rect
        x={RIGHT_TOWER.setback2LeftX}
        y={RIGHT_TOWER.peakY + 4}
        width={tier3W}
        height={RIGHT_TOWER.setback2Y - (RIGHT_TOWER.peakY + 4)}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Tier 2 Setback Terraces with Railings */}
      <line
        x1={RIGHT_TOWER.setback1LeftX}
        y1={RIGHT_TOWER.setback2Y}
        x2={RIGHT_TOWER.setback2LeftX}
        y2={RIGHT_TOWER.setback2Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={RIGHT_TOWER.setback1LeftX + 2}
        y={RIGHT_TOWER.setback2Y - 12}
        width={26}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={RIGHT_TOWER.setback2RightX}
        y1={RIGHT_TOWER.setback2Y}
        x2={RIGHT_TOWER.setback1RightX}
        y2={RIGHT_TOWER.setback2Y}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={RIGHT_TOWER.setback2RightX + 2}
        y={RIGHT_TOWER.setback2Y - 12}
        width={36}
        height={12}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />

      {/* Roof Parapet at y=150 */}
      <line
        x1={RIGHT_TOWER.setback2LeftX - 6}
        y1={RIGHT_TOWER.peakY}
        x2={RIGHT_TOWER.setback2RightX + 6}
        y2={RIGHT_TOWER.peakY}
        stroke={INK}
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      <line
        x1={RIGHT_TOWER.setback2LeftX - 6}
        y1={RIGHT_TOWER.peakY + 4}
        x2={RIGHT_TOWER.setback2RightX + 6}
        y2={RIGHT_TOWER.peakY + 4}
        stroke={INK}
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />

      {/* Window panes */}
      {elements}
    </g>
  );
}

export function RightTowerStructure() {
  const columns = [
    RIGHT_TOWER.x + 10,
    RIGHT_TOWER.x + 90,
    RIGHT_TOWER.x + 170,
    RIGHT_TOWER.x + 250,
    RIGHT_TOWER.x + 330,
    RIGHT_TOWER.x + 400,
  ];

  return (
    <g className="right-tower-structure">
      {/* Floor slabs & ceiling plenums */}
      {Array.from({ length: 25 }).map((_, f) => {
        const fy = VIEWBOX.groundY - f * RIGHT_TOWER.floorHeight;
        if (fy < RIGHT_TOWER.peakY) return null;
        const leftX =
          fy < RIGHT_TOWER.setback2Y
            ? RIGHT_TOWER.setback2LeftX
            : fy < RIGHT_TOWER.setback1Y
            ? RIGHT_TOWER.setback1LeftX
            : RIGHT_TOWER.x;
        const rightX =
          fy < RIGHT_TOWER.setback2Y
            ? RIGHT_TOWER.setback2RightX
            : fy < RIGHT_TOWER.setback1Y
            ? RIGHT_TOWER.setback1RightX
            : RIGHT_TOWER.rightX;
        return (
          <g key={`rt-slab-${f}`}>
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

      {/* Structural Columns */}
      {columns.map((cx, idx) => (
        <line
          key={`rt-col-${idx}`}
          x1={cx}
          y1={RIGHT_TOWER.setback1Y}
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

      {/* Core shear walls (dashed) */}
      <rect
        x={1280}
        y={RIGHT_TOWER.crownTopY}
        width={90}
        height={VIEWBOX.groundY - RIGHT_TOWER.crownTopY}
        stroke={INK}
        strokeWidth="0.8"
        strokeDasharray="8 4"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-dash"
      />

      {/* Rooftop Penthouse & Equipment (Makna: Rekayasa) */}
      {/* Central Penthouse Box */}
      <rect
        x={1240}
        y={RIGHT_TOWER.crownTopY}
        width={170}
        height={RIGHT_TOWER.peakY - RIGHT_TOWER.crownTopY}
        stroke={INK}
        strokeWidth="1.2"
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="ink-main"
      />
      {/* Penthouse Louvers */}
      {Array.from({ length: 5 }).map((_, l) => (
        <line
          key={`pent-louver-${l}`}
          x1={1245}
          y1={RIGHT_TOWER.crownTopY + 4 + l * 4}
          x2={1405}
          y2={RIGHT_TOWER.crownTopY + 4 + l * 4}
          stroke={INK}
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
          className="ink-detail"
        />
      ))}

      {/* HVAC Chiller Unit on roof (x: 1420 to 1475, y: 130 to 150) */}
      <rect
        x={1420}
        y={130}
        width={55}
        height={20}
        stroke={INK}
        strokeWidth="0.8"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      {/* Chiller fan shroud circles */}
      <circle
        cx={1435}
        cy={140}
        r={7}
        stroke={INK}
        strokeWidth="0.6"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={1460}
        cy={140}
        r={7}
        stroke={INK}
        strokeWidth="0.6"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
      {/* Fan cross ticks */}
      <line x1={1435} y1={133} x2={1435} y2={147} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      <line x1={1428} y1={140} x2={1442} y2={140} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      <line x1={1460} y1={133} x2={1460} y2={147} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      <line x1={1453} y1={140} x2={1467} y2={140} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />

      {/* Building Maintenance Unit (BMU Crane) at x: 1200 */}
      <line x1={1205} y1={150} x2={1205} y2={132} stroke={INK} strokeWidth="1.0" vectorEffect="non-scaling-stroke" />
      <line x1={1205} y1={132} x2={1235} y2={126} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      <line x1={1235} y1={126} x2={1235} y2={140} stroke={INK} strokeWidth="0.6" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
      <rect x={1230} y={140} width={10} height={6} stroke={INK} strokeWidth="0.6" fill="none" vectorEffect="non-scaling-stroke" />

      {/* Telecommunication Antenna Mast (Base at 125, Pinnacle at 70) */}
      <g className="antenna-system">
        {/* Main central mast */}
        <line
          x1={1325}
          y1={RIGHT_TOWER.crownTopY}
          x2={1325}
          y2={RIGHT_TOWER.antennaTopY}
          stroke={INK}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          className="ink-main"
        />
        {/* Tapered lattice struts */}
        <line x1={1322} y1={RIGHT_TOWER.crownTopY} x2={1322} y2={95} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <line x1={1328} y1={RIGHT_TOWER.crownTopY} x2={1328} y2={95} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        {/* Guy wires / stays */}
        <line x1={1325} y1={90} x2={1250} y2={RIGHT_TOWER.crownTopY} stroke={INK} strokeWidth="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        <line x1={1325} y1={90} x2={1400} y2={RIGHT_TOWER.crownTopY} stroke={INK} strokeWidth="0.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        {/* Cross arms / spreaders */}
        <line x1={1312} y1={98} x2={1338} y2={98} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        <line x1={1316} y1={82} x2={1334} y2={82} stroke={INK} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        {/* Microwave dish */}
        <circle cx={1310} cy={98} r={5} stroke={INK} strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" />
        <circle cx={1340} cy={98} r={5} stroke={INK} strokeWidth="0.8" fill="none" vectorEffect="non-scaling-stroke" />
        {/* Pinnacle beacon dot */}
        <circle cx={1325} cy={RIGHT_TOWER.antennaTopY} r={2} fill={INK} stroke="none" />
        <line x1={1322} y1={RIGHT_TOWER.antennaTopY} x2={1328} y2={RIGHT_TOWER.antennaTopY} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        <line x1={1325} y1={RIGHT_TOWER.antennaTopY - 3} x2={1325} y2={RIGHT_TOWER.antennaTopY + 3} stroke={INK} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
}
