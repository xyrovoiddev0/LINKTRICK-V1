import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Send, Video } from 'lucide-react';
import { MykaLogo } from './MykaLogo';
import { SiteConfig } from '../types';

interface FooterSectionProps {
  config: SiteConfig;
  onOpenSecretAdmin: () => void;
  instagramUrl?: string;
  tiktokUrl?: string;
  telegramUrl?: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  config,
  onOpenSecretAdmin,
  instagramUrl = 'https://instagram.com',
  tiktokUrl = 'https://tiktok.com',
  telegramUrl = 'https://t.me',
}) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setClickCount(0);
      onOpenSecretAdmin();
    } else {
      setTimeout(() => setClickCount(0), 1500);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pt-12 pb-16 px-4 border-t border-neutral-800/80 flex flex-col items-center text-center"
    >
      {/* Footer Branding (Screenshot 5) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-2">
          <MykaLogo
            size="md"
            accentColor={config.accentColor}
            onSecretClick={handleSecretClick}
          />
        </div>

        <span
          className="text-xs font-['JetBrains_Mono',monospace] tracking-[0.25em] font-semibold uppercase"
          style={{ color: config.accentColor }}
        >
          INOVAÇÃO SEM LIMITES.
        </span>
      </div>

      {/* Social Icons Links row */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-neutral-400 hover:text-white transition-colors"
        >
          <Instagram className="w-4 h-4" style={{ color: config.accentColor }} />
          <span>Instagram</span>
        </a>

        <a
          href={tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-neutral-400 hover:text-white transition-colors"
        >
          <Video className="w-4 h-4" style={{ color: config.accentColor }} />
          <span>TikTok</span>
        </a>

        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-['JetBrains_Mono',monospace] text-neutral-400 hover:text-white transition-colors"
        >
          <Send className="w-4 h-4" style={{ color: config.accentColor }} />
          <span>Telegram</span>
        </a>
      </div>
    </motion.footer>
  );
};
