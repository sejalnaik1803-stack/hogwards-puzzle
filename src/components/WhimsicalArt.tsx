import React from "react";
import { PuzzleArtwork } from "../types";

interface WhimsicalArtProps {
  art: PuzzleArtwork;
}

export const WhimsicalArt: React.FC<WhimsicalArtProps> = ({ art }) => {
  if (art.imageUrl) {
    return (
      <g id="puzzle-artwork">
        <image
          href={art.imageUrl}
          x="0"
          y="0"
          width="540"
          height="360"
          preserveAspectRatio="xMidYMid slice"
        />
      </g>
    );
  }

  const {
    sceneIndex = 0,
    bgColorStart,
    bgColorEnd,
    coreType,
    coreColor,
    coreSecondaryColor,
    stars,
    clouds,
    flowers,
    mushrooms,
    ribbons,
    poetry,
  } = art;

  // Let's render custom whimsical layers based on the selected scene index (0-29)
  const renderSceneSpecificLayers = () => {
    switch (sceneIndex % 30) {
      case 0: // The Overgrown Conservatory (magical greenhouse)
      case 18: // Sanctuary of Ancient Ferns
        return (
          <g id="greenhouse-glass-panes">
            {/* Elegant glass arches */}
            <path
              d="M 40,0 L 40,420 M 120,0 L 120,420 M 200,0 L 200,420 M 280,0 L 280,420 M 360,0 L 360,420"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
            <path
              d="M 0,100 L 420,100 M 0,220 L 420,220 M 0,320 L 420,320"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.18"
            />
            <path
              d="M 210,50 Q 210,180 50,220 M 210,50 Q 210,180 370,220"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.15"
            />
            {/* Hanging ivy vines */}
            <path
              d="M 80,0 Q 95,60 85,120 T 90,200"
              fill="none"
              stroke="#CCDDAA"
              strokeWidth="1.8"
              strokeOpacity="0.55"
            />
            <circle cx="85" cy="40" r="5" fill="#A8C3A0" fillOpacity="0.7" />
            <circle cx="92" cy="70" r="6" fill="#A8C3A0" fillOpacity="0.7" />
            <circle cx="83" cy="110" r="5.5" fill="#A8C3A0" fillOpacity="0.7" />
            <circle cx="87" cy="150" r="5" fill="#A8C3A0" fillOpacity="0.7" />

            <path
              d="M 320,0 Q 305,80 315,160 T 310,240"
              fill="none"
              stroke="#CCDDAA"
              strokeWidth="1.6"
              strokeOpacity="0.5"
            />
            <circle cx="312" cy="50" r="5.5" fill="#88A070" fillOpacity="0.7" />
            <circle cx="308" cy="100" r="6" fill="#88A070" fillOpacity="0.7" />
            <circle cx="317" cy="160" r="5" fill="#88A070" fillOpacity="0.7" />
          </g>
        );

      case 1: // Midnight Bread Spells (moonlit bakery)
      case 13: // Drifting Cloud Bakehouse
        return (
          <g id="bakery-warmth">
            {/* Glowing hot traditional stone oven */}
            <path
              d="M 160,250 C 160,180 260,180 260,250 Z"
              fill="#FFD2A0"
              fillOpacity="0.15"
              filter="url(#super-blur)"
            />
            {/* Floating golden croissants and magical bakery steam */}
            <path
              d="M 80,180 Q 90,165 110,170 Q 120,180 110,195 Q 95,200 80,180 Z"
              fill="#EAC080"
              stroke="#8A5A2B"
              strokeWidth="1.2"
              fillOpacity="0.8"
            />
            <circle cx="110" cy="170" r="3" fill="#FFFFFF" fillOpacity="0.8" filter="url(#soft-glow)" />
            <path
              d="M 310,150 Q 330,135 345,150 Q 355,165 335,170 Z"
              fill="#E09F50"
              stroke="#8A5A2B"
              strokeWidth="1"
              fillOpacity="0.8"
              transform="rotate(15, 330, 150)"
            />
          </g>
        );

      case 2: // The Whispering Observatory
      case 15: // Lost Clockwork Apple Orchard
        return (
          <g id="celestial-astrolabe">
            {/* Rotating brass rings/charts of the heavens */}
            <circle cx="210" cy="210" r="160" fill="none" stroke="#FFEA79" strokeWidth="0.8" strokeOpacity="0.25" />
            <circle cx="210" cy="210" r="120" fill="none" stroke="#FFEA79" strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3,6" />
            <circle cx="210" cy="210" r="80" fill="none" stroke="#FFEA79" strokeWidth="1" strokeOpacity="0.15" />
            {/* Constellation line links */}
            <path
              d="M 60,120 L 100,160 L 90,240 M 280,100 L 330,130 L 370,100"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.25"
              strokeDasharray="4,4"
            />
            <circle cx="60" cy="120" r="2.5" fill="#FFF" />
            <circle cx="100" cy="160" r="3" fill="#FFE57A" />
            <circle cx="90" cy="240" r="2.5" fill="#FFF" />
            <circle cx="330" cy="130" r="3" fill="#FFE57A" />
          </g>
        );

      case 3: // The Cozy Witch Kitchen
        return (
          <g id="warm-hearth">
            {/* Brick hearth arch */}
            <path
              d="M 120,420 L 120,300 C 120,250 300,250 300,300 L 300,420"
              fill="none"
              stroke="#5C4D41"
              strokeWidth="4"
              strokeOpacity="0.2"
            />
            {/* Spiced garlic and hanging dry herbs */}
            <path
              d="M 60,120 Q 60,180 50,210 M 70,120 Q 75,170 80,200"
              fill="none"
              stroke="#E07A5F"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
          </g>
        );

      case 4: // Old Dusty Book Cathedral
      case 16: // The Bibliophile's Nook
      case 17: // Windmill of Dreams
        return (
          <g id="cathedral-of-books">
            {/* Stacks of antique books on margins */}
            <rect x="15" y="160" width="45" height="18" rx="3" fill="#8D5B4C" fillOpacity="0.85" stroke="#4a3028" strokeWidth="0.8" />
            <rect x="10" y="178" width="55" height="15" rx="3" fill="#4B6584" fillOpacity="0.85" stroke="#2c3a4b" strokeWidth="0.8" />
            <rect x="20" y="193" width="40" height="20" rx="3" fill="#D291BC" fillOpacity="0.8" stroke="#8c5879" strokeWidth="0.8" />
            
            <rect x="365" y="140" width="42" height="16" rx="2" fill="#4A5D4E" fillOpacity="0.85" stroke="#2d3d31" strokeWidth="0.8" />
            <rect x="355" y="156" width="55" height="18" rx="2" fill="#E29578" fillOpacity="0.85" stroke="#a05b41" strokeWidth="0.8" />

            {/* Glowing cozy desk lamp cone */}
            <path
              d="M 50,150 L 5,280 L 120,280 Z"
              fill="#FFF0A5"
              fillOpacity="0.08"
              filter="url(#super-blur)"
            />
          </g>
        );

      case 5: // The Twilight Locomotive (forest train)
        return (
          <g id="rail-tracks">
            {/* Scenic train tracks crossing curved at bottom */}
            <path
              d="M 0,330 Q 210,360 420,330"
              fill="none"
              stroke="#8F8578"
              strokeWidth="4"
              strokeOpacity="0.4"
            />
            {/* Wooden ties sleepers */}
            <path
              d="M 30,330 L 30,345 M 90,340 L 90,355 M 150,345 L 150,360 M 210,347 L 210,362 M 270,345 L 270,360 M 330,340 L 330,355 M 390,330 L 390,345"
              stroke="#8F8578"
              strokeWidth="5"
              strokeOpacity="0.5"
            />
            <path
              d="M 0,340 Q 210,370 420,340"
              fill="none"
              stroke="#8F8578"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
          </g>
        );

      case 6: // Rain on Lantern Street
        return (
          <g id="rain-lanterns">
            {/* Street lamp post */}
            <line x1="340" y1="50" x2="340" y2="380" stroke="#251B33" strokeWidth="3.2" strokeOpacity="0.8" />
            {/* Glowing lantern head */}
            <path
              d="M 320,80 L 360,80 L 350,110 L 330,110 Z"
              fill="#FFCC70"
              stroke="#251B33"
              strokeWidth="1.5"
            />
            {/* Conic lantern light glare cast */}
            <path
              d="M 340,95 L 210,310 L 420,310 Z"
              fill="#FFD384"
              fillOpacity="0.14"
              filter="url(#super-blur)"
            />
            {/* Fine aesthetic rainy diagonals */}
            <path
              d="M 30,-20 L 10,80 M 120,-20 L 100,100 M 230,-20 L 210,90 M 350,-20 L 330,80 M 80,110 L 60,210 M 200,120 L 180,240 M 310,130 L 290,260"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.16"
            />
          </g>
        );

      case 7: // Floating Tea Garden
        return (
          <g id="tea-islands">
            {/* Floating moss mossy patch pods */}
            <path
              d="M 40,110 C 20,110 5,120 15,130 C 25,140 70,140 85,130 C 95,120 70,110 40,110 Z"
              fill="#CCDDAA"
              stroke="#556F44"
              strokeWidth="1"
              fillOpacity="0.9"
            />
            <path
              d="M 350,130 C 330,130 310,140 320,150 C 330,160 380,165 390,150 C 400,140 380,130 350,130 Z"
              fill="#A2C3A0"
              stroke="#405C33"
              strokeWidth="1"
              fillOpacity="0.95"
            />
          </g>
        );

      case 8: // Firefly Sanctuary Pond
        return (
          <g id="fireflies-floating">
            {/* Bright, blurry green backing dots */}
            <circle cx="80" cy="180" r="8" fill="#52E085" fillOpacity="0.55" filter="url(#soft-glow)" />
            <circle cx="80" cy="180" r="2.5" fill="#FFF" />
            <circle cx="340" cy="220" r="10" fill="#52E085" fillOpacity="0.55" filter="url(#soft-glow)" />
            <circle cx="340" cy="220" r="3" fill="#FFF" />
            <circle cx="150" cy="130" r="7" fill="#52E085" fillOpacity="0.45" filter="url(#soft-glow)" />
            <circle cx="150" cy="130" r="2" fill="#FFF" />
            <circle cx="280" cy="110" r="9" fill="#52E085" fillOpacity="0.5" filter="url(#soft-glow)" />
            <circle cx="280" cy="110" r="2.8" fill="#FFF" />
            {/* Quiet pond ripples */}
            <ellipse cx="210" cy="350" rx="140" ry="8" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.2" />
            <ellipse cx="140" cy="360" rx="60" ry="4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.15" />
          </g>
        );

      case 10: // Castle of Whispering Vines
        return (
          <g id="ivy-stone-rubble">
            {/* Ghibli style stone brick pile */}
            <rect x="50" y="325" width="25" height="15" rx="2" fill="#8F8C81" stroke="#4A4843" strokeWidth="0.8" />
            <rect x="75" y="320" width="30" height="20" rx="2" fill="#B1AFA7" stroke="#4A4843" strokeWidth="0.8" />
            <rect x="65" y="340" width="35" height="16" rx="2" fill="#9F9D95" stroke="#4A4843" strokeWidth="0.8" />
          </g>
        );

      case 12: // Beacon of the Crescent Gulf (Lighthouse waves)
        return (
          <g id="marine-waves">
            {/* Subtle sea wave lines */}
            <path
              d="M 0,350 Q 80,340 160,350 T 320,350 T 420,350 M 20,370 Q 120,360 220,370 T 420,370"
              fill="none"
              stroke="#FFF"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
            {/* Floating sail boat silhouette far away */}
            <path
              d="M 80,310 L 88,328 L 74,328 Z M 80,328 L 80,332"
              fill="#FFFFFF"
              fillOpacity="0.6"
            />
          </g>
        );

      case 20: // Cafe Clockwork
      case 23: // Toy Repair
        return (
          <g id="clock-gears">
            {/* Giant decorative ticking golden gears */}
            <circle cx="50" cy="80" r="24" fill="none" stroke="#FFD166" strokeWidth="1.8" strokeOpacity="0.25" />
            <path
              d="M 50,51 L 50,56 M 50,104 L 50,109 M 21,80 L 26,80 M 74,80 L 79,80 M 29,59 L 33,63 M 71,97 L 75,101 M 29,101 L 33,97 M 71,59 L 75,63"
              stroke="#FFD166"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            <circle cx="50" cy="80" r="6" fill="#FFD166" fillOpacity="0.25" />
          </g>
        );

      case 27: // Honey Apiary bees
        return (
          <g id="honey-bees">
            {/* Cute fat round garden bees */}
            <g transform="translate(90, 150) rotate(-15)">
              <ellipse cx="0" cy="0" rx="9" ry="7" fill="#FFD166" stroke="#4A341A" strokeWidth="1" />
              {/* Bee stripes */}
              <line x1="-3" y1="-6.5" x2="-3" y2="6.5" stroke="#4A341A" strokeWidth="1.8" />
              <line x1="2" y1="-6.5" x2="2" y2="6.5" stroke="#4A341A" strokeWidth="1.8" />
              {/* Wing */}
              <ellipse cx="-1" cy="-8" rx="4" ry="6" fill="#E0EEFF" fillOpacity="0.8" stroke="#4A341A" strokeWidth="0.8" transform="rotate(20)" />
              {/* Eye */}
              <circle cx="5" cy="-1" r="1.2" fill="#4A341A" />
            </g>
            <g transform="translate(320, 120) rotate(10)">
              <ellipse cx="0" cy="0" rx="9" ry="7" fill="#FFD166" stroke="#4A341A" strokeWidth="1" />
              <line x1="-3" y1="-6.5" x2="-3" y2="6.5" stroke="#4A341A" strokeWidth="1.8" />
              <line x1="2" y1="-6.5" x2="2" y2="6.5" stroke="#4A341A" strokeWidth="1.8" />
              <ellipse cx="-1" cy="-8" rx="4" ry="6" fill="#E0EEFF" fillOpacity="0.8" stroke="#4A341A" strokeWidth="0.8" transform="rotate(-15)" />
              <circle cx="5" cy="-1" r="1.2" fill="#4A341A" />
            </g>
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <g id="puzzle-artwork">
      <svg viewBox="0 0 420 420" width="540" height="360" preserveAspectRatio="none" overflow="hidden">
        {/* 1. Cozy Background with Linear Gradient */}
        <rect x="0" y="0" width="420" height="420" fill="url(#bg-gradient)" />

        {/* Decorative Warm Handcrafted Paper Edge Border Shading */}
        <rect
          x="5"
          y="5"
          width="412"
          height="412"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeOpacity="0.18"
          rx="15"
        />
        <rect
          x="12"
          y="12"
          width="396"
          height="396"
          fill="none"
          stroke="#000000"
          strokeWidth="1.5"
          strokeOpacity="0.08"
          rx="10"
        />

      {/* 2. Soft Floating Ribbon Splines */}
      {ribbons.map((rib) => (
        <path
          key={rib.id}
          d={rib.path}
          fill="none"
          stroke={rib.color}
          strokeWidth={rib.strokeWidth}
          strokeLinecap="round"
          strokeOpacity="0.5"
          filter="url(#soft-glow)"
        />
      ))}

      {/* 3. Starry Sky / Sparkles */}
      {stars.map((star) => {
        const r = star.size / 2;
        const cx = star.cx;
        const cy = star.cy;
        const sparkleD = `
          M ${cx} ${cy - r * 1.5}
          Q ${cx} ${cy} ${cx + r * 1.5} ${cy}
          Q ${cx} ${cy} ${cx} ${cy + r * 1.5}
          Q ${cx} ${cy} ${cx - r * 1.5} ${cy}
          Q ${cx} ${cy} ${cx} ${cy - r * 1.5} Z
        `;

        return (
          <g key={star.id} transform={`rotate(${star.rotation}, ${cx}, ${cy})`}>
            {/* Soft backdrop glow on star */}
            <circle
              cx={cx}
              cy={cy}
              r={r * 1.9}
              fill="#FFFFFF"
              fillOpacity={star.opacity * 0.35}
              filter="url(#super-blur)"
            />
            {/* The crisp star sparkle */}
            <path
              d={sparkleD}
              fill={art.theme === "cozy-celestial" ? "#FFEA79" : "#FFFFFF"}
              fillOpacity={star.opacity}
            />
            <circle cx={cx} cy={cy} r={r * 0.35} fill="#FFFFFF" fillOpacity={star.opacity} />
          </g>
        );
      })}

      {/* 4. Ambient Clouds */}
      {clouds.map((c) => {
        const cx = c.cx;
        const cy = c.cy;
        const w = c.rx;
        const h = c.ry;
        return (
          <g key={c.id} style={{ opacity: c.opacity }}>
            {/* Cloud shadow drop layer */}
            <path
              d={`
                M ${cx - w * 0.8} ${cy + h * 0.3}
                A ${h * 0.9} ${h * 0.9} 0 0 1 ${cx - w * 0.4} ${cy - h * 0.5}
                A ${h * 1.2} ${h * 1.2} 0 0 1 ${cx + w * 0.2} ${cy - h * 0.6}
                A ${h * 0.9} ${h * 0.9} 0 0 1 ${cx + w * 0.8} ${cy + h * 0.2}
                Z
              `}
              fill="#000000"
              fillOpacity="0.04"
              transform="translate(1, 4)"
            />
            {/* Fluffy paper cloud base */}
            <path
              d={`
                M ${cx - w * 0.8} ${cy + h * 0.3}
                A ${h * 0.9} ${h * 0.9} 0 0 1 ${cx - w * 0.4} ${cy - h * 0.5}
                A ${h * 1.2} ${h * 1.2} 0 0 1 ${cx + w * 0.2} ${cy - h * 0.6}
                A ${h * 0.9} ${h * 0.9} 0 0 1 ${cx + w * 0.8} ${cy + h * 0.2}
                Z
              `}
              fill="#FFFFFF"
              fillOpacity="0.82"
            />
            {/* Peach-pink cloud core glow */}
            <circle
              cx={cx - w * 0.15}
              cy={cy - h * 0.1}
              r={h * 0.55}
              fill="#FFD6E0"
              fillOpacity="0.35"
            />
          </g>
        );
      })}

      {/* 5. Draw Dynamic Scene-Specific Features (Underneath Hero) */}
      {renderSceneSpecificLayers()}

      {/* 6. Draw Core Whimsical Hero Illustration */}
      {coreType === "moon" && (
        <g id="hero-moon" transform="translate(10, -5)" filter="url(#drop-shadow-tactile)">
          <path
            d="M 195,145 A 65,65 0 1,0 260,210 A 50,50 0 1,1 195,145 Z"
            fill="#000000"
            fillOpacity="0.04"
            transform="translate(2, 5)"
          />
          <path
            d="M 195,145 A 65,65 0 1,0 260,210 A 50,50 0 1,1 195,145 Z"
            fill={coreColor}
          />
          <path
            d="M 166,192 Q 172,198 178,192"
            fill="none"
            stroke="#4A3E3D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="152" cy="198" rx="8" ry="5" fill="#FF8FAB" fillOpacity="0.75" />
          <path
            d="M 163,204 Q 169,209 173,203"
            fill="none"
            stroke="#4A3E3D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Cute sleeping Ghibli head Cap */}
          <path
            d="M 190,147 C 182,125 210,105 230,112 C 242,116 245,130 240,145 C 235,152 215,153 190,147 Z"
            fill={coreSecondaryColor}
          />
          <path
            d="M 202,148 C 200,135 215,115 220,111"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <path
            d="M 218,150 C 215,140 228,122 232,116"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
          <circle cx="233" cy="113" r="7" fill="#FFEA79" />
          <circle cx="233" cy="113" r="3" fill="#FFFFFF" fillOpacity="0.8" />
        </g>
      )}

      {coreType === "mushroom" && (
        <g id="hero-mushroom" transform="translate(0, -10)" filter="url(#drop-shadow-tactile)">
          <path
            d="M 194,235 C 192,260 198,310 186,325 C 200,332 230,332 244,325 C 232,310 238,260 236,235 Z"
            fill="#F7F1E5"
            stroke="#7C6E60"
            strokeWidth="1.5"
          />
          {/* Sleepy Ghibli sprite face */}
          <circle cx="204" cy="275" r="2.2" fill="#4E3E2F" />
          <circle cx="220" cy="275" r="2.2" fill="#4E3E2F" />
          <ellipse cx="200" cy="279" rx="3.5" ry="2" fill="#FF9EAE" />
          <ellipse cx="224" cy="279" rx="3.5" ry="2" fill="#FF9EAE" />
          <path
            d="M 209,282 Q 212,284 215,282"
            fill="none"
            stroke="#4E3E2F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Golden Cozy Window */}
          <rect x="206" y="295" width="14" height="18" rx="6" fill="#FFD166" stroke="#7C6E60" strokeWidth="1" />
          <line x1="213" y1="295" x2="213" y2="313" stroke="#7C6E60" strokeWidth="0.8" />
          <line x1="206" y1="304" x2="220" y2="304" stroke="#7C6E60" strokeWidth="0.8" />

          {/* Mushroom Cap */}
          <path
            d="M 140,240 C 130,195 160,165 210,165 C 260,165 290,195 280,240 C 270,250 250,255 210,252 C 170,255 150,250 140,240 Z"
            fill={coreColor}
            stroke="#7C6E60"
            strokeWidth="2"
          />
          <circle cx="210" cy="184" r="10" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="172" cy="202" r="11" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="250" cy="210" r="13" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="212" cy="225" r="8" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="152" cy="232" r="5" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="270" cy="235" r="5" fill="#FFFFFF" fillOpacity="0.9" />

          {/* Small Star atop Cap */}
          <g transform="translate(202, 142)">
            <path
              d="M 8 0 L 10 5 L 16 6 L 12 10 L 13 16 L 8 13 L 3 16 L 4 10 L 0 6 L 6 5 Z"
              fill="#FFD166"
            />
          </g>
        </g>
      )}

      {coreType === "teapot" && (
        <g id="hero-teapot" transform="translate(0, -5)" filter="url(#drop-shadow-tactile)">
          <circle cx="212" cy="254" r="62" fill="#000000" fillOpacity="0.04" transform="translate(2, 4)" />
          <circle cx="210" cy="250" r="60" fill={coreColor} stroke="#4C5C59" strokeWidth="2.2" />

          {/* Spout */}
          <path
            d="M 152,255 C 130,250 120,230 115,215 C 120,210 125,212 128,218 C 134,232 144,242 154,245"
            fill={coreColor}
            stroke="#4C5C59"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Steaming coil swirls */}
          <path
            d="M 116,204 Q 108,180 114,165 T 108,135"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="4,4"
            strokeOpacity="0.85"
            strokeLinecap="round"
          />

          {/* Handle */}
          <path
            d="M 270,235 C 310,230 310,285 270,280"
            fill="none"
            stroke="#CDA2CD"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 270,235 C 310,230 310,285 270,280"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />

          {/* Ceramic flower embellishment */}
          <g transform="translate(210, 250)">
            <circle cx="0" cy="0" r="8" fill="#FFD166" />
            <circle cx="0" cy="-14" r="7" fill="#FFFFFF" fillOpacity="0.95" />
            <circle cx="12" cy="-7" r="7" fill="#FFFFFF" fillOpacity="0.95" />
            <circle cx="12" cy="7" r="7" fill="#FFFFFF" fillOpacity="0.95" />
            <circle cx="0" cy="14" r="7" fill="#FFFFFF" fillOpacity="0.95" />
            <circle cx="-12" cy="7" r="7" fill="#FFFFFF" fillOpacity="0.95" />
            <circle cx="-12" cy="-7" r="7" fill="#FFFFFF" fillOpacity="0.95" />
          </g>
        </g>
      )}

      {coreType === "cupcake" && (
        <g id="hero-cupcake" transform="translate(0, -5)" filter="url(#drop-shadow-tactile)">
          <path
            d="M 172,270 L 183,332 C 184,335 186,336 189,336 L 231,336 C 234,336 236,334 237,332 L 248,270 Z"
            fill={coreSecondaryColor}
            stroke="#5D4B5D"
            strokeWidth="2"
          />
          <line x1="184" y1="270" x2="192" y2="336" stroke="#5D4B5D" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="210" y1="270" x2="210" y2="336" stroke="#5D4B5D" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="236" y1="270" x2="228" y2="336" stroke="#5D4B5D" strokeWidth="1.5" strokeOpacity="0.5" />

          {/* Soft swirly cream */}
          <path
            d="M 154,272 C 148,245 272,245 266,272 C 255,278 165,278 154,272 Z"
            fill={coreColor}
            stroke="#5D4B5D"
            strokeWidth="1.8"
          />
          <path
            d="M 168,252 C 165,225 255,225 252,252 C 242,258 178,258 168,252 Z"
            fill="#FFFFFF"
            stroke="#5D4B5D"
            strokeWidth="1.8"
          />
          <g transform="translate(203, 190)">
            <path
              d="M 8 0 L 10 5 L 16 6 L 12 10 L 13 16 L 8 13 L 3 16 L 4 10 L 0 6 L 6 5 Z"
              fill="#FFD166"
              stroke="#5D4B5D"
              strokeWidth="1.2"
            />
          </g>
        </g>
      )}

      {/* 7. Soft Meadow Wildflowers (At the bottom base) */}
      {flowers.map((fl) => {
        const petalsD: string[] = [];
        const pc = fl.petals;
        const radius = fl.size / 2;
        const cx = fl.cx;
        const cy = fl.cy;

        for (let i = 0; i < pc; i++) {
          const angle = (i * 360) / pc + fl.rotation;
          petalsD.push(`
            rotate(${angle}, ${cx}, ${cy})
            translate(${cx}, ${cy - radius * 0.95})
            scale(${fl.size / 24})
            M 0 0 C -6 -5, -6 -15, 0 -18 C 6 -15, 6 -5, 0 0 Z
          `);
        }

        return (
          <g key={fl.id} filter="url(#drop-shadow-micro)" className="opacity-95">
            {petalsD.map((dStr, idx) => (
              <path key={idx} d="M 0 0" transform={dStr} fill={fl.color} stroke="#6B5B51" strokeWidth="0.8" />
            ))}
            <circle cx={cx} cy={cy} r={radius * 0.45} fill={fl.centerColor} stroke="#6B5B51" strokeWidth="1" />
            <circle cx={cx - radius * 0.1} cy={cy - radius * 0.1} r={radius * 0.12} fill="#FFFFFF" fillOpacity="0.65" />
          </g>
        );
      })}

      {/* 8. Tiny Ghibli Sprouting Mushrooms */}
      {mushrooms.map((m) => {
        const cx = m.cx;
        const cy = m.cy;
        const size = m.size;
        return (
          <g key={m.id} transform={`rotate(${m.rotation}, ${cx}, ${cy})`} filter="url(#drop-shadow-micro)">
            <path
              d={`
                M ${cx - size * 0.2} ${cy + size * 0.2}
                C ${cx - size * 0.1} ${cy + size * 0.1}, ${cx - size * 0.05} ${cy - size * 0.1}, ${cx - size * 0.1} ${cy - size * 0.3}
                C ${cx + size * 0.1} ${cy - size * 0.3}, ${cx + size * 0.12} ${cy + size * 0.1}, ${cx + size * 0.2} ${cy + size * 0.2}
                Z
              `}
              fill={m.stemColor}
              stroke="#6B5B51"
              strokeWidth="0.8"
            />
            <ellipse cx={cx} cy={cy - size * 0.3} rx={size * 0.45} ry={size * 0.1} fill="#EADA9A" stroke="#6B5B51" strokeWidth="0.8" />
            <path
              d={`
                M ${cx - size * 0.6} ${cy - size * 0.3}
                C ${cx - size * 0.55} ${cy - size * 0.95}, ${cx + size * 0.55} ${cy - size * 0.95}, ${cx + size * 0.6} ${cy - size * 0.3}
                Z
              `}
              fill={m.capColor}
              stroke="#6B5B51"
              strokeWidth="1"
            />
            {m.dots.map((dot, dIdx) => (
              <circle
                key={dIdx}
                cx={cx + dot.x * (size / 22)}
                cy={cy - size * 0.55 + dot.y * (size / 22)}
                r={dot.r * (size / 24)}
                fill="#FFFFFF"
                fillOpacity="0.95"
              />
            ))}
          </g>
        );
      })}

      </svg>
    </g>
  );
};
