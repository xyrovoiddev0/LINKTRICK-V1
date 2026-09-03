import { LinkItem, SiteConfig } from '../types';

export const INITIAL_LINKS: LinkItem[] = [
  {
    id: 'myka-platform',
    title: 'Plataforma Myka',
    subtitle: 'Ambiente completo de inteligência artificial para código e interfaces',
    url: 'https://myka.com.br',
    iconName: 'shopping-bag',
    badge: 'PLATAFORMA',
    isPrimary: true,
    clicks: 3410,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: 'Novidades, lançamentos e bastidores da tecnologia',
    url: 'https://instagram.com',
    iconName: 'instagram',
    clicks: 1840,
  },
  {
    id: 'tiktok',
    title: 'TikTok',
    subtitle: 'Tutoriais rápidos, demonstrações de código e aplicações práticas',
    url: 'https://tiktok.com',
    iconName: 'video',
    clicks: 1290,
  },
  {
    id: 'telegram',
    title: 'Comunidade Telegram',
    subtitle: 'Grupo exclusivo para criadores e desenvolvedores',
    url: 'https://t.me',
    iconName: 'send',
    badge: 'COMUNIDADE',
    clicks: 980,
  },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  tagline: '',
  heroPrefix: 'Tecnologia que',
  heroHighlight: 'transforma.',
  description: 'Uma plataforma de IA criada para gerar código, construir interfaces e transformar ideias em realidade com segurança e velocidade.',
  primaryButtonText: 'Acessar Myka',
  primaryButtonUrl: 'https://myka.com.br',
  accentColor: '#FF2B2B', // Burnt cyber red / orange-red from official MYKA identity
  particleGlow: true,
  adminPin: '1234',
  totalViews: 5820,
};
