import React from "react";

/**
 * Helper to generate deterministic CSS variables for draw-in animation timing.
 * No Math.random — strictly deterministic.
 */
export function bpStyle(delaySec: number, durSec = 0.7): React.CSSProperties {
  return {
    "--d": `${delaySec.toFixed(2)}s`,
    "--t": `${durSec.toFixed(2)}s`,
  } as React.CSSProperties;
}
