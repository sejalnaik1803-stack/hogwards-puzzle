import React from "react";

// 1. SortingHatIcon (replaces help/BookOpen standard dialogs)
export const SortingHatIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base brim of Hat */}
    <path 
      d="M12 78 C22 74, 38 76, 50 76 C62 76, 78 74, 88 78 C93 80, 88 84, 78 85 C62 86.5, 38 86.5, 22 85 C12 84, 7 80, 12 78 Z" 
      fill="#442a17" 
      stroke="#eab308" 
      strokeWidth="2.5" 
      strokeLinejoin="round"
    />
    {/* Wrinkled detailed crown */}
    <path 
      d="M30 73 C28 53, 36 43, 40 40 C43 38, 46 40, 43 46 C40 53, 46 53, 50 48 C53 43, 50 30, 56 18 C58 13, 63 8, 66 10 C68 12, 64 20, 58 33 C56 38, 60 46, 63 50 C66 54, 66 66, 66 73 C66 73 58 65 50 75 C42 65 30 73 30 73 Z" 
      fill="#5a3d28" 
      stroke="#eab308" 
      strokeWidth="2.2" 
      strokeLinejoin="round"
    />
    {/* Talking face folds */}
    {/* Eyes */}
    <path d="M36 54 Q41 50 42 55" stroke="#efe4cf" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M60 54 Q55 50 54 55" stroke="#efe4cf" strokeWidth="2.2" strokeLinecap="round" />
    {/* Nose fold crease */}
    <path d="M45 53 Q50 59 55 53" stroke="#eab308" strokeWidth="1.8" />
    {/* Laughing mouth crease fold */}
    <path d="M36 64 Q50 58 64 64 Q50 70 36 64 Z" fill="#1e130c" stroke="#eab308" strokeWidth="2" />
    {/* Patch sticker */}
    <path d="M28 42 H35 V48 H28 Z" fill="#78350f" opacity="0.9" />
    <path d="M28 42 H35 V48 H28 Z" fill="none" stroke="#fef08a" strokeWidth="1" strokeDasharray="2 1.5" />
  </svg>
);

// 2. FelixFelicisPotionIcon (replaces normal heart / status check icons)
export const FelixFelicisPotionIcon: React.FC<{ size?: number; className?: string; liquidColor?: string }> = ({ 
  size = 24, 
  className = "", 
  liquidColor = "#eab308" 
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Glass neck crown */}
    <rect x="42" y="8" width="16" height="6" rx="1.5" fill="#a16207" stroke="#fbbf24" strokeWidth="1.5" />
    {/* Cork plug */}
    <path d="M41 14 H59 V22 H41 Z" fill="rgba(255,255,255,0.18)" stroke="#fbbf24" strokeWidth="1.8" />
    {/* Flask Drop Body */}
    <path 
      d="M50 22 C36 41, 18 56, 18 72 C18 87, 32 91, 50 91 C68 91, 82 87, 82 72 C82 56, 64 41, 50 22 Z" 
      fill="rgba(217, 119, 6, 0.08)" 
      stroke="#d97706" 
      strokeWidth="2.5" 
    />
    {/* Glowing Felix liquid luck */}
    <path 
      d="M50 34 C39 49, 22 62, 22 72 C22 83, 34 87, 50 87 C66 87, 78 83, 78 72 C78 62, 61 49, 50 34 Z" 
      fill={liquidColor} 
      opacity="0.9" 
    />
    {/* Little sparkles swirling inside */}
    <polygon points="50,54 52,59 57,61 52,63 50,68 48,63 43,61 48,59" fill="#ffffff" />
    <circle cx="36" cy="72" r="2.5" fill="#ffffff" opacity="0.8" />
    <circle cx="64" cy="76" r="3.5" fill="#ffffff" opacity="0.75" />
    {/* Curved glossy highlight */}
    <path d="M26 68 C24 72, 26 78, 32 82" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// 3. MaraudersMapIcon (replaces book, layers, pin layouts)
export const MaraudersMapIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Folded Page */}
    <path d="M12 18 L38 24 L38 84 L12 78 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
    <path d="M14 20 L36 25 L36 82 L14 76 Z" fill="#fef3c7" />
    {/* Center Folded Page */}
    <path d="M38 24 L62 19 L62 79 L38 84 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
    <path d="M40 25 L60 20 L60 77 L40 82 Z" fill="#fbf0b9" />
    {/* Right Folded Page */}
    <path d="M62 19 L88 25 L88 85 L62 79 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
    <path d="M64 21 L86 26 L86 83 L64 77 Z" fill="#fef3c7" />
    
    {/* Castle blueprint sketches in the center fold */}
    <path d="M43 45 H47 V62 H43 Z M53 41 H57 V58 H53 Z" fill="#854d0e" opacity="0.7" />
    <polygon points="42,45 45,38 48,45" fill="#78350f" />
    <polygon points="52,41 55,34 58,41" fill="#78350f" />
    
    {/* Handwritten maps runes */}
    <path d="M19 32 H29 M17 40 H31 M71 34 H81 M69 42 H83" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    
    {/* Mystery footsteps tracing */}
    <ellipse cx="45" cy="68" rx="1" ry="1.5" fill="#78350f" />
    <ellipse cx="49" cy="71" rx="1.5" ry="1" fill="#78350f" />
    <ellipse cx="46" cy="75" rx="1" ry="1.5" fill="#78350f" />
    <ellipse cx="50" cy="78" rx="1.5" ry="1" fill="#78350f" />
  </svg>
);

