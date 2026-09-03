import React from 'react';
import { Shield, Lock, Settings } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="w-full mt-8 pt-6 pb-12 border-t border-neutral-200 text-center flex flex-col items-center">
      {/* Payment and Security badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-neutral-400 text-xs">
        <div className="flex items-center gap-1 text-neutral-600 font-medium">
          <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Certificado SSL 256-bit</span>
        </div>
        <span className="text-neutral-300">•</span>
        <div className="flex items-center gap-1 text-neutral-600 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Compra 100% Segura</span>
        </div>
      </div>

      {/* Payment methods icons / tags */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-semibold border border-neutral-200">
          PIX
        </span>
        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-semibold border border-neutral-200">
          Cartão até 12x
        </span>
        <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-semibold border border-neutral-200">
          Boleto Bancário
        </span>
      </div>

      {/* Domain info and Copyright */}
      <p className="text-xs font-semibold text-neutral-700 tracking-wide font-['Cinzel']">
        MYKA BRASIL • JOIAS PERSONALIZADAS
      </p>
      <p className="text-[11px] text-neutral-400 mt-1">
        Acesse sempre pelo endereço oficial:{' '}
        <a
          href="https://www.myka.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8F734E] underline hover:text-neutral-900 font-medium"
        >
          www.myka.com.br
        </a>
      </p>

      <div className="mt-3 flex items-center justify-center gap-3">
        <p className="text-[10px] text-neutral-400">
          © 2026 MYKA Brasil. Todos os direitos reservados.
        </p>
        {onOpenAdmin && (
          <>
            <span className="text-neutral-300 text-xs">•</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-800 transition-colors py-0.5 px-1.5 rounded-md hover:bg-neutral-100"
              title="Acesso Administrativo"
            >
              <Settings className="w-3 h-3 text-neutral-400" />
              <span>Painel Admin</span>
            </button>
          </>
        )}
      </div>
    </footer>
  );
};
