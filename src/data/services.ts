export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  suitableFor: string;
  includedFeatures: string[];
}

export const services: Service[] = [
  {
    id: 'kurumsal-web',
    icon: 'Building2',
    title: 'Kurumsal Web Siteleri',
    shortDescription:
      'İşletmenizi profesyonel biçimde temsil eden, kurumsal kimliğinize uygun, modern web siteleri.',
    fullDescription:
      'Kurumsal web siteleri, işletmenizin internet üzerindeki dijital vitrinidir. Hakkınızda, hizmetleriniz, projeleriniz ve iletişim sayfalarını içeren, kurumsal kimliğinize uygun renk ve tipografi ile tasarlanan kapsamlı sitelerdir. Arama motorları için temel SEO ayarları yapılır, mobil cihazlarda kusursuz çalışacak şekilde teslim edilir.',
    suitableFor:
      'Kurumsal kimliğini internete taşımak isteyen küçük ve orta ölçekli işletmeler, profesyonel hizmet veren firmalar.',
    includedFeatures: [
      'Hakkımızda, Hizmetler, Projeler ve İletişim sayfaları',
      'Kurumsal renk ve tipografiye özel tasarım',
      'Mobil uyumlu (responsive) tasarım',
      'Temel SEO ayarları (meta etiketler, sitemap)',
      'İletişim formu ve harita entegrasyonu',
    ],
  },
  {
    id: 'restoran-kafe',
    icon: 'UtensilsCrossed',
    title: 'Restoran ve Kafe Siteleri',
    shortDescription:
      'Menülerinizi görsel olarak sergileyen, müşteri ile iletişimi kolaylaştıran restoran siteleri.',
    fullDescription:
      'Restoran ve kafe siteleri, menülerinizi görsel açıdan zengin bir şekilde sergiler. Müşterileriniz yemeklerinizi görseller ve açıklamalarla inceleyebilir, rezervasyon için iletişim kurabilir. WhatsApp ile sipariş veya rezervasyon entegrasyonu sağlanabilir.',
    suitableFor:
      'Restoranlar, kafeler, fast-food işletmeleri, yemek evleri ve catering hizmeti veren işletmeler.',
    includedFeatures: [
      'Dijital menü sayfası (görsel ve açıklamalı)',
      'WhatsApp ile sipariş/rezervasyon entegrasyonu',
      'Konum ve çalışma saatleri bilgisi',
      'Galeri ile mekan görselleri',
      'Mobil uyumlu tasarım',
    ],
  },
  {
    id: 'taksi-transfer',
    icon: 'Car',
    title: 'Taksi ve VIP Transfer Siteleri',
    shortDescription:
      'Hızlı arama, hizmet bölgesi ve transfer paketlerini sergileyen ulaşım siteleri.',
    fullDescription:
      'Taksi ve VIP transfer siteleri, müşterilerinizin hızlı bir şekilde ulaşabilmesi için tasarlanır. Hizmet bölgeleri, araç bilgileri, transfer paketleri ve iletişim kanalları öne çıkarılır. Tek tıkla arama ve WhatsApp entegrasyonu ile müşteriye en kısa yoldan erişim sağlanır.',
    suitableFor:
      'Taksi durakları, VIP araç kiralama, özel transfer hizmeti veren işletmeler.',
    includedFeatures: [
      'Tek tıkla arama butonu',
      'WhatsApp ile rezervasyon entegrasyonu',
      'Hizmet bölgesi ve rota bilgisi',
      'Araç filosu tanıtımı',
      'Mobil uyumlu tasarım',
    ],
  },
  {
    id: 'landing-page',
    icon: 'LayoutTemplate',
    title: 'Tek Sayfalık Tanıtım Siteleri',
    shortDescription:
      'Tek bir sayfada işletmenizi anlatan, hızlı ve etkili landing page tasarımları.',
    fullDescription:
      'Tek sayfalık tanıtım siteleri (landing page), işletmenizi tek bir sayfada etkili bir şekilde sunar. Hero alanı, hizmet özeti, referanslar ve iletişim bölümü ile ziyaretçiyi harekete geçmeye yönlendirir. Hızlı yüklenir, net mesaj iletir.',
    suitableFor:
      'Tek bir ürün veya hizmeti öne çıkarmak isteyen işletmeler, kampanya sayfaları, etkinlik tanıtımları.',
    includedFeatures: [
      'Etkileyici hero alanı',
      'Hizmet/ürün özeti bölümü',
      'Müşteri yorumları veya referans alanı',
      'Net çağrı (CTA) butonları',
      'Hızlı yükleme ve mobil uyum',
    ],
  },
  {
    id: 'bakim-guncelleme',
    icon: 'Wrench',
    title: 'Site Bakım ve İçerik Güncelleme',
    shortDescription:
      'Mevcut sitenizin içeriğini güncelleme, küçük değişiklikler ve düzenli bakım hizmetleri.',
    fullDescription:
      'Mevcut web sitenizin içerik güncellemelerini, küçük tasarım değişikliklerini ve teknik bakımını üstleniriz. Yeni sayfa ekleme, metin ve görsel güncelleme, form düzenlemeleri gibi ihtiyaçlarınızda destek olur.',
    suitableFor:
      'Mevcut bir web sitesine sahip olan ve düzenli bakım/güncelleme ihtiyacı duyan işletmeler.',
    includedFeatures: [
      'Metin ve görsel güncellemeleri',
      'Yeni sayfa ekleme',
      'Form ve iletişim bilgisi düzenlemeleri',
      'Küçük tasarım iyileştirmeleri',
      'Teknik kontrol ve bakım',
    ],
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