// 4. DeathlyHallowsRevelioIcon (encompasses eye and magic insight trace)
export const DeathlyHallowsRevelioIcon: React.FC<{ size?: number; className?: string; active?: boolean }> = ({ 
  size = 24, 
  className = "", 
  active = false 
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Eye shaped framing boundary representing insight */}
    <path 
      d="M8 50 Q50 12 92 50 Q50 88 8 50 Z" 
      stroke={active ? "#fbbf24" : "#b45309"} 
      strokeWidth="2" 
      fill="none" 
      opacity="0.45" 
    />
    
    {/* Deathly Hallows Emblem inside core */}
    {/* 1. Equilateral Triangle representing Cloak of Invisibility */}
    <polygon 
      points="51,20 82,73 20,73" 
      stroke={active ? "#f59e0b" : "#b45309"} 
      strokeWidth="3.2" 
      strokeLinejoin="round" 
    />
    {/* 2. Standard Circle representing the Resurrection Stone */}
    <circle 
      cx="51" 
      cy="55" 
      r="17" 
      stroke={active ? "#f59e0b" : "#b45309"} 
      strokeWidth="3.2" 
    />
    {/* 3. Elder Wand Centerline of destiny */}
    <line 
      x1="51" 
      y1="20" 
      x2="51" 
      y2="73" 
      stroke={active ? "#ffffff" : "#fbbf24"} 
      strokeWidth="4" 
      strokeLinecap="round" 
    />
    
    {/* Ambient Sparks and light dots if active */}
    {active && (
      <>
        <circle cx="15" cy="32" r="2.5" fill="#fef08a" />
        <circle cx="85" cy="68" r="2" fill="#fef08a" />
        <circle cx="51" cy="11" r="1.5" fill="#ffffff" />
      </>
    )}
  </svg>
);

