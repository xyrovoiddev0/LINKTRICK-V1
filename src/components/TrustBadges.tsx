import React from 'react';
import { ShieldCheck, Award, RefreshCw, Lock } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const guarantees = [
    {
      icon: Award,
      title: 'Garantia de 1 Ano',
      subtitle: 'Qualidade certificada MYKA',
    },
    {
      icon: ShieldCheck,
      title: '100% Autêntico',
      subtitle: 'Ouro, Prata & Pedras Nobres',
    },
    {
      icon: RefreshCw,
      title: 'Troca em 30 Dias',
      subtitle: 'Satisfação assegurada',
    },
    {
      icon: Lock,
      title: 'Ambiente Seguro',
      subtitle: 'Criptografia de ponta a ponta',
    },
  ];

  return (
    <section className="w-full mt-6 pt-5 border-t border-neutral-200/80">
      <div className="text-center mb-3">
        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-400">
          Compromisso de Autenticidade MYKA
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {guarantees.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#EADBCA] flex items-center justify-center flex-shrink-0 text-[#8F734E]">
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-left min-w-0">
                <h4 className="text-xs font-semibold text-neutral-800 truncate">
                  {item.title}
                </h4>
                <p className="text-[10px] text-neutral-500 leading-tight truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
