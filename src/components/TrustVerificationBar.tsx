import React from 'react';
import { ShieldCheck, Lock, ExternalLink, CheckCircle2 } from 'lucide-react';

interface TrustVerificationBarProps {
  accentColor: string;
  onOpenSecurityModal: () => void;
}

export const TrustVerificationBar: React.FC<TrustVerificationBarProps> = ({
  accentColor,
  onOpenSecurityModal,
}) => {
  return (
    <div className="w-full px-4 pt-3 pb-1">
      <div className="w-full max-w-xl mx-auto rounded-full bg-[#0A0A12]/90 border border-neutral-800/90 backdrop-blur-md px-3.5 py-2 flex items-center justify-between shadow-lg shadow-black/40">
        {/* Left: Security status */}
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-1.5 text-xs truncate">
            <span className="font-['JetBrains_Mono',monospace] font-bold text-white tracking-wide text-[11px] truncate">
              link.myka.com.br
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <span className="hidden sm:inline text-[10px] font-['JetBrains_Mono',monospace] text-emerald-400 font-medium">
              Oficial Verificado
            </span>
          </div>
        </div>

        {/* Right: Click to verify authenticity */}
        <button
          onClick={onOpenSecurityModal}
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-['JetBrains_Mono',monospace] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full border transition-all duration-200 shrink-0 hover:scale-105 active:scale-95"
          style={{
            color: accentColor,
            borderColor: `${accentColor}50`,
            backgroundColor: `${accentColor}12`,
          }}
        >
          <Lock className="w-3 h-3" />
          <span>Verificar</span>
        </button>
      </div>
    </div>
  );
};
