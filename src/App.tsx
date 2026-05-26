import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GameState, PuzzleArtwork } from "./types";
import { generateArtwork, COZY_SCENES } from "./components/ArtGenerator";
import { WhimsicalArt } from "./components/WhimsicalArt";
import { generateJigsawCutConfig, JigsawCutConfig } from "./components/PuzzlePaths";
import { PuzzleBoard } from "./components/PuzzleBoard";
import { BackgroundElements } from "./components/BackgroundElements";
import { ParticleOverlay, createBurst, LiveParticle } from "./components/ParticleSystem";
import { sound } from "./components/SoundSynth";
import { WizardButton } from "./components/WizardButton";
import { MagicWandCursor } from "./components/MagicWandCursor";
import { MaraudersMapModal } from "./components/MaraudersMapModal";
import {
  SortingHatIcon,
  FelixFelicisPotionIcon,
  MaraudersMapIcon,
  DeathlyHallowsRevelioIcon,
  SnitchWingsIcon,
  ElderWandIcon,
  BubblingCauldronIcon,
  SnitchWingsBadgeIcon,
  SonorusUnmuteIcon,
  QuietusMuteIcon
} from "./components/WizardIcons";
import {
  Play,
  HelpCircle,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Eye,
  EyeOff,
  RotateCw,
  Sliders,
  Compass,
  Layers,
  MapPin
} from "lucide-react";

