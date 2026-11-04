// @ts-expect-error TypeScript tsconfig lacks allowImportingTsExtensions but node --experimental-strip-types requires .ts extension
import { computeLayout, traceForTest } from "../src/components/prism/optics.ts";

function runCheck() {
  console.log("=== Checking prism optics 2D tracer ===");

  const W = 1200;
  const H = 800;
  const dpr = 2;
  const copyBottom = 0;

  const layout = computeLayout(W, H, dpr, copyBottom);
  console.log("Layout computed:", {
    W: layout.W,
    H: layout.H,
    mobile: layout.mobile,
    S: layout.S,
    cx: layout.cx,
    cy: layout.cy,
    top: layout.top,
    right: layout.right,
    left: layout.left,
  });

  const testCases = [
    { name: "Top (-35°)", aim: { incidence: 0.0, entry: 0.5 } },
    { name: "Middle (60°)", aim: { incidence: 0.5, entry: 0.5 } },
    { name: "Bottom (75°)", aim: { incidence: 1.0, entry: 0.5 } },
  ];

  let allPassed = true;

  for (const tc of testCases) {
    console.log(`\nTesting case: ${tc.name} [incidence=${tc.aim.incidence}, entry=${tc.aim.entry}]`);
    const res = traceForTest(layout, tc.aim);

    console.log(`  Total segments: ${res.totalSegments}`);
    console.log(`  Exit segments:  ${res.exitCount}`);
    console.log(`  Path groups:    ${res.pathCount}`);

    if (res.totalSegments <= 0) {
      console.error(`  FAIL: Segment count must be > 0 (got ${res.totalSegments})`);
      allPassed = false;
    }

    if (res.exitCount <= 0) {
      console.error(`  FAIL: Exit beam count must be > 0 (got ${res.exitCount})`);
      allPassed = false;
    }

    let hasNan = false;
    let hasNegativeEnergy = false;

    for (const seg of res.segments) {
      if (
        isNaN(seg.p0[0]) ||
        isNaN(seg.p0[1]) ||
        isNaN(seg.p1[0]) ||
        isNaN(seg.p1[1]) ||
        isNaN(seg.energy)
      ) {
        hasNan = true;
      }
      if (seg.energy < 0) {
        hasNegativeEnergy = true;
      }
    }

    if (hasNan) {
      console.error("  FAIL: NaN values detected in ray segments!");
      allPassed = false;
    } else {
      console.log("  OK: No NaN detected.");
    }

    if (hasNegativeEnergy) {
      console.error("  FAIL: Negative energy detected!");
      allPassed = false;
    } else {
      console.log("  OK: All segment energies are non-negative.");
    }
  }

  // Also check mobile layout
  console.log("\nTesting mobile layout (W=375, H=667)...");
  const mobileLayout = computeLayout(375, 667, 2, 250);
  const mobileRes = traceForTest(mobileLayout, { incidence: 0.5, entry: 0.5 });
  console.log(`  Mobile total segments: ${mobileRes.totalSegments}, exit segments: ${mobileRes.exitCount}`);
  if (mobileRes.totalSegments <= 0 || mobileRes.exitCount <= 0) {
    console.error("  FAIL: Mobile layout ray tracing failed.");
    allPassed = false;
  } else {
    console.log("  OK: Mobile layout ray tracing verified.");
  }

  if (!allPassed) {
    console.error("\n❌ Checks failed!");
    process.exit(1);
  }

  console.log("\n✅ All optics checks passed successfully!");
}

runCheck();