// 5. SnitchWingsIcon (replacement navigation handles for scroll carousels)
export const SnitchWingsIcon: React.FC<{ size?: number; className?: string; direction?: "left" | "right" }> = ({ 
  size = 24, 
  className = "", 
  direction = "left" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 100" 
    className={`${direction === "left" ? "" : "scale-x-[-1]"} ${className}`} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Snitch central golden metallic ball core */}
    <circle cx="82" cy="50" r="12" fill="url(#snitch-gradient-ball)" stroke="#d97706" strokeWidth="2" />
    {/* Symmetrical engraving bands */}
    <path d="M74 44 C77 46, 77 54, 74 56 M90 44 C87 46, 87 54, 90 56 M76 50 H88" stroke="#78350f" strokeWidth="1" />
    
    {/* Majestic feathered wing flapping */}
    <path 
      d="M72 45 C48 24, 8 28, 6 48 C14 46, 30 44, 46 47 C22 53, 12 62, 16 71 C26 65, 42 59, 56 56 C38 69, 28 82, 36 86 C46 78, 58 67, 71 55" 
      fill="rgba(254, 240, 138, 0.45)" 
      stroke="#fbbf24" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Interior feather details */}
    <path d="M10 47 Q33 43, 68 50 M20 55 Q40 51, 64 52 M38 68 Q50 59, 67 53" stroke="rgba(255,255,255,0.75)" strokeWidth="0.8" />
    
    <defs>
      <radialGradient id="snitch-gradient-ball" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
    </defs>
  </svg>
);

// 6. ElderWandIcon (replaces standard manual slider triggers/play icons)
export const ElderWandIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-15, 50, 50)">
      {/* Wooden handle spine base */}
      <path d="M10 83 L25 71 Q28 70 26 74 L13 85 Z" fill="#301505" stroke="#78350f" strokeWidth="1" />
      
      {/* Node Bumps */}
      <ellipse cx="28" cy="69" rx="3.8" ry="5" transform="rotate(40, 28, 69)" fill="#7c2d12" stroke="#fbbf24" strokeWidth="1" />
      <path d="M28 69 L39 59" stroke="#301505" strokeWidth="3" strokeLinecap="round" />
      
      <ellipse cx="40" cy="57" rx="3.2" ry="4.5" transform="rotate(40, 40, 57)" fill="#7c2d12" stroke="#fbbf24" strokeWidth="1" />
      <path d="M40 57 L51 47" stroke="#301505" strokeWidth="2.6" strokeLinecap="round" />
      
      <ellipse cx="52" cy="45" rx="2.8" ry="4" transform="rotate(40, 52, 45)" fill="#7c2d12" stroke="#fbbf24" strokeWidth="1" />
      <path d="M52 45 L64 35" stroke="#301505" strokeWidth="2.2" strokeLinecap="round" />
      
      <ellipse cx="65" cy="33" rx="2.4" ry="3.5" transform="rotate(40, 65, 33)" fill="#7c2d12" stroke="#fbbf24" strokeWidth="1" />
      <path d="M65 33 L78 23" stroke="#301505" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Sparkling Wizard wand tip */}
      <ellipse cx="79" cy="22" rx="1.8" ry="2.8" transform="rotate(40, 79, 22)" fill="#fbbf24" />
      <line x1="79" y1="22" x2="90" y2="13" stroke="#fef08a" strokeWidth="1.2" />
      
      {/* Magic burst dust sparks */}
      <polygon points="88,6 89,10 93,11 89,12 88,16 87,12 83,11 87,10" fill="#ffffff" />
      <path d="M90 13 Q94 8 98 12 M90 13 Q95 18 92 22" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </g>
  </svg>
);

