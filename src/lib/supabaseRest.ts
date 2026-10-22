import { projects as localProjects, type Project } from '@/data/projects';

const DEFAULT_SUPABASE_URL = 'https://qaxhdidkkzxxvxsscqdr.supabase.co';
// This is a Supabase publishable key, intended for public browser clients. Database RLS
// policies protect the data; never replace this with a service_role or secret key.
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_W-t_iZX3QUaTkbPKhkkt3w_XYnIt67z';
const envUrl = ((import.meta.env.VITE_SUPABASE_URL as string | undefined) || '').replace(/\/$/, '');
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || '';
const validPublishableKey = (value: string) =>
  value.startsWith('sb_publishable_') &&
  !/YOUR_|PLACEHOLDER|SUPABASE_PUBLIC|sb_secret_/i.test(value);
// Use environment overrides only when both values target this exact project. This avoids
// old Vercel variables silently sending the admin login to another Supabase project.
const useEnvironmentConfig = envUrl === DEFAULT_SUPABASE_URL && validPublishableKey(envKey);
const SUPABASE_URL = useEnvironmentConfig ? envUrl : DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = useEnvironmentConfig ? envKey : DEFAULT_SUPABASE_PUBLISHABLE_KEY;
const PROJECTS_TABLE = 'silopi_projects';
const STORAGE_BUCKET = 'project-screenshots';
const SESSION_KEY = 'silopi_dijital_admin_session';

export interface AdminSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: { id: string; email?: string };
}

export interface ProjectDraft {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  services: string[];
  thumbnailUrl: string;
  thumbnailVariant: 'taksi' | 'vip' | 'restoran' | 'default';
  externalUrl: string;
  previewMode: 'screenshot' | 'iframe';
  status: 'live' | 'archived' | 'draft';
  featured: boolean;
  published: boolean;
  altText: string;
}

interface ProjectRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string;
  full_description: string;
  services: string[] | null;
  thumbnail_url: string | null;
  thumbnail_variant: 'taksi' | 'vip' | 'restoran' | 'default' | null;
  external_url: string | null;
  preview_mode: 'screenshot' | 'iframe' | null;
  status: 'live' | 'archived' | 'draft';
  featured: boolean;
  published: boolean;
  alt_text: string | null;
}

export function isSupabaseConfigured(): boolean {
  return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(SUPABASE_URL) && Boolean(SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('YOUR_') && !SUPABASE_ANON_KEY.includes('PLACEHOLDER'));
}

export function getAdminSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

function saveAdminSession(session: AdminSession | null) {
  if (!session) sessionStorage.removeItem(SESSION_KEY);
  else sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function readError(response: Response): Promise<string> {
  let raw = `İstek başarısız (${response.status})`;
  try {
    const body = await response.json();
    raw = String(body.message || body.msg || body.error_description || body.error || raw);
  } catch {
    // Keep the HTTP status fallback when the response is not JSON.
  }

  if (/invalid login credentials|invalid_credentials/i.test(raw)) return 'E-posta adresi veya şifre doğru değil.';
  if (/email not confirmed/i.test(raw)) return 'E-posta doğrulaması tamamlanmamış. Supabase hesabının doğrulamasını kontrol et.';
  if (/too many requests|rate limit/i.test(raw)) return 'Çok fazla deneme yapıldı. Birkaç dakika sonra tekrar dene.';
  if (/failed to fetch|networkerror|load failed/i.test(raw)) return 'Supabase bağlantısına ulaşılamadı. İnternet bağlantını kontrol edip tekrar dene.';
  if (/permission denied|row-level security|site_admins/i.test(raw)) return 'Yönetici yetkisi doğrulanamadı. Bu hesap için erişim iznini kontrol et.';
  return raw;
}

function baseHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = { apikey: SUPABASE_ANON_KEY };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function signInAdmin(email: string, password: string): Promise<AdminSession> {
  if (!isSupabaseConfigured()) throw new Error('Giriş şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');

  let response: Response;
  try {
    response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error('Giriş hizmetine ulaşılamadı. Biraz sonra tekrar dene.');
  }
  if (!response.ok) throw new Error(await readError(response));
  const data = await response.json();
  const session: AdminSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
    user: { id: data.user.id, email: data.user.email },
  };

  const adminResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/site_admins?select=user_id&user_id=eq.${encodeURIComponent(session.user.id)}`,
    { headers: baseHeaders(session.access_token) },
  );
  if (!adminResponse.ok) throw new Error(await readError(adminResponse));
  const admins = await adminResponse.json();
  if (!Array.isArray(admins) || admins.length === 0) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: baseHeaders(session.access_token) });
    throw new Error('Bu hesap bu panele erişim yetkisine sahip değil. Hesap bilgilerini kontrol et veya site yöneticisiyle iletişime geç.');
  }
  saveAdminSession(session);
  return session;
}

export async function signOutAdmin(): Promise<void> {
  const session = getAdminSession();
  if (session && isSupabaseConfigured()) {
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: baseHeaders(session.access_token) });
    } catch {
      // Session still gets removed locally if remote sign-out is unavailable.
    }
  }
  saveAdminSession(null);
}

export async function validateAdminSession(): Promise<AdminSession | null> {
  const session = getAdminSession();
  if (!session || !isSupabaseConfigured()) return null;
  try {
    const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: baseHeaders(session.access_token) });
    if (!userResponse.ok) {
      saveAdminSession(null);
      return null;
    }
    const user = await userResponse.json();
    const adminResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/site_admins?select=user_id&user_id=eq.${encodeURIComponent(user.id)}`,
      { headers: baseHeaders(session.access_token) },
    );
    if (!adminResponse.ok || (await adminResponse.json()).length === 0) {
      saveAdminSession(null);
      return null;
    }
    return { ...session, user: { id: user.id, email: user.email } };
  } catch {
    return null;
  }
}

