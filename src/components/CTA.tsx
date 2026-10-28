import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '@/config/site';

interface CTAProps {
  title?: string;
  description?: string;
}

export function CTA({
  title = 'İşletmeniz için nasıl bir web sitesi gerektiğini birlikte belirleyelim.',
  description = 'Projenizi konuşalım, ihtiyacınıza uygun çözümü birlikte planlayalım.',
}: CTAProps) {
  const waLink = getWhatsAppLink(
    `Merhaba ${siteConfig.name}, web tasarım hizmeti hakkında bilgi almak istiyorum.`
  );

  return (
    <section className="py-16 lg:py-20 bg-primary-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-lg text-neutral-300 leading-relaxed">{description}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-success-500 text-white px-7 py-3.5 text-base hover:bg-success-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp'tan İletişime Geç
            </a>
          ) : (
            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-success-500 text-white px-7 py-3.5 text-base hover:bg-success-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              İletişim Sayfasına Git
            </Link>
          )}
          <Link
            to="/iletisim"
            className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-primary-500 text-white px-7 py-3.5 text-base hover:bg-primary-600 transition-colors"
          >
            Teklif Al
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
