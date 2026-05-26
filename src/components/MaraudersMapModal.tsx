import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SceneMetadata, COZY_SCENES } from "./ArtGenerator";
import { sound } from "./SoundSynth";
import { WizardButton } from "./WizardButton";

interface Footprint {
  id: string;
  x: number;
  y: number;
  angle: number; // degrees
  isLeft: boolean;
  opacity: number;
  stepIndex: number;
}

interface MaraudersMapModalProps {
  activeSceneIndex: number;
  setActiveSceneIndex: (index: number) => void;
  onClose: () => void;
}

// Custom coordinates (x, y percentages) on the replica Marauder's Map graphic
export const SCENE_COORDINATES: { [key: number]: { x: number; y: number } } = {
  0: { x: 26, y: 18 },  // The Wand Repair Station
  1: { x: 50, y: 14 },  // The Floating Puzzle Table
  2: { x: 76, y: 16 },  // The Astronomical Observatory
  3: { x: 18, y: 72 },  // The Hall of Pensieves
  4: { x: 48, y: 35 },  // The Enchanted Forest Pond
  5: { x: 88, y: 18 },  // The Midnight Owlry Balcony
  6: { x: 32, y: 52 },  // The Dark Forest Runic Path
  7: { x: 11, y: 44 },  // The Lake of Patronuses
  8: { x: 14, y: 88 },  // Potions Classroom Desk
  9: { x: 80, y: 32 },  // The Glass Greenhouse
  10: { x: 26, y: 86 }, // The Grand Magical Archives
  11: { x: 72, y: 82 }, // The Blue Fire Great Hall
  12: { x: 62, y: 22 }, // The Fireside Armchair
  13: { x: 42, y: 84 }, // The Underwater Ruins
  14: { x: 82, y: 62 }, // The Golden Wand on Desk
};