function rowToProject(row: ProjectRow): Project {
  const thumbnailUrl = row.thumbnail_url || '';
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    shortDescription: row.short_description || '',
    fullDescription: row.full_description || '',
    services: Array.isArray(row.services) ? row.services : [],
    thumbnail: {
      type: thumbnailUrl ? 'url' : 'concept',
      value: thumbnailUrl,
      variant: row.thumbnail_variant || 'default',
    },
    externalUrl: row.external_url || undefined,
    previewMode: row.preview_mode || 'screenshot',
    status: row.status || 'draft',
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    altText: row.alt_text || row.name,
  };
}

function projectToRow(project: ProjectDraft, thumbnailUrl: string) {
  return {
    id: project.id,
    slug: project.slug,
    name: project.name.trim(),
    category: project.category.trim(),
    short_description: project.shortDescription.trim(),
    full_description: project.fullDescription.trim(),
    services: project.services,
    thumbnail_url: thumbnailUrl || null,
    thumbnail_variant: project.thumbnailVariant,
    external_url: project.externalUrl.trim() || null,
    preview_mode: project.previewMode,
    status: project.status,
    featured: project.featured,
    published: project.published,
    alt_text: project.altText.trim() || project.name.trim(),
    updated_at: new Date().toISOString(),
  };
}

export async function fetchProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) return localProjects.filter((project) => project.published);
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/${PROJECTS_TABLE}?select=*&published=eq.true&order=featured.desc,created_at.desc`,
      { headers: baseHeaders() },
    );
    if (!response.ok) throw new Error(await readError(response));
    const rows = (await response.json()) as ProjectRow[];
    return rows.map(rowToProject);
  } catch (error) {
    console.error('Silopi Dijital portföyü yüklenemedi; yerel yedek içerik gösteriliyor.', error);
    return localProjects.filter((project) => project.published);
  }
}

export async function fetchAdminProjects(session: AdminSession): Promise<Project[]> {
  if (!isSupabaseConfigured()) throw new Error('Bağlantı şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/${PROJECTS_TABLE}?select=*&order=updated_at.desc.nullslast,created_at.desc`,
    { headers: baseHeaders(session.access_token) },
  );
  if (!response.ok) throw new Error(await readError(response));
  return ((await response.json()) as ProjectRow[]).map(rowToProject);
}

export async function uploadProjectScreenshot(session: AdminSession, file: File, projectId: string): Promise<string> {
  if (!isSupabaseConfigured()) throw new Error('Bağlantı şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
  if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) throw new Error('Lütfen JPG, PNG, WebP veya GIF dosyası seç.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Görsel boyutu en fazla 5 MB olabilir.');
  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const objectPath = `${projectId}/${Date.now()}.${extension}`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${objectPath}`, {
    method: 'POST',
    headers: {
      ...baseHeaders(session.access_token),
      'Content-Type': file.type,
      'x-upsert': 'true',
      'cache-control': '3600',
    },
    body: file,
  });
  if (!response.ok) throw new Error(await readError(response));
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${objectPath}`;
}

export async function saveProject(session: AdminSession, project: ProjectDraft, existingThumbnailUrl: string): Promise<void> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${PROJECTS_TABLE}?on_conflict=id`, {
    method: 'POST',
    headers: {
      ...baseHeaders(session.access_token),
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(projectToRow(project, existingThumbnailUrl)),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export async function deleteProject(session: AdminSession, projectId: string): Promise<void> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${PROJECTS_TABLE}?id=eq.${encodeURIComponent(projectId)}`, {
    method: 'DELETE',
    headers: { ...baseHeaders(session.access_token), Prefer: 'return=minimal' },
  });
  if (!response.ok) throw new Error(await readError(response));
}

export function toProjectDraft(project?: Project): ProjectDraft {
  return {
    id: project?.id || (globalThis.crypto?.randomUUID?.() ?? `project-${Date.now()}`),
    slug: project?.slug || '',
    name: project?.name || '',
    category: project?.category || 'Kurumsal Web Sitesi',
    shortDescription: project?.shortDescription || '',
    fullDescription: project?.fullDescription || '',
    services: project?.services || [],
    thumbnailUrl: project?.thumbnail.value || '',
    thumbnailVariant: project?.thumbnail.variant || 'default',
    externalUrl: project?.externalUrl || '',
    previewMode: project?.previewMode || 'screenshot',
    status: project?.status || 'draft',
    featured: project?.featured || false,
    published: project?.published || false,
    altText: project?.altText || '',
  };
}
