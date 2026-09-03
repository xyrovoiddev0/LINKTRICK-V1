import React, { useState, useEffect } from 'react';
import { BootProgressBar } from './components/BootProgressBar';
import { MykaTechnicalBackground } from './components/MykaTechnicalBackground';
import { FloatingParticlesBackground } from './components/FloatingParticlesBackground';
import { HeroSection } from './components/HeroSection';
import { OfficialLinksSection } from './components/OfficialLinksSection';
import { TechCardsSection } from './components/TechCardsSection';
import { FooterSection } from './components/FooterSection';
import { SecretAdminModal } from './components/SecretAdminModal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { INITIAL_LINKS, DEFAULT_SITE_CONFIG } from './data/initialLinks';
import { LinkItem, SiteConfig } from './types';

const CONFIG_STORAGE_KEY = 'myka_site_config_v5';
const LINKS_STORAGE_KEY = 'myka_links_v5';

export default function App() {
  // Load configuration
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Load links
  const [links, setLinks] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem(LINKS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_LINKS;
  });

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // High-performance graphics engine smooth inertia scrolling
  useSmoothScroll({ isLocked: isAdminOpen });

  // Increment total page views on mount
  useEffect(() => {
    setConfig((prev) => {
      const updated = { ...prev, totalViews: (prev.totalViews || 0) + 1 };
      try {
        localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
  }, []);

  // Keyboard shortcut listener to open secret admin (Ctrl + M or Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key.toLowerCase() === 'm') || (e.shiftKey && e.key.toUpperCase() === 'A')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click tracking
  const handleLinkClick = (id: string) => {
    setLinks((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, clicks: (item.clicks || 0) + 1 } : item
      );
      try {
        localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
  };

  // Save changes from Admin panel
  const handleSaveAdmin = (newConfig: SiteConfig, newLinks: LinkItem[]) => {
    setConfig(newConfig);
    setLinks(newLinks);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
      localStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(newLinks));
    } catch {
      // Ignored
    }
  };

  // Find social links for footer
  const instagramUrl = links.find((l) => l.id === 'instagram')?.url || 'https://instagram.com';
  const tiktokUrl = links.find((l) => l.id === 'tiktok')?.url || 'https://tiktok.com';
  const telegramUrl = links.find((l) => l.id === 'telegram')?.url || 'https://t.me';

  return (
    <div className="relative min-h-screen text-white font-['Plus_Jakarta_Sans',sans-serif] bg-[#040406] selection:bg-[#FF2B2B]/30 selection:text-[#FF4A30] overflow-x-hidden">
      {/* System OS Boot Progress Bar */}
      <BootProgressBar accentColor={config.accentColor} />

      {/* Official MYKA Technical Dark Grid & Subtle Ember Atmospheric Background */}
      <MykaTechnicalBackground
        accentColor={config.accentColor}
        enabled={config.particleGlow}
      />

      {/* Floating Ambient OS Micro-Particles (Multi-depth slow drift) */}
      <FloatingParticlesBackground
        accentColor={config.accentColor}
        enabled={config.particleGlow}
      />

      {/* Main Centered Container (Mobile-first responsive column with coordinated mounting sequence) */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center relative z-10">
        {/* HERO SECTION */}
        <HeroSection
          config={config}
          onPrimaryClick={() => handleLinkClick('myka-platform')}
          onSecretTrigger={() => setIsAdminOpen(true)}
        />

        {/* 4 CORE OFFICIAL LINKS */}
        <OfficialLinksSection
          links={links}
          config={config}
          onLinkClick={handleLinkClick}
        />

        {/* TECH CARDS & CREATIVE PILLARS */}
        <TechCardsSection
          config={config}
          onExploreClick={() => handleLinkClick('myka-platform')}
        />

        {/* FOOTER */}
        <FooterSection
          config={config}
          onOpenSecretAdmin={() => setIsAdminOpen(true)}
          instagramUrl={instagramUrl}
          tiktokUrl={tiktokUrl}
          telegramUrl={telegramUrl}
        />
      </div>

      {/* SECRET ADMIN CONSOLE MODAL (Protected by PIN, hidden from general visitors) */}
      <SecretAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        links={links}
        onSave={handleSaveAdmin}
      />
    </div>
  );
}