export default function App() {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [currentArt, setCurrentArt] = useState<PuzzleArtwork | null>(null);
  const [cutConfig, setCutConfig] = useState<JigsawCutConfig | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.EXPLORE);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(true);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [showGhost, setShowGhost] = useState<boolean>(false);

  // Toggle for the World Vault Celestial Overlay
  const [showVault, setShowVault] = useState<boolean>(false);
  
  // Active ambient audio track selector matching current spell
  const [activeAmbientSpell, setActiveAmbientSpell] = useState<"rain" | "fireplace" | "forest" | "celestial">("rain");

  // Toggle state to turn the glowing wand cursor on ("Lumos") and off ("Nox")
  const [isNox, setIsNox] = useState<boolean>(false);

  // Particle list for stardust sparks
  const [particles, setParticles] = useState<LiveParticle[]>([]);

  // Sync artwork loading and piece slicing
  useEffect(() => {
    const art = generateArtwork(activeSceneIndex);
    setCurrentArt(art);
    setCutConfig(generateJigsawCutConfig(6, 4)); // 6x4 = 24 piece layout in gorgeous landscape!
    setIsSolved(true);
    setShowCelebration(false);
  }, [activeSceneIndex]);

  // Manage ambient soundscapes matching scene cycle or manual toggle
  useEffect(() => {
    if (isMuted) {
      sound.stopAmbience();
      return;
    }
    
    if (currentArt) {
      const cycle = activeSceneIndex % 4;
      const defaults: ("rain" | "fireplace" | "forest" | "celestial")[] = ["rain", "fireplace", "forest", "celestial"];
      const targetAmbPattern = defaults[cycle];
      setActiveAmbientSpell(targetAmbPattern);
      sound.startAmbienceType(targetAmbPattern);
    }
    
    return () => {
      sound.stopAmbience();
    };
  }, [activeSceneIndex, isMuted, currentArt]);

  // Activate custom sensory environments
  const triggerAtmosphereSpell = (type: "rain" | "fireplace" | "forest" | "celestial") => {
    if (isMuted) {
      sound.toggleMute();
      setIsMuted(false);
    }
    sound.playSparkleChime();
    setActiveAmbientSpell(type);
    sound.startAmbienceType(type);
  };

  // Soundscape fallback idle chords
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSolved && gameState === GameState.EXPLORE && !isMuted) {
        sound.playHum();
      }
    }, 9500);
    return () => clearInterval(interval);
  }, [isSolved, gameState, isMuted]);

  if (!currentArt || !cutConfig) {
    return (
      <div className="min-h-screen bg-[#040209] flex items-center justify-center font-serif text-amber-100">
        <div className="flex flex-col items-center gap-3">
          <Sparkles className="animate-pulse text-amber-300" size={36} />
          <p className="text-sm tracking-[0.25em] font-mono uppercase">Summoning Sanctuary...</p>
        </div>
      </div>
    );
  }

  const handleReshuffleArtwork = () => {
    const freshArt = generateArtwork(activeSceneIndex);
    setCurrentArt(freshArt);
    setIsSolved(true);
  };

  const toggleSound = () => {
    const nextMute = sound.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) {
      sound.playBubble();
    }
  };

  const handlePieceSnapped = () => {
    sound.playClick();
  };

  const triggerLocalBubble = (x: number, y: number) => {
    setParticles((prev) => [...prev, ...createBurst(x + 28, y + 28, 14, "star")]);
  };

  const handleAllCompleted = () => {
    sound.playSparkleChime();
    const centralX = window.innerWidth / 2;
    const centralY = window.innerHeight / 2;
    
    setParticles((prev) => [
      ...prev,
      ...createBurst(centralX, centralY, 32, "star"),
      ...createBurst(centralX - 150, centralY, 18, "petal"),
      ...createBurst(centralX + 150, centralY, 18, "sparkle"),
    ]);
    setShowCelebration(true);
  };

  const startManualJigsawMode = () => {
    sound.playWhoosh();
    setGameState(GameState.DRAGGING);
    setIsSolved(false);
    setShowCelebration(false);
    setCutConfig(generateJigsawCutConfig(6, 4));
  };

  const returnToExploreMode = () => {
    sound.playWhoosh();
    setGameState(GameState.EXPLORE);
    setIsSolved(true);
    setShowCelebration(false);
  };

  const navigateScene = (direction: "prev" | "next") => {
    sound.playClick();
    if (direction === "prev") {
      setActiveSceneIndex((prev) => (prev === 0 ? COZY_SCENES.length - 1 : prev - 1));
    } else {
      setActiveSceneIndex((prev) => (prev === COZY_SCENES.length - 1 ? 0 : prev + 1));
    }
  };

  const activeMetadata = COZY_SCENES[activeSceneIndex];

  return (
    <div
      className={`relative min-h-screen w-full bg-[#0d0905] text-[#f2e7d5] flex flex-col justify-between overflow-x-hidden p-4 sm:p-6 md:p-8 select-none font-sans font-normal transition-all duration-300 ${
        isNox ? "" : "sm:cursor-none sm:[&_*]:cursor-none"
      }`}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(13, 9, 5, 0.4), rgba(15, 10, 6, 0.72)), url("/src/assets/images/common_room_bg_1779632598925.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      
      {/* Interactive Custom Magic Wand Cursor & Blue luminescent trail */}
      {!isNox && <MagicWandCursor />}
      
      {/* Decorative analog watercolor noise grain */}
      <div className="absolute inset-0 opacity-[0.038] pointer-events-none z-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      {/* Volumetric background lights, candles, floating wisps and spirits */}
      <BackgroundElements />

      {/* Ghibli Master illustration references compilation node */}
      <svg className="absolute hidden">
        <defs>
          <WhimsicalArt art={currentArt} />
        </defs>
      </svg>

      {/* Physical stardust particle workspace layer */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <ParticleOverlay particles={particles} setParticles={setParticles} />
      </div>

      {/* TINY ATMOSPHERIC TOP HUB */}
      <header className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xl animate-pulse">✨</span>
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.25)] font-serif italic">
              Hogwarts Great Hall Spellbound Altar
            </span>
          </div>
          <span className="text-[9px] tracking-[0.25em] font-sans text-amber-200/40 uppercase font-extrabold">
            ancient portrait restoration rite
          </span>
        </div>

        {/* Wizard diagnostics info & help manual bubble */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Marauder's Map vault trigger button */}
          <button
            onClick={() => {
              sound.playSparkleChime();
              setShowVault(true);
            }}
            className="px-3.5 py-1.5 h-10 flex items-center gap-2 rounded-full bg-stone-900/60 hover:bg-amber-950/45 border border-amber-500/20 text-amber-200 hover:text-white hover:border-amber-400/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer font-serif text-[11px] sm:text-xs font-bold uppercase tracking-wider"
            title="Open the Marauder's Map Vault"
          >
            <MaraudersMapIcon size={18} className="animate-pulse" />
            <span className="hidden xs:inline">Marauder's Map</span>
            <span className="xs:hidden">Map</span>
          </button>

          {/* Lumos / Nox Wand Cursor Toggle Switch */}
          <div className="flex items-center h-10 bg-stone-900/60 border border-amber-500/20 rounded-full p-1 gap-1">
            <button
              onClick={() => {
                if (isNox) {
                  setIsNox(false);
                  sound.playSparkleChime();
                }
              }}
              className={`px-3 h-8 flex items-center justify-center gap-1 rounded-full cursor-pointer transition-all duration-300 text-[10px] uppercase font-serif tracking-wider font-extrabold ${
                !isNox 
                  ? "bg-amber-500/20 border border-amber-400/60 text-amber-100 shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-105" 
                  : "bg-transparent text-stone-500 border border-transparent hover:text-amber-200/50"
              }`}
              title="Cast Lumos (Activate glowing magic wand cursor & spark trailing)"
            >
              <span>🪄</span>
              <span className="hidden xs:inline">Lumos</span>
            </button>
            <button
              onClick={() => {
                if (!isNox) {
                  setIsNox(true);
                  sound.playWhoosh();
                }
              }}
              className={`px-3 h-8 flex items-center justify-center gap-1 rounded-full cursor-pointer transition-all duration-300 text-[10px] uppercase font-serif tracking-wider font-extrabold ${
                isNox 
                  ? "bg-stone-800 border border-stone-600/40 text-amber-100 shadow-[0_0_8px_rgba(0,0,0,0.4)] scale-105" 
                  : "bg-transparent text-stone-500 border border-transparent hover:text-amber-200/50"
              }`}
              title="Cast Nox (Extinguish glowing wand light, restore standard cursor)"
            >
              <span>⚫</span>
              <span className="hidden xs:inline">Nox</span>
            </button>
          </div>

          {/* Unmute / Mute Dual Spell buttons (Sonorus & Quietus) */}
          <div className="flex items-center h-10 bg-stone-900/60 border border-amber-500/20 rounded-full p-1 gap-1">
            <button
              onClick={() => {
                if (isMuted) {
                  const nextMute = sound.toggleMute();
                  setIsMuted(nextMute);
                  sound.playSparkleChime();
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                !isMuted 
                  ? "bg-amber-500/20 border border-amber-400/60 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-105" 
                  : "bg-transparent text-stone-500 border border-transparent hover:text-amber-200/50"
              }`}
              title="Cast Sonorus (Unmute - Play cozy ambient soundscapes)"
            >
              <SonorusUnmuteIcon size={20} />
            </button>
            <button
              onClick={() => {
                if (!isMuted) {
                  const nextMute = sound.toggleMute();
                  setIsMuted(nextMute);
                }
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                isMuted 
                  ? "bg-stone-800 border border-amber-600/40 text-amber-100/90 shadow-[0_0_8px_rgba(245,158,11,0.1)] scale-105" 
                  : "bg-transparent text-stone-500 border border-transparent hover:text-amber-200/50"
              }`}
              title="Cast Quietus (Mute all acoustic soundscapes)"
            >
              <QuietusMuteIcon size={20} />
            </button>
          </div>

          <button
            onClick={() => {
              sound.playBubble();
              setShowHelp(!showHelp);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-900/60 hover:bg-stone-950/70 border border-amber-500/20 text-amber-200 hover:text-white hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] transition-all cursor-pointer"
            title="Open Hogwarts Standard Book of Spells"
          >
            <SortingHatIcon size={25} />
          </button>
        </div>
      </header>

      {/* SACRED SACRAMENTAL CENTER DESIGN - Cinematic Altar Centerpiece */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-auto flex flex-col items-center justify-center py-6 md:py-12">
        
        {/* Luminous Title Display Stamp */}
        <div className="text-center mb-8 max-w-md relative z-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-950/60 border border-amber-500/20 rounded-full mb-2.5 backdrop-blur-md shadow-sm"
          >
            <SnitchWingsBadgeIcon size={16} />
            <span className="text-[10px] uppercase font-serif tracking-widest text-amber-200/95 font-medium">
              Chronicle {activeSceneIndex + 1} of 30
            </span>
          </motion.div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-amber-100 drop-shadow-[0_3px_15px_rgba(0,0,0,0.6)]">
            {currentArt.title}
          </h2>
          <p className="text-[11px] font-sans tracking-[0.18em] text-amber-200/60 uppercase font-medium mt-1">
            {currentArt.subtitle}
          </p>
          <p className="font-serif italic text-[12px] text-[#efe5cd]/80 leading-relaxed mt-2.5 px-6">
            "{activeMetadata.description}"
          </p>
        </div>

        {/* DYNAMIC ASYMMETRICAL CHARM CIRCLE (Surrounding Altar Controls) */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-3xl min-h-[500px]">
          
          {/* Main Board Centerpiece (Majestic floating magical wood dial) */}
          <div className="relative z-15 p-4 md:p-8 flex items-center justify-center transition-all duration-500 bg-gradient-to-br from-stone-950/30 via-[#18110b]/55 to-transparent rounded-[120px] shadow-[inset_0_0_80px_rgba(217,119,6,0.05)] border border-amber-600/10">
            <PuzzleBoard
              art={currentArt}
              cutConfig={cutConfig}
              gameState={gameState}
              onPieceSnap={handlePieceSnapped}
              onAllCompleted={handleAllCompleted}
              triggerLocalBubble={triggerLocalBubble}
              isSolved={isSolved}
              setIsSolved={setIsSolved}
              reshuffle={handleReshuffleArtwork}
              scatterAll={startManualJigsawMode}
              switchToExplore={returnToExploreMode}
            />
          </div>

          {/* CELESTIAL CONTROL SATELLITES (Floating Artifacts around the board dial) */}
          
          {/* 3. REVELIO GLYPH SHADOW / MOON TRACE HINT - Glowing glyph (West Boundary left center) */}
          <motion.div
            className="absolute left-4 sm:left-6 md:left-14 top-1/3 z-20 flex flex-col items-center gap-1.5"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <WizardButton
              variant="nav-arrow"
              onClick={() => {
                sound.playClick();
                setShowGhost(!showGhost);
              }}
              title="Cast Revelio to Reveal Phantom Image"
            >
              <DeathlyHallowsRevelioIcon size={26} active={showGhost} />
            </WizardButton>
            <span className="text-[8px] uppercase font-serif tracking-widest text-amber-200/90 font-bold">Revelio</span>
          </motion.div>
 
          {/* 4. CHAPTER CAROUSEL NAVIGATORS - Slender organic floating buttons at the borders */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex justify-between z-10 px-2 sm:px-6">
            <WizardButton
              variant="nav-arrow"
              onClick={() => navigateScene("prev")}
              className="pointer-events-auto"
              title="Summon Previous World"
            >
              <SnitchWingsIcon direction="left" size={28} />
            </WizardButton>
            
            <WizardButton
              variant="nav-arrow"
              onClick={() => navigateScene("next")}
              className="pointer-events-auto"
              title="Summon Next World"
            >
              <SnitchWingsIcon direction="right" size={28} />
            </WizardButton>
          </div>

        </div>

      </main>

      {/* FOOTER COZY DETAILS */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-6 border-t border-amber-600/15 text-[9px] text-amber-400/40 uppercase tracking-[0.25em] pointer-events-auto">
        <div className="flex items-center gap-2">
          <span>HOGWARTS SPELLBOUND BOARD</span>
          <span className="text-amber-500/30">✦</span>
          <span>THE GREAT HALL RITUAL</span>
        </div>
        <div className="flex items-center gap-1.5 font-serif">
          <SnitchWingsBadgeIcon size={14} className="animate-pulse" />
          <span>Lumos soundscapes & chiming wizard spells active</span>
        </div>
      </footer>

      {/* PLAY MANUAL OVERLAY */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-stone-900/95 border-2 border-amber-600/35 rounded-[36px] p-6 text-amber-100/90 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(217,119,6,0.15)] relative"
            >
              <h3 className="font-serif text-lg font-bold text-amber-300 mb-3 flex items-center gap-2">
                <span>⚡</span> Wizarding Spellbook:
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed text-amber-100/90 font-serif">
                <li className="flex items-start gap-2.5">
                  <span className="text-lg">🗺️</span>
                  <span>
                    <strong>Marauder's Map:</strong> Tap the gold parchment button in the top header to choose from <strong>30 Hogwarts & magical canvases</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-lg">🪄</span>
                  <span>
                    <strong>Diffindo Charm:</strong> Split the scenery into <strong>{cutConfig.cols * cutConfig.rows} curved interlocking wooden jigsaw shards</strong>. Drag and secure them inside the glowing golden tray.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-lg">🔮</span>
                  <span>
                    <strong>Revelio Charm:</strong> Activate the Revelio sight lens to superimpose a ghostly whisper watermark guiding your wand placement.
                  </span>
                </li>
              </ul>
              
              <WizardButton
                variant="filled"
                onClick={() => {
                  sound.playClick();
                  setShowHelp(false);
                }}
                className="mt-6 w-full font-bold"
              >
                Close Spellbook
              </WizardButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VAULT OF WORLDS SCROLLED CELESTIAL SELECTION MAP DISPLAY */}
      <AnimatePresence>
        {showVault && (
          <MaraudersMapModal
            activeSceneIndex={activeSceneIndex}
            setActiveSceneIndex={setActiveSceneIndex}
            onClose={() => setShowVault(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
