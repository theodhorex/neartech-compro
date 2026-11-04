export const INK = "#191919";

export const VIEWBOX = {
  width: 1600,
  height: 900,
  groundY: 780,
  hatchBottomY: 800,
  foundationBottomY: 850,
} as const;

// Building masses
export const LEFT_TOWER = {
  x: 70,
  width: 400,
  rightX: 470,
  peakY: 230,
  floorHeight: 26,
  mullionWidth: 40,
  setback1Y: 442, // Level 14: terrace on right x: 410-470
  setback1RightX: 410,
  setback2Y: 312, // Level 19: setback on both sides x: 90-370
  setback2LeftX: 90,
  setback2RightX: 370,
  crownTopY: 210, // Mechanical / elevator overrun
} as const;

export const CENTER_PAVILION = {
  x: 560,
  width: 480,
  rightX: 1040,
  peakY: 560,
  floorHeight: 26,
  lobbyHeight: 52, // Double-height lobby (y: 728-780)
  lobbyCeilingY: 728,
  canopyX: 740,
  canopyWidth: 120,
  canopyY: 728,
} as const;

export const RIGHT_TOWER = {
  x: 1130,
  width: 410,
  rightX: 1540,
  peakY: 150,
  floorHeight: 26,
  mullionWidth: 41,
  antennaBaseY: 150,
  antennaTopY: 70,
  setback1Y: 416,
  setback1LeftX: 1150,
  setback1RightX: 1520,
  setback2Y: 260,
  setback2LeftX: 1180,
  setback2RightX: 1480,
  crownTopY: 125,
} as const;

// Clear zone for hero title: x: 480-1120, y: 90-520
export const HERO_CLEAR_ZONE = {
  minX: 480,
  maxX: 1120,
  minY: 90,
  maxY: 520,
} as const;
