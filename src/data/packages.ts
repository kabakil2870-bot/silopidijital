export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  highlight: boolean;
  features: string[];
  note?: string;
}

export const packages: PricingPackage[] = [
  {
    id: 'baslangic',
    name: 'Başlangıç',
    description: 'Küçük işletmeler için temel tanıtım sitesi.',
    highlight: false,
    features: [
      'Tek sayfalık tanıtım sitesi',
      'Mobil uyumlu tasarım',
      'İletişim bilgileri ve WhatsApp butonu',
      'Temel SEO ayarları',
      'Teslim sonrası kısa destek',
    ],
  },
  {
    id: 'kurumsal',
    name: 'Kurumsal',
    description: 'Birden fazla sayfayı kapsayan kapsamlı kurumsal site.',
    highlight: true,
    features: [
      'Çok sayfalı kurumsal site (Anasayfa, Hizmetler, Hakkımızda, İletişim)',
      'Kurumsal kimliğe özel tasarım',
      'Mobil uyumlu tasarım',
      'İletişim formu ve harita entegrasyonu',
      'Temel SEO ayarları ve sitemap',
      'Sosyal medya butonları',
      'Teslim sonrası destek',
    ],
  },
  {
    id: 'ozel-proje',
    name: 'Özel Proje',
    description: 'İşletmenize özel işlevler ve kapsamlı özelleştirme.',
    highlight: false,
    features: [
      'Özel tasarım ve kullanıcı deneyimi',
      'İşletmeye özel işlevler (menü, rezervasyon, vb.)',
      'WhatsApp entegrasyonu',
      'İçerik yapısı size göre planlanır',
      'Gelişmiş SEO ayarları',
      'Teslim sonrası destek ve bakım',
    ],
    note: 'Nihai fiyat, proje kapsamına göre belirlenir.',
  },
];
