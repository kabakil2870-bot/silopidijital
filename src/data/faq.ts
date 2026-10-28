export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Web sitesi kaç günde hazırlanır?',
    answer:
      'Teslim süresi projenin kapsamına göre değişir. Basit bir tanıtım sitesi daha kısa sürede tamamlanırken, çok sayfalı ve özel işlevler içeren kurumsal siteler daha uzun sürebilir. Proje ihtiyaçlarınızı konuştuktan sonra tahmini bir süre hakkında bilgi veririz.',
  },
  {
    question: 'Fiyat nasıl belirlenir?',
    answer:
      'Fiyat; projenin kapsamı, sayfa sayısı, özel işlevler, tasarım beklentileri ve içerik hazırlık durumu gibi faktörlere göre belirlenir. Sabit bir fiyat paketi yerine, ihtiyacınızı dinleyerek size özel bir teklif sunuyoruz. Nihai fiyat, proje kapsamının birlikte netleştirilmesiyle şekillenir.',
  },
  {
    question: 'Mobil uyumlu olacak mı?',
    answer:
      'Evet, tasarladığımız tüm web siteleri mobil cihazlarda (telefon ve tablet) düzgün görüntülenecek ve kullanılabilecek şekilde tasarlanır. Mobil uyumluluk, çalışmalarımızın temel bir parçasıdır.',
  },
  {
    question: 'Alan adı ve hosting nasıl çalışır?',
    answer:
      'Alan adı (örn. isletmeniz.com) ve hosting, sitenizin internet üzerinde yayınlanması için gereken altyapıdır. Bu hizmetlerin nasıl alınacağı ve maliyetleri hakkında size bilgi verir, ihtiyaç duyarsanız süreçte yardımcı oluruz.',
  },
  {
    question: 'Site tesliminden sonra destek veriliyor mu?',
    answer:
      'Evet, teslim sonrasında siteyi nasıl yöneteceğiniz konusunda bilgi veririz. İçerik güncelleme ve bakım ihtiyaçlarınız için destek sağlıyoruz. İhtiyacınıza göre düzenli bakım veya güncelleme hizmeti sunabiliriz.',
  },
];
