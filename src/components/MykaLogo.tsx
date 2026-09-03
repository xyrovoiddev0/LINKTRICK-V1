import React from 'react';

interface MykaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'xl';
  showText?: boolean;
  accentColor?: string;
  onSecretClick?: () => void;
  isVerified?: boolean;
}

export const MykaLogo: React.FC<MykaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  accentColor = '#FF2B2B', // Burnt cyber red / orange-red
  onSecretClick,
  isVerified = true,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    hero: 'w-16 h-16 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.18em]',
    md: 'text-xl tracking-[0.2em]',
    lg: 'text-2xl tracking-[0.22em]',
    hero: 'text-3xl sm:text-4xl tracking-[0.25em]',
    xl: 'text-4xl sm:text-5xl tracking-[0.28em]',
  };

  return (
    <div
      className={`inline-flex items-center gap-3 select-none cursor-pointer group ${className}`}
      onClick={onSecretClick}
      title="MYKA"
    >
      {/* Winged M Emblem from user reference */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center shrink-0`}>
        {/* Atmospheric Glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, rgba(212, 56, 24, 0.4) 60%, transparent 80%)`,
          }}
        />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-110"
        >
          <defs>
            {/* High-tech ember gradient */}
            <linearGradient id="mykaCyberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4A30" />
              <stop offset="50%" stopColor={accentColor} />
              <stop offset="100%" stopColor="#C42606" />
            </linearGradient>
            
            <filter id="neonShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={accentColor} floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#C42606" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 
            Exact geometry of the winged cyber 'M' emblem from reference:
            - Top V notch: (50, 48)
            - Top-left horn: (34, 18)
            - Upper-left nook: (30, 36)
            - Mid-left outer wing spike: (14, 46)
            - Lower-left nook: (28, 56)
            - Bottom-left wing spike: (18, 76)
            - Bottom center V point: (50, 64)
            - Mirrored symmetrically on the right side
          */}
          <polygon
            points="50,48 34,18 30,36 14,46 28,56 18,76 50,64 82,76 72,56 86,46 70,36 66,18"
            fill="url(#mykaCyberGradient)"
            filter="url(#neonShadow)"
          />

          {/* Inner core accent lines for high-tech holographic realism */}
          <polyline
            points="34,18 50,48 66,18"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />
          <polyline
            points="18,76 50,64 82,76"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />
          <circle cx="50" cy="56" r="2" fill="#FFFFFF" opacity="0.95" />
        </svg>
      </div>

      {/* MYKA Typography */}
      {showText && (
        <div className="flex items-center">
          <span className={`${textSizes[size]} font-['Space_Grotesk',sans-serif] font-bold text-white leading-none tracking-wider`}>
            MYKA
          </span>
        </div>
      )}
    </div>
  );
};
