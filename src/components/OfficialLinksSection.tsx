import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Bot, 
  Send, 
  Video, 
  Instagram,
  Sparkles,
  ExternalLink,
  Terminal
} from 'lucide-react';
import { LinkItem, SiteConfig } from '../types';

interface OfficialLinksSectionProps {
  links: LinkItem[];
  config: SiteConfig;
  onLinkClick: (id: string) => void;
}

export const OfficialLinksSection: React.FC<OfficialLinksSectionProps> = ({
  links,
  config,
  onLinkClick,
}) => {
  const getPlatformIcon = (item: LinkItem) => {
    switch (item.iconName) {
      case 'shopping-bag':
        return <Bot className="w-5 h-5" style={{ color: config.accentColor }} />;
      case 'instagram':
        return <Instagram className="w-5 h-5" style={{ color: config.accentColor }} />;
      case 'video':
        return <Video className="w-5 h-5" style={{ color: config.accentColor }} />;
      case 'send':
        return <Send className="w-5 h-5" style={{ color: config.accentColor }} />;
      default:
        return <ExternalLink className="w-5 h-5" style={{ color: config.accentColor }} />;
    }
  };

  return (
    <section className="w-full space-y-4 px-4 mb-14">
      {links.map((link, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');
        const isPrimary = link.isPrimary || index === 0;

        return (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 24, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.55,
              delay: 1.0 + index * 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative group w-full"
          >
            {/* 1. Deep Volumetric Ambient Bloom (Intense Outer Glow Aura) */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-65 group-active:opacity-85 transition-opacity duration-300 blur-xl pointer-events-none select-none"
              style={{
                backgroundColor: config.accentColor,
              }}
              aria-hidden="true"
            />

            {/* 2. Razor-Sharp Neon Perimeter Halo (Border Activation) */}
            <div
              className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 pointer-events-none select-none"
              style={{
                background: `linear-gradient(135deg, ${config.accentColor} 0%, ${config.accentColor}50 40%, ${config.accentColor} 100%)`,
                boxShadow: `0 0 20px ${config.accentColor}90, inset 0 0 15px ${config.accentColor}40`,
              }}
              aria-hidden="true"
            />

            {/* 3. Main Interactive Module Card Body */}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onLinkClick(link.id)}
              className={`relative z-10 block w-full p-5 sm:p-6 rounded-xl transition-all duration-300 overflow-hidden select-none touch-manipulation ${
                isPrimary
                  ? 'bg-[#0E0E14] border'
                  : 'bg-[#0B0B10]/95 border border-neutral-800/80 group-hover:border-transparent'
              } group-hover:-translate-y-1 group-active:translate-y-0 active:scale-[0.99]`}
              style={{
                borderColor: isPrimary ? `${config.accentColor}80` : undefined,
                boxShadow: isPrimary
                  ? `0 6px 28px -4px ${config.accentColor}35`
                  : undefined,
              }}
            >
              {/* Internal Volumetric Backlight Flood on Activation */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${config.accentColor}28 0%, ${config.accentColor}0A 55%, transparent 75%)`,
                }}
              />

              {/* Top Horizon Laser Flare Beam */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${config.accentColor} 20%, 
                    #FFFFFF 50%, 
                    ${config.accentColor} 80%, 
                    transparent 100%
                  )`,
                  boxShadow: `0 0 10px #FFFFFF, 0 0 20px ${config.accentColor}`,
                }}
              />

              {/* Central Laser Flare Pip */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[3px] bg-white rounded-full blur-[0.5px] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 10px #FFFFFF, 0 0 20px ${config.accentColor}`,
                }}
              />

              {/* Top row: Number code + Badge + Platform Icon */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-['JetBrains_Mono',monospace] text-neutral-500 font-medium tracking-wider group-hover:text-neutral-400 transition-colors">
                    {itemNumber}
                  </span>
                  {link.badge && (
                    <span
                      className="text-[10px] font-['JetBrains_Mono',monospace] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm border transition-all duration-300"
                      style={{
                        color: config.accentColor,
                        borderColor: `${config.accentColor}40`,
                        backgroundColor: `${config.accentColor}10`,
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </div>

                {/* Platform Icon Tile with Activation Glow */}
                <div
                  className="p-2 rounded-lg bg-neutral-900/90 border border-neutral-800 transition-all duration-300 group-hover:border-opacity-100"
                  style={{
                    borderColor: undefined,
                  }}
                >
                  {getPlatformIcon(link)}
                </div>
              </div>

              {/* Title */}
              <div className="flex items-center gap-2 mb-1.5 relative z-10">
                <h3 className="text-lg sm:text-xl font-['Space_Grotesk',sans-serif] font-bold text-white tracking-tight group-hover:text-white transition-colors">
                  {link.title}
                </h3>
              </div>

              {/* Subtitle / Description */}
              {link.subtitle && (
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif] mb-4 relative z-10">
                  {link.subtitle}
                </p>
              )}

              {/* Bottom Divider and Action row */}
              <div className="pt-3 border-t border-neutral-800/80 group-hover:border-neutral-700/80 flex items-center justify-between relative z-10 transition-colors">
                <div className="flex items-center gap-2">
                  {/* Micro Activation Status Dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"
                    style={{
                      backgroundColor: config.accentColor,
                      boxShadow: `0 0 8px ${config.accentColor}`,
                    }}
                  />
                  <span className="text-[10px] font-['JetBrains_Mono',monospace] text-neutral-500 group-hover:text-neutral-300 tracking-wider transition-colors">
                    CANAL // {itemNumber}
                  </span>
                </div>

                {/* Intense High-Contrast "ACESSAR" Button Pill */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono',monospace] font-bold px-3.5 py-1.5 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:translate-x-0.5"
                  style={{
                    backgroundColor: `${config.accentColor}1A`,
                    color: config.accentColor,
                    border: `1px solid ${config.accentColor}50`,
                  }}
                >
                  <span className="tracking-wide">ACESSAR</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          </motion.div>
        );
      })}
    </section>
  );
};
