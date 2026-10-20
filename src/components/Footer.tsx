import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, MapPin, Globe, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { siteConfig, getWhatsAppLink } from '@/config/site';

const pageLinks = [
  { to: '/', label: 'Ana Sayfa' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/projeler', label: 'Projeler' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/iletisim', label: 'İletişim' },
];

const serviceLinks = [
  { to: '/hizmetler#kurumsal-web', label: 'Kurumsal Web Siteleri' },
  { to: '/hizmetler#restoran-kafe', label: 'Restoran ve Kafe Siteleri' },
  { to: '/hizmetler#taksi-transfer', label: 'Taksi ve Transfer Siteleri' },
  { to: '/hizmetler#landing-page', label: 'Tanıtım Siteleri' },
  { to: '/hizmetler#bakim-guncelleme', label: 'Bakım ve Güncelleme' },
];

const legalLinks = [
  { to: '/gizlilik', label: 'Gizlilik Politikası' },
  { to: '/kvkk-aydinlatma', label: 'KVKK Aydınlatma Metni' },
];

export function Footer() {
  const waLink = getWhatsAppLink(
    `Merhaba ${siteConfig.name}, web tasarım hizmeti hakkında bilgi almak istiyorum.`
  );

  return (
    <footer className="bg-primary-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="space-y-4">
            <Logo variant="light" className="h-10 w-auto" />
            <p className="text-sm leading-relaxed text-neutral-400 max-w-xs">
              {siteConfig.serviceArea} bölgesindeki işletmeler için modern, hızlı ve mobil uyumlu web
              siteleri tasarlıyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Sayfalar
            </h3>
            <ul className="space-y-3">
              {pageLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Hizmetler
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              {waLink && (
                <li>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    WhatsApp: {siteConfig.whatsappNumber}
                  </a>
                </li>
              )}
              {siteConfig.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.address && (
                <li className="flex items-start gap-2 text-sm text-neutral-400">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {siteConfig.address}
                </li>
              )}
              {siteConfig.domain && (
                <li className="flex items-center gap-2 text-sm text-neutral-400">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  {siteConfig.domain}
                </li>
              )}
              {siteConfig.socialLinks.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              {!siteConfig.whatsappNumber &&
                !siteConfig.phone &&
                !siteConfig.email &&
                !siteConfig.address && (
                  <li className="text-sm text-neutral-500 italic">
                    İletişim bilgileri henüz yapılandırılmamıştır.
                  </li>
                )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-white"><Lock className="h-3.5 w-3.5" /> Yönetici</Link>
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
