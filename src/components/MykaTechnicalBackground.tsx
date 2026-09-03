import React from 'react';

interface MykaTechnicalBackgroundProps {
  accentColor?: string;
  enabled?: boolean;
}

export const MykaTechnicalBackground: React.FC<MykaTechnicalBackgroundProps> = ({
  accentColor = '#E62E00', // Burnt red / cyber ember
  enabled = true,
}) => {
  if (!enabled) {
    return <div className="fixed inset-0 -z-10 bg-[#040406]" />;
  }

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#040406]"
      aria-hidden="true"
    >
      {/* 1. DEEP BURNT RED / ORANGE-EMBER ATMOSPHERIC BLOOMS (Extremely subtle lighting) */}
      {/* Top Hero Ambient Glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] max-w-[95vw] h-[520px] rounded-full blur-[140px] opacity-16 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${accentColor} 0%, #D43818 35%, #9E1F08 65%, transparent 80%)`,
        }}
      />

      {/* Mid-Right Edge Ambient Warmth */}
      <div
        className="absolute top-[42%] -right-48 w-[460px] h-[460px] rounded-full blur-[160px] opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, #C42606 50%, transparent 75%)`,
        }}
      />

      {/* Lower Lateral Subtle Bloom */}
      <div
        className="absolute bottom-16 -left-48 w-[480px] h-[480px] rounded-full blur-[170px] opacity-8 pointer-events-none"
        style={{
          background: `radial-gradient(circle, #E6381A 0%, #991B06 60%, transparent 80%)`,
        }}
      />

      {/* 2. PRECISION TECHNICAL GRID (Distributed across entire viewport) */}
      {/* 32px fine grid + 160px major divisions with SVG pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-65"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Fine 32px micro-grid */}
          <pattern
            id="mykaMicroGrid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255, 255, 255, 0.022)"
              strokeWidth="0.75"
            />
          </pattern>

          {/* Major 160px engineering grid with intersection crosshairs */}
          <pattern
            id="mykaMacroGrid"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 160 0 L 0 0 0 160"
              fill="none"
              stroke="rgba(255, 255, 255, 0.045)"
              strokeWidth="1"
            />
            {/* Subtle Crosshairs at intersections */}
            <path
              d="M 0 6 L 0 -6 M -6 0 L 6 0"
              stroke="rgba(230, 46, 0, 0.28)"
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="1.2" fill="rgba(255, 255, 255, 0.2)" />
          </pattern>

          {/* Linear subtle scan gradient */}
          <linearGradient id="vignetteMask" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
            <stop offset="15%" stopColor="#000" stopOpacity="1" />
            <stop offset="85%" stopColor="#000" stopOpacity="1" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Render micro grid */}
        <rect width="100%" height="100%" fill="url(#mykaMicroGrid)" />
        {/* Render macro grid */}
        <rect width="100%" height="100%" fill="url(#mykaMacroGrid)" />
      </svg>

      {/* 3. SUBTLE GEOMETRIC RADAR / ORBITAL HUD ELEMENTS (Upper third) */}
      <svg
        className="absolute inset-x-0 top-6 w-full h-[650px] pointer-events-none opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 650"
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Central Precision Radar Circles */}
        <circle
          cx="600"
          cy="240"
          r="160"
          fill="none"
          stroke="rgba(230, 46, 0, 0.16)"
          strokeWidth="0.8"
          strokeDasharray="2 8"
        />
        <circle
          cx="600"
          cy="240"
          r="260"
          fill="none"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="0.75"
        />
        <circle
          cx="600"
          cy="240"
          r="380"
          fill="none"
          stroke="rgba(230, 46, 0, 0.10)"
          strokeWidth="0.75"
          strokeDasharray="4 14"
        />

        {/* Cardinal Axis Markers */}
        <line
          x1="600"
          y1="60"
          x2="600"
          y2="90"
          stroke="rgba(230, 46, 0, 0.35)"
          strokeWidth="1"
        />
        <line
          x1="600"
          y1="390"
          x2="600"
          y2="420"
          stroke="rgba(230, 46, 0, 0.35)"
          strokeWidth="1"
        />
        <line
          x1="420"
          y1="240"
          x2="450"
          y2="240"
          stroke="rgba(230, 46, 0, 0.35)"
          strokeWidth="1"
        />
        <line
          x1="750"
          y1="240"
          x2="780"
          y2="240"
          stroke="rgba(230, 46, 0, 0.35)"
          strokeWidth="1"
        />

        {/* Sub-cardinal 45-degree angle tick marks */}
        <line
          x1="487"
          y1="127"
          x2="497"
          y2="137"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
        <line
          x1="713"
          y1="127"
          x2="703"
          y2="137"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
      </svg>

      {/* 4. DISCRETE HUD MARGIN GUIDES & CALIBRATION TICKS (Screen edges) */}
      {/* Left side guide rail */}
      <div className="absolute top-0 bottom-0 left-2 sm:left-4 w-4 hidden md:flex flex-col justify-between py-12 pointer-events-none opacity-30">
        <div className="flex flex-col gap-8 items-start">
          <div className="w-2.5 h-[1px] bg-neutral-600" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-2.5 h-[1px] bg-neutral-600" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-3.5 h-[1px] bg-red-600/70" />
        </div>
        <div className="text-[9px] font-mono text-neutral-600 -rotate-90 origin-left translate-x-2 tracking-widest uppercase">
          SYS // AXIS
        </div>
        <div className="flex flex-col gap-8 items-start">
          <div className="w-3.5 h-[1px] bg-red-600/70" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-2.5 h-[1px] bg-neutral-600" />
        </div>
      </div>

      {/* Right side guide rail */}
      <div className="absolute top-0 bottom-0 right-2 sm:right-4 w-4 hidden md:flex flex-col justify-between py-12 pointer-events-none opacity-30 items-end">
        <div className="flex flex-col gap-8 items-end">
          <div className="w-2.5 h-[1px] bg-neutral-600" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-3.5 h-[1px] bg-red-600/70" />
        </div>
        <div className="text-[9px] font-mono text-neutral-600 rotate-90 origin-right -translate-x-2 tracking-widest uppercase">
          CORE // ARCH
        </div>
        <div className="flex flex-col gap-8 items-end">
          <div className="w-3.5 h-[1px] bg-red-600/70" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-1.5 h-[1px] bg-neutral-700" />
          <div className="w-2.5 h-[1px] bg-neutral-600" />
        </div>
      </div>

      {/* 5. SUBTLE CORNER HUD BRACKETS */}
      {/* Top Left */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-neutral-700/40 pointer-events-none" />
      {/* Top Right */}
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-neutral-700/40 pointer-events-none" />
      {/* Bottom Left */}
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-neutral-700/40 pointer-events-none" />
      {/* Bottom Right */}
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-neutral-700/40 pointer-events-none" />

      {/* 6. VIGNETTE RADIAL MASK FOR MAXIMUM CONTRAST & LEGIBILITY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 75% at 50% 35%, transparent 35%, rgba(4, 4, 6, 0.72) 80%, #040406 100%)',
        }}
      />
    </div>
  );
};
