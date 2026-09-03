import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, ExternalLink, X } from 'lucide-react';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A880] via-[#EADBCA] to-[#A88B63]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-1">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-neutral-900 font-['Cinzel'] tracking-wide">
            Verificação Oficial Myka
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Canal autêntico e verificado para acesso às redes e loja oficial.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-left text-xs">
              <span className="font-semibold text-neutral-900 block">Domínio Principal Autêntico</span>
              <span className="text-neutral-500">
                O site oficial da marca é estritamente <strong className="text-neutral-800">myka.com.br</strong>.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
            <div className="text-left text-xs">
              <span className="font-semibold text-neutral-900 block">Conexão Criptografada SSL</span>
              <span className="text-neutral-500">
                Seus dados de navegação e pagamentos são protegidos pelos mais rigorosos protocolos de segurança.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-left text-xs">
              <span className="font-semibold text-neutral-900 block">Redes Sociais Oficiais</span>
              <span className="text-neutral-500">
                Todos os perfis vinculados nesta página são gerenciados pela equipe oficial de Myka Brasil.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col gap-2">
          <a
            href="https://www.myka.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-neutral-900 text-white font-medium text-xs tracking-wider uppercase text-center hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Ir para myka.com.br</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-neutral-600 text-xs font-medium hover:bg-neutral-100 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
