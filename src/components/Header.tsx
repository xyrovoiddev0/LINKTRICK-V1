import React from 'react';
import { BadgeCheck, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenSecurity: () => void;
  onOpenShare: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSecurity,
  onOpenShare,
  onOpenSettings,
}) => {
  return (
    <header className="w-full text-center relative flex flex-col items-center pt-2 pb-4">
      {/* Top utility actions */}
      <div className="w-full flex items-center justify-between px-2 mb-4">
        <button
          onClick={onOpenSecurity}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold hover:bg-emerald-100 transition-colors shadow-xs"
          title="Verificação de Autenticidade"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verificado Oficial</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenShare}
            className="p-2 rounded-full bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 shadow-xs transition-all hover:scale-105 active:scale-95"
            title="Compartilhar Linktrick"
          >
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
          </button>
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300 shadow-xs transition-all hover:scale-105 active:scale-95 text-xs font-medium"
            title="Acessar Painel de Admin"
          >
            <span className="text-neutral-400 text-[10px]">🔒</span>
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Brand Avatar / Medallion */}
      <div className="relative mb-3 group">
        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#C5A880] via-[#EADBCA] to-[#A88B63] shadow-md transition-transform group-hover:scale-102">
          <div className="w-full h-full rounded-full bg-[#1A1A1A] flex flex-col items-center justify-center text-white border-2 border-white/90">
            <span className="font-['Cinzel'] tracking-[0.25em] text-lg font-bold text-[#E5D7C2] ml-1">
              MYKA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] -mt-0.5">
              BRASIL
            </span>
          </div>
        </div>
        <div 
          className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
          title="Canal Oficial Verificado"
        >
          <BadgeCheck className="w-6 h-6 text-[#0A66C2] fill-[#0A66C2]" />
        </div>
      </div>

      {/* Brand Title with High Trust Appearance */}
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <h1 className="text-2xl font-bold font-['Cinzel'] tracking-wider text-neutral-900">
          MYKA BRASIL
        </h1>
      </div>

      {/* Official Domain & Verification */}
      <div className="inline-flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-100/90 border border-neutral-200/80 px-3 py-1 rounded-full font-medium mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Canal Oficial de Atendimento & Links</span>
        <span className="text-neutral-300">•</span>
        <span className="font-semibold text-neutral-800">myka.com.br</span>
      </div>

      {/* Brand Bio */}
      <p className="text-sm text-neutral-600 max-w-md leading-relaxed px-4">
        Joias e peças personalizadas feitas sob medida para eternizar histórias.
        Acesse nossos canais oficiais e a loja oficial abaixo com total segurança.
      </p>

      {/* Trust Rating & Social Proof */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-700 bg-white border border-neutral-200/90 rounded-xl px-3.5 py-1.5 shadow-xs">
        <div className="flex text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="font-bold text-neutral-900">4.8 / 5.0</span>
        <span className="text-neutral-300">|</span>
        <span className="text-neutral-500 font-medium">+7 Milhões de Clientes</span>
      </div>
    </header>
  );
};
