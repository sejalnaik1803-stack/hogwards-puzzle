import React, { useEffect } from "react";
import { motion } from "motion/react";

export interface LiveParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  size: number;
  color: string;
  alpha: number;
  type: "star" | "sparkle" | "petal";
}

interface ParticleOverlayProps {
  particles: LiveParticle[];
  setParticles: React.Dispatch<React.SetStateAction<LiveParticle[]>>;
}

export const createBurst = (
  x: number,
  y: number,
  count: number,
  type: "star" | "sparkle" | "petal" = "star"
): LiveParticle[] => {
  const newParticles: LiveParticle[] = [];
  const colors = ["#FFECE6", "#FFD166", "#FF8FAB", "#B9E2E0", "#E8C1C5", "#E0C3FC", "#FFE5EC"];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Exploding velocity
    const speed = Math.random() * 5 + 3;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed - 1; // drift upward

    newParticles.push({
      id: `p-${Math.random().toString(36).substring(2, 9)}`,
      x,
      y,
      vx,
      vy,
      rotation: Math.random() * 360,
      vRot: Math.random() * 12 - 6,
      size: Math.random() * 12 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1.0,
      type,
    });
  }
  return newParticles;
};

export const ParticleOverlay: React.FC<ParticleOverlayProps> = ({
  particles,
  setParticles,
}) => {
  // Global frame tick to animate running particles with custom physics
  useEffect(() => {
    if (particles.length === 0) return;

    let animFrameId: number;

    const updatePhysics = () => {
      setParticles((prev) => {
        const updated = prev
          .map((p) => {
            const nextAlpha = p.alpha - 0.022; // smooth decay fade out
            const nextVY = p.vy + 0.12;       // realistic gravity pulling sparks downwards
            return {
              ...p,
              x: p.x + p.vx,
              y: p.y + nextVY,
              vy: nextVY,
              rotation: p.rotation + p.vRot,
              alpha: nextAlpha,
            };
          })
          .filter((p) => p.alpha > 0);

        if (updated.length > 0) {
          animFrameId = requestAnimationFrame(updatePhysics);
        }
        return updated;
      });
    };

    animFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrameId);
  }, [particles.length, setParticles]);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
      <svg className="w-full h-full overflow-visible">
        {particles.map((p) => {
          const r = p.size / 2;
          return (
            <g
              key={p.id}
              transform={`translate(${p.x}, ${p.y}) rotate(${p.rotation})`}
              style={{ opacity: p.alpha }}
            >
              {p.type === "star" && (
                <path
                  d={`
                    M 0 ${-r * 1.5}
                    Q 0 0 ${r * 1.5} 0
                    Q 0 0 0 ${r * 1.5}
                    Q 0 0 ${-r * 1.5} 0
                    Q 0 0 0 ${-r * 1.5} Z
                  `}
                  fill={p.color}
                />
              )}

              {p.type === "sparkle" && (
                <circle cx="0" cy="0" r={r} fill={p.color} />
              )}

              {p.type === "petal" && (
                <path
                  d={`
                    M 0 0
                    C ${-r * 0.8} ${-r * 0.4}, ${-r} ${-r * 1.2}, 0 ${-r * 1.6}
                    C ${r} ${-r * 1.2}, ${r * 0.8} ${-r * 0.4}, 0 0 Z
                  `}
                  fill={p.color}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
