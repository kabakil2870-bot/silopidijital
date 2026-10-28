import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowLeft, ImagePlus, LogIn, LogOut, Plus, Save, Search, ShieldCheck,
  Trash2, UploadCloud, Monitor, Eye, EyeOff, Loader2, ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { useSEO } from '@/hooks/useSEO';
import {
  deleteProject, fetchAdminProjects,
  saveProject, signInAdmin, signOutAdmin, toProjectDraft, uploadProjectScreenshot,
  validateAdminSession, type AdminSession, type ProjectDraft,
} from '@/lib/supabaseRest';

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10';
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500';

function slugify(value: string) {
  return value.toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function AdminPage() {
  useSEO({
    title: 'Yönetim Paneli | Silopi Dijital',
    description: 'Silopi Dijital yönetim paneli.',
    noindex: true,
  });

  const [session, setSession] = useState<AdminSession | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [draft, setDraft] = useState<ProjectDraft>(() => toProjectDraft());
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState('');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    let active = true;
    validateAdminSession().then((validated) => {
      if (!active) return;
      setSession(validated);
      if (validated) void refreshProjects(validated);
    }).finally(() => {
      if (active) setCheckingSession(false);
    });
    return () => { active = false; };
  }, []);

  async function refreshProjects(currentSession: AdminSession): Promise<boolean> {
    try {
      const rows = await fetchAdminProjects(currentSession);
      setProjects(rows);
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Projeler yüklenemedi.' });
      return false;
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const signedIn = await signInAdmin(email.trim(), password);
      setSession(signedIn);
      setPassword('');
      const projectsLoaded = await refreshProjects(signedIn);
      setMessage(projectsLoaded
        ? { type: 'success', text: 'Giriş başarılı. Portföyün hazır.' }
        : { type: 'error', text: 'Giriş başarılı ancak projeler yüklenemedi. Bağlantıyı kontrol edip sayfayı yenile.' });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Giriş yapılamadı.' });
    } finally {
      setBusy(false);
    }
  }

  function startNewProject() {
    setActiveProject(null);
    setDraft(toProjectDraft());
    setScreenshot(null);
    setScreenshotPreview('');
    setMessage(null);
  }

  function editProject(project: Project) {
    setActiveProject(project);
    setDraft(toProjectDraft(project));
    setScreenshot(null);
    setScreenshotPreview(project.thumbnail.value || '');
    setMessage(null);
  }

  function chooseScreenshot(file?: File) {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setMessage({ type: 'error', text: 'Lütfen JPG, PNG, WebP veya GIF dosyası seç.' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Ekran görüntüsü en fazla 5 MB olabilir.' });
      return;
    }
    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  }

  const visibleProjects = useMemo(() => projects.filter((project) =>
    `${project.name} ${project.category}`.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR'))
  ), [projects, search]);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!session) return;
    if (!draft.name.trim() || !draft.category.trim() || !draft.shortDescription.trim()) {
      setMessage({ type: 'error', text: 'Proje adı, kategori ve kısa açıklama zorunludur.' });
      return;
    }
    if (draft.externalUrl && !/^https?:\/\//i.test(draft.externalUrl.trim())) {
      setMessage({ type: 'error', text: 'Site adresi https:// veya http:// ile başlamalıdır.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const cleanDraft = { ...draft, slug: draft.slug.trim() || slugify(draft.name), services: draft.services.filter(Boolean) };
      let screenshotUrl = draft.thumbnailUrl;
      if (screenshot) screenshotUrl = await uploadProjectScreenshot(session, screenshot, draft.id);
      await saveProject(session, cleanDraft, screenshotUrl);
      await refreshProjects(session);
      setActiveProject({
        id: cleanDraft.id,
        slug: cleanDraft.slug,
        name: cleanDraft.name,
        category: cleanDraft.category,
        shortDescription: cleanDraft.shortDescription,
        fullDescription: cleanDraft.fullDescription,
        services: cleanDraft.services,
        thumbnail: { type: screenshotUrl ? 'url' : 'concept', value: screenshotUrl, variant: cleanDraft.thumbnailVariant },
        externalUrl: cleanDraft.externalUrl || undefined,
        previewMode: cleanDraft.previewMode,
        status: cleanDraft.status,
        featured: cleanDraft.featured,
        published: cleanDraft.published,
        altText: cleanDraft.altText || cleanDraft.name,
      });
      setDraft({ ...cleanDraft, thumbnailUrl: screenshotUrl });
      setScreenshot(null);
      setScreenshotPreview(screenshotUrl);
      setMessage({ type: 'success', text: 'Proje kaydedildi. Yayındaysa portföyde güncel içerik gösterilecek.' });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Proje kaydedilemedi.' });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(project: Project) {
    if (!session || !window.confirm(`“${project.name}” projesini kalıcı olarak silmek istiyor musun?`)) return;
    setBusy(true);
    setMessage(null);
    try {
      await deleteProject(session, project.id);
      setProjects((current) => current.filter((item) => item.id !== project.id));
      if (activeProject?.id === project.id) startNewProject();
      setMessage({ type: 'success', text: 'Proje silindi.' });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Proje silinemedi.' });
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await signOutAdmin();
    setSession(null);
    setProjects([]);
    setActiveProject(null);
    setMessage({ type: 'info', text: 'Güvenli çıkış yapıldı.' });
  }

  if (checkingSession) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Yönetici oturumu kontrol ediliyor…</div>;
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-[#071225] px-4 py-10 text-slate-900 sm:py-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl lg:grid lg:grid-cols-[1fr_0.9fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#10285a] to-[#2563eb] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />
            <div className="relative"><Link to="/"><span className="text-sm font-bold tracking-[0.2em] text-blue-200">SİLOPİ DİJİTAL</span></Link><h1 className="mt-16 text-4xl font-extrabold leading-tight">Projelerini yönet.<br/><span className="text-cyan-300">Portföyünü büyüt.</span></h1><p className="mt-5 max-w-sm leading-7 text-blue-100">Ekran görüntüleri ekle, yeni projeler yayınla ve web siteni tek panelden güncel tut.</p></div>
            <div className="relative flex items-center gap-3 text-xs text-blue-100"><ShieldCheck className="h-5 w-5"/> Güvenli ve özel erişim</div>
          </section>
          <section className="p-6 sm:p-10 lg:p-12">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"><ArrowLeft className="h-4 w-4"/> Siteye dön</Link>
            <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><ShieldCheck className="h-7 w-7"/></div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight">Yönetici girişi</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Bu alan yalnızca yönetici olarak yetkilendirilmiş hesaplar içindir.</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div><label className={labelClass} htmlFor="admin-email">E-posta</label><input id="admin-email" autoComplete="username" className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Yönetici e-postası"/></div>
              <div><label className={labelClass} htmlFor="admin-password">Şifre</label><div className="relative"><input id="admin-password" autoComplete="current-password" className={`${inputClass} pr-12`} type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Yönetici şifresi"/><button className="absolute inset-y-0 right-3 text-slate-400 hover:text-slate-700" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}>{showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}</button></div></div>
              {message && <div role="status" className={`rounded-xl p-3 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>{message.text}</div>}
              <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50" type="submit">{busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <LogIn className="h-4 w-4"/>} Giriş yap</button>
            </form>
            <p className="mt-6 text-xs leading-5 text-slate-400">Hesabınızın güvenliği için parolanızı yalnızca bu giriş ekranında kullanın.</p>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><ShieldCheck className="h-5 w-5"/></div><div><p className="font-extrabold">Silopi Dijital</p><p className="text-xs text-slate-500">Portföy yönetim paneli</p></div></div>
          <div className="flex items-center gap-2"><Link to="/projeler" target="_blank" className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:inline-flex"><ExternalLink className="h-4 w-4"/> Portföyü gör</Link><button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LogOut className="h-4 w-4"/> Çıkış</button></div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[0.85fr_1.4fr] lg:px-8 lg:py-8">
        <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Portföy</p><h1 className="mt-2 text-2xl font-extrabold">Projelerim <span className="text-slate-400">({projects.length})</span></h1><p className="mt-2 text-sm leading-6 text-slate-500">Yeni proje ekle veya var olanları düzenle. Yayın durumu ziyaretçilere görünen projeleri belirler.</p></div><button onClick={startNewProject} type="button" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-3.5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"><Plus className="h-4 w-4"/> Yeni</button></div>
          <div className="relative mt-5"><Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400"/><input value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pl-9`} placeholder="Proje ara…"/></div>
          <div className="mt-4 space-y-2">
            {visibleProjects.map((project) => <button key={project.id} type="button" onClick={() => editProject(project)} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${activeProject?.id === project.id ? 'border-blue-400 bg-blue-50/70' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">{project.thumbnail.value ? <img className="h-full w-full object-cover" src={project.thumbnail.value} alt=""/> : <div className="flex h-full items-center justify-center"><ImagePlus className="h-5 w-5 text-slate-300"/></div>}</div>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{project.name}</p><p className="mt-1 truncate text-xs text-slate-500">{project.category}</p><div className="mt-1.5 flex gap-1.5"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${project.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{project.published ? 'Yayında' : 'Taslak'}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{project.status === 'live' ? 'Canlı site' : project.status === 'archived' ? 'Arşiv' : 'Taslak'}</span></div></div>
            </button>)}
            {visibleProjects.length === 0 && <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">Proje bulunamadı.</p>}
          </div>
        </section>

        <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">Proje düzenleyici</p><h2 className="mt-2 text-2xl font-extrabold">{activeProject ? 'Projeyi düzenle' : 'Yeni proje ekle'}</h2><p className="mt-2 text-sm text-slate-500">Ekran görüntüsü yükle veya canlı site adresinden otomatik önizleme göster; gerektiğinde canlı iframe görünümünü seç.</p></div>{activeProject && <button type="button" onClick={() => handleDelete(activeProject)} disabled={busy} className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-50"><Trash2 className="h-4 w-4"/> Sil</button>}</div>
          {message && <div role="status" className={`mt-5 rounded-xl p-3 text-sm leading-6 ${message.type === 'error' ? 'border border-red-200 bg-red-50 text-red-800' : message.type === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-800' : 'border border-blue-200 bg-blue-50 text-blue-800'}`}>{message.text}</div>}
          <form onSubmit={handleSave} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2"><div><label className={labelClass} htmlFor="project-name">Proje adı *</label><input id="project-name" className={inputClass} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value, slug: activeProject ? draft.slug : slugify(e.target.value) })} required placeholder="Örn. Silopi Taksi"/></div><div><label className={labelClass} htmlFor="project-category">Kategori *</label><input id="project-category" className={inputClass} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} required placeholder="Örn. Ulaşım / Taksi"/></div></div>
            <div><label className={labelClass} htmlFor="project-slug">Sayfa kısa adı (slug)</label><input id="project-slug" className={inputClass} value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: slugify(e.target.value) })} placeholder="silopi-taksi"/></div>
            <div><label className={labelClass} htmlFor="project-short">Kısa açıklama *</label><textarea id="project-short" rows={2} className={inputClass} value={draft.shortDescription} onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })} required placeholder="Kartta görünecek kısa açıklama"/></div>
            <div><label className={labelClass} htmlFor="project-full">Detaylı açıklama</label><textarea id="project-full" rows={4} className={inputClass} value={draft.fullDescription} onChange={(e) => setDraft({ ...draft, fullDescription: e.target.value })} placeholder="Projenin kapsamı, yapılan işler ve özellikler"/></div>
            <div><label className={labelClass} htmlFor="project-services">Sunulan işler / etiketler</label><input id="project-services" className={inputClass} value={draft.services.join(', ')} onChange={(e) => setDraft({ ...draft, services: e.target.value.split(',').map((part) => part.trim()).filter(Boolean) })} placeholder="Web Tasarım, Mobil Uyum, SEO"/><p className="mt-1.5 text-xs text-slate-400">Etiketleri virgülle ayır.</p></div>
            <div><label className={labelClass} htmlFor="project-url">Canlı site bağlantısı</label><input id="project-url" className={inputClass} value={draft.externalUrl} onChange={(e) => setDraft({ ...draft, externalUrl: e.target.value })} placeholder="https://ornek-site.com" type="url"/></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label className={labelClass} htmlFor="project-status">Proje durumu</label><select id="project-status" className={inputClass} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as ProjectDraft['status'] })}><option value="live">Canlı site</option><option value="archived">Arşiv / geçmiş proje</option><option value="draft">Taslak</option></select></div><div><label className={labelClass} htmlFor="project-preview-mode">Önizleme şekli</label><select id="project-preview-mode" className={inputClass} value={draft.previewMode} onChange={(e) => setDraft({ ...draft, previewMode: e.target.value as ProjectDraft['previewMode'] })}><option value="screenshot">Ekran görüntüsü / otomatik önizleme</option><option value="iframe">Canlı siteyi kart içinde göster</option></select></div></div>
            <div><label className={labelClass} htmlFor="project-image">Site ekran görüntüsü</label><label htmlFor="project-image" className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-7 text-center transition hover:border-blue-400 hover:bg-blue-50/50"><UploadCloud className="h-8 w-8 text-blue-600"/><span className="mt-3 text-sm font-bold text-slate-800">Bilgisayarından ekran görüntüsü seç</span><span className="mt-1 text-xs text-slate-500">JPG, PNG veya WebP · En fazla 5 MB. Yüklediğin görsel otomatik önizlemenin yerine geçer.</span><input id="project-image" type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={(e) => chooseScreenshot(e.target.files?.[0])}/></label>{screenshotPreview && <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"><img src={screenshotPreview} alt="Seçilen ekran görüntüsü önizlemesi" className="max-h-64 w-full object-contain"/><p className="border-t border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">{screenshot ? screenshot.name : 'Mevcut ekran görüntüsü'}</p></div>}</div>
            <div><label className={labelClass} htmlFor="project-alt">Görsel açıklaması (erişilebilirlik)</label><input id="project-alt" className={inputClass} value={draft.altText} onChange={(e) => setDraft({ ...draft, altText: e.target.value })} placeholder={`${draft.name || 'Proje'} web sitesi ekran görüntüsü`}/></div>
            <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-3"><label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/> Sitede yayınla</label><label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={draft.featured} onChange={(e) => setDraft({ ...draft, featured: e.target.checked })} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/> Ana sayfada öne çıkar</label><label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={draft.status === 'archived'} onChange={(e) => setDraft({ ...draft, status: e.target.checked ? 'archived' : 'live' })} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/> Arşiv proje</label></div>
            {draft.previewMode === 'iframe' && <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"><Monitor className="mb-1 inline h-4 w-4"/> Canlı iframe bazı sitelerde güvenlik ayarları nedeniyle engellenebilir. Normal önizleme modunda, ekran görüntüsü yüklemediysen site URL’sinden otomatik bir ekran görüntüsü denenir; en güvenilir sonuç için kendi ekran görüntünü yükle.</div>}
            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row"><button disabled={busy} type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{busy ? <Loader2 className="h-4 w-4 animate-spin"/> : <Save className="h-4 w-4"/>} {busy ? 'Kaydediliyor…' : 'Projeyi kaydet'}</button><button type="button" onClick={startNewProject} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 font-bold text-slate-600 hover:bg-slate-50"><Plus className="h-4 w-4"/> Yeni proje</button></div>
          </form>
        </section>
      </div>
      <footer className="mx-auto max-w-[1500px] px-4 pb-8 text-center text-xs text-slate-400 sm:px-6 lg:px-8">Silopi Dijital Yönetim Paneli · Fotoğraf yüklemek ve siteyi güncellemek için giriş yaptın.</footer>
    </main>
  );
}
