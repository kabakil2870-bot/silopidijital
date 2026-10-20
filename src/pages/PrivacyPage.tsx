import { useSEO } from '@/hooks/useSEO';
import { siteConfig } from '@/config/site';

export function PrivacyPage() {
  useSEO({
    title: 'Gizlilik Politikası | Silopi Dijital',
    description:
      'Silopi Dijital gizlilik politikası. Web sitemizin nasıl çalıştığı, çerezler ve veri kullanımı hakkında bilgilendirme.',
    canonicalPath: '/gizlilik',
  });

  return (
    <div className="py-section bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
          Gizlilik Politikası
        </h1>
        <p className="text-sm text-neutral-400 mb-2">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
        <p className="text-sm text-warning-600 bg-warning-500/10 border border-warning-500/20 rounded-xl p-4 mb-10">
          Bu metin bir taslaktır ve hukuki uzman onayından geçmemiştir. Yayıına almadan önce
          bir hukuk danışmanı tarafından incelenmelidir. İşletme ve veri sorumlusu bilgileri
          (unvan, adres, iletişim) yapılandırılmadıkça bu metin nihai olarak kabul edilmemelidir.
        </p>
        <div className="prose prose-neutral max-w-none space-y-6">
          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">1. Genel Bakış</h2>
            <p className="text-neutral-600 leading-relaxed">
              Bu gizlilik politikası, {siteConfig.name} olarak web sitemiz üzerinden hangi
              bilgilerin toplandığını, nasıl kullanıldığını ve korunduğunu açıklamaktadır. Bu site
              bir tanıtım ve müşteri kazanma sitesidir; e-ticaret veya üyelik gerektiren bir platform
              değildir.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              2. Toplanan Bilgiler
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              İletişim formunu doldurduğunuzda aşağıdaki bilgileri paylaşırsınız:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Ad soyad, işletme adı, telefon numarası
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                İstenen hizmet, tahmini bütçe ve proje açıklaması
              </li>
            </ul>
            <p className="text-neutral-600 leading-relaxed mt-3">
              Bu bilgiler yalnızca teklif sürecinde iletişim kurmak amacıyla kullanılır. Form
              verileri sunucumuza gönderilmez; WhatsApp mesajına dönüştürülerek sizin
              tarafınızdan gönderilir.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">3. Çerezler</h2>
            <p className="text-neutral-600 leading-relaxed">
              Ziyaretçi tarafında analitik veya reklam çerezleri yapılandırılmamıştır. Yönetici panelinde giriş oturumu tarayıcı oturum depolamasında tutulabilir. Barındırma, kimlik doğrulama ve proje ekran görüntülerinin saklanması için Supabase hizmeti yapılandırıldığında ilgili hizmetin teknik kayıtları ve gizlilik koşulları da dikkate alınmalıdır.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              4. Üçüncü Taraf Hizmetleri
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Sitemiz Google Fonts hizmetini kullanabilir. Harici site adresi bulunan ve yönetici tarafından ekran görüntüsü yüklenmemiş portföy kartlarında, otomatik web sitesi önizlemesi için thum.io hizmetine istek gönderilebilir; bu istek hedef web sitesi adresini içerir. Kendi ekran görüntüsünü yönetici panelinden yüklemek otomatik önizleme servisine olan ihtiyacı azaltır. Teklif formunu gönderdiğinizde bilgileriniz, siz WhatsApp'a geçip mesajı kendiniz gönderene kadar Silopi Dijital'e iletilmez. Yönetici paneli etkinleştirildiğinde portföy kayıtları ve yüklenen proje görselleri yapılandırılmış Supabase projesinde tutulur. Bu hizmetlerin kullanıldığı durumda ilgili sağlayıcıların gizlilik ve veri işleme koşulları da dikkate alınmalıdır.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              5. Veri Güvenliği
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              İletişim formu aracılığıyla paylaştığınız bilgiler sunucumuza gönderilmez ve
              veritabanımızda saklanmaz. Bilgileriniz yalnızca tarayıcınızdan WhatsApp mesajına
              dönüştürülerek iletilir.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              6. İletişim
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Bu gizlilik politikası hakkında sorularınız varsa, iletişim sayfamızdaki kanallardan
              bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