export const MaraudersMapModal: React.FC<MaraudersMapModalProps> = ({
  activeSceneIndex,
  setActiveSceneIndex,
  onClose,
}) => {
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const hoverSoundThrottleRef = useRef<number | null>(null);

  const activeScene = COZY_SCENES[activeSceneIndex];

  // Trigger opening folds sound
  useEffect(() => {
    sound.playWhoosh();
    setIsOpenAnimation(true);
  }, []);

  // Ambient footprint generation walking around the parchment corridors automatically
  useEffect(() => {
    const interval = setInterval(() => {
      // Choose random start coordinates on the map image
      const startX = Math.random() * 80 + 10;
      const startY = Math.random() * 70 + 15;
      generateFootprintTrail(startX, startY);
    }, 6000);

    // Initial ambient trail on load from the currently active location
    const startCoord = SCENE_COORDINATES[activeSceneIndex] || { x: 50, y: 45 };
    generateFootprintTrail(startCoord.x, startCoord.y);

    return () => clearInterval(interval);
  }, []);

  // Generate an organic ambient trail of footsteps
  const generateFootprintTrail = (startX: number, startY: number) => {
    const stepsCount = 9;
    let cx = startX;
    let cy = startY;
    let currentAngle = Math.random() * 360;

    const newPath: { x: number; y: number; angle: number }[] = [];
    for (let i = 0; i < stepsCount; i++) {
      currentAngle += (Math.random() - 0.5) * 50;
      const radians = (currentAngle * Math.PI) / 180;
      const stepLength = 5.0; // percent jump inside map image
      cx += Math.cos(radians) * stepLength;
      cy += Math.sin(radians) * stepLength;

      // Bound in safe map percentage coordinate limits
      cx = Math.max(8, Math.min(cx, 92));
      cy = Math.max(12, Math.min(cy, 88));

      newPath.push({ x: cx, y: cy, angle: currentAngle });
    }

    spawnFootstepsSequence(newPath);
  };

  // Helper to spawn a scheduled list of footsteps
  const spawnFootstepsSequence = (path: { x: number; y: number; angle: number }[]) => {
    path.forEach((pt, index) => {
      setTimeout(() => {
        const id = `ambient-${Math.random()}-${index}`;
        const isLeft = index % 2 === 0;

        // Visual offset perpendicular to angle for left/right gait separation
        const perpAngle = ((pt.angle + 90) * Math.PI) / 180;
        const gaitWidth = 0.8; 
        const finalX = pt.x + (isLeft ? -1 : 1) * Math.cos(perpAngle) * gaitWidth;
        const finalY = pt.y + (isLeft ? -1 : 1) * Math.sin(perpAngle) * gaitWidth;

        setFootprints((prev) => [
          ...prev,
          {
            id,
            x: finalX,
            y: finalY,
            angle: pt.angle,
            isLeft,
            opacity: 0.95,
            stepIndex: index,
          },
        ]);

        // Evaporate footprint after some duration
        setTimeout(() => {
          setFootprints((current) =>
            current.map((f) => (f.id === id ? { ...f, opacity: 0 } : f))
          );
          setTimeout(() => {
            setFootprints((current) => current.filter((f) => f.id !== id));
          }, 8000);
        }, 4000);
      }, index * 260); // walking interval
    });
  };

  // Animate directed path of footsteps marching from old location straight to the clicked new location!
  const animateDirectedSteps = (fromX: number, fromY: number, toX: number, toY: number) => {
    const stepsCount = 13;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const baseAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    const matchPath: { x: number; y: number; angle: number }[] = [];
    for (let i = 0; i <= stepsCount; i++) {
      const t = i / stepsCount;
      // organic wavy path overlay to feel hand-drawn list walk
      const sway = Math.sin(t * Math.PI * 3.0) * 3.5;
      const perpAngle = ((baseAngle + 90) * Math.PI) / 180;
      
      const cx = fromX + dx * t + Math.cos(perpAngle) * sway;
      const cy = fromY + dy * t + Math.sin(perpAngle) * sway;
      const angle = baseAngle + Math.cos(t * Math.PI * 3.0) * 12;

      matchPath.push({ x: cx, y: cy, angle });
    }

    // Spawn walking chain
    matchPath.forEach((pt, index) => {
      setTimeout(() => {
        const id = `march-${Math.random()}-${index}`;
        const isLeft = index % 2 === 0;

        const perpRad = ((pt.angle + 90) * Math.PI) / 180;
        const separation = 0.7;
        
        const fx = pt.x + (isLeft ? -1 : 1) * Math.cos(perpRad) * separation;
        const fy = pt.y + (isLeft ? -1 : 1) * Math.sin(perpRad) * separation;

        // Play bubble sound on steps rhythmically
        if (index % 3 === 0) {
          sound.playBubble();
        }

        setFootprints((prev) => [
          ...prev,
          {
            id,
            x: fx,
            y: fy,
            angle: pt.angle,
            isLeft,
            opacity: 0.95,
            stepIndex: index,
          },
        ]);

        // Evaporate footprint after some duration
        setTimeout(() => {
          setFootprints((current) =>
            current.map((f) => (f.id === id ? { ...f, opacity: 0 } : f))
          );
          setTimeout(() => {
            setFootprints((current) => current.filter((f) => f.id !== id));
          }, 8000);
        }, 5000);
      }, index * 180); // fast march cadence
    });
  };

  // Trigger sound & change selected location (activeSceneIndex)
  const selectScene = (index: number) => {
    if (index === activeSceneIndex) return;
    
    sound.playSparkleChime();
    
    // March steps from previous to new coordinates
    const fromCoord = SCENE_COORDINATES[activeSceneIndex] || { x: 50, y: 45 };
    const toCoord = SCENE_COORDINATES[index] || { x: 50, y: 45 };
    animateDirectedSteps(fromCoord.x, fromCoord.y, toCoord.x, toCoord.y);

    setActiveSceneIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-stone-950/96 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden cursor-default select-none">
      
      {/* Immersive unfolding antique map viewport */}
      <AnimatePresence>
        {isOpenAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-7xl h-[95vh] sm:h-[92vh] bg-[#edf2f7] border-[14px] border-double border-[#7c5026]/40 rounded-[24px] shadow-[0_20px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(124,80,38,0.2)] overflow-hidden flex flex-col justify-between relative"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at center, rgba(251, 245, 230, 0.4) 0%, rgba(215, 194, 159, 0.75) 100%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.035' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23fbf5e6' filter='url(%23noiseFilter)' opacity='0.22'/%3E%3C/svg%3E")
              `,
              backgroundBlendMode: "multiply",
            }}
          >
            {/* NOISE AND PARCHMENT SPLATTERS OVERLAY */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-repeat bg-[radial-gradient(#8b5a2b_1.5px,transparent_1.5px)] [background-size:24px_24px] z-10" />

            {/* FULL-HEIGHT MAP CONTAINER WITH THE SPECIFIED IMAGE */}
            <div className="absolute inset-0 z-0 w-full h-full">
              <img
                src="/src/assets/images/marauders_map_1779635808700.png"
                alt="The Marauder's Map"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-[0.93] mix-blend-multiply select-none pointer-events-none"
              />
            </div>

            {/* SCIOGRAPHY / ENGRAVINGS BACKDROP FILTER ON TOP OF IMAGE */}
            <div className="absolute inset-0 pointer-events-none opacity-30 select-none z-1 flex items-center justify-center">
              <svg className="w-[110%] h-[110%] stroke-[#5c3d24]/60 fill-none" strokeWidth="0.8">
                <circle cx="50%" cy="50%" r="220" strokeDasharray="5 3" />
                <circle cx="50%" cy="50%" r="350" />
                <path d="M 0,0 L 1200,800 M 1200,0 L 0,800" strokeDasharray="12 12" />
              </svg>
            </div>



            {/* HOTSPOTS GROUP LAYER (ALL 30 LOCATIONS GENERATED VISIBLY ACROSS THE REAL REPLICATED CHART) */}
            <div className="absolute inset-0 z-20 overflow-hidden">
              {COZY_SCENES.map((scene) => {
                const isSelected = scene.index === activeSceneIndex;
                const coords = SCENE_COORDINATES[scene.index] || { x: 50, y: 50 };

                return (
                  <motion.button
                    key={scene.index}
                    onClick={() => selectScene(scene.index)}
                    onMouseEnter={() => {
                      if (!hoverSoundThrottleRef.current) {
                        sound.playClick();
                        hoverSoundThrottleRef.current = setTimeout(() => {
                          hoverSoundThrottleRef.current = null;
                        }, 120);
                      }
                    }}
                    style={{
                      left: `${coords.x}%`,
                      top: `${coords.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border cursor-pointer select-none transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? "z-40 scale-120"
                        : "z-30 hover:scale-110"
                    }`}
                  >
                    {/* Visual custom ink-parchment label marker */}
                    <div className="relative flex items-center justify-center">
                      
                      {/* Interactive Ribbon Tag */}
                      <div className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-md shadow-[0_3px_12px_rgba(92,61,36,0.22)] border transition-all ${
                        isSelected
                          ? "bg-[#fff6e2] border-red-700 text-red-800 font-extrabold scale-110 shadow-[0_0_15px_rgba(185,28,28,0.4)]"
                          : "bg-[#faedd2]/90 hover:bg-[#fff9ee] border-[#8b5a2b]/35 text-[#5c3d24]/90"
                      }`}>
                        {/* Red lettered coordinates index number dot */}
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8.5px] font-mono leading-none ${
                          isSelected ? "bg-red-700 text-[#fffbeb] font-bold" : "bg-[#8b5a2b]/20 text-[#5c3d24]"
                        }`}>
                          {scene.index + 1}
                        </div>

                        {/* Name-tag like handwriting text label */}
                        <span className="font-serif text-[9px] sm:text-[10px] uppercase font-bold tracking-wider whitespace-nowrap">
                          {scene.title.replace("The ", "")}
                        </span>
                      </div>

                      {/* Small arrow marker directing to precise coordinate point */}
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b ${
                        isSelected ? "bg-[#fff6e2] border-red-700" : "bg-[#faedd2]/90 border-[#8b5a2b]/35"
                      }`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* AMBIENT WALKING FOOTPRINTS LAYER */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
              <AnimatePresence>
                {footprints.map((foot) => {
                  const footPath = foot.isLeft
                    ? "M4,12 C4,9 6,3 10,2 C12,1 14,3 13,6 C12,8 9,11 9,14 C9,17 11,20 8,21 C5,21 4,16 4,12 Z M10,1 C9,1 8,2 8,3 C8,4 9,4 10,4 C11,4 11,3 11,2 C11,1 10,1 10,1 Z"
                    : "M12,12 C12,9 10,3 6,2 C4,1 2,3 3,6 C4,8 7,11 7,14 C7,17 5,20 8,21 C11,21 12,16 12,12 Z M6,1 C7,1 8,2 8,3 C8,4 7,4 6,4 C5,4 5,3 5,2 C5,1 6,1 6,1 Z";

                  return (
                    <motion.div
                      key={foot.id}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 0.9, opacity: foot.opacity }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-5 h-5 flex items-center justify-center"
                      style={{
                        left: `${foot.x}%`,
                        top: `${foot.y}%`,
                        transform: `rotate(${foot.angle}deg) translate(-50%, -50%)`,
                        filter: "drop-shadow(1px 2px 2px rgba(84,38,15,0.6))",
                      }}
                    >
                      <svg viewBox="0 0 16 24" className="w-4 h-4 fill-[#6d1313] stroke-amber-700/10 stroke-[0.5]">
                        <path d={footPath} />
                      </svg>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* SELECTION TARGET ORBIT DETECTOR OVERLAID EXACTLY AT THE NEW LOCATION COORDINATE */}
            <div 
              className="absolute z-25 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
              style={{
                left: `${(SCENE_COORDINATES[activeSceneIndex] || { x: 50, y: 50 }).x}%`,
                top: `${(SCENE_COORDINATES[activeSceneIndex] || { x: 50, y: 50 }).y}%`
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Vintage concentric compass pointer */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-20 border border-dotted border-red-800/25 rounded-full"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
                  className="w-11 h-11 rounded-full border-2 border-dashed border-red-800/80 flex items-center justify-center bg-red-800/5 shadow-[0_0_12px_rgba(153,27,27,0.25)]"
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#6d1313] shadow-[0_0_10px_rgba(109,19,19,0.9)]" />
                </motion.div>
              </div>
            </div>



            {/* MISCHIEF MANAGED CLOSE BANNER AT BOTTOM RIGHT FLOATING ON TOP */}
            <div className="absolute right-4 bottom-4 z-40 pointer-events-auto flex items-center gap-2">
              <WizardButton
                variant="filled"
                onClick={() => {
                  sound.playWhoosh();
                  onClose();
                }}
                className="font-serif uppercase tracking-widest font-extrabold px-6 py-2.5 bg-gradient-to-r from-[#701616] to-[#5a1111] hover:from-[#5a1111] hover:to-[#400c0c] text-[#fbf5e6] border-2 border-[#cd9a62] rounded-xl shadow-[0_8px_25px_rgba(112,22,22,0.45)] hover:shadow-[0_10px_30px_rgba(112,22,22,0.65)] hover:scale-105 transition-all text-xs"
              >
                Mischief Managed 👣
              </WizardButton>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
