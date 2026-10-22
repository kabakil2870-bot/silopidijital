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

## Portföy ve görseller

`/admin` yolundan giriş yapıldığında projeler eklenebilir, düzenlenebilir, taslakta tutulabilir, yayınlanabilir ve ekran görüntüsü yüklenebilir. Yüklenen görseller Supabase Storage'da tutulur. Harici siteye ait canlı iframe bazı web sitelerinin güvenlik ayarları nedeniyle çalışmayabilir; bu durumda otomatik ekran görüntüsü veya kendi yüklediğin görüntü kullanılır.

## İletişim ve yayın bilgileri

Telefon, WhatsApp, hizmet bölgesi ve Vercel alan adı `src/config/site.ts` içinden yönetilir. E-posta ve sosyal medya bağlantıları yalnızca gerçek bilgiler mevcutsa eklenmelidir. Teklif formu bilgileri kendi başına sunucuya kaydetmez; WhatsApp mesajını açar ve mesajı kullanıcının göndermesini bekler.

Gizlilik ve KVKK metinleri uygulamadaki gerçek davranışı temel alır. Veri sorumlusunun yasal kimliği, resmî iş düzeni ve veri işleme uygulamaları hakkında son kontrol yapılması önerilir.

## Test durumu

Kaynak dosyaları bu ortamda düzenlendi. Bu çalışma ortamında paket indirme işlemi zaman aşımına uğradığı için üretim derlemesi/lint testi tamamlanamadı; Vercel'deki yeni deployment sonucunu ayrıca kontrol et.
