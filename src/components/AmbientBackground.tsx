import React from 'react';

interface AmbientBackgroundProps {
  accentColor?: string;
  enabled?: boolean;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  accentColor = '#FF2B2B',
  enabled = true,
}) => {
  if (!enabled) {
    return <div className="fixed inset-0 bg-[#070709] -z-10 pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#070709]">
      {/* Top Ambient Glow Orb */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full blur-[140px] opacity-25"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Mid Ambient Glow Orb */}
      <div
        className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full blur-[160px] opacity-15"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Bottom Ambient Glow Orb */}
      <div
        className="absolute bottom-10 -left-24 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle Orbital Ellipse Rings (from screenshot 1) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="ringGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="50%"
          cy="32%"
          rx="320"
          ry="190"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <ellipse
          cx="50%"
          cy="32%"
          rx="480"
          ry="280"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="0.8"
          strokeDasharray="2 8"
        />
      </svg>

      {/* Subtle Floating Starlight / Red Particle Points */}
      <div className="absolute inset-0">
        <span
          className="absolute top-[18%] left-[14%] w-1.5 h-1.5 rounded-full blur-[1px] animate-pulse"
          style={{ backgroundColor: accentColor, opacity: 0.6 }}
        />
        <span
          className="absolute top-[28%] right-[18%] w-2 h-2 rounded-full blur-[1.5px] animate-pulse"
          style={{ backgroundColor: accentColor, opacity: 0.8, animationDelay: '1s' }}
        />
        <span
          className="absolute top-[48%] left-[8%] w-1 h-1 rounded-full blur-[0.5px]"
          style={{ backgroundColor: accentColor, opacity: 0.5 }}
        />
        <span
          className="absolute top-[62%] right-[10%] w-1.5 h-1.5 rounded-full blur-[1px] animate-pulse"
          style={{ backgroundColor: accentColor, opacity: 0.7, animationDelay: '1.5s' }}
        />
        <span
          className="absolute top-[78%] left-[22%] w-1 h-1 rounded-full blur-[0.5px]"
          style={{ backgroundColor: accentColor, opacity: 0.4 }}
        />
        <span
          className="absolute top-[88%] right-[25%] w-1.5 h-1.5 rounded-full blur-[1px] animate-pulse"
          style={{ backgroundColor: accentColor, opacity: 0.5, animationDelay: '2s' }}
        />
      </div>

      {/* Fine high-tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
    </div>
  );
};
