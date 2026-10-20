-- Silopi Dijital: güvenli portföy yönetimi kurulumu
-- Supabase SQL Editor içinde tamamını çalıştır. Sonra README_ADMIN_SETUP.md adımlarını izle.

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;
drop policy if exists "Admins can read own admin membership" on public.site_admins;
create policy "Admins can read own admin membership"
  on public.site_admins for select to authenticated
  using (user_id = (select auth.uid()));

-- Üyelik tablosuna insert/update/delete için tarayıcı üzerinden hiçbir politika eklenmez.
-- Yönetici yetkisi sadece Supabase Dashboard SQL Editor üzerinden verilir.

create table if not exists public.silopi_projects (
  id text primary key,
  slug text not null unique,
  name text not null,
  category text not null,
  short_description text not null default '',
  full_description text not null default '',
  services text[] not null default '{}',
  thumbnail_url text,
  thumbnail_variant text not null default 'default' check (thumbnail_variant in ('taksi', 'vip', 'restoran', 'default')),
  external_url text,
  preview_mode text not null default 'screenshot' check (preview_mode in ('screenshot', 'iframe')),
  status text not null default 'draft' check (status in ('live', 'archived', 'draft')),
  featured boolean not null default false,
  published boolean not null default false,
  alt_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.silopi_projects enable row level security;
drop policy if exists "Public can read published projects" on public.silopi_projects;
create policy "Public can read published projects"
  on public.silopi_projects for select to anon, authenticated
  using (published = true);

drop policy if exists "Admins can read all projects" on public.silopi_projects;
create policy "Admins can read all projects"
  on public.silopi_projects for select to authenticated
  using (exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));

drop policy if exists "Admins can insert projects" on public.silopi_projects;
create policy "Admins can insert projects"
  on public.silopi_projects for insert to authenticated
  with check (exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));

drop policy if exists "Admins can update projects" on public.silopi_projects;
create policy "Admins can update projects"
  on public.silopi_projects for update to authenticated
  using (exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));

drop policy if exists "Admins can delete projects" on public.silopi_projects;
create policy "Admins can delete projects"
  on public.silopi_projects for delete to authenticated
  using (exists (select 1 from public.site_admins a where a.user_id = (select auth.uid())));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('project-screenshots', 'project-screenshots', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif'];

drop policy if exists "Public can view project screenshots" on storage.objects;
create policy "Public can view project screenshots"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'project-screenshots');

drop policy if exists "Admins can upload project screenshots" on storage.objects;
create policy "Admins can upload project screenshots"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-screenshots' and exists (
    select 1 from public.site_admins a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Admins can update project screenshots" on storage.objects;
create policy "Admins can update project screenshots"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-screenshots' and exists (
    select 1 from public.site_admins a where a.user_id = (select auth.uid())
  ))
  with check (bucket_id = 'project-screenshots' and exists (
    select 1 from public.site_admins a where a.user_id = (select auth.uid())
  ));

drop policy if exists "Admins can delete project screenshots" on storage.objects;
create policy "Admins can delete project screenshots"
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-screenshots' and exists (
    select 1 from public.site_admins a where a.user_id = (select auth.uid())
  ));


grant select on public.site_admins to authenticated;
grant select on public.silopi_projects to anon, authenticated;
grant insert, update, delete on public.silopi_projects to authenticated;

-- İlk portföy kayıtları. Ekran görüntülerini yönetim panelinden daha sonra ekleyebilirsin.
insert into public.silopi_projects (id, slug, name, category, short_description, full_description, services, external_url, preview_mode, status, featured, published, alt_text, thumbnail_variant)
values
('silopi-taksi', 'silopi-taksi', 'Silopi Taksi', 'Ulaşım / Taksi', 'Silopi bölgesindeki taksi işletmesi için hazırlanan web sitesi.', 'Silopi Taksi için hazırlanmış, müşterilerin işletmeye ulaşmasını kolaylaştıran web tasarım projesi.', array['Web Tasarım','Mobil Uyumlu Tasarım','WhatsApp Entegrasyonu'], 'https://www.silopitaksici.com/', 'screenshot', 'live', true, true, 'Silopi Taksi web sitesi ekran görüntüsü', 'taksi'),
('silopi-vip-arac', 'silopi-vip-arac', 'Silopi VIP Araç', 'VIP Ulaşım / Transfer', 'VIP transfer hizmetine yönelik kurumsal tanıtım sitesi.', 'Silopi VIP Araç için hazırlanmış web tasarım projesi.', array['Web Tasarım','Kurumsal Tanıtım','Mobil Uyumlu Tasarım'], 'https://www.silopiviparac.com/', 'screenshot', 'live', true, true, 'Silopi VIP Araç web sitesi ekran görüntüsü', 'vip'),
('pizza-live', 'pizza-live', 'Pizza Live', 'Restoran', 'Restoran için hazırlanmış geçmiş web sitesi projesi.', 'Pizza Live için hazırlanan arşiv projesi. Güncel durumu ayrıca doğrulanmalıdır.', array['Web Tasarım','Menü Tanıtımı'], null, 'screenshot', 'archived', false, true, 'Pizza Live restoran web sitesi', 'restoran'),
('sehzaade-yemek-evi', 'sehzaade-yemek-evi', 'Şehzade Yemek Evi', 'Restoran', 'İşletme kapanmadan önce hazırlanmış tanıtım sitesi.', 'Bu proje arşiv niteliğindedir; işletmenin kapandığı belirtilmiştir ve güncel hizmet veren işletme olarak sunulmaz.', array['Web Tasarım','Menü Tanıtımı'], null, 'screenshot', 'archived', false, true, 'Şehzade Yemek Evi arşiv web sitesi', 'restoran')
on conflict (id) do nothing;
