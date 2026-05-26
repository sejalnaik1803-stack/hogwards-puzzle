import React from "react";
import { motion } from "motion/react";

interface WizardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "small-gold" | "nav-arrow";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const WizardButton: React.FC<WizardButtonProps> = ({
  variant = "filled",
  children,
  className = "",
  icon,
  ...props
}) => {
  if (variant === "nav-arrow") {
    // Custom medieval diamond/chevron button for carousel pagination
    return (
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`group relative flex items-center justify-center w-11 h-11 cursor-pointer select-none focus:outline-none ${className}`}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-all group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Ornate Diamond Background */}
          <polygon
            points="50,4 96,50 50,96 4,50"
            fill="#1c1611"
            stroke="#d97706"
            strokeWidth="2.5"
          />
          <polygon
            points="50,10 90,50 50,90 10,50"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Outer corner sparkles */}
          <circle cx="50" cy="10" r="1.5" fill="#fef08a" />
          <circle cx="50" cy="90" r="1.5" fill="#fef08a" />
        </svg>
        <span className="relative z-10 text-amber-300 group-hover:text-amber-100 transition-colors">
          {children}
        </span>
      </motion.button>
    );
  }

  if (variant === "outlined") {
    // Double-lined gilded border with neat pointed corner brackets
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative px-6 py-2.5 cursor-pointer font-serif text-[11px] tracking-[0.16em] uppercase font-bold text-amber-200 hover:text-white transition-colors focus:outline-none flex items-center justify-center gap-2 select-none ${className}`}
        {...props}
      >
        {/* Intricate SVG border container */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 44"
          preserveAspectRatio="none"
        >
          {/* Dark backing */}
          <path
            d="M 12 2 L 188 2 L 198 12 L 198 32 L 188 42 L 12 42 L 2 32 L 2 12 Z"
            fill="#130e0a"
            opacity="0.88"
          />
          {/* Core Outer Border */}
          <path
            d="M 12 2 L 188 2 L 198 12 L 198 32 L 188 42 L 12 42 L 2 32 L 2 12 Z"
            fill="none"
            stroke="#d97706"
            strokeWidth="1.8"
            vectorEffect="non-scaling-stroke"
            className="transition-all group-hover:stroke-amber-400"
          />
          {/* Inner Elegance Border */}
          <path
            d="M 14 5 L 186 5 L 195 14 L 195 30 L 186 39 L 14 39 L 5 30 L 5 14 Z"
            fill="none"
            stroke="#b45309"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
            opacity="0.75"
          />
          {/* Corner notched brackets */}
          <line x1="8" y1="2" x2="2" y2="8" stroke="#f59e0b" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          <line x1="192" y1="2" x2="198" y2="8" stroke="#f59e0b" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          <line x1="2" y1="36" x2="8" y2="42" stroke="#f59e0b" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          <line x1="198" y1="36" x2="192" y2="42" stroke="#f59e0b" strokeWidth="2.2" vectorEffect="non-scaling-stroke" />
          
          {/* Tiny decorative gold diamond points */}
          <circle cx="10" cy="22" r="1.5" fill="#fbf1c7" />
          <circle cx="190" cy="22" r="1.5" fill="#fbf1c7" />
        </svg>

        {/* Floating Sparks */}
        <span className="absolute -left-1 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-amber-400">✨</span>
        <span className="relative z-10 flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {icon}
          {children}
        </span>
        <span className="absolute -right-1 text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-1.5 transition-all text-amber-400">✨</span>
      </motion.button>
    );
  }

  // Small gold filled button for interactive UI controls
  if (variant === "small-gold") {
    return (
      <motion.button
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative px-4 py-2 cursor-pointer font-serif text-[10px] tracking-[0.14em] uppercase font-bold text-stone-950 focus:outline-none flex items-center justify-center gap-1.5 select-none ${className}`}
        {...props}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 140 34"
          preserveAspectRatio="none"
        >
          {/* Filled notched gold ribbon */}
          <path
            d="M 10 2 L 130 2 L 138 10 L 138 24 L 130 32 L 10 32 L 2 24 L 2 10 Z"
            fill="#eab308"
            className="transition-colors group-hover:fill-amber-400"
          />
          {/* Inner dark lines */}
          <path
            d="M 11 5 L 129 5 L 135 11 L 135 23 L 129 29 L 11 29 L 5 23 L 5 11 Z"
            fill="none"
            stroke="#78350f"
            strokeWidth="0.85"
            vectorEffect="non-scaling-stroke"
            opacity="0.4"
          />
          {/* Gilded tiny diamonds incorners */}
          <polygon points="10,2 14,6 10,10 6,6" fill="#fef08a" opacity="0.8" />
          <polygon points="130,2 134,6 130,10 126,6" fill="#fef08a" opacity="0.8" />
        </svg>
        <span className="relative z-10 flex items-center gap-1 font-bold">
          {icon}
          {children}
        </span>
      </motion.button>
    );
  }

  // Default variant: "filled"
  // Inspired directly by the "9 Filled Buttons" row 2 column 2 (pointed corners, dynamic gold background)
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative px-7 py-3 cursor-pointer font-serif text-[11px] sm:text-[12px] tracking-[0.18em] uppercase font-extrabold text-stone-950 focus:outline-none flex items-center justify-center gap-2 select-none ${className}`}
      {...props}
    >
      {/* SVG Background container for exact notched wizarding theme */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        viewBox="0 0 200 48"
        preserveAspectRatio="none"
      >
        {/* Solid Gold Base */}
        <path
          d="M 14 3 L 186 3 L 197 14 L 197 34 L 186 45 L 14 45 L 3 34 L 3 14 Z"
          fill="#fcd34d"
          className="transition-colors group-hover:fill-amber-300"
        />
        {/* Second layered outline in bright primary wizard gold */}
        <path
          d="M 14 3 L 186 3 L 197 14 L 197 34 L 186 45 L 14 45 L 3 34 L 3 14 Z"
          fill="none"
          stroke="#d97706"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Exquisite inner dark frame */}
        <path
          d="M 16 6 L 184 6 L 194 16 L 194 32 L 184 42 L 16 42 L 6 32 L 6 16 Z"
          fill="none"
          stroke="#451a03"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          opacity="0.82"
        />
        
        {/* Corner point triangles / Diamond accents on each extreme side */}
        <polygon points="12,24 16,21 16,27" fill="#1c1917" />
        <polygon points="188,24 184,21 184,27" fill="#1c1917" />
      </svg>

      {/* Sparks Icon and actual text layout */}
      <span className="relative z-10 flex items-center gap-1.5 drop-shadow-[0_0.5px_1px_rgba(255,255,255,0.4)]">
        {icon}
        {children}
      </span>
    </motion.button>
  );
};
