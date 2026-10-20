import { useSEO } from '@/hooks/useSEO';
import { siteConfig } from '@/config/site';

export function KvkkPage() {
  useSEO({
    title: 'KVKK Aydınlatma Metni | Silopi Dijital',
    description:
      'Silopi Dijital Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni. Verilerinizin nasıl işlendiği hakkında bilgilendirme.',
    canonicalPath: '/kvkk-aydinlatma',
  });

  return (
    <div className="py-section bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-sm text-neutral-400 mb-2">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </p>
        <p className="text-sm text-warning-600 bg-warning-500/10 border border-warning-500/20 rounded-xl p-4 mb-10">
          Bu metin bir taslaktır ve hukuki uzman onayından geçmemiştir. Yayıına almadan önce
          bir hukuk danışmanı tarafından incelenmelidir. Veri sorumlusu unvanı, tam adres ve
          iletişim bilgileri yapılandırılmadıkça bu metin nihai olarak kabul edilmemelidir.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              1. Veri Sorumlusu
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              {siteConfig.name}, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında
              veri sorumlusu sıfatıyla, aşağıda belirtilen amaçlar dahilinde kişisel verilerinizi
              işlemektedir.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              2. İşlenen Kişisel Veriler
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              İletişim formu veya WhatsApp üzerinden bizimle iletişime geçtiğinizde aşağıdaki
              kişisel verileriniz işlenebilmektedir:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Kimlik bilgileri (ad soyad)
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                İletişim bilgileri (telefon, e-posta)
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                İşletme bilgileri (işletme adı, proje açıklaması)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              3. İşleme Amaçları
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Teklif talebinizin değerlendirilmesi ve size geri dönüş yapılması
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Proje kapsamının belirlenmesi ve süreç yönetimi
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                İletişim amacıyla sizinle iletişim kurulması
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              4. Verilerin Aktarılması
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              İletişim formundaki bilgileriniz, teklif sürecini başlatmak amacıyla WhatsApp üzerinden
              sizin tarafınızdan bize iletilmektedir. Bu bilgiler WhatsApp'ın kendi platformu
              üzerinden aktarılır ve WhatsApp'ın gizlilik politikası geçerlidir. Verileriniz
              üçüncü kişilere satılmaz veya pazarlanmaz.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              5. Veri Saklama
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              Teklif formu varsayılan olarak kendi başına bir sunucuya kayıt yapmaz; WhatsApp bağlantısı yapılandırıldığında form bilgileri mesaj taslağına dönüştürülür ve kullanıcı gönderimi başlatır. Yönetici panelinde ise yalnızca proje portföyünü yönetmek amacıyla yönetici hesabı, proje açıklamaları ve yüklenen ekran görüntüleri yapılandırılmış Supabase hizmetinde saklanabilir. Bu metin, gerçek kurulum ve veri sorumlusu bilgileriyle uyumlu olacak şekilde yayın öncesinde gözden geçirilmelidir.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">
              6. Haklarınız
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-3">
              KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Kişisel verilerinizin işlenip işlenmediğini öğrenme
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                İşlenmişse buna ilişkin bilgi talep etme
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                İşlenmesinin amaçlarını ve amacına uygun kullanılıp kullanılmadığını öğrenme
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Yanlış veya eksik bilgilerin düzeltilmesini isteme
              </li>
              <li className="flex gap-2">
                <span className="text-primary-500">•</span>
                Silinmesini veya yok edilmesini isteme
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold text-neutral-900 mb-3">7. İletişim</h2>
            <p className="text-neutral-600 leading-relaxed">
              KVKK kapsamında haklarınızı kullanmak veya bu metin hakkında soru sormak için
              iletişim sayfamızdaki kanallardan bize ulaşabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
