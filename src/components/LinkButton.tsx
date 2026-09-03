import React from 'react';
import { 
  ShoppingBag, 
  Send, 
  ExternalLink, 
  Video, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LinkItem } from '../types';

interface LinkButtonProps {
  item: LinkItem;
  onLinkClick: (id: string) => void;
}

export const LinkButton: React.FC<LinkButtonProps> = ({ item, onLinkClick }) => {
  const renderIcon = () => {
    switch (item.iconName) {
      case 'shopping-bag':
        return <ShoppingBag className="w-5 h-5 text-[#C5A880]" />;
      case 'instagram':
        return (
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shadow-xs">
            <span className="font-bold text-xs tracking-tighter">IG</span>
          </div>
        );
      case 'video':
        return (
          <div className="w-6 h-6 rounded-lg bg-[#000000] flex items-center justify-center text-white shadow-xs">
            <Video className="w-3.5 h-3.5 text-[#25F4EE]" />
          </div>
        );
      case 'send':
        return (
          <div className="w-6 h-6 rounded-lg bg-[#229ED9] flex items-center justify-center text-white shadow-xs">
            <Send className="w-3.5 h-3.5 text-white ml-0.5" />
          </div>
        );
      default:
        return <ExternalLink className="w-5 h-5 text-neutral-500" />;
    }
  };

  const isPrimary = item.isPrimary;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onLinkClick(item.id)}
      className={`group relative w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
        isPrimary
          ? 'bg-gradient-to-r from-[#1A1A1A] via-[#242424] to-[#1A1A1A] text-white border-2 border-[#C5A880]/70 shadow-lg hover:shadow-xl hover:border-[#D8BE96] hover:-translate-y-0.5'
          : 'bg-white text-neutral-900 border border-neutral-200/90 shadow-xs hover:border-[#C5A880]/60 hover:shadow-md hover:-translate-y-0.5'
      }`}
    >
      {/* Visual Accent Glow for Primary */}
      {isPrimary && (
        <div className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#C5A880] to-[#E3CEB0] text-neutral-950 font-bold text-[10px] tracking-wider uppercase shadow-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Site Oficial</span>
        </div>
      )}

      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        <div
          className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
            isPrimary
              ? 'bg-neutral-800/90 border border-[#C5A880]/30'
              : 'bg-neutral-50 border border-neutral-100'
          }`}
        >
          {renderIcon()}
        </div>

        <div className="text-left truncate">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3
              className={`text-sm font-semibold tracking-wide truncate ${
                isPrimary ? 'text-white' : 'text-neutral-900'
              }`}
            >
              {item.title}
            </h3>
            {item.badge && !isPrimary && (
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200">
                {item.badge}
              </span>
            )}
          </div>
          <p
            className={`text-xs truncate mt-0.5 ${
              isPrimary ? 'text-neutral-300' : 'text-neutral-500'
            }`}
          >
            {item.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className={`p-2 rounded-xl transition-colors ${
            isPrimary
              ? 'bg-neutral-800 text-[#E5D7C2] group-hover:bg-[#C5A880] group-hover:text-neutral-950'
              : 'bg-neutral-50 text-neutral-400 group-hover:text-neutral-700 group-hover:bg-neutral-100'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};
