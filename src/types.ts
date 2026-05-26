export enum GameState {
  INTRO = "INTRO",
  EXPLORE = "EXPLORE", // Beautiful grid display of solved puzzle, interactive toys
  DRAGGING = "DRAGGING", // Scattered puzzle where you can solve it manually
}

export interface StarParam {
  id: string;
  cx: number;
  cy: number;
  size: number;
  opacity: number;
  sparkleSpeed: number;
  rotation: number;
}

export interface CloudParam {
  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  opacity: number;
  driftSpeed: number;
}

export interface FlowerParam {
  id: string;
  cx: number;
  cy: number;
  size: number;
  color: string;
  centerColor: string;
  petals: number;
  rotation: number;
}

export interface MushroomParam {
  id: string;
  cx: number;
  cy: number;
  size: number;
  capColor: string;
  stemColor: string;
  dots: { x: number; y: number; r: number }[];
  rotation: number;
}

export interface RibbonParam {
  id: string;
  path: string;
  color: string;
  strokeWidth: number;
}

export type PuzzleThemeType = "cozy-celestial" | "meadow-magic" | "star-tea" | "cozy-slumber";

export interface PuzzleArtwork {
  theme: PuzzleThemeType;
  sceneIndex: number; // 0 to 29 for the 30 Ghibli environments
  title: string;
  subtitle: string;
  imageUrl?: string;
  bgColorStart: string;
  bgColorEnd: string;
  accentColor: string;
  coreType: "moon" | "mushroom" | "teapot" | "cupcake";
  coreColor: string;
  coreSecondaryColor: string;
  stars: StarParam[];
  clouds: CloudParam[];
  flowers: FlowerParam[];
  mushrooms: MushroomParam[];
  ribbons: RibbonParam[];
  poetry: string;
}

export interface PuzzlePieceState {
  col: number; // 0, 1, 2
  row: number; // 0, 1, 2
  // Current scattered position (offset from target)
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  // Snapped status in manual solve mode
  isSnapped: boolean;
  // Current user manual drag position
  x: number;
  y: number;
}
