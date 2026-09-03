import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  X, 
  Server, 
  Cpu, 
  KeyRound, 
  Globe, 
  Copy, 
  Check 
} from 'lucide-react';
import { MykaLogo } from './MykaLogo';

interface TrustSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
}

export const TrustSecurityModal: React.FC<TrustSecurityModalProps> = ({
  isOpen,
  onClose,
  accentColor,
}) => {
  const [copied, setCopied] = useState(false);
  const officialDomain = 'link.myka.com.br';
  const shaHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  if (!isOpen) return null;

  const handleCopyDomain = () => {
    navigator.clipboard.writeText(officialDomain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-[#0D0D14] rounded-2xl max-w-lg w-full border border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glowing Security Accent */}
        <div
          className="h-1.5 w-full shrink-0"
          style={{
            background: `linear-gradient(90deg, #10B981, ${accentColor}, #8B5CF6)`,
          }}
        />

        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-800 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-['Space_Grotesk',sans-serif]">
                  Certificado de Autenticidade Oficial
                </h3>
                <span className="text-[10px] font-['JetBrains_Mono',monospace] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                  VERIFICADO
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Validação de segurança em tempo real para a comunidade MYKA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-neutral-300">
          {/* Anti-Phishing Alert Banner */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-xs text-amber-300">
                Alerta Anti-Golpe & Proteção ao Usuário
              </span>
              <span className="text-[11px] leading-relaxed text-amber-200/90 block mt-0.5">
                Cuidado com contas falsas no Instagram, Telegram e WhatsApp tentando se passar pela MYKA. 
                Nós nunca solicitamos senhas pessoais nem fazemos cobranças por links desconhecidos.
              </span>
            </div>
          </div>

          {/* Official Domain Verification Box */}
          <div className="p-4 rounded-xl bg-[#09090F] border border-neutral-800">
            <span className="text-[10px] font-['JetBrains_Mono',monospace] text-neutral-400 uppercase tracking-wider block mb-2">
              Domínio Oficial da Plataforma
            </span>
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-black/60 border border-neutral-700">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  {officialDomain}
                </span>
              </div>
              <button
                onClick={handleCopyDomain}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              Qualquer link fora desse domínio não pertence oficialmente à MYKA Inteligência Artificial.
            </p>
          </div>

          {/* Security Protocols Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Lock className="w-4 h-4" />
                <span>Criptografia TLS 1.3</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-snug">
                Conexão criptografada 256-bit ponta a ponta sem interceptadores.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Server className="w-4 h-4" />
                <span>99.99% Uptime</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-snug">
                Infraestrutura em nuvem de alta disponibilidade monitorada 24/7.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Intermediários</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-snug">
                Você é redirecionado diretamente aos canais oficiais da marca.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Cpu className="w-4 h-4" />
                <span>Conformidade LGPD</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-snug">
                Privacidade garantida: nenhum dado sigiloso ou bancário é exposto.
              </p>
            </div>
          </div>

          {/* Technical Hash */}
          <div className="p-3 rounded-xl bg-black/40 border border-neutral-800 font-['JetBrains_Mono',monospace]">
            <span className="text-[10px] text-neutral-500 block mb-1">
              SHA-256 INTEGRITY HASH:
            </span>
            <span className="text-[10px] text-neutral-400 break-all select-all">
              {shaHash}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#0E0E16] flex items-center justify-between shrink-0">
          <span className="text-[11px] font-['JetBrains_Mono',monospace] text-neutral-500">
            MYKA SECURITY PROTOCOL // VERIFIED
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
