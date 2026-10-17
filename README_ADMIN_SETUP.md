# Silopi Dijital — Yönetici ve Portföy Kurulumu

Site; ekran görüntüsü yükleyebileceğin, yeni proje ekleyebileceğin ve projeleri yayına alıp taslağa çekebileceğin `/admin` panelini içerir. Değişikliklerin tüm ziyaretçilere görünmesi için Supabase bağlantısını kurman gerekir. Yönetici şifresi kaynak koduna yazılmaz.

## 1) Supabase projesi aç

1. https://supabase.com adresinde ücretsiz bir proje oluştur.
2. Supabase Dashboard > Project Settings > API bölümünden Project URL ve public anon/publishable key değerlerini al.
3. Proje kök dizininde `.env.example` dosyasının bir kopyasını `.env` adıyla oluştur.
4. `.env` dosyasını şöyle doldur:

```env
VITE_SUPABASE_URL=https://SENIN-PROJE-IDN.supabase.co
VITE_SUPABASE_ANON_KEY=SUPABASE_PUBLIC_ANON_VEYA_PUBLISHABLE_KEY
```

`service_role` veya secret key'i asla `VITE_` değişkenine koyma; bu değerler tarayıcıya aktarılır. `.env` dosyasını GitHub'a yükleme.

## 2) Veritabanı ve güvenlik politikalarını kur

1. Supabase Dashboard > SQL Editor > New query bölümünü aç.
2. `supabase/setup.sql` dosyasının tamamını yapıştırıp çalıştır.
3. SQL şu tabloları ve güvenlik kurallarını oluşturur: `site_admins`, `silopi_projects` ve `project-screenshots` görsel deposu. Public ziyaretçiler yalnızca `published = true` projeleri okuyabilir; ekleme, değiştirme, silme ve görsel yükleme yönetici yetkisine bağlıdır.
4. SQL ilk dört portföy kaydını da ekler. Gerçek ekran görüntülerini panelden sonradan yükle.

## 3) Yönetici hesabı oluştur

1. Supabase Dashboard > Authentication > Users > Add user bölümünden `434343djejejrj@gmail.com` e-posta adresi için kullanıcı oluştur. Güçlü ve yalnızca bu hesapta kullanılan bir şifre belirle. Şifreyi kaynak koduna, `.env` dosyasına veya SQL dosyalarına koyma.
2. Kullanıcıyı oluşturduktan sonra `supabase/authorize_admin.sql` dosyasını SQL Editor içinde çalıştır. Bu dosya e-posta adresine ait Auth kullanıcısını bulur ve yalnızca o hesaba yönetici izni verir.
3. Sorgunun sonundaki doğrulama satırı e-posta adresini döndürüyorsa yönetici yetkisi verilmiştir.

Bu adım hesabı yönetici olarak yetkilendirir. Yönetici üyeliği için tarayıcıdan insert politikası özellikle açılmamıştır. Parolayı proje dosyalarında saklama; sohbet içinde paylaşılan parolayı kurulum sonrası yenilemen güvenlik açısından daha iyidir.

## 4) Vercel ayarları

Vercel projesi > Settings > Environment Variables bölümüne aşağıdaki iki değişkeni Production, Preview ve Development ortamları için ekle:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Sonra yeni deployment oluştur (Redeploy). Yerel çalıştırma için `.env` dosyası gerekir. `.env` değişince Vite dev sunucusunu yeniden başlat.

## 5) Admin panelini kullan

1. Siteye `/admin` ekleyerek git: `https://silopidijital.vercel.app/admin`.
2. Supabase'te oluşturduğun yönetici e-postası ve şifresiyle giriş yap.
3. `Yeni` butonuyla proje ekle veya listedeki projeye tıklayarak düzenle.
4. Proje başlığı, kategori, açıklamalar, hizmet etiketleri ve canlı URL'yi doldur.
5. Ekran görüntüsü yüklemek için JPG/PNG/WebP seç. Önerilen görüntü oranı yatay 16:10 veya 16:9; dosya sınırı 5 MB.
6. `Sitede yayınla` kapalıysa kayıt taslak kalır. `Ana sayfada öne çıkar` kutusu yalnızca ana sayfadaki seçkiyi etkiler.
7. `Önizleme şekli` alanında otomatik ekran görüntüsü/manuel görsel veya canlı site iframe önizlemesini seçebilirsin. Canlı URL girilmiş ve manuel ekran görüntüsü yüklenmemişse portföy kartı `thum.io` üzerinden otomatik web ekran görüntüsü dener; kendi yüklediğin görsel varsa o önceliklidir.

## Canlı site önizlemesi hakkında

Bazı web siteleri güvenlik başlıkları (`X-Frame-Options` veya CSP `frame-ancestors`) ile başka bir sitenin içinde gösterilmeyi yasaklar. Bu durumda tarayıcıdan zorla gömülemez; en güvenilir yöntem site ekran görüntüsünü yüklemek ve `Siteyi ziyaret et` bağlantısı sunmaktır. Otomatik ekran görüntüsü, `thum.io` adlı üçüncü taraf servisten alınır: https://api.thum.io/. Servis kendi ücretsiz kullanım kotası ve limitlerini uygular; yoğunluk veya erişim sorunu olursa kendi ekran görüntünü yüklemen en güvenilir yoldur. Bu harici servis, görüntülemek istediğin herkese açık sayfa adresini istekte alır.

## Güvenlik notları

- Kaynak koda sabit admin e-posta/şifre ekleme.
- Vercel'de sadece public anon/publishable key kullan. Supabase service-role secret key tarayıcıya konmamalı.
- `supabase/setup.sql` RLS politikaları ile public erişimi yayınlanmış projelerle sınırlar; yönetici yetkisi `site_admins` tablosuna yalnızca Dashboard/SQL üzerinden verilir.
- Üretime çıkmadan önce Supabase Auth e-posta doğrulaması ve güçlü parola ayarlarını kontrol et.
