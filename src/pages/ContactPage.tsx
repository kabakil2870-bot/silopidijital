import { MessageCircle, Mail, Phone, MapPin, Globe, Info } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { FadeIn } from '@/components/FadeIn';
import { ContactForm } from '@/components/ContactForm';
import { siteConfig, getWhatsAppLink } from '@/config/site';

export function ContactPage() {
  useSEO({
    title: 'İletişim ve Teklif | Silopi Dijital',
    description:
      'Silopi Dijital ile iletişime geçin. Web tasarım hizmetleri için teklif formunu doldurun veya WhatsApp üzerinden ulaşın.',
    canonicalPath: '/iletisim',
  });

  const waLink = getWhatsAppLink(
    `Merhaba ${siteConfig.name}, web tasarım hizmeti hakkında bilgi almak istiyorum.`
  );

  const hasContactInfo =
    siteConfig.whatsappNumber ||
    siteConfig.phone ||
    siteConfig.email ||
    siteConfig.address ||
    siteConfig.socialLinks.length > 0;

  return (
    <>
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold text-primary-500 bg-primary-50 px-4 py-1.5 rounded-full mb-5">
            İletişim
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
            Teklif almak için iletişime geçin
          </h1>
          <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
            Silopi, Şırnak'tan hizmet veriyorum. Projenizi anlatın; size uygun çözümü birlikte planlayalım. Aşağıdaki formu doldurabilir veya doğrudan WhatsApp üzerinden ulaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
                  <h2 className="font-heading text-lg font-bold text-neutral-900 mb-4">
                    İletişim Kanalları
                  </h2>

                  {!hasContactInfo && (
                    <div className="flex items-start gap-3 bg-warning-500/10 border border-warning-500/20 rounded-xl p-4 mb-4">
                      <Info className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        İletişim bilgileri henüz yapılandırılmamıştır. Lütfen{' '}
                        <code className="text-xs bg-neutral-200 px-1.5 py-0.5 rounded">
                          src/config/site.ts
                        </code>{' '}
                        dosyasını güncelleyin.
                      </p>
                    </div>
                  )}

                  <ul className="space-y-4">
                    {waLink && (
                      <li>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 group"
                        >
                          <span className="w-10 h-10 rounded-xl bg-success-500/10 flex items-center justify-center group-hover:bg-success-500/20 transition-colors">
                            <MessageCircle className="w-5 h-5 text-success-600" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">WhatsApp</p>
                            <p className="text-sm text-neutral-500">{siteConfig.whatsappNumber}</p>
                          </div>
                        </a>
                      </li>
                    )}
                    {siteConfig.phone && (
                      <li>
                        <a
                          href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                          className="flex items-center gap-3 group"
                        >
                          <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                            <Phone className="w-5 h-5 text-primary-500" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">Telefon</p>
                            <p className="text-sm text-neutral-500">{siteConfig.phone}</p>
                          </div>
                        </a>
                      </li>
                    )}
                    {siteConfig.email && (
                      <li>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="flex items-center gap-3 group"
                        >
                          <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                            <Mail className="w-5 h-5 text-primary-500" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">E-posta</p>
                            <p className="text-sm text-neutral-500">{siteConfig.email}</p>
                          </div>
                        </a>
                      </li>
                    )}
                    {siteConfig.address && (
                      <li className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary-500" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">Adres</p>
                          <p className="text-sm text-neutral-500">{siteConfig.address}</p>
                        </div>
                      </li>
                    )}
                    {siteConfig.domain && (
                      <li className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-primary-500" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">Web Sitesi</p>
                          <p className="text-sm text-neutral-500">{siteConfig.domain}</p>
                        </div>
                      </li>
                    )}
                    {siteConfig.socialLinks.map((social) => (
                      <li key={social.url}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 group"
                        >
                          <span className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                            <Globe className="w-5 h-5 text-primary-500" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">{social.label}</p>
                            <p className="text-sm text-neutral-500">{social.url}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="bg-primary-900 rounded-2xl p-6">
                  <h3 className="font-heading text-base font-bold text-white mb-2">
                    Hizmet Bölgesi
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {siteConfig.serviceArea} bölgesindeki işletmelere öncelikli hizmet veriyoruz.
                    Türkiye genelinde çalışmak gelecek planımız arasındadır.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={150}>
                <ContactForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
