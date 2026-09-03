export type LinkType = 'link' | 'whatsapp' | 'pix' | 'video' | 'header';
export type HighlightStyle = 'none' | 'pulse' | 'glow' | 'shake' | 'bounce';
export type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'telegram'
  | 'whatsapp'
  | 'youtube'
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'email'
  | 'website'
  | 'spotify'
  | 'twitch';
export type ButtonStyle = 'solid' | 'glass' | 'outline' | 'gradient';
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ProfileData {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  verified: boolean;
  location?: string;
}

export interface SocialLink {
  id?: string;
  platform: SocialPlatform;
  url: string;
  active: boolean;
}

export interface ThemeConfig {
  id: string;
  name: string;
  category?: string;
  background?: string;
  bgClass?: string;
  cardBg?: string;
  cardText?: string;
  cardBorder?: string;
  cardHover?: string;
  badgeBg?: string;
  badgeText?: string;
  textPrimary?: string;
  textSecondary?: string;
  buttonRadius?: string;
  buttonStyle?: string;
  buttonBg?: string;
  buttonText?: string;
  buttonBorder?: string;
  cardStyle?: ButtonStyle;
  borderRadius?: ButtonRadius;
  fontFamily?: string;
  accentColor?: string;
  textColor?: string;
  subtextColor?: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  ctr: number;
  topLinks: { id: string; title: string; clicks: number }[];
  dailyViews?: { date: string; views: number }[];
}

export interface LinkItem {
  id: string;
  type?: LinkType;
  title: string;
  url: string;
  subtitle?: string;
  icon?: string;
  iconName?: 'shopping-bag' | 'instagram' | 'video' | 'send';
  badge?: string;
  isPrimary?: boolean;
  active?: boolean;
  clicks: number;
  highlight?: HighlightStyle;
  pixKey?: string;
  pixName?: string;
  pixType?: string;
  phone?: string;
  whatsappMessage?: string;
}

export interface SecurityBadge {
  icon: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  tagline: string;
  heroPrefix: string;
  heroHighlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  accentColor: string;
  particleGlow: boolean;
  adminPin: string;
  totalViews: number;
}
