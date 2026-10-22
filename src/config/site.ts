export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  slogan: string;
  domain: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  socialLinks: SocialLink[];
  serviceArea: string;
}

export const siteConfig: SiteConfig = {
  name: 'Silopi Dijital',
  slogan: 'İşletmenizi dijital dünyaya taşıyın.',
  domain: 'silopidijital.vercel.app',
  email: '',
  phone: '+90 543 403 35 73',
  whatsappNumber: '+90 543 403 35 73',
  address: 'Silopi, Şırnak, Türkiye',
  socialLinks: [],
  serviceArea: 'Silopi, Şırnak ve Cizre',
};

export function getWhatsAppLink(message: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  const cleaned = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppDisplayNumber(): string {
  return siteConfig.whatsappNumber || '';
}

/**
 * Returns the configured site origin (e.g. "https://silopidijital.vercel.app")
 * without a trailing slash, or an empty string when the domain is not set.
 */
export function getSiteOrigin(): string {
  if (!siteConfig.domain) return '';
  const d = siteConfig.domain.replace(/^\/+|\/+$/g, '');
  return /^https?:\/\//i.test(d) ? d : `https://${d}`;
}

/**
 * Builds an absolute HTTPS URL from a path. Returns null when the domain
 * is not configured, so callers can omit canonical/OG tags rather than
 * emit relative or placeholder URLs.
 */
export function getAbsoluteUrl(path: string): string | null {
  const origin = getSiteOrigin();
  if (!origin) return null;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${cleanPath}`;
}
