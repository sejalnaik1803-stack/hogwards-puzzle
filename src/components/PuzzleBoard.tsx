import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PuzzleArtwork, PuzzlePieceState, GameState } from "../types";
import { getPathForCell, JigsawCutConfig } from "./PuzzlePaths";
import { sound } from "./SoundSynth";
import { DeathlyHallowsRevelioIcon, BubblingCauldronIcon, FelixFelicisPotionIcon, ElderWandIcon } from "./WizardIcons";
import { RotateCw, Eye, EyeOff, Sparkles } from "lucide-react";
import { WizardButton } from "./WizardButton";

interface PuzzleBoardProps {
  art: PuzzleArtwork;
  cutConfig: JigsawCutConfig;
  gameState: GameState;
  onPieceSnap: () => void;
  onAllCompleted: () => void;
  triggerLocalBubble: (x: number, y: number) => void;
  isSolved: boolean;
  setIsSolved: (val: boolean) => void;
  reshuffle: () => void;
  scatterAll: () => void;
  switchToExplore: () => void;
}

const BOARD_WIDTH = 540;
const BOARD_HEIGHT = 360;

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  art,
  cutConfig,
  gameState,
  onPieceSnap,
  onAllCompleted,
  triggerLocalBubble,
  isSolved,
  setIsSolved,
  reshuffle,
  scatterAll,
  switchToExplore,
}) => {
  const [pieces, setPieces] = useState<PuzzlePieceState[]>([]);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [showGhost, setShowGhost] = useState<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const cols = cutConfig.cols ?? 6;
  const rows = cutConfig.rows ?? 4;
  const S = BOARD_WIDTH / cols; // Dynamic piece size, e.g. 540 / 6 = 90px

  // Initialize/reset pieces based on current state
  useEffect(() => {
    const initialPieces: PuzzlePieceState[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        initialPieces.push({
          col: c,
          row: r,
          scatterX: 0,
          scatterY: 0,
          scatterRotate: 0,
          isSnapped: true,
          x: 0,
          y: 0,
        });
      }
    }
    setPieces(initialPieces);
  }, [cutConfig, art, cols, rows]);

  // Handle scatters when gamestate shifts to DRAGGING
  useEffect(() => {
    if (gameState === GameState.DRAGGING) {
      sound.playWhoosh();
      const scattered = pieces.map((p) => {
        let absX = 0;
        let absY = 0;

        const side = Math.random();
        // Disperse pieces evenly around the tray into a spacious desk ring
        if (side < 0.30) {
          // Left apron
          absX = -160 - (Math.random() * 85);
          absY = -50 + (Math.random() * (BOARD_HEIGHT + 100));
        } else if (side < 0.60) {
          // Right apron
          absX = BOARD_WIDTH + 45 + (Math.random() * 85);
          absY = -50 + (Math.random() * (BOARD_HEIGHT + 100));
        } else if (side < 0.85) {
          // Bottom apron
          absX = -60 + (Math.random() * (BOARD_WIDTH + 120));
          absY = BOARD_HEIGHT + 45 + (Math.random() * 85);
        } else {
          // Top apron
          absX = -60 + (Math.random() * (BOARD_WIDTH + 120));
          absY = -120 - (Math.random() * 60);
        }

        const scatterX = absX - (p.col * S);
        const scatterY = absY - (p.row * S);
        const randomRot = Math.random() * 90 - 45;

        return {
          ...p,
          scatterX,
          scatterY,
          scatterRotate: randomRot,
          isSnapped: false,
          x: scatterX,
          y: scatterY,
        };
      });
      setPieces(scattered);
      setIsSolved(false);
    } else if (gameState === GameState.EXPLORE) {
      // Snapped/Solved layout reset
      const solved = pieces.map((p) => ({
        ...p,
        scatterX: 0,
        scatterY: 0,
        scatterRotate: 0,
        isSnapped: true,
        x: 0,
        y: 0,
      }));
      setPieces(solved);
      setIsSolved(true);
    }
  }, [gameState]);

  // Trigger outbound scatter explosive animations
  const handleScatterAnimation = () => {
    sound.playWhoosh();
    setPieces((prev) =>
      prev.map((p) => {
        const centerCol = cols / 2;
        const centerRow = rows / 2;
        const angle = Math.atan2(p.row - centerRow, p.col - centerCol) || Math.random() * Math.PI * 2;
        const dist = 360 + Math.random() * 160;

        const absX = BOARD_WIDTH / 2 + Math.cos(angle) * dist;
        const absY = BOARD_HEIGHT / 2 + Math.sin(angle) * dist;

        return {
          ...p,
          scatterX: absX - (p.col * S),
          scatterY: absY - (p.row * S),
          scatterRotate: Math.random() * 240 - 120,
          isSnapped: false,
        };
      })
    );

    // Swap artwork via parent and pull back in 
    setTimeout(() => {
      reshuffle();
      setPieces((prev) =>
        prev.map((p) => ({
          ...p,
          scatterX: 0,
          scatterY: 0,
          scatterRotate: 0,
          isSnapped: true,
          x: 0,
          y: 0,
        }))
      );
      sound.playSparkleChime();
    }, 450);
  };

  const handleDragStart = (id: string) => {
    setActiveDragId(id);
    sound.playClick();
  };

  const handleDragEnd = (
    index: number,
    event: any,
    info: { offset: { x: number; y: number } }
  ) => {
    setActiveDragId(null);
    const piece = pieces[index];
    if (piece.isSnapped) return;

    const currentX = piece.scatterX + info.offset.x;
    const currentY = piece.scatterY + info.offset.y;

    const distToSlot = Math.sqrt(currentX * currentX + currentY * currentY);

    // Dynamic snap tolerance (24px) for beautiful interactive ease
    if (distToSlot < 24) {
      sound.playSnap();
      
      const slotCenterX = piece.col * S + S / 2;
      const slotCenterY = piece.row * S + S / 2;
      triggerLocalBubble(slotCenterX, slotCenterY);

      setPieces((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...piece,
          isSnapped: true,
          x: 0,
          y: 0,
          scatterX: 0,
          scatterY: 0,
          scatterRotate: 0,
        };

        const allCompleted = updated.every((p) => p.isSnapped);
        if (allCompleted) {
          setTimeout(() => {
            setIsSolved(true);
            onAllCompleted();
          }, 350);
        }

        return updated;
      });
      onPieceSnap();
    } else {
      setPieces((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...piece,
          scatterX: currentX,
          scatterY: currentY,
          x: currentX,
          y: currentY,
        };
        return updated;
      });
      sound.playClick();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto relative select-none">
      
      {/* Dynamic Status Bar - Integrated wood/gilded ledger engraving header */}
      <div className="w-full max-w-[600px] flex justify-between items-center mb-5 px-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.22em] text-amber-200/90 uppercase font-extrabold flex items-center gap-1">
            <span>⚡</span> Hogwarts Spell-board • {cols * rows} Shards <span>⚡</span>
          </span>
        </div>
        
        {gameState === GameState.DRAGGING && (
          <WizardButton
            variant="small-gold"
            onClick={() => setShowGhost(!showGhost)}
            title="Toggle background trace"
            icon={<DeathlyHallowsRevelioIcon size={18} active={showGhost} />}
          >
            {showGhost ? "Veil Revelio" : "Cast Revelio"}
          </WizardButton>
        )}
      </div>

      {/* Enchanted Altar Tray Board Frame */}
      <div
        id="wooden-tray"
        ref={boardRef}
        className="relative p-[30px] bg-gradient-to-b from-[#180e2a] via-[#090413] to-[#030107] rounded-[36px] border-[6px] border-amber-400/40 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_2px_25px_rgba(168,85,247,0.4),0_0_25px_rgba(245,158,11,0.12)] transition-all duration-500 overflow-visible w-[600px] h-[420px] flex items-center justify-center group/tray"
      >
        {/* Ancient Gold Corner Relief Engravings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75 stroke-amber-400/50 fill-none" viewBox="0 0 600 420">
          {/* Top-Left Corner Bracket */}
          <path d="M 12,42 L 12,12 L 42,12" strokeWidth="2.5" />
          <path d="M 18,36 Q 18,18 36,18" strokeWidth="1" />
          <circle cx="28" cy="28" r="2" className="fill-amber-400/70" />

          {/* Top-Right Corner Bracket */}
          <path d="M 558,12 L 588,12 L 588,42" strokeWidth="2.5" />
          <path d="M 582,36 Q 582,18 564,18" strokeWidth="1" />
          <circle cx="572" cy="28" r="2" className="fill-amber-400/70" />

          {/* Bottom-Left Corner Bracket */}
          <path d="M 12,378 L 12,408 L 42,408" strokeWidth="2.5" />
          <path d="M 18,384 Q 18,402 36,402" strokeWidth="1" />
          <circle cx="28" cy="392" r="2" className="fill-amber-400/70" />

          {/* Bottom-Right Corner Bracket */}
          <path d="M 558,408 L 588,408 L 588,378" strokeWidth="2.5" />
          <path d="M 582,384 Q 582,402 564,402" strokeWidth="1" />
          <circle cx="572" cy="392" r="2" className="fill-amber-400/70" />

          {/* Ornate Gold Filigreed Borders */}
          <line x1="60" y1="12" x2="540" y2="12" strokeWidth="0.8" strokeDasharray="3, 3" />
          <line x1="60" y1="408" x2="540" y2="408" strokeWidth="0.8" strokeDasharray="3, 3" />
          <line x1="12" y1="60" x2="12" y2="360" strokeWidth="0.8" strokeDasharray="3, 3" />
          <line x1="588" y1="60" x2="588" y2="360" strokeWidth="0.8" strokeDasharray="3, 3" />
        </svg>

        {/* Gilded Runes engraved on the mahogany rim */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-amber-500/25 font-mono text-[10px] tracking-[1.5em] pointer-events-none select-none z-10">
          ⚡ Ϟ ͛ ⚯ 🔮
        </div>
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-amber-500/25 font-mono text-[10px] tracking-[1.5em] pointer-events-none select-none z-10">
          🔮 ✦ ⚯ Ϟ ⚡
        </div>

        {/* Glowing stardust leyline grids */}
        <div 
          className="absolute inset-[30px] rounded-2xl grid border-[1.2px] border-amber-600/30 pointer-events-none z-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gap: "0"
          }}
        >
          {Array.from({ length: cols * rows }).map((_, idx) => (
            <div
              key={idx}
              className="border-[0.5px] border-amber-600/15 bg-stone-950/40"
            />
          ))}
        </div>

        {/* Floating guidance transparent watercolor ghost watermark */}
        {showGhost && (
          <div className="absolute inset-[30px] rounded-2xl overflow-hidden opacity-[0.24] pointer-events-none z-0">
            <svg viewBox="0 0 540 360" className="w-full h-full">
              <use href="#puzzle-artwork" />
            </svg>
          </div>
        )}

        {/* Puzzle Board Area (Relative Canvas Container) */}
        <div className="w-[540px] h-[360px] relative overflow-visible z-10">
          <AnimatePresence>
            {pieces.map((piece, index) => {
              const cellPath = getPathForCell(piece.col, piece.row, S, cutConfig);
              const pieceId = `${piece.col}-${piece.row}`;
              const isDraggingNow = activeDragId === pieceId;

              return (
                <motion.div
                  key={pieceId}
                  id={`puzzle-piece-${pieceId}`}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    width: S,
                    height: S,
                    left: piece.col * S,
                    top: piece.row * S,
                    zIndex: piece.isSnapped ? 12 : isDraggingNow ? 100 : 30,
                  }}
                  drag={gameState === GameState.DRAGGING && !piece.isSnapped}
                  dragMomentum={false}
                  dragElastic={0.06}
                  onDragStart={() => handleDragStart(pieceId)}
                  onDragEnd={(e, info) => handleDragEnd(index, e, info)}
                  animate={{
                    x: piece.isSnapped ? 0 : piece.scatterX,
                    y: piece.isSnapped ? 0 : piece.scatterY,
                    rotate: piece.isSnapped ? 0 : piece.scatterRotate,
                    scale: isDraggingNow ? 1.25 : 1, // Beautiful tactile zoom on lift
                  }}
                  transition={{
                    type: "spring",
                    stiffness: isDraggingNow ? 650 : piece.isSnapped ? 150 : 200,
                    damping: isDraggingNow ? 28 : piece.isSnapped ? 15 : 24,
                  }}
                  whileHover={{
                    scale: piece.isSnapped ? 1 : 1.15,
                    y: piece.isSnapped ? 0 : -3,
                    rotate: piece.isSnapped ? 0 : piece.scatterRotate + (Math.random() * 6 - 3),
                  }}
                  onHoverStart={() => {
                    if (!piece.isSnapped) {
                      sound.playBubble();
                    }
                  }}
                >
                  <div
                    className="w-full h-full relative"
                    style={{
                      filter: isDraggingNow
                        ? "drop-shadow(0 24px 30px rgba(0,0,0,0.65)) drop-shadow(0 0 12px rgba(251,191,36,0.55))" // Gold stardust glow on lift!
                        : piece.isSnapped
                        ? "drop-shadow(0 1px 2px rgba(0,0,0,0.45))"
                        : "drop-shadow(0 8px 16px rgba(0,0,0,0.45))",
                      transform: isDraggingNow ? "translateY(-6px)" : "none",
                      transition: "filter 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <svg
                      width={S + 40}
                      height={S + 40}
                      viewBox={`${piece.col * S - 20} ${piece.row * S - 20} ${S + 40} ${S + 40}`}
                      className="absolute overflow-visible"
                      style={{
                        left: -20,
                        top: -20,
                        width: S + 40,
                        height: S + 40,
                      }}
                    >
                      <defs>
                        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={art.bgColorStart} />
                          <stop offset="100%" stopColor={art.bgColorEnd} />
                        </linearGradient>

                        <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="6" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>

                        <filter id="super-blur" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="15" />
                        </filter>

                        <filter id="drop-shadow-tactile" x="-20%" y="-20%" width="140%" height="150%">
                          <feDropShadow dx="1" dy="6" stdDeviation="6" floodColor="#1a043c" floodOpacity="0.4" />
                        </filter>

                        <filter id="drop-shadow-micro" x="-10%" y="-10%" width="120%" height="120%">
                          <feDropShadow dx="0.5" dy="2" stdDeviation="1" floodColor="#1a043c" floodOpacity="0.2" />
                        </filter>

                        <clipPath id={`piece-clip-${piece.col}-${piece.row}`}>
                          <path d={cellPath} />
                        </clipPath>
                      </defs>

                      {/* Clipped Artwork Content */}
                      <g clipPath={`url(#piece-clip-${piece.col}-${piece.row})`}>
                        <use href="#puzzle-artwork" />
                      </g>

                      {/* Textured tactile cut borders of deckled-edged thick wizard canvas */}
                      <path
                        d={cellPath}
                        fill="none"
                        stroke={art.theme === "cozy-celestial" ? "#2a154d" : "#5d4493"}
                        strokeWidth="1.4"
                        strokeOpacity="0.10"
                        className="transition-colors duration-500"
                      />
                      {/* Paper thick edge highlights */}
                      <path
                        d={cellPath}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                        strokeOpacity="0.08"
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls panel bottom deck */}
      <div className="mt-8 flex flex-col items-center gap-4 z-20 w-fit mx-auto">
        {/* Row 1: Cast Reshuffle Spell button */}
        <div className="flex justify-center">
          {gameState === GameState.EXPLORE ? (
            <WizardButton
              id="reshuffle-button"
              variant="filled"
              onClick={handleScatterAnimation}
              icon={<BubblingCauldronIcon size={20} animateStir={true} />}
            >
              Cast Reshuffle Spell
            </WizardButton>
          ) : (
            <WizardButton
              id="solve-new-art"
              variant="outlined"
              onClick={scatterAll}
              icon={<BubblingCauldronIcon size={18} animateStir={false} />}
            >
              Harmonize Stray Pieces
            </WizardButton>
          )}
        </div>

        {/* Row 2: Play Mode Switcher (Restored View & Cast Diffindo) */}
        <motion.div
          className="p-1.5 bg-stone-950/95 backdrop-blur-md rounded-[22px] flex items-center gap-3 shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-amber-600/35"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <WizardButton
            variant={gameState === GameState.EXPLORE ? "filled" : "outlined"}
            onClick={switchToExplore}
            icon={<FelixFelicisPotionIcon size={16} liquidColor={gameState === GameState.EXPLORE ? "#1c1917" : "#fbbf24"} />}
          >
            Restored View
          </WizardButton>
          <WizardButton
            variant={gameState === GameState.DRAGGING ? "filled" : "outlined"}
            onClick={scatterAll}
            icon={<ElderWandIcon size={16} />}
          >
            Cast Diffindo
          </WizardButton>
        </motion.div>
      </div>

    </div>
  );
};
