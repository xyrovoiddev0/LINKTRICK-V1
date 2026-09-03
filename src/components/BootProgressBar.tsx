import React, { useState, useEffect } from 'react';

interface BootProgressBarProps {
  accentColor?: string;
  sequenceKey?: number;
}

export const BootProgressBar: React.FC<BootProgressBarProps> = ({
  accentColor = '#FF2B2B',
  sequenceKey = 1,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [statusText, setStatusText] = useState('INIT // KERNEL');

  useEffect(() => {
    setProgress(0);
    setIsVisible(true);
    setStatusText('INIT // KERNEL');

    // Staged realistic operating system boot progression sequence
    const checkpoints = [
      { target: 22, text: 'CORE // SYS_BOOT', delay: 120 },
      { target: 48, text: 'INIT // NEURAL_V1', delay: 380 },
      { target: 73, text: 'LOAD // UI_GRID', delay: 750 },
      { target: 91, text: 'CALIBRATING // HUD', delay: 1100 },
      { target: 100, text: 'READY // ONLINE', delay: 1450 },
    ];

    const timers: NodeJS.Timeout[] = [];

    checkpoints.forEach(({ target, text, delay }) => {
      const timer = setTimeout(() => {
        setProgress(target);
        setStatusText(text);
      }, delay);
      timers.push(timer);
    });

    // Fade out after completion
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    timers.push(fadeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [sequenceKey]);

  if (!isVisible && progress >= 100) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none select-none transition-opacity duration-700 ${
        progress >= 100 ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Background track (almost invisible) */}
      <div className="w-full h-[2px] bg-white/[0.04]">
        {/* Active glowing progress bar */}
        <div
          className="h-full relative transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, transparent 0%, ${accentColor} 70%, #FFFFFF 100%)`,
            boxShadow: `0 0 8px ${accentColor}, 0 0 16px ${accentColor}80`,
          }}
        >
          {/* Luminous leading head */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full blur-[1px]"
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: `0 0 6px #FFFFFF, 0 0 12px ${accentColor}`,
            }}
          />
        </div>
      </div>

      {/* Discrete micro status text */}
      <div className="w-full max-w-xl mx-auto flex justify-start px-4 pt-2">
        <div className="flex items-center gap-2 text-[9px] font-['JetBrains_Mono',monospace] text-neutral-500 tracking-wider">
          <span className="opacity-70">MYKA_OS //</span>
          <span>{statusText}</span>
          <span className="font-semibold" style={{ color: accentColor }}>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
