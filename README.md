# Silopi Dijital — Proje Dosyaları

React + Vite + TypeScript ile hazırlanmış Türkçe ajans sitesidir.

## Yerel çalıştırma

1. Node.js LTS kurun.
2. Bu klasörde terminal açın.
3. `npm ci` çalıştırın.
4. `npm run dev` ile geliştirme sunucusunu başlatın.
5. Yayın öncesi `npm run typecheck`, `npm run lint` ve `npm run build` çalıştırın.

## Yayına almadan önce mutlaka

- `src/config/site.ts` içindeki `whatsappNumber`, `email`, `phone`, `address` ve `socialLinks` alanlarını yalnızca gerçek bilgilerinize göre doldurun. Şu an boş bırakılmış iletişim alanları, örnek/uydurma bilgi eklenmemesi için bilerek boş tutulmuştur.
- `silopidijital.vercel.app` adresinin Vercel projenize atanmış olduğunu doğrulayın. Bu adres kullanılabilir değilse Vercel proje ayarlarından uygun bir proje adı seçin. İleride özel bir alan adı satın aldığınızda `src/config/site.ts`, `index.html`, `public/robots.txt` ve `public/sitemap.xml` dosyalarındaki alan adını yeni adresle güncelleyip yeniden yayınlayın.
- İletişim formu sunucuya veri kaydetmez. WhatsApp numarası yapılandırıldığında form verilerini sizin başlattığınız WhatsApp mesajına dönüştürür; mesaj, kullanıcı WhatsApp'tan gönderene kadar iletilmiş olmaz.
- Gizlilik ve KVKK metinlerini veri işleme düzeninize göre kontrol ettirin. Hukuki metinlerin uzman kontrolü olmadan nihai kabul edilmemesi gerekir.
- Portföy görselleri konsept önizlemeleridir. Yayına almadan önce gerçek proje ekran görüntülerini izinli biçimde ekleyin ve projelerin mevcut durumunu doğrulayın.

## Projede yapılan kararlılaştırma düzenlemeleri

- `lucide-react` paketinin Vite bağımlılık optimizasyonundan dışlanması kaldırıldı.
- Hizmet kartlarında dinamik Lucide namespace erişimi yerine açık ikon eşlemesi kullanıldı.
- Sitemap ve robots.txt içindeki `example.com` yer tutucuları kaldırılıp hedef alan adıyla değiştirildi.
- Vercel üzerinde doğrudan alt rotaların ve sayfa yenilemenin SPA uygulamasına yönlenmesi için `vercel.json` rewrite ayarı eklendi. Diğer statik barındırma servisleri için `_redirects` dosyası da korunmuştur.

Not: Bu kaynak ortamında bağımlılık indirme işlemi zaman aşımına uğradı; bu nedenle burada başarılı bir production build doğrulaması yapılamadı. Yayından önce yukarıdaki test komutlarını çalıştırın.

## Yönetici paneli ve portföy görselleri

Proje ekleme, düzenleme, yayına alma ve ekran görüntüsü yükleme için `/admin` paneli bulunur. Gerçek yönetici paneli için Supabase bağlantısını kurman gerekir. Ayrıntılı kurulum, güvenlik politikaları, yönetici kullanıcı yetkilendirme ve Vercel ayarları `README_ADMIN_SETUP.md` içindedir. Supabase yapılandırılmadan portföy önceden tanımlanmış yerel örneklerle çalışır; web üzerinden yapılan değişiklikler için Supabase zorunludur.
