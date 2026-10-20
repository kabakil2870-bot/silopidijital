import { useSEO } from '@/hooks/useSEO';
import { FadeIn } from '@/components/FadeIn';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceDetailCard } from '@/components/ServiceCard';
import { CTA } from '@/components/CTA';
import { services } from '@/data/services';

export function ServicesPage() {
  useSEO({
    title: 'Hizmetler | Silopi Dijital',
    description:
      'Kurumsal web siteleri, restoran ve kafe siteleri, taksi ve VIP transfer siteleri, tanıtım sayfaları ve site bakım hizmetleri.',
    canonicalPath: '/hizmetler',
  });

  return (
    <>
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Hizmetler"
            title="İşletmenize uygun dijital çözümler"
            description="Her işletmenin ihtiyacı farklıdır. Aşağıdaki hizmet kategorilerinden size uygun olanı seçin veya iletişim sayfasından ihtiyacınızı anlatın — birlikte en doğru çözümü planlayalım."
            center
          />
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <FadeIn key={service.id}>
              <ServiceDetailCard service={service} index={index} />
            </FadeIn>
          ))}
        </div>
      </section>

      <CTA
        title="Hangi hizmetin size uygun olduğundan emin değil misiniz?"
        description="İşletmenizi dinleyelim, ihtiyacınıza en uygun çözümü birlikte belirleyelim."
      />
    </>
  );
}
