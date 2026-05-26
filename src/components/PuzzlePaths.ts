/**
 * Generates interlocking jigsaw piece paths for a generic N x N grid of size S per cell.
 */

// Beautiful jigsaw tab generator using local coordinate system for any segment.
function getJigsawSegment(p1: [number, number], p2: [number, number], direction: number, S: number): string {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (direction === 0 || dist === 0) {
    return `L ${x2} ${y2}`;
  }

  const ux = dx / dist;
  const uy = dy / dist;
  // Perpendicular vector pointing to the right of travel in screen space
  const vx = -uy;
  const vy = ux;

  // Scale relative to segment distance (scale by % of distance)
  const scale = dist / 100;

  const toG = (u: number, v: number) => {
    const scaledU = u * scale;
    const scaledV = v * scale;
    const gx = x1 + scaledU * ux + scaledV * vx * direction;
    const gy = y1 + scaledU * uy + scaledV * vy * direction;
    return `${gx.toFixed(1)} ${gy.toFixed(1)}`;
  };

  // Beautiful, non-self-intersecting, classic bulbous interlocking curves
  // (narrow neck + flared round head)
  const c1 = `${toG(38, 4.5)}, ${toG(41, 7.5)}, ${toG(44, 8)}`;
  const c2 = `${toG(46, 8.5)}, ${toG(42, 22)}, ${toG(50, 22)}`;
  const c3 = `${toG(58, 22)}, ${toG(54, 8.5)}, ${toG(56, 8)}`;
  const c4 = `${toG(59, 7.5)}, ${toG(62, 4.5)}, ${toG(62, 0)}`;

  return `L ${toG(38, 0)} C ${c1} C ${c2} C ${c3} C ${c4} L ${x2} ${y2}`;
}

export interface JigsawCutConfig {
  cols: number; // e.g. 12 for 12 columns
  rows: number; // e.g. 8 for 8 rows
  hTabs: number[][]; // cols indices, rows - 1 inner rows
  vTabs: number[][]; // cols - 1 inner cols, rows indices
}

/**
 * Procedurally generates interlocking directions for a generic Cols x Rows grid.
 */
export function generateJigsawCutConfig(cols: number = 12, rows: number = 8): JigsawCutConfig {
  const hTabs: number[][] = [];
  const vTabs: number[][] = [];

  // Initialize horizontal tabs
  for (let c = 0; c < cols; c++) {
    const colTabs: number[] = [];
    for (let r = 0; r < rows - 1; r++) {
      colTabs.push(Math.random() > 0.5 ? 1 : -1);
    }
    hTabs.push(colTabs);
  }

  // Initialize vertical tabs
  for (let c = 0; c < cols - 1; c++) {
    const rowTabs: number[] = [];
    for (let r = 0; r < rows; r++) {
      rowTabs.push(Math.random() > 0.5 ? 1 : -1);
    }
    vTabs.push(rowTabs);
  }

  return { cols, rows, hTabs, vTabs };
}

/**
 * Builds the closed loop path d-string for a single grid cell (col, row)
 */
export function getPathForCell(
  col: number,
  row: number,
  S: number,
  config: JigsawCutConfig
): string {
  const { cols, rows, hTabs, vTabs } = config;

  // Directions for Top, Right, Bottom, Left borders
  const topTab = row === 0 ? 0 : hTabs[col][row - 1];
  const rightTab = col === cols - 1 ? 0 : -vTabs[col][row];
  const bottomTab = row === rows - 1 ? 0 : -hTabs[col][row];
  const leftTab = col === 0 ? 0 : vTabs[col - 1][row];

  const p1: [number, number] = [col * S, row * S];           // Top-left
  const p2: [number, number] = [(col + 1) * S, row * S];       // Top-right
  const p3: [number, number] = [(col + 1) * S, (row + 1) * S];   // Bottom-right
  const p4: [number, number] = [col * S, (row + 1) * S];       // Bottom-left

  let path = `M ${p1[0]} ${p1[1]}`;
  path += " " + getJigsawSegment(p1, p2, topTab, S);
  path += " " + getJigsawSegment(p2, p3, rightTab, S);
  path += " " + getJigsawSegment(p3, p4, bottomTab, S);
  path += " " + getJigsawSegment(p4, p1, leftTab, S);
  path += " Z";

  return path;
}
