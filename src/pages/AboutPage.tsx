import { Target, Eye, Heart, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { FadeIn } from '@/components/FadeIn';
import { CTA } from '@/components/CTA';
import { siteConfig } from '@/config/site';

const values = [
  {
    icon: Target,
    title: 'Şeffaf İletişim',
    description:
      'Süreç boyunca her aşamayı sizinle paylaşırız. Net bilgi, dürüst cevaplar ve açık iletişim esastır.',
  },
  {
    icon: Eye,
    title: 'İhtiyaca Uygun Tasarım',
    description:
      'Tasarım, içerik ve işlevleri işletmenizin karakterine ve hedeflerine göre özelleştiriyorum.',
  },
  {
    icon: Heart,
    title: 'Mobil Öncelikli Yaklaşım',
    description:
      'Ziyaretçilerinizin büyük kısmı telefondan gelir. Mobil kullanım, erişilebilirlik ve farklı ekran boyutları tasarım sürecinde önceliklidir.',
  },
];

export function AboutPage() {
  useSEO({
    title: 'Hakkımızda | Silopi Dijital',
    description:
      "Silopi Dijital; Silopi ve Cizre'den başlayarak yerel işletmelerin internet üzerinde daha profesyonel görünmesine yardımcı olan bir web tasarım ajansıdır.",
    canonicalPath: '/hakkimizda',
  });

  return (
    <>
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold text-primary-500 bg-primary-50 px-4 py-1.5 rounded-full mb-5">
            Hakkımızda
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 leading-tight">
            Silopi’den başlayan dijital yolculuk
          </h1>
          <p className="mt-6 text-lg text-neutral-500 leading-relaxed">
            {siteConfig.name}, {siteConfig.serviceArea} bölgesindeki küçük ve orta ölçekli
            işletmelerin internet üzerinde daha profesyonel görünmesine yardımcı olmak amacıyla
            yola çıktı.
          </p>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FadeIn>
            <div className="prose prose-neutral max-w-none">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                Ben Kimim?
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Ben Silopi, Şırnak'ta yaşayan bağımsız bir web tasarım geliştiricisiyim. Daha önce
                Silopi Taksi ve Silopi VIP Araç için web sitesi projeleri hazırladım; restoran
                sektöründe de çalışmalar yaptım. Silopi Dijital'i, yerel işletmelerin internette
                daha güvenilir ve profesyonel görünmesine yardımcı olmak için geliştiriyorum.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div>
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                Yaklaşımımız
              </h2>
              <p className="text-neutral-600 leading-relaxed text-lg mb-8">
                Her projede şeffaf iletişim, işe yarayan özellikler ve işletmenin gerçekten ihtiyacı olan çözümlere odaklanıyorum. Hedefim Silopi ve Cizre'den başlayıp zaman içinde Türkiye'nin farklı şehirlerindeki işletmelerle çalışmak.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="font-heading text-base font-bold text-neutral-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-primary-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                    Silopi, Şırnak'tan Türkiye'ye
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    İlk adımım Silopi ve Cizre'deki işletmelerle çalışmak. Her projede daha iyi işler üretip portföyümü büyütmeyi ve zamanla Türkiye genelinde hizmet sunmayı hedefliyorum. Çalışma biçimimi ve sunduğum hizmetleri, iş geliştikçe açıkça güncelleyeceğim.
                  </p>
                  <a href="https://www.google.com/maps/search/?api=1&query=Silopi%2C%20%C5%9E%C4%B1rnak%2C%20T%C3%BCrkiye" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:border-blue-400 hover:bg-blue-50">
                    <MapPin className="h-4 w-4" /> Silopi, Şırnak'ı haritada aç <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="text-center py-8">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-4">
                Birlikte çalışalım
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6 max-w-xl mx-auto">
                İşletmenizi dinleyelim, ihtiyacınıza uygun web sitesini birlikte planlayalım.
              </p>
              <Link
                to="/iletisim"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-primary-500 text-white px-7 py-4 text-base hover:bg-primary-600 transition-colors"
              >
                İletişime Geçin
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTA />
    </>
  );
}
