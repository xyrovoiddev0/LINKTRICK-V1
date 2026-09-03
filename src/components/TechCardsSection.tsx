import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Bot, Zap, Code2, Cpu } from 'lucide-react';
import { SiteConfig } from '../types';

interface TechCardsSectionProps {
  config: SiteConfig;
  onExploreClick: () => void;
}

export const TechCardsSection: React.FC<TechCardsSectionProps> = ({
  config,
  onExploreClick,
}) => {
  const pillars = [
    {
      num: '01',
      title: 'Inovação Contínua',
      description: 'Aberto a novas adaptações e tecnologias que ampliam o que é possível criar.',
      icon: <Sparkles className="w-5 h-5" style={{ color: config.accentColor }} />,
    },
    {
      num: '02',
      title: 'Conexão Total',
      description: 'Conectando pessoas, ideias e o mundo com a inteligência artificial.',
      icon: <Bot className="w-5 h-5" style={{ color: config.accentColor }} />,
    },
    {
      num: '03',
      title: 'Performance Extrema',
      description: 'Velocidade, segurança e tecnologia de ponta em cada interação.',
      icon: <Zap className="w-5 h-5" style={{ color: config.accentColor }} />,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full px-4 mb-16 space-y-12"
    >
      {/* Section Header: "// 02 — O QUE NOS MOVE" */}
      <div className="pt-8 border-t border-neutral-800/80">
        <div className="flex items-center justify-between mb-8">
          <span
            className="text-xs font-['JetBrains_Mono',monospace] tracking-wider uppercase font-medium"
            style={{ color: config.accentColor }}
          >
            // 02 — O QUE NOS MOVE
          </span>
          <span className="text-xs font-['JetBrains_Mono',monospace] text-neutral-500">
            03 / 03
          </span>
        </div>

        {/* Headline: "Ideias não têm limites." (Screenshot 2) */}
        <h2 className="text-3xl sm:text-4xl font-['Space_Grotesk',sans-serif] font-bold text-white tracking-tight leading-tight mb-4">
          Ideias não têm{' '}
          <span style={{ color: config.accentColor }}>limites.</span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif] max-w-lg mb-6">
          O próximo grande salto começa com uma pergunta. A MYKA existe para transformar essa pergunta em algo real — com velocidade, precisão e uma visão de futuro.
        </p>

        {/* Red Accent Line */}
        <div
          className="w-full h-[1px] mb-4"
          style={{
            background: `linear-gradient(90deg, ${config.accentColor} 0%, transparent 100%)`,
          }}
        />

        <p className="text-[11px] font-['JetBrains_Mono',monospace] tracking-[0.25em] text-neutral-400 uppercase">
          CRIAR É O NOSSO ESTADO NATURAL .
        </p>
      </div>

      {/* Pillars 01, 02, 03 (Screenshots 2 & 3) */}
      <div className="space-y-4">
        {pillars.map((item, index) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.65 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative p-6 rounded-xl bg-[#0B0B0F]/90 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
          >
            {/* Subtle inner ambient glow */}
            <div
              className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: config.accentColor }}
            />

            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-['JetBrains_Mono',monospace] text-neutral-500 font-medium">
                {item.num}
              </span>
              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 group-hover:border-neutral-700 transition-colors">
                {item.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-['Space_Grotesk',sans-serif] font-bold text-white tracking-tight mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-400 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Action link */}
            <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between">
              <span
                className="text-[11px] font-['JetBrains_Mono',monospace] tracking-[0.2em] font-semibold uppercase group-hover:underline underline-offset-4"
                style={{ color: config.accentColor }}
              >
                EXPLORE / {item.num}
              </span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: config.accentColor }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Banner Callout (Screenshot 4/5): "// 03 — O PRÓXIMO CAPÍTULO" */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#120B0D] via-[#0E0C12] to-[#08080C] border overflow-hidden"
        style={{ borderColor: `${config.accentColor}50` }}
      >
        {/* Subtle geometric red polygon accent line in background */}
        <div
          className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: config.accentColor }}
        />

        <div className="relative z-10">
          <span
            className="text-[11px] font-['JetBrains_Mono',monospace] tracking-[0.22em] uppercase font-semibold block mb-4"
            style={{ color: config.accentColor }}
          >
            // 03 — O PRÓXIMO CAPÍTULO
          </span>

          <h3 className="text-2xl sm:text-3xl font-['Space_Grotesk',sans-serif] font-bold text-white tracking-tight leading-snug mb-3">
            <span style={{ color: config.accentColor }}>↗ </span>
            A nova era da <br />
            <span style={{ color: config.accentColor }}>criação</span>{' '}
            começa agora.
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed mb-6 max-w-sm">
            Prepare-se para transformar suas ideias em código com tecnologia e velocidade de ponta.
          </p>

          <a
            href={config.primaryButtonUrl || 'https://myka.com.br'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 pb-1 text-xs font-['JetBrains_Mono',monospace] tracking-[0.2em] uppercase font-bold border-b transition-all duration-300 hover:gap-3"
            style={{
              color: config.accentColor,
              borderColor: config.accentColor,
            }}
          >
            <span>ENTRAR NA NOVA ERA</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-['JetBrains_Mono',monospace] text-neutral-500">
            <span>MYKA // CREATE_BETTER</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
