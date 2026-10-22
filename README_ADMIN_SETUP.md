# Silopi Dijital — Yönetim alanı

Yönetim alanından portföy projelerini yönetebilir, ekran görüntüsü yükleyebilir ve projeleri yayına alabilir veya taslakta tutabilirsin. Giriş `/admin` yolundadır.

## Mevcut kurulum

Bu proje için Supabase bağlantısı `src/lib/supabaseRest.ts` içinde public istemci ayarlarıyla tanımlanmıştır; `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` ortam değişkenleri aynı projeye ait geçerli değerler sağlanırsa override olarak kabul edilir. Bu değerler public client bilgileridir; `service_role` / `sb_secret` hiçbir zaman frontend'e konulmamalıdır.

Bu kurulumun mevcut Supabase veritabanında aşağıdakiler oluşturulmuştur:

- `site_admins`: kullanıcı kimlikleri ve yönetici üyeliği (RLS etkin)
- `silopi_projects`: portföy kayıtları (RLS etkin)
- `project-screenshots`: herkese açık proje kapakları için Storage deposu; yükleme/değiştirme/silme yönetici üyeliğine göre korunur.

Yönetici üyeliği Auth'ta kayıtlı kullanıcı kimliğine göre kontrol edilir; `raw_user_meta_data.role` veya kullanıcının kendi değiştirebildiği metadata alanları yetkilendirme amacıyla kullanılmaz.

## Giriş

1. Vercel'de güncel proje ZIP'indeki kaynak kodunun depo köküne yerleştiğini kontrol et.
2. `npm run build` Vercel tarafında başarıyla tamamlanmalı.
3. `https://silopidijital.vercel.app/admin` sayfasını aç.
4. Supabase Authentication'da var olan yönetici kullanıcısının e-posta adresi ve Supabase'te belirlediğin parolayla giriş yap.
5. Girişten sonra bir proje başlığı, kategori ve kısa açıklama doldurarak taslak kaydet; ardından bir ekran görüntüsü yüklemeyi test et.

## Yeni Supabase projesine taşıma

Farklı bir Supabase projesine taşınırsa:

1. `supabase/setup.sql` dosyasını yeni projenin SQL Editor'ünde çalıştır.
2. Authentication > Users bölümünde kullanıcı oluştur.
3. `supabase/authorize_admin.sql` içindeki e-posta filtresini o hesapla eşleştir ve SQL Editor'de çalıştır.
4. `src/lib/supabaseRest.ts` içindeki varsayılan proje URL'si ve publishable key ile `.env.example` değerlerini yeni projeye göre güncelle.

## Vercel

- Root Directory: `./`
- Framework: Vite
- Build: `npm run build`
- Output: `dist`

`vercel.json` SPA rotalarını `index.html` dosyasına yönlendirir. Canlı site iframe içinde açılamıyorsa bu hedef sitenin `X-Frame-Options` veya CSP güvenlik politikasından kaynaklanabilir; ekran görüntüsü kullanmak en güvenilir alternatiftir. Otomatik ekran görüntüsü Thum.io üzerinden alınabilir; kendi ekran görüntülerin Supabase Storage'a yüklenebilir.

## Güvenlik

- Admin parolasını kod, SQL veya GitHub'a yazma.
- Public anahtarın frontend içinde görünmesi normaldir; `service_role` veya `sb_secret` anahtarı paylaşma.
- `site_admins` tablosuna tarayıcı üzerinden yönetici ekleme yetkisi verilmemiştir; yetki yalnızca Dashboard/SQL üzerinden verilir.
