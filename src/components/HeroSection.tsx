import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, ShieldCheck, Lock, Activity } from 'lucide-react';
import { MykaLogo } from './MykaLogo';
import { SiteConfig } from '../types';

interface HeroSectionProps {
  config: SiteConfig;
  onPrimaryClick: () => void;
  onSecretTrigger: () => void;
  onOpenSecurityModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onPrimaryClick,
  onSecretTrigger,
  onOpenSecurityModal,
}) => {
  // Secret triple-click detector on the logo
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3) {
      setClickCount(0);
      onSecretTrigger();
    } else {
      // Reset count after 1.5 seconds if not reached 3
      setTimeout(() => {
        setClickCount(0);
      }, 1500);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center text-center pt-8 sm:pt-14 pb-10 px-4">
      {/* 1. Main MYKA Logo with winged emblem and secret triple-click */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mb-7 transition-transform duration-300 hover:scale-[1.03]"
      >
        <MykaLogo
          size="hero"
          accentColor={config.accentColor}
          onSecretClick={handleLogoClick}
          isVerified={false}
        />
      </motion.div>

      {/* 3. Headline: "Tecnologia que transforma.|" */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl text-3xl sm:text-5xl md:text-6xl font-['Space_Grotesk',sans-serif] font-bold tracking-tight text-white leading-[1.15] mb-5"
      >
        <span>{config.heroPrefix}{' '}</span>
        <span
          className="relative inline-block"
          style={{ color: config.accentColor }}
        >
          {config.heroHighlight}
          {/* Glowing Cursor pipe */}
          <span
            className="inline-block ml-0.5 animate-pulse font-normal opacity-90"
            style={{ color: config.accentColor }}
          >
            |
          </span>
        </span>
      </motion.h1>

      {/* 4. Description */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md sm:max-w-lg text-neutral-300 text-sm sm:text-base leading-relaxed font-['Plus_Jakarta_Sans',sans-serif] font-normal mb-8"
      >
        {config.description}
      </motion.p>

      {/* 5. Hero CTA Button: "Acessar Myka ↗" */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xs sm:max-w-sm flex flex-col items-center mb-8"
      >
        <div className="relative group w-full">
          {/* Volumetric Intense Bloom Halo behind Button */}
          <div
            className="absolute -inset-1 rounded-2xl opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
            style={{
              backgroundColor: config.accentColor,
            }}
          />

          {/* Main Button */}
          <a
            href={config.primaryButtonUrl || 'https://myka.com.br'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrimaryClick}
            className="relative z-10 w-full inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl font-['Space_Grotesk',sans-serif] font-bold text-sm tracking-wide text-white transition-all duration-300 active:scale-[0.98] border border-white/20 overflow-hidden"
            style={{
              backgroundColor: config.accentColor,
              boxShadow: `0 0 25px ${config.accentColor}, 0 10px 40px -4px ${config.accentColor}90`,
            }}
          >
            {/* Top Horizon Sheen line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Subtle button sheen overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

            <span className="relative z-10">{config.primaryButtonText || 'Acessar Myka'}</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>

      {/* 6. Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        className="flex flex-col items-center gap-1.5 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <span className="text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] tracking-[0.25em] text-neutral-400 uppercase">
          DESLIZE PARA EXPLORAR
        </span>
        <ChevronDown className="w-4 h-4 text-neutral-400 animate-bounce" />
      </motion.div>

      {/* 7. Section Indicator: "// 01 — CANAIS OFICIAIS" */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="w-full flex items-center justify-between pt-12 mt-4 border-t border-neutral-800/80"
      >
        <span
          className="text-xs font-['JetBrains_Mono',monospace] tracking-wider uppercase font-medium flex items-center gap-2"
          style={{ color: config.accentColor }}
        >
          <span>// 01 — ECOSSISTEMA OFICIAL</span>
        </span>
        <span className="text-xs font-['JetBrains_Mono',monospace] text-neutral-500">
          04 CANAIS AUTENTICADOS
        </span>
      </motion.div>
    </section>
  );
};
