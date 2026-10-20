import { useEffect, useMemo, useState } from 'react';
import { Archive, Eye, Monitor, Image as ImageIcon, ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '@/data/projects';
import { ProjectThumbnail } from './ProjectThumbnail';

interface ProjectCardProps { project: Project; className?: string; }

/**
 * Creates a remote website snapshot URL for projects that have a public URL but
 * do not yet have an uploaded screenshot. This avoids relying on iframe support
 * for the initial portfolio preview. Owners can replace this with an uploaded
 * screenshot from /admin at any time.
 */
function getAutomaticScreenshotUrl(externalUrl?: string): string {
  if (!externalUrl) return '';

  try {
    const target = new URL(externalUrl);
    if (target.protocol !== 'https:' && target.protocol !== 'http:') return '';
    // Screenshot the page itself without query/hash values; these are rarely
    // needed for a portfolio cover and can break path-based screenshot APIs.
    target.search = '';
    target.hash = '';
    return `https://image.thum.io/get/noanimate/width/1000/crop/625/${target.toString()}`;
  } catch {
    return '';
  }
}

export function ProjectCard({ project, className = '' }: ProjectCardProps) {
  const isArchived = project.status === 'archived';
  const uploadedScreenshotUrl = project.thumbnail.type === 'url' ? project.thumbnail.value : '';
  const automaticScreenshotUrl = useMemo(() => getAutomaticScreenshotUrl(project.externalUrl), [project.externalUrl]);
  const [showLivePreview, setShowLivePreview] = useState(project.previewMode === 'iframe' && Boolean(project.externalUrl));
  const [uploadedImageFailed, setUploadedImageFailed] = useState(false);
  const [automaticImageFailed, setAutomaticImageFailed] = useState(false);

  useEffect(() => {
    setUploadedImageFailed(false);
    setAutomaticImageFailed(false);
    setShowLivePreview(project.previewMode === 'iframe' && Boolean(project.externalUrl));
  }, [project.id, uploadedScreenshotUrl, project.previewMode, project.externalUrl]);

  const currentScreenshotUrl = uploadedScreenshotUrl && !uploadedImageFailed
    ? uploadedScreenshotUrl
    : automaticScreenshotUrl && !automaticImageFailed
      ? automaticScreenshotUrl
      : '';
  const isAutomaticScreenshot = Boolean(currentScreenshotUrl && currentScreenshotUrl === automaticScreenshotUrl && currentScreenshotUrl !== uploadedScreenshotUrl);
  const isConcept = !currentScreenshotUrl;

  function handleScreenshotError() {
    if (uploadedScreenshotUrl && !uploadedImageFailed) {
      setUploadedImageFailed(true);
    } else {
      setAutomaticImageFailed(true);
    }
  }

  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_70px_-34px_rgba(15,23,42,0.35)] ${className}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {showLivePreview && project.externalUrl ? (
          <iframe
            title={`${project.name} canlı site önizlemesi`}
            src={project.externalUrl}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-forms allow-scripts allow-popups allow-same-origin"
            className="h-full w-full border-0 bg-white"
          />
        ) : currentScreenshotUrl ? (
          <img
            src={currentScreenshotUrl}
            alt={project.altText || `${project.name} web sitesi ekran görüntüsü`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            onError={handleScreenshotError}
          />
        ) : (
          <ProjectThumbnail variant={project.thumbnail.variant} device="card" />
        )}

        <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/10 bg-slate-950/85 px-3 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-2 max-w-[55%] truncate text-[10px] font-medium text-slate-300">
            {project.externalUrl?.replace(/^https?:\/\//, '') || 'Silopi Dijital • Proje önizlemesi'}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            {project.externalUrl && (
              <button
                type="button"
                onClick={() => setShowLivePreview((value) => !value)}
                className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-bold text-white hover:bg-white/20"
                title={showLivePreview ? 'Ekran görüntüsüne dön' : 'Canlı siteyi kartta göster'}
                aria-label={showLivePreview ? `${project.name} ekran görüntüsünü göster` : `${project.name} canlı önizlemesini göster`}
              >
                {showLivePreview ? <ImageIcon className="h-3 w-3" /> : <Monitor className="h-3 w-3" />}
                {showLivePreview ? 'Görsel' : 'Canlı'}
              </button>
            )}
            {isArchived && <span className="rounded-lg bg-slate-700 px-2 py-1 text-[10px] font-bold text-white">Arşiv</span>}
            {!isArchived && project.status === 'live' && <span className="rounded-lg bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-200">Yayında</span>}
            {isConcept && !showLivePreview && <span className="inline-flex items-center gap-1 rounded-lg bg-slate-700 px-2 py-1 text-[10px] font-bold text-white"><Eye className="h-3 w-3" /> Konsept</span>}
          </div>
        </div>

        {showLivePreview && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-50/95 px-3 py-2 text-[10px] leading-4 text-amber-900">
            Canlı site güvenlik ayarları nedeniyle görüntülenmeyebilir. Böyle olursa ekran görüntüsüne dön veya siteyi yeni sekmede aç.
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-blue-600">{project.category}</span>
          <span className="text-xs font-medium text-slate-400">{isArchived ? 'Geçmiş proje' : project.status === 'live' ? 'Canlı proje' : 'Konsept'}</span>
        </div>
        <h3 className="mt-3 font-heading text-xl font-extrabold tracking-tight text-slate-950">{project.name}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-slate-500">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.services.slice(0, 4).map((service) => (
            <span key={service} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{service}</span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
          {project.externalUrl ? (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-600">
              Siteyi ziyaret et <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : isArchived ? (
            <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400"><Archive className="h-4 w-4" /> Arşiv kaydı</span>
          ) : (
            <span className="text-xs text-slate-400">Bağlantı eklenmedi</span>
          )}
          {uploadedScreenshotUrl && !uploadedImageFailed && (
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700"><ImageIcon className="h-3.5 w-3.5" /> Ekran görüntüsü</span>
          )}
          {isAutomaticScreenshot && (
            <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700"><ExternalLink className="h-3.5 w-3.5" /> Otomatik önizleme</span>
          )}
        </div>
      </div>
    </article>
  );
}