// 7. BubblingCauldronIcon (replaces standard RotateCw/spin layout options)
export const BubblingCauldronIcon: React.FC<{ size?: number; className?: string; animateStir?: boolean }> = ({ 
  size = 24, 
  className = "", 
  animateStir = false 
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hanging bronze handle arch */}
    <path d="M22 43 C22 22, 78 22, 78 43" stroke="#78350f" strokeWidth="2.2" fill="none" opacity="0.8" />
    
    {/* Thick black rim torus lip */}
    <ellipse cx="50" cy="38" rx="26" ry="6" fill="#1c1917" stroke="#d97706" strokeWidth="1.8" />
    
    {/* Bubbling emerald magic liquid brew internally */}
    <ellipse cx="50" cy="38" rx="23" ry="4" fill="#166534" />
    <circle cx="39" cy="38" r="2" fill="#86efac" className="animate-pulse" />
    <circle cx="51" cy="37" r="1.5" fill="#4ade80" />
    <circle cx="58" cy="39" r="2.2" fill="#86efac" className="animate-pulse" />
    
    {/* Bulging Cauldron Bowl body */}
    <path 
      d="M23 40 C14 54, 18 80, 38 84 C44 85.5, 56 85.5, 62 84 C82 80, 86 54, 77 40" 
      fill="#292524" 
      stroke="#d97706" 
      strokeWidth="2.2" 
    />
    
    {/* Tiny stubby legs */}
    <path d="M30 82 L24 90 L34 88 Z" fill="#1c1917" />
    <path d="M70 82 L76 90 L66 88 Z" fill="#1c1917" />
    
    {/* Ladle handle poking out, stirs dynamically in relation */}
    <g className={animateStir ? "origin-[50px_38px] animate-pulse" : ""}>
      <path d="M47 22 L53 38 L49 39 L43 23 Z" fill="#d97706" stroke="#92400e" strokeWidth="1" />
    </g>
    
    {/* Poison vapors drifting up */}
    <path d="M34 26 Q42 16, 38 8" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path d="M66 24 Q58 14, 64 6" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 8. SnitchWingsBadgeIcon (replaces decorative Sparkles/Sparks indicators)
export const SnitchWingsBadgeIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = "" 
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 10)">
      {/* Symmetrical Left Wing */}
      <path 
        d="M40 50 C23 33, 6 38, 3 48 C10 46, 20 46, 30 48 Q18 52, 14 57 C20 53, 28 49, 37 46" 
        fill="rgba(254, 240, 138, 0.45)" 
        stroke="#fbbf24" 
        strokeWidth="1.2" 
      />
      {/* Symmetrical Right Wing */}
      <path 
        d="M60 50 C77 33, 94 38, 97 48 C90 46, 80 46, 70 48 Q82 52, 86 57 C80 53, 72 49, 63 46" 
        fill="rgba(254, 240, 138, 0.45)" 
        stroke="#fbbf24" 
        strokeWidth="1.2" 
      />
      {/* central gold core */}
      <circle cx="50" cy="51" r="10" fill="url(#snitch-gradient-badge)" stroke="#d97706" strokeWidth="1.5" />
      <path d="M44 47 C47 49, 47 53, 44 55 M56 47 C53 49, 53 53, 56 55" stroke="#78350f" strokeWidth="0.8" />
    </g>
    
    {/* TWINKLING MAGIC STARS */}
    <polygon points="50,15 52,20 57,21 52,22 50,27 48,22 43,21 48,20" fill="#fef08a" className="animate-pulse" />
    <polygon points="18,18 19,22 23,23 19,24 18,28 17,24 13,23 17,22" fill="#fbbf24" />
    <polygon points="82,18 83,22 87,23 83,24 82,28 81,24 77,23 81,22" fill="#fbbf24" />
    
    <defs>
      <radialGradient id="snitch-gradient-badge" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#fef08a" />
        <stop offset="80%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
    </defs>
  </svg>
);

