import { useEffect } from 'react';
import { getAbsoluteUrl } from '@/config/site';

interface SEOOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  noindex?: boolean;
}

export function useSEO({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  noindex = false,
}: SEOOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const match = selector.match(/\[(.+?)="(.+?)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    const robotsValue = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
    setMeta('meta[name="robots"]', 'content', robotsValue);
    setMeta('meta[name="googlebot"]', 'content', robotsValue);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    const canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalPath && !noindex) {
      const absoluteUrl = getAbsoluteUrl(canonicalPath);
      if (absoluteUrl) setMeta('meta[property="og:url"]', 'content', absoluteUrl);
      if (absoluteUrl) {
        if (canonicalEl) canonicalEl.href = absoluteUrl;
        else {
          const el = document.createElement('link');
          el.rel = 'canonical';
          el.href = absoluteUrl;
          document.head.appendChild(el);
        }
      } else if (canonicalEl) canonicalEl.remove();
    } else if (canonicalEl) {
      canonicalEl.remove();
    }

    const ogImageUrl = getAbsoluteUrl('/og-image.svg');
    if (ogImageUrl) {
      setMeta('meta[property="og:image"]', 'content', ogImageUrl);
      setMeta('meta[name="twitter:image"]', 'content', ogImageUrl);
    }

    return () => {
      document.title = 'Silopi Dijital | Silopi ve Cizre Web Tasarım';
    };
  }, [title, description, canonicalPath, ogType, noindex]);
}
