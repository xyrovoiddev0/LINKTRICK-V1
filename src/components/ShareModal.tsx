import React, { useState } from 'react';
import { X, Copy, Check, Share2, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://myka.com.br';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MYKA Brasil | Links Oficiais',
          text: 'Acesse as redes oficiais e a loja Myka Brasil (myka.com.br):',
          url: shareUrl,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-100 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A880]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-1">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF6F0] border border-[#EADBCA] flex items-center justify-center text-[#8F734E] mb-3">
            <Share2 className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-neutral-900 font-['Cinzel']">
            Compartilhar Linktrick
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Divulgue a página oficial de links na bio ou envie para clientes.
          </p>
        </div>

        {/* QR Code Simulation Graphic */}
        <div className="mt-5 flex flex-col items-center p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
          <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-xs border border-neutral-200 flex flex-col items-center justify-center">
            {/* SVG stylized QR code */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-900">
              <rect width="100" height="100" fill="white" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="30" height="30" fill="currentColor" rx="2" />
              <rect x="16" y="16" width="18" height="18" fill="white" rx="1" />
              <rect x="20" y="20" width="10" height="10" fill="currentColor" />
              {/* Corner 2 */}
              <rect x="60" y="10" width="30" height="30" fill="currentColor" rx="2" />
              <rect x="66" y="16" width="18" height="18" fill="white" rx="1" />
              <rect x="70" y="20" width="10" height="10" fill="currentColor" />
              {/* Corner 3 */}
              <rect x="10" y="60" width="30" height="30" fill="currentColor" rx="2" />
              <rect x="16" y="66" width="18" height="18" fill="white" rx="1" />
              <rect x="20" y="70" width="10" height="10" fill="currentColor" />
              {/* Data dots */}
              <rect x="46" y="12" width="8" height="8" fill="currentColor" />
              <rect x="46" y="26" width="8" height="8" fill="currentColor" />
              <rect x="46" y="46" width="8" height="8" fill="#C5A880" />
              <rect x="12" y="46" width="8" height="8" fill="currentColor" />
              <rect x="26" y="46" width="8" height="8" fill="currentColor" />
              <rect x="60" y="46" width="8" height="8" fill="currentColor" />
              <rect x="74" y="46" width="8" height="8" fill="currentColor" />
              <rect x="82" y="60" width="8" height="8" fill="currentColor" />
              <rect x="60" y="60" width="8" height="8" fill="currentColor" />
              <rect x="46" y="68" width="8" height="8" fill="currentColor" />
              <rect x="60" y="78" width="8" height="8" fill="currentColor" />
              <rect x="76" y="78" width="14" height="12" fill="currentColor" />
            </svg>
          </div>
          <span className="text-[11px] text-neutral-400 mt-2 font-medium">
            Escaneie com a câmera do celular
          </span>
        </div>

        {/* Copy Link Input Group */}
        <div className="mt-4">
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-neutral-200 bg-neutral-50">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-neutral-600 px-2 flex-1 focus:outline-hidden select-all"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl border border-[#C5A880] text-[#8F734E] font-medium text-xs hover:bg-[#FAF6F0] transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartilhar via Celular / Apps</span>
          </button>
        </div>
      </div>
    </div>
  );
};
