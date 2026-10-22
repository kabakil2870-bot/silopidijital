import { useEffect, useState } from 'react';
import { getAbsoluteUrl } from '@/config/site';

interface SEOOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
}

export function useSEO({ title, description, canonicalPath, ogType = 'website' }: SEOOptions) {
  const [cachedTitle] = useState(title);

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const [, name] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
        if (name) {
          const [key, val] = selector.match(/\[(.+?)="(.+?)"\]/)!.slice(1);
          el.setAttribute(key, val);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', ogType);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    const canonicalEl = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (canonicalPath) {
      const absoluteUrl = getAbsoluteUrl(canonicalPath);
      if (absoluteUrl) {
        if (!canonicalEl) {
          const el = document.createElement('link');
          el.rel = 'canonical';
          document.head.appendChild(el);
          el.href = absoluteUrl;
        } else {
          canonicalEl.href = absoluteUrl;
        }
      } else if (canonicalEl) {
        canonicalEl.remove();
      }
    } else if (canonicalEl) {
      canonicalEl.remove();
    }

    const ogImageEl = document.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement | null;
    const ogImageUrl = getAbsoluteUrl('/og-image.svg');
    if (ogImageUrl) {
      if (!ogImageEl) {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:image');
        document.head.appendChild(el);
        el.setAttribute('content', ogImageUrl);
      } else {
        ogImageEl.setAttribute('content', ogImageUrl);
      }
    }

    const twitterImageEl = document.querySelector(
      'meta[name="twitter:image"]'
    ) as HTMLMetaElement | null;
    if (ogImageUrl) {
      if (!twitterImageEl) {
        const el = document.createElement('meta');
        el.setAttribute('name', 'twitter:image');
        document.head.appendChild(el);
        el.setAttribute('content', ogImageUrl);
      } else {
        twitterImageEl.setAttribute('content', ogImageUrl);
      }
    }

    return () => {
      document.title = 'Silopi Dijital | Silopi ve Cizre Web Tasarım';
    };
  }, [title, description, canonicalPath, ogType, cachedTitle]);
}
