/**
 * Generate SVG path data for a rectangle with top rounded corners
 */
export function getRoundedTopRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  // Ensure radius doesn't exceed half the width/height
  const r = Math.min(radius, width / 2, height / 2);

  // Draw path: Start Bottom-Left -> Top-Left (rounded) -> Top-Right (rounded) -> Bottom-Right -> Close
  return `
    M ${x},${y + height}
    L ${x},${y + r}
    Q ${x},${y} ${x + r},${y}
    L ${x + width - r},${y}
    Q ${x + width},${y} ${x + width},${y + r}
    L ${x + width},${y + height}
    Z
  `.trim();
}

/**
 * Generate SVG path data for a rectangle with bottom rounded corners
 * (Useful for "Top" rounded bars in an inverted coordinate system scale(1,-1))
 */
export function getRoundedBottomRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  // Ensure radius doesn't exceed half the width/height
  // Even if height is 0, we want to maintain the path structure (M, L, L, Q, L, Q, L, Z)
  // so that D3 transitions interpolate numeric values instead of morphing topology.
  const r = Math.min(radius, width / 2, height / 2);

  // Draw path: Start Top-Left -> Top-Right -> Bottom-Right (rounded) -> Bottom-Left (rounded) -> Close
  return `
    M ${x},${y}
    L ${x + width},${y}
    L ${x + width},${y + height - r}
    Q ${x + width},${y + height} ${x + width - r},${y + height}
    L ${x + r},${y + height}
    Q ${x},${y + height} ${x},${y + height - r}
    L ${x},${y}
    Z
  `.trim();
}

/**
 * Generate SVG path data for a rectangle with right rounded corners (for horizontal bars)
 */
export function getRoundedRightRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): string {
  const r = Math.min(radius, width / 2, height / 2);

  // Draw path: Start Top-Left -> Top-Right (rounded) -> Bottom-Right (rounded) -> Bottom-Left -> Close
  return `
    M ${x},${y}
    L ${x + width - r},${y}
    Q ${x + width},${y} ${x + width},${y + r}
    L ${x + width},${y + height - r}
    Q ${x + width},${y + height} ${x + width - r},${y + height}
    L ${x},${y + height}
    Z
  `.trim();
}
