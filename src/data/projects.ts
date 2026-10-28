export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  services: string[];
  thumbnail: {
    type: 'url' | 'concept';
    value: string;
    variant: 'taksi' | 'vip' | 'restoran' | 'default';
  };
  externalUrl?: string;
  previewMode?: 'screenshot' | 'iframe';
  status: 'live' | 'archived' | 'draft';
  featured: boolean;
  published: boolean;
  altText: string;
}

export const projects: Project[] = [
  {
    id: 'silopi-taksi',
    slug: 'silopi-taksi',
    name: 'Silopi Taksi',
    category: 'Ulaşım / Taksi',
    shortDescription:
      'Silopi bölgesinde hizmet veren taksi işletmesi için modern ve mobil uyumlu web sitesi.',
    fullDescription:
      'Silopi Taksi için geliştirilen bu web sitesi, müşterilerin hızlı bir şekilde taksi çağırabilmesi, hizmet bölgelerini görebilmesi ve iletişim kurabilmesi için tasarlandı. Mobil cihazlarda akıcı çalışan site, tek elden hızlı arama ve WhatsApp ile iletişim sunuyor.',
    services: ['Web Tasarım', 'Mobil Uyumlu Tasarım', 'WhatsApp Entegrasyonu'],
    thumbnail: { type: 'concept', value: '', variant: 'taksi' },
    externalUrl: 'https://www.silopitaksici.com/',
    previewMode: 'screenshot',
    status: 'live',
    featured: true,
    published: true,
    altText: 'Silopi Taksi web sitesi önizlemesi - mobil uyumlu taksi sitesi',
  },
  {
    id: 'silopi-vip-arac',
    slug: 'silopi-vip-arac',
    name: 'Silopi VIP Araç',
    category: 'VIP Ulaşım / Transfer',
    shortDescription:
      'VIP transfer hizmeti sunan işletme için profesyonel kurumsal tanıtım sitesi.',
    fullDescription:
      'Silopi VIP Araç için hazırlanan web sitesi, VIP transfer ve özel araç kiralama hizmetlerini profesyonel bir şekilde sergiliyor. Hizmet paketleri, araç bilgileri ve rezervasyon için iletişim kanalları öne çıkarıldı.',
    services: ['Web Tasarım', 'Kurumsal Tanıtım', 'Mobil Uyumlu Tasarım'],
    thumbnail: { type: 'concept', value: '', variant: 'vip' },
    externalUrl: 'https://www.silopiviparac.com/',
    previewMode: 'screenshot',
    status: 'live',
    featured: true,
    published: true,
    altText: 'Silopi VIP Araç web sitesi önizlemesi - VIP transfer tanıtım sitesi',
  },
  {
    id: 'pizza-live',
    slug: 'pizza-live',
    name: 'Pizza Live',
    category: 'Restoran',
    shortDescription:
      'Restoran ve fast-food işletmesi için menü tanıtımı ve görsel açıdan zengin web sitesi.',
    fullDescription:
      'Pizza Live, restoran menüsünü dijital ortamda sergilemek ve müşterilere hızlı erişim sunmak için geliştirilen bir web sitesidir. Menü öğeleri, görseller ve iletişim bilgileri öne çıkarıldı.',
    services: ['Web Tasarım', 'Menü Tanıtımı', 'Mobil Uyumlu Tasarım'],
    thumbnail: { type: 'concept', value: '', variant: 'restoran' },
    status: 'archived',
    featured: false,
    published: true,
    altText: 'Pizza Live restoran web sitesi önizlemesi - menü tanıtım sitesi',
  },
  {
    id: 'sehzaade-yemek-evi',
    slug: 'sehzaade-yemek-evi',
    name: 'Şehzade Yemek Evi',
    category: 'Restoran',
    shortDescription:
      'Geleneğe dayalı yemek evi için hazırlanmış tanıtım sitesi. İşletme faaliyetini sürdürmemektedir.',
    fullDescription:
      'Şehzade Yemek Evi, yöresel yemek kültürünü modern bir web sitesi ile buluşturmak amacıyla hazırlanmıştır. Bu proje arşiv niteliğindedir; işletme faaliyetini sürdürmemektedir ve güncel hizmet vermemektedir.',
    services: ['Web Tasarım', 'Menü Tanıtımı', 'Mobil Uyumlu Tasarım'],
    thumbnail: { type: 'concept', value: '', variant: 'restoran' },
    status: 'archived',
    featured: false,
    published: true,
    altText: 'Şehzade Yemek Evi restoran web sitesi önizlemesi - arşiv proje',
  },
  {
    id: 'silopide-yasiyorum',
    slug: 'silopide-yasiyorum',
    name: "Silopi'de Yaşıyorum",
    category: 'Topluluk / Bilgilendirme',
    shortDescription:
      'Taslak proje kaydı. İçerik ve yayın durumu doğrulanma aşamasındadır.',
    fullDescription:
      'Bu kayıt taslak niteliğindedir. Proje ayrıntıları doğrulanıp içerik tamamlandığında yayınlanacaktır.',
    services: ['Web Tasarım'],
    thumbnail: { type: 'concept', value: '', variant: 'default' },
    status: 'draft',
    featured: false,
    published: false,
    altText: "Silopi'de Yaşıyorum taslak proje kaydı",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured && p.published);
}

export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.published);
}

export function getProjectCategories(): string[] {
  return [...new Set(projects.filter((p) => p.published).map((p) => p.category))];
}
