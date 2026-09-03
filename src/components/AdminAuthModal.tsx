import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, ArrowRight, X } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin pin/password is 1234 or admin
    if (password === '1234' || password.toLowerCase() === 'admin') {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xs w-full p-6 shadow-2xl border border-neutral-100 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1A1A1A]" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mt-1">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 mb-3">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="text-base font-bold text-neutral-900 font-['Cinzel'] tracking-wide">
            Acesso Restrito Admin
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Digite a senha de administrador para editar os links e configurações do Linktrick.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <div className="relative">
              <input
                type="password"
                placeholder="Senha (padrão: 1234)"
                value={password}
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full text-center text-sm tracking-widest px-3 py-2.5 rounded-xl border bg-neutral-50 focus:outline-hidden focus:bg-white transition-all ${
                  error
                    ? 'border-red-500 text-red-600 focus:border-red-600'
                    : 'border-neutral-300 focus:border-neutral-900'
                }`}
              />
              <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
            </div>
            {error && (
              <p className="text-[11px] text-red-600 text-center mt-1.5 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Senha incorreta! Dica: use <strong>1234</strong></span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 text-white font-semibold text-xs tracking-wider uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Entrar no Painel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
          <span className="text-[10px] text-neutral-400">
            Apenas você (administrador) tem acesso para editar os links.
          </span>
        </div>
      </div>
    </div>
  );
};
