import React, { useState } from 'react';
import { X, Save, RotateCcw, Check, Link2 } from 'lucide-react';
import { LinkItem } from '../types';

interface EditLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
  onSave: (updatedLinks: LinkItem[]) => void;
  onReset: () => void;
}

export const EditLinksModal: React.FC<EditLinksModalProps> = ({
  isOpen,
  onClose,
  links,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<LinkItem[]>(links);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Sync state when modal opens or links change
  React.useEffect(() => {
    setFormData(links);
  }, [links, isOpen]);

  if (!isOpen) return null;

  const handleChange = (id: string, field: 'title' | 'subtitle' | 'url', value: string) => {
    setFormData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    onSave(formData);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleRestore = () => {
    if (window.confirm('Deseja restaurar todos os links oficiais da Myka Brasil?')) {
      onReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-100 max-h-[90vh] flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#8F734E]">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-['Cinzel'] flex items-center gap-1.5">
                <span>Painel Admin • Gerenciador</span>
              </h3>
              <p className="text-[11px] text-neutral-500">
                Personalize os links, títulos e subtítulos exibidos na bio
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {formData.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                  {item.title}
                </span>
                {item.isPrimary && (
                  <span className="text-[10px] bg-[#C5A880]/20 text-[#8F734E] font-semibold px-2 py-0.5 rounded-md">
                    Destaque
                  </span>
                )}
              </div>

              <div>
                <label className="text-[10px] font-medium text-neutral-500 block mb-1">
                  Título do Botão
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-medium text-neutral-500 block mb-1">
                  Subtítulo / Descrição
                </label>
                <input
                  type="text"
                  value={item.subtitle}
                  onChange={(e) => handleChange(item.id, 'subtitle', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-medium text-neutral-500 block mb-1">
                  Link / URL de Destino
                </label>
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => handleChange(item.id, 'url', e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg border border-neutral-300 bg-white focus:outline-hidden focus:border-neutral-900 font-mono text-[11px]"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRestore}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {savedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Salvo!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Alterações</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
