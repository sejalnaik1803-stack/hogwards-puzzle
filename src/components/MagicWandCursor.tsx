import React, { useEffect, useRef, useState } from "react";
import { sound } from "./SoundSynth";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  type: "smoke" | "star" | "spark";
  angle?: number;
  spin?: number;
}

export const MagicWandCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isPressing, setIsPressing] = useState(false);
  const lastCoords = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });

      const dx = e.clientX - lastCoords.current.x;
      const dy = e.clientY - lastCoords.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only generate particles if the wand is moving
      if (distance > 2 && e.clientX > 0 && e.clientY > 0) {
        const pCount = Math.min(Math.floor(distance / 4) + 1, 8);
        for (let i = 0; i < pCount; i++) {
          const ratio = i / pCount;
          // Interpolate coordinates for smooth trail when mouse is moved fast
          const px = lastCoords.current.x + dx * ratio;
          const py = lastCoords.current.y + dy * ratio;

          // Spawn a blue smoke particle (soft mist)
          if (Math.random() < 0.45) {
            particlesRef.current.push({
              x: px,
              y: py,
              vx: (Math.random() - 0.5) * 1.5 - dx * 0.05,
              vy: (Math.random() - 0.5) * 1.5 - 0.6, // drift upwards slightly
              size: Math.random() * 24 + 12,
              color: getRandomMagicColor("smoke"),
              alpha: 0.8,
              decay: Math.random() * 0.015 + 0.015,
              type: "smoke",
            });
          }

          // Spawn shiny star sparkles
          if (Math.random() < 0.6) {
            particlesRef.current.push({
              x: px,
              y: py,
              vx: (Math.random() - 0.5) * 4 - dx * 0.08,
              vy: (Math.random() - 0.5) * 4 - 0.2,
              size: Math.random() * 10 + 4,
              color: getRandomMagicColor("star"),
              alpha: 1.0,
              decay: Math.random() * 0.02 + 0.02,
              type: "star",
              angle: Math.random() * Math.PI,
              spin: (Math.random() - 0.5) * 0.15,
            });
          }

          // Spawn fine core sparks
          particlesRef.current.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 2 - dx * 0.1,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: "#ffffff",
            alpha: 1.0,
            decay: Math.random() * 0.04 + 0.03,
            type: "spark",
          });
        }
      }

      lastCoords.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressing(true);
      sound.playSparkleChime();
      
      // Trigger a glorious magical spiral burst of sparks on click
      for (let i = 0; i < 28; i++) {
        const burstAngle = (i / 28) * Math.PI * 2 + Math.random() * 0.5;
        const speed = Math.random() * 6 + 3;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(burstAngle) * speed,
          vy: Math.sin(burstAngle) * speed - 0.5,
          size: Math.random() * 15 + 6,
          color: getRandomMagicColor(Math.random() < 0.3 ? "smoke" : "star"),
          alpha: 1.0,
          decay: Math.random() * 0.018 + 0.015,
          type: Math.random() < 0.4 ? "smoke" : "star",
          angle: Math.random() * Math.PI,
          spin: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const handleMouseUp = () => {
      setIsPressing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const getRandomMagicColor = (type: "smoke" | "star"): string => {
    // Elegant wizard colors matching the reference photo (cyan, ethereal blue, mystical violet, stardust gold)
    const smokeColors = [
      "rgba(59, 130, 246, 0.25)",  // bright blue
      "rgba(147, 51, 234, 0.2)",   // cosmic purple
      "rgba(6, 182, 212, 0.24)",   // vivid cyan
      "rgba(99, 102, 241, 0.25)",  // indigo
    ];
    const starColors = [
      "#60a5fa", // soft blue
      "#38bdf8", // light sky blue
      "#34d399", // wizard turquoise-emerald
      "#c084fc", // potion violet
      "#fef08a", // star gold
      "#ffffff", // pure light
    ];
    return type === "smoke"
      ? smokeColors[Math.floor(Math.random() * smokeColors.length)]
      : starColors[Math.floor(Math.random() * starColors.length)];
  };

  // Canvas render tick loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "screen"; // creates perfect additive luminescent blend

      const activeParticles = particlesRef.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.alpha -= p.decay;

        // If particle dies, prune it
        if (p.alpha <= 0) {
          activeParticles.splice(i, 1);
          continue;
        }

        // Apply velocities and physics
        p.x += p.vx;
        p.y += p.vy;

        // Dampen velocity/air resistance
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Visual properties
        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === "smoke") {
          // Soft blending atmospheric magical smoke and nebula mists
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(0.5, p.color.replace(/[\d.]+\)$/, `${p.alpha * 0.3})`));
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else if (p.type === "star") {
          // Draw four-point bright wizard star sparkles
          ctx.translate(p.x, p.y);
          if (p.angle !== undefined && p.spin !== undefined) {
            p.angle += p.spin;
            ctx.rotate(p.angle);
          }

          ctx.beginPath();
          const r = p.size;
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.closePath();

          // Create radiant glow for star
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.3, p.color);
          grad.addColorStop(1, "rgba(0,0,0,0)");

          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          // Simple fine crisp laser aura sparks
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      }

      // 6. Draw constant active tip-halo flare at client coordinates
      if (coords.x > 0 && coords.y > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        
        // Ethereal outer blue-violet smoke core flare
        const outerGlow = ctx.createRadialGradient(coords.x, coords.y, 0, coords.x, coords.y, 35);
        outerGlow.addColorStop(0, "rgba(37, 99, 235, 0.45)");
        outerGlow.addColorStop(0.5, "rgba(6, 182, 212, 0.15)");
        outerGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 35, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // High-energy focus core light aura
        const innerGlow = ctx.createRadialGradient(coords.x, coords.y, 0, coords.x, coords.y, 11);
        innerGlow.addColorStop(0, "#ffffff");
        innerGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.95)"); // cyan light beam
        innerGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();
        
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, [coords]);

  // Prevent display under safe boundary sizes/mobiles and touch screens
  if (coords.x === -100 && coords.y === -100) return null;

  // Render wand alignment offset: tip is top-right (pixel 142, 8), handle is bottom-left (pixel 8, 142)
  const wandStyle: React.CSSProperties = {
    position: "fixed",
    pointerEvents: "none",
    left: coords.x - 99.4,
    top: coords.y - 5.6,
    width: 105,
    height: 105,
    zIndex: 99999,
    transform: `rotate(${isPressing ? "-10deg" : "0deg"}) translate3d(0, 0, 0)`,
    transformOrigin: "99.4px 5.6px",
    transition: "transform 0.15s cubic-bezier(0.19, 1, 0.22, 1)",
    willChange: "transform, left, top",
  };

  return (
    <>
      {/* Heavy performance background layer for render particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full z-[99990]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Stylized high-art wooden wand following cursor */}
      <div style={wandStyle} className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] hidden sm:block">
        <svg viewBox="0 0 150 150" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle tip spark indicator */}
          <circle cx="142" cy="8" r="3" fill="#ffffff" opacity="0.9" />

          {/* Wand Shaft extending from bottom-left [15, 135] to top-right [142, 8] */}
          {/* Main wand body wood */}
          <path
            d="M 12 140 
               C 15 137, 26 128, 30 120
               L 138 12
               C 141 10, 143 8, 142 8
               C 142 8, 140 10, 138 13
               L 30 123
               C 24 130, 14 138, 11 141
               Z"
            fill="url(#wand-wood-grad)"
          />

          {/* Wooden texture details and golden vines spiraling up the wand */}
          <path
            d="M 28 123
               Q 44 107, 48 103
               T 72 79
               T 98 53
               T 124 27
               T 138 13"
            stroke="url(#wand-gold-spiral)"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Gilded handle with intricate runic knobs/pommels (inspired by elder wand structure) */}
          {/* Knob 1 - Pommel base */}
          <path
            d="M 11 141 C 8 139, 7 136, 10 133 C 13 130, 16 133, 14 137 Z"
            fill="#5c3f2d"
            stroke="#fbbf24"
            strokeWidth="1"
          />
          {/* Grip leather wrapping and gold rings */}
          <ellipse cx="18" cy="132" rx="4" ry="6" transform="rotate(-40, 18, 132)" fill="#3f2314" stroke="#d97706" strokeWidth="0.8" />
          <ellipse cx="23" cy="127" rx="3.5" ry="5.5" transform="rotate(-40, 23, 127)" fill="#3f2314" stroke="#fbbf24" strokeWidth="0.8" />
          <ellipse cx="29" cy="122" rx="3" ry="5" transform="rotate(-40, 29, 122)" fill="#5c3f2d" stroke="#d97706" strokeWidth="0.8" />
          
          {/* Mid-Wand ring stabilizer */}
          <ellipse cx="60" cy="91" rx="2" ry="4.2" transform="rotate(-40, 60, 91)" fill="#fbbf24" opacity="0.9" />
          <ellipse cx="100" cy="51" rx="1.5" ry="3.2" transform="rotate(-40, 100, 51)" fill="#fbbf24" opacity="0.9" />

          <defs>
            {/* Elegant deep brown wood gradient */}
            <linearGradient id="wand-wood-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2e1405" />
              <stop offset="30%" stopColor="#451a03" />
              <stop offset="65%" stopColor="#7c2d12" />
              <stop offset="100%" stopColor="#cca16a" />
            </linearGradient>

            {/* Glowing gold vine gradient */}
            <linearGradient id="wand-gold-spiral" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#fffbeb" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};
