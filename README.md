# Silopi Dijital

React, Vite ve TypeScript ile hazırlanmış Türkçe web tasarım ajansı sitesi. Arayüz; hizmetleri, portföyü, iletişimi ve yönetim alanını içerir.

## Yerel çalıştırma

1. Node.js LTS kur.
2. Proje klasöründe terminal aç.
3. `npm ci` çalıştır.
4. `npm run dev` ile yerel önizlemeyi başlat.
5. Yayına almadan önce `npm run typecheck`, `npm run lint` ve `npm run build` çalıştır.

## Supabase bağlantısı

Silopi Dijital'in Supabase proje URL'si ve **publishable** anahtarı istemci bağlantısında varsayılan olarak tanımlıdır; bu nedenle Vercel ortam değişkenleri eksik olduğu için giriş butonu devre dışı kalmaz. `.env.example` dosyası aynı public değerleri, ortam değişkeniyle override etmek isteyenler için gösterir. Yalnızca `sb_publishable_...` veya legacy public `anon` key kullanılabilir. `service_role` / `sb_secret` anahtarını hiçbir zaman Vite değişkenine, frontend'e veya GitHub'a koyma.

Mevcut Supabase projesinde `site_admins`, `silopi_projects` tabloları, RLS politikaları ve ekran görüntüsü deposu kurulmuştur. Yönetici hesabına üyelik de veritabanında tanımlıdır. Farklı bir Supabase projesine taşıyacaksan `supabase/setup.sql` dosyasını SQL Editor'de çalıştır ve `supabase/authorize_admin.sql` ile uygun Auth kullanıcısına yetki ver.

## Vercel dağıtımı

- Framework: Vite
- Root Directory: depo kökü (`./`)
- Install Command: `npm ci` (veya `npm install`)
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json`, uygulamanın alt rotalarının doğrudan açılışını ve yenilenmesini `index.html` dosyasına yönlendirir. ZIP'i açtığında `package.json`, `index.html` ve `src/` aynı kök dizinde olmalıdır.

## Google Search Console ve SEO

- Ana sayfada Türkçe title/description, canonical, Open Graph/Twitter kartı ve Organization/WebSite yapılandırılmış verisi bulunur. İç sayfaların başlık, açıklama ve canonical değerleri sayfaya göre güncellenir. Yönetim paneli (`/admin`) ve bulunamayan sayfalar `noindex` olarak işaretlenir.
- `public/robots.txt` arama motorlarına `public/sitemap.xml` dosyasını bildirir. Site haritasında yalnızca ziyaretçilere açık sayfalar bulunur.
- Search Console'da **URL prefix** mülkü olarak `https://silopidijital.vercel.app/` adresini ekle. HTML dosyasıyla doğrulama yöntemini seçip Google'ın verdiği dosyayı `public/` klasörüne, dosya adını ve içeriğini hiç değiştirmeden koy. Projede bulunan `google1620c4f753437711.html` dosyası yalnızca Search Console hesabında bu site için üretilmiş mevcut doğrulama dosyasıysa kullanılabilir; Google yeni bir dosya verirse onu kullan.
- Dağıtımdan sonra doğrulama dosyasının `https://silopidijital.vercel.app/google1620c4f753437711.html` adresinde açıldığını kontrol et ve Search Console'da **Doğrula** düğmesine bas. Ardından **Site haritaları** alanına `sitemap.xml` yazıp gönder.
- Ana sayfayı ve önemli iç sayfaları URL Denetleme aracıyla kontrol edip **Dizine eklenmesini iste** seçeneğini kullanabilirsin. Bu işlem anında Google'da çıkmayı garanti etmez; tarama ve indeksleme zaman alabilir.

## Portföy ve görseller

`/admin` yolundan giriş yapıldığında projeler eklenebilir, düzenlenebilir, taslakta tutulabilir, yayınlanabilir ve ekran görüntüsü yüklenebilir. Yüklenen görseller Supabase Storage'da tutulur. Harici siteye ait canlı iframe bazı web sitelerinin güvenlik ayarları nedeniyle çalışmayabilir; bu durumda otomatik ekran görüntüsü veya kendi yüklediğin görüntü kullanılır.

## İletişim ve yayın bilgileri

Telefon, WhatsApp, hizmet bölgesi ve Vercel alan adı `src/config/site.ts` içinden yönetilir. E-posta ve sosyal medya bağlantıları yalnızca gerçek bilgiler mevcutsa eklenmelidir. Teklif formu bilgileri kendi başına sunucuya kaydetmez; WhatsApp mesajını açar ve mesajı kullanıcının göndermesini bekler.

Gizlilik ve KVKK metinleri uygulamadaki gerçek davranışı temel alır. Veri sorumlusunun yasal kimliği, resmî iş düzeni ve veri işleme uygulamaları hakkında son kontrol yapılması önerilir.

## Test durumu

SEO dosyalarının XML/JSON biçimleri ve Search Console doğrulama dosyasının yayın klasöründe bulunması statik olarak kontrol edildi. Bu ortamda npm kayıt sunucusuna erişim zaman aşımına uğradığı ve çevrimdışı önbellekte eksik paket bulunduğu için `npm run build`, `npm run lint` ve `npm run typecheck` çalıştırılamadı. Vercel'de deployment tamamlandıktan sonra yapı derlemesini kontrol et.
