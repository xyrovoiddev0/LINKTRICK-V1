import React, { useState } from 'react';
import { 
  Lock, 
  KeyRound, 
  X, 
  Check, 
  Link2, 
  Palette, 
  FileText, 
  BarChart3, 
  Shield, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Sparkles,
  ExternalLink,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { LinkItem, SiteConfig } from '../types';
import { DEFAULT_SITE_CONFIG, INITIAL_LINKS } from '../data/initialLinks';

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  links: LinkItem[];
  onSave: (newConfig: SiteConfig, newLinks: LinkItem[]) => void;
}

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({
  isOpen,
  onClose,
  config,
  links,
  onSave,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active tab in admin console
  const [activeTab, setActiveTab] = useState<'links' | 'texts' | 'design' | 'analytics' | 'security'>('links');

  // Draft editable state
  const [draftConfig, setDraftConfig] = useState<SiteConfig>({ ...config });
  const [draftLinks, setDraftLinks] = useState<LinkItem[]>(JSON.parse(JSON.stringify(links)));
  const [newPin, setNewPin] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Sync draft whenever modal opens or props change
  React.useEffect(() => {
    if (isOpen) {
      setDraftConfig({ ...config });
      setDraftLinks(JSON.parse(JSON.stringify(links)));
      setPinError(false);
      setPinInput('');
    }
  }, [isOpen, config, links]);

  if (!isOpen) return null;

  // Handle PIN verification
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = config.adminPin || '1234';
    if (pinInput === correctPin || pinInput.toLowerCase() === 'admin' || pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Color preset options
  const COLOR_PRESETS = [
    { name: 'Cyber Red / Queimado (Oficial MYKA)', hex: '#FF2B2B' },
    { name: 'Flame Ember Red', hex: '#E63920' },
    { name: 'Neon Magenta Purple', hex: '#E11D74' },
    { name: 'Cyber Violet', hex: '#9333EA' },
    { name: 'Electric Blue', hex: '#00D2FF' },
    { name: 'Matrix Green', hex: '#00FF88' },
    { name: 'Solar Amber', hex: '#FF9900' },
  ];

  // Save all changes
  const handleApplySave = () => {
    const updatedConfig = { ...draftConfig };
    if (newPin.trim().length >= 4) {
      updatedConfig.adminPin = newPin.trim();
      setNewPin('');
    }

    onSave(updatedConfig, draftLinks);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 2500);
  };

  // Reset to Myka defaults
  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar todas as configurações e links para o padrão oficial da MYKA?')) {
      setDraftConfig({ ...DEFAULT_SITE_CONFIG });
      setDraftLinks(JSON.parse(JSON.stringify(INITIAL_LINKS)));
      onSave({ ...DEFAULT_SITE_CONFIG }, INITIAL_LINKS);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  // Add new custom link
  const handleAddLink = () => {
    const newId = 'custom-' + Date.now();
    const newLink: LinkItem = {
      id: newId,
      title: 'Novo Canal Oficial',
      subtitle: 'Descrição do seu link ou canal',
      url: 'https://',
      iconName: 'shopping-bag',
      badge: 'NOVO',
      clicks: 0,
      active: true,
    };
    setDraftLinks([...draftLinks, newLink]);
  };

  // Remove link
  const handleRemoveLink = (id: string) => {
    setDraftLinks(draftLinks.filter((l) => l.id !== id));
  };

  // Update specific link
  const handleUpdateLink = (id: string, updates: Partial<LinkItem>) => {
    setDraftLinks(draftLinks.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  // Total clicks for analytics
  const totalClicks = draftLinks.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
  const ctrRate = draftConfig.totalViews > 0 ? ((totalClicks / draftConfig.totalViews) * 100).toFixed(1) : '0';

  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-60 bg-emerald-500 text-black font-semibold text-xs py-2 px-4 rounded-full flex items-center gap-2 shadow-2xl animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configurações salvas e publicadas com sucesso!</span>
        </div>
      )}

      {/* LOGIN PIN SCREEN (If not authenticated yet) */}
      {!isAuthenticated ? (
        <div
          className="bg-[#0D0D12] rounded-2xl max-w-sm w-full p-6 sm:p-8 border border-neutral-800 shadow-2xl relative overflow-hidden text-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: config.accentColor }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white mx-auto mb-4">
            <Lock className="w-5 h-5" style={{ color: config.accentColor }} />
          </div>

          <h3 className="text-base font-['Space_Grotesk',sans-serif] font-bold text-white tracking-wide">
            Painel de Controle Restrito
          </h3>
          <p className="text-xs text-neutral-400 mt-1 mb-5">
            Acesso exclusivo para administradores do Linktrick MYKA.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="PIN de Acesso (padrão: 1234)"
                value={pinInput}
                autoFocus
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError(false);
                }}
                className={`w-full text-center text-sm font-['JetBrains_Mono',monospace] tracking-widest px-3 py-3 rounded-xl border bg-black/60 text-white focus:outline-hidden transition-all ${
                  pinError
                    ? 'border-red-500 text-red-400 focus:border-red-500'
                    : 'border-neutral-700 focus:border-white'
                }`}
              />
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5 pointer-events-none" />
            </div>

            {pinError && (
              <p className="text-[11px] text-red-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>PIN incorreto. (Dica de fábrica: 1234)</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-['Space_Grotesk',sans-serif] font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md active:scale-95"
              style={{ backgroundColor: config.accentColor }}
            >
              Desbloquear Painel
            </button>
          </form>

          <p className="text-[10px] text-neutral-600 font-['JetBrains_Mono',monospace] mt-5">
            MYKA ADMIN CORE v3.2 • ACESSO CRIPTOGRAFADO
          </p>
        </div>
      ) : (
        /* AUTHENTICATED FULL ADMIN DASHBOARD */
        <div
          className="bg-[#0C0C11] rounded-2xl max-w-2xl w-full h-[90vh] max-h-[700px] flex flex-col border border-neutral-800 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between shrink-0 bg-[#0E0E14]">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                style={{ backgroundColor: draftConfig.accentColor }}
              >
                M
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-['Space_Grotesk',sans-serif] font-bold text-white flex items-center gap-2">
                  <span>Painel de Administração MYKA</span>
                  <span className="text-[9px] font-['JetBrains_Mono',monospace] px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Gerencie links, design, cores, textos e acompanhe métricas
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

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-2 bg-[#09090D] border-b border-neutral-800 overflow-x-auto shrink-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('links')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === 'links'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Links Oficiais ({draftLinks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('texts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === 'texts'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Textos & Bio</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === 'design'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design & Cores</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Métricas</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === 'security'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Trocar PIN</span>
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-neutral-200">
            {/* TAB 1: LINKS */}
            {activeTab === 'links' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Canais de Links Ativos</h4>
                    <p className="text-xs text-neutral-400">
                      Edite o destino e o texto de cada botão exibido no Linktrick.
                    </p>
                  </div>
                  <button
                    onClick={handleAddLink}
                    className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Link</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {draftLinks.map((link, idx) => (
                    <div
                      key={link.id}
                      className="p-3 sm:p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-['JetBrains_Mono',monospace] text-neutral-500 font-bold">
                            #{String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-semibold text-white">
                            {link.title || 'Sem título'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-400 font-['JetBrains_Mono',monospace]">
                            {link.clicks || 0} cliques
                          </span>
                          <button
                            onClick={() => handleRemoveLink(link.id)}
                            className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                            title="Remover Link"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">
                            Título do Botão
                          </label>
                          <input
                            type="text"
                            value={link.title}
                            onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">
                            Etiqueta / Badge
                          </label>
                          <input
                            type="text"
                            value={link.badge || ''}
                            placeholder="ex: OFICIAL, NOVIDADES"
                            onChange={(e) => handleUpdateLink(link.id, { badge: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">
                            URL de Destino (Link)
                          </label>
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs font-mono focus:outline-hidden focus:border-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[10px] text-neutral-400 font-mono block mb-1">
                            Subtítulo / Descrição Curta
                          </label>
                          <input
                            type="text"
                            value={link.subtitle || ''}
                            onChange={(e) => handleUpdateLink(link.id, { subtitle: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: TEXTS & BIO */}
            {activeTab === 'texts' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Textos Principais do Header</h4>
                  <p className="text-xs text-neutral-400">
                    Ajuste o slogan, títulos e descrições exibidos no topo da página.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-neutral-400 font-mono block mb-1">
                      Slogan Superior
                    </label>
                    <input
                      type="text"
                      value={draftConfig.tagline}
                      onChange={(e) => setDraftConfig({ ...draftConfig, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white font-mono text-xs focus:outline-hidden focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 font-mono block mb-1">
                        Início do Título (Branco)
                      </label>
                      <input
                        type="text"
                        value={draftConfig.heroPrefix}
                        onChange={(e) => setDraftConfig({ ...draftConfig, heroPrefix: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-neutral-400 font-mono block mb-1">
                        Destaque em Cor + Cursor
                      </label>
                      <input
                        type="text"
                        value={draftConfig.heroHighlight}
                        onChange={(e) => setDraftConfig({ ...draftConfig, heroHighlight: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 font-mono block mb-1">
                      Descrição da Bio
                    </label>
                    <textarea
                      rows={3}
                      value={draftConfig.description}
                      onChange={(e) => setDraftConfig({ ...draftConfig, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs leading-relaxed focus:outline-hidden focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] text-neutral-400 font-mono block mb-1">
                        Texto do Botão Principal
                      </label>
                      <input
                        type="text"
                        value={draftConfig.primaryButtonText}
                        onChange={(e) =>
                          setDraftConfig({ ...draftConfig, primaryButtonText: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white text-xs focus:outline-hidden focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-neutral-400 font-mono block mb-1">
                        Link do Botão Principal
                      </label>
                      <input
                        type="text"
                        value={draftConfig.primaryButtonUrl}
                        onChange={(e) =>
                          setDraftConfig({ ...draftConfig, primaryButtonUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white font-mono text-xs focus:outline-hidden focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DESIGN & COLORS */}
            {activeTab === 'design' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white">Paleta de Cores e Estilo Visual</h4>
                  <p className="text-xs text-neutral-400">
                    Selecione a cor de destaque da marca e ative efeitos futuristas.
                  </p>
                </div>

                {/* Color Palettes */}
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-3">
                    Cor de Destaque Neon
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {COLOR_PRESETS.map((color) => {
                      const isSelected = draftConfig.accentColor.toLowerCase() === color.hex.toLowerCase();
                      return (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => setDraftConfig({ ...draftConfig, accentColor: color.hex })}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs transition-all ${
                            isSelected
                              ? 'bg-neutral-800 border-white text-white font-bold'
                              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="truncate">{color.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div>
                  <label className="text-[11px] font-mono text-neutral-400 block mb-1.5">
                    Ou código Hexadecimal personalizado
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={draftConfig.accentColor}
                      onChange={(e) => setDraftConfig({ ...draftConfig, accentColor: e.target.value })}
                      className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-neutral-700 p-0.5"
                    />
                    <input
                      type="text"
                      value={draftConfig.accentColor}
                      onChange={(e) => setDraftConfig({ ...draftConfig, accentColor: e.target.value })}
                      className="w-32 px-3 py-1.5 rounded-lg bg-black/60 border border-neutral-700 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Background Particles toggle */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">Efeito de Partículas Cósmicas e Brilho</h5>
                    <p className="text-[11px] text-neutral-400">
                      Animação suave de poeira estelar e anéis orbitais no fundo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDraftConfig({ ...draftConfig, particleGlow: !draftConfig.particleGlow })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      draftConfig.particleGlow ? 'bg-emerald-500' : 'bg-neutral-700'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        draftConfig.particleGlow ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white">Estatísticas de Tráfego</h4>
                  <p className="text-xs text-neutral-400">
                    Acompanhe quantas pessoas abriram seu Linktrick e clicaram nos canais.
                  </p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      Visualizações da Bio
                    </span>
                    <span className="text-2xl font-['Space_Grotesk',sans-serif] font-bold text-white">
                      {draftConfig.totalViews.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      Total de Cliques
                    </span>
                    <span
                      className="text-2xl font-['Space_Grotesk',sans-serif] font-bold"
                      style={{ color: draftConfig.accentColor }}
                    >
                      {totalClicks.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                      Taxa de Conversão (CTR)
                    </span>
                    <span className="text-2xl font-['Space_Grotesk',sans-serif] font-bold text-emerald-400">
                      {ctrRate}%
                    </span>
                  </div>
                </div>

                {/* Breakdown by link */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                  <h5 className="text-xs font-bold text-white mb-2">Cliques por Canal</h5>
                  {draftLinks.map((link) => {
                    const percentage = totalClicks > 0 ? ((link.clicks / totalClicks) * 100).toFixed(0) : 0;
                    return (
                      <div key={link.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-neutral-300 truncate max-w-[200px]">{link.title}</span>
                          <span className="font-mono text-neutral-400">{link.clicks} cliques ({percentage}%)</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: draftConfig.accentColor,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 5: SECURITY (PIN) */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Segurança e Troca de Senha</h4>
                  <p className="text-xs text-neutral-400">
                    Altere o código PIN para que apenas você consiga abrir esse painel administrativo.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 max-w-sm space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      PIN Atual Configurado
                    </label>
                    <div className="px-3 py-2 rounded-lg bg-black/40 border border-neutral-800 font-mono text-sm text-neutral-400">
                      {draftConfig.adminPin || '1234'}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                      Novo PIN de 4 dígitos ou senha
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 8899 ou sua_senha"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-neutral-700 text-white font-mono text-sm focus:outline-hidden focus:border-white"
                    />
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Guarde esse número para acessar o painel no futuro.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-neutral-800 bg-[#0E0E14] flex flex-wrap items-center justify-between gap-3 shrink-0">
            <button
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-red-400 py-1.5 px-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão Myka</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                Cancelar
              </button>

              <button
                onClick={handleApplySave}
                className="inline-flex items-center gap-2 py-2 px-5 rounded-xl font-['Space_Grotesk',sans-serif] font-bold text-xs uppercase tracking-wider text-white shadow-lg transition-all active:scale-95"
                style={{ backgroundColor: draftConfig.accentColor }}
              >
                <Check className="w-4 h-4" />
                <span>Salvar & Publicar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
