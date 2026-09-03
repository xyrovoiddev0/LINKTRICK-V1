import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { SiteConfig } from '../types';

interface TrustGuaranteesSectionProps {
  config: SiteConfig;
  onOpenSecurityModal: () => void;
}

export const TrustGuaranteesSection: React.FC<TrustGuaranteesSectionProps> = ({
  config,
  onOpenSecurityModal,
}) => {
  return (
    <div className="w-full px-4 mb-12">
      <div className="w-full p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0E0C14] to-[#08080E] border border-neutral-800 relative overflow-hidden shadow-2xl">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
          style={{ backgroundColor: config.accentColor }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-['JetBrains_Mono',monospace] tracking-wider uppercase font-bold text-white">
              SEGURANÇA & CONFIABILIDADE
            </span>
          </div>
          <span className="text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
            CANAL OFICIAL
          </span>
        </div>

        <p className="text-xs text-neutral-300 font-['Plus_Jakarta_Sans',sans-serif] leading-relaxed mb-4 relative z-10">
          Você está navegando no ambiente oficial da <strong className="text-white">MYKA Inteligência Artificial</strong>. Todos os links direcionam exclusivamente para servidores oficiais e seguros.
        </p>

        {/* 3 Pillars of Trust */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4 relative z-10">
          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800/80">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Canais Verificados</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Sem intermediários ou perfis falsificados. Acesso direto.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800/80">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>SSL 256-Bit Ativo</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Criptografia de ponta a ponta durante toda a navegação.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800/80">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Uptime 99.99%</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Servidores em nuvem de alta disponibilidade 24 horas por dia.
            </p>
          </div>
        </div>

        {/* Action button to open certificate */}
        <button
          onClick={onOpenSecurityModal}
          className="w-full py-2.5 px-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700/80 text-white text-xs font-semibold font-['Space_Grotesk',sans-serif] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] relative z-10"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ver Certificado de Autenticidade & Diretrizes Anti-Golpe</span>
        </button>
      </div>
    </div>
  );
};
