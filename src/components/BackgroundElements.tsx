import React, { useMemo } from "react";
import { motion } from "motion/react";

interface FloatingItem {
  id: string;
  type: "star" | "firefly" | "wisp" | "rune";
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  scale: number;
  rotation: number;
}

const RUNES = [
  "Ϟ", "⚯", "͛", "🔮", "✦", "⚜", "☽", "❂"
];

const COLOR_POOL = [
  "rgba(220, 38, 38, 0.45)",   // Gryffindor Scarlet Aura
  "rgba(251, 191, 36, 0.5)",   // Hufflepuff Golden Glow
  "rgba(16, 185, 129, 0.45)",  // Slytherin Emerald Light
  "rgba(37, 99, 235, 0.4)",    // Ravenclaw Blue Spell-Spark
  "rgba(192, 132, 252, 0.5)",  // Elderberry Spell Light
  "rgba(253, 224, 71, 0.45)",  // Pure Gold Stardust
];

export const BackgroundElements: React.FC = () => {
  const items = useMemo(() => {
    const list: FloatingItem[] = [];
    
    // Generate 25 beautifully dispersed floating elements
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * 100; // Screen width %
      const y = Math.random() * 95;  // Screen height %
      
      let type: "star" | "firefly" | "wisp" | "rune" = "star";
      const randValue = Math.random();
      if (randValue < 0.35) {
        type = "star";
      } else if (randValue < 0.65) {
        type = "firefly";
      } else if (randValue < 0.85) {
        type = "wisp";
      } else {
        type = "rune";
      }

      const size = Math.random() * 14 + 6;
      const color = COLOR_POOL[i % COLOR_POOL.length];
      const delay = Math.random() * -30; // Pre-warm the loop
      const duration = Math.random() * 15 + 15; // Slow, immersive drift
      const scale = Math.random() * 0.4 + 0.8;
      const rotation = Math.random() * 360;

      list.push({
        id: `celestial-${i}`,
        type,
        x,
        y,
        size,
        color,
        delay,
        duration,
        scale,
        rotation,
      });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Immersive background color bleeding underlay (Ghibli Moonlit atmosphere) */}
      <div className="absolute top-10 left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] rounded-full bg-amber-950/10 blur-[130px] pointer-events-none" />

      {/* Underlay of delicate constellation pathways */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12] stroke-purple-400 fill-none" strokeWidth="0.8">
        <path d="M 120,150 L 250,90 L 380,210" strokeDasharray="3,6" />
        <path d="M 850,140 L 980,280 L 1100,200 L 1050,420" strokeDasharray="4,6" />
        <path d="M 150,680 L 220,740 L 350,690" strokeDasharray="2,5" />
        <circle cx="250" cy="90" r="1.5" className="fill-purple-300" />
        <circle cx="980" cy="280" r="2" className="fill-purple-300" />
        <circle cx="1100" cy="200" r="1.5" className="fill-purple-300" />
      </svg>

      {/* Scenic Alchemist Candle - cozy candlelight flicker on the desk */}
      <div className="absolute bottom-12 left-12 flex-col items-center gap-1 hidden xl:flex">
        <div className="relative w-12 h-36">
          {/* Subtle warm glow background */}
          <motion.div
            className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl"
            animate={{
              scale: [1, 1.15, 0.95, 1.1, 1],
              opacity: [0.7, 0.9, 0.65, 0.85, 0.7]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Handcrafted Alchemist Candle SVG */}
          <svg viewBox="0 0 48 140" className="w-full h-full drop-shadow-xl">
            {/* Candle wax body with dripping gold */}
            <rect x="18" y="50" width="12" height="70" rx="3" fill="#DDB26A" />
            <path d="M 18,54 C 18,60 21,62 21,68 C 21,72 19,74 19,80" fill="none" stroke="#BB8F42" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 28,52 C 28,58 30,62 30,68 C 30,72 28,76 28,82" fill="none" stroke="#BB8F42" strokeWidth="2" strokeLinecap="round" />
            <rect x="16" y="117" width="16" height="5" rx="1.5" fill="#4B3B26" />
            {/* Wick */}
            <line x1="24" y1="50" x2="24" y2="40" stroke="#333" strokeWidth="1.5" />
            {/* Flickering Flame overlay */}
            <motion.path
              d="M 24,40 C 21,34 21,20 24,14 C 27,20 27,34 24,40 Z"
              fill="url(#candle-fire)"
              style={{ originX: "24px", originY: "40px" }}
              animate={{
                scaleY: [1, 1.2, 0.95, 1.15, 1],
                scaleX: [1, 0.92, 1.1, 0.95, 1],
                skewX: [0, 4, -3, 2, -2, 0]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Flame Inner Core */}
            <motion.path
              d="M 24,38 C 22.5,34 22.5,26 24,22 C 25.5,26 25.5,34 24,38 Z"
              fill="#FFF2A3"
              style={{ originX: "24px", originY: "38px" }}
              animate={{
                scaleY: [1, 1.15, 0.9, 1.1, 1]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="candle-fire" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#E05B35" />
                <stop offset="50%" stopColor="#FFA62B" />
                <stop offset="100%" stopColor="#FFFFA3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-[10px] uppercase font-mono tracking-widest text-amber-200/50 mt-1">Gryffindor Hearth</div>
      </div>

      {/* Floating Fairy Lantern - Cozy glowing lantern on the right desk */}
      <div className="absolute bottom-16 right-16 flex-col items-center gap-1 hidden xl:flex">
        <div className="relative w-14 h-36">
          <motion.div
            className="absolute -top-6 -left-[30px] w-28 h-28 rounded-full bg-cyan-500/10 blur-xl"
            animate={{
              scale: [1, 1.1, 0.9, 1.05, 1],
              opacity: [0.6, 0.85, 0.6, 0.75, 0.6]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <svg viewBox="0 0 54 140" className="w-full h-full drop-shadow-xl fill-none">
            {/* Hanging thread */}
            <line x1="27" y1="0" x2="27" y2="40" stroke="rgba(251,191,36,0.3)" strokeWidth="1.2" />
            {/* Brass top dome/cap */}
            <path d="M 15,44 Q 27,33 39,44 Z" fill="#8C6E41" stroke="#5C421A" strokeWidth="1.2" />
            <circle cx="27" cy="35" r="3" fill="#FFE082" />
            {/* Glass core sphere */}
            <circle cx="27" cy="58" r="14" fill="rgba(34,211,238,0.12)" stroke="#8C6E41" strokeWidth="1.2" />
            {/* Floating spell orb inside glass */}
            <motion.circle
              cx="27"
              cy="58"
              r="6.5"
              fill="#E0F7FA"
              filter="url(#firefly-light)"
              animate={{
                y: [-2, 2, -1, 3, -2],
                scale: [1, 1.15, 0.92, 1.05, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Outer protective cage struts */}
            <path d="M 27,44 L 27,72 M 13,58 L 41,58" stroke="#8C6E41" strokeWidth="0.8" />
            {/* Bottom brass weighted disk */}
            <rect x="18" y="72" width="18" height="6" rx="1.5" fill="#8C6E41" stroke="#5C421A" strokeWidth="1" />
            <defs>
              <filter id="firefly-light" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
        </div>
        <div className="text-[10px] uppercase font-mono tracking-widest text-cyan-200/50 mt-1">Lumos Wisp</div>
      </div>

      {/* Dispersed interactive drift particles */}
      {items.map((item) => {
        return (
          <motion.div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: item.size,
              height: item.size,
              color: item.color,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 20, 0],
              rotate: [item.rotation, item.rotation + 60, item.rotation],
              opacity: [0.15, item.type === "firefly" ? 0.9 : 0.6, 0.15],
              scale: [item.scale, item.scale * 1.25, item.scale],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.type === "star" && (
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current filter drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
                {/* Slender celestial diamond twinkle star */}
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.6L0 12L9.5 9.5Z" />
              </svg>
            )}
            
            {item.type === "firefly" && (
              <svg viewBox="0 0 24 24" className="w-full h-full">
                {/* Bioluminescent glowing point */}
                <circle cx="12" cy="12" r="6" fill={item.color} className="opacity-40 animate-pulse blur-[2.5px]" />
                <circle cx="12" cy="12" r="2.8" fill="#FFFFFF" />
              </svg>
            )}

            {item.type === "wisp" && (
              <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="1.2">
                {/* Curved magical wisp ring */}
                <circle cx="12" cy="12" r="5" strokeDasharray="3,3" />
                <path d="M 12,2 Q 6,6 9,15 T 18,22" strokeLinecap="round" />
              </svg>
            )}

            {item.type === "rune" && (
              <span className="text-[12px] font-mono tracking-widest leading-none drop-shadow-[0_0_4px_currentColor] opacity-60">
                {RUNES[Math.floor(Math.random() * RUNES.length)]}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