// 9. SonorusUnmuteIcon (Unmuted golden wizard campanella with audio vibrations)
export const SonorusUnmuteIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = "" 
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ornate vintage hand bell handle */}
    <path d="M50 12 C47 12, 45 15, 45 22 L46 42 H54 L55 22 C55 15, 53 12, 50 12 Z" fill="url(#bell-handle-grad)" stroke="#78350f" strokeWidth="1" />
    <circle cx="50" cy="12" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
    
    {/* Bell body dome */}
    <path 
      d="M44 42 C30 42, 28 64, 25 76 C25 78, 27 80, 29 80 H71 C73 80, 75 78, 75 76 C72 64, 70 42, 56 42 H44 Z" 
      fill="url(#bell-body-grad)" 
      stroke="#b45309" 
      strokeWidth="2.2" 
    />
    
    {/* Golden bell lip ring and clapper peeking */}
    <ellipse cx="50" cy="80" rx="23" ry="4" fill="#a16207" stroke="#fbbf24" strokeWidth="1.5" />
    <circle cx="50" cy="84" r="3.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
    
    {/* Filigree wizard engraving inside bell body */}
    <path d="M40 56 Q50 63, 60 56 M36 66 Q50 74, 64 66" stroke="#fef08a" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
    
    {/* RADIANT UNMUTED MAGIC SOUND RIPPLES */}
    <path d="M12 40 C7 46, 7 54, 12 60" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M18 32 C11 41, 11 59, 18 68" stroke="rgba(254, 240, 138, 0.65)" strokeWidth="1.8" strokeLinecap="round" />
    
    <path d="M88 40 C93 46, 93 54, 88 60" stroke="#fef08a" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M82 32 C89 41, 89 59, 82 68" stroke="rgba(254, 240, 138, 0.65)" strokeWidth="1.8" strokeLinecap="round" />
    
    <circle cx="15" cy="24" r="1.5" fill="#ffffff" opacity="0.8" />
    <circle cx="85" cy="74" r="2" fill="#ffffff" opacity="0.8" />
    
    <defs>
      <linearGradient id="bell-handle-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      <radialGradient id="bell-body-grad" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#fffbeb" />
        <stop offset="35%" stopColor="#fef08a" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </radialGradient>
    </defs>
  </svg>
);

// 10. QuietusMuteIcon (Matching bell but with an elegant magic silence slash bar over it)
export const QuietusMuteIcon: React.FC<{ size?: number; className?: string }> = ({ 
  size = 24, 
  className = "" 
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ornate vintage hand bell handle */}
    <path d="M50 12 C47 12, 45 15, 45 22 L46 42 H54 L55 22 C55 15, 53 12, 50 12 Z" fill="url(#bell-handle-grad-mute)" stroke="#78350f" strokeWidth="1" opacity="0.4" />
    <circle cx="50" cy="12" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" opacity="0.5" />
    
    {/* Bell body dome */}
    <path 
      d="M44 42 C30 42, 28 64, 25 76 C25 78, 27 80, 29 80 H71 C73 80, 75 78, 75 76 C72 64, 70 42, 56 42 H44 Z" 
      fill="url(#bell-body-grad-mute)" 
      stroke="#78350f" 
      strokeWidth="2.2" 
      opacity="0.65"
    />
    
    {/* Golden bell lip ring and clapper peeking */}
    <ellipse cx="50" cy="80" rx="23" ry="4" fill="#854d0e" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
    <circle cx="50" cy="84" r="3.5" fill="#a16207" stroke="#78350f" strokeWidth="1" opacity="0.5" />
    
    {/* Silent indicators - No soundwaves! Instead, soft soundwaves fading out with dashes */}
    <path d="M14 43 C12 45, 12 48, 14 50" stroke="#78350f" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
    <path d="M86 43 C88 45, 88 48, 86 50" stroke="#78350f" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
    
    {/* ANCIENT SPELLBOUND SLASHLIGHT RED/GOLD CROSS SHIELD */}
    <g>
      {/* Intentionally crossing magical seal lines to signify absolute silence silence/quietus */}
      <line x1="22" y1="22" x2="78" y2="78" stroke="#ef4444" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="22" y1="22" x2="78" y2="78" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    </g>
    
    <defs>
      <linearGradient id="bell-handle-grad-mute" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#1c1917" />
      </linearGradient>
      <radialGradient id="bell-body-grad-mute" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="50%" stopColor="#a16207" />
        <stop offset="100%" stopColor="#292524" />
      </radialGradient>
    </defs>
  </svg>
);
