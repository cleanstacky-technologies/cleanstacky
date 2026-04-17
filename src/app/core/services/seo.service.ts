import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

/**
 * Comprehensive SEO configuration used to fully control every page's
 * title, meta, Open Graph, Twitter, canonical, robots, hreflang, and
 * structured data. Every field is optional except title + description.
 */
export interface SeoConfig {
  /** Browser tab + search result title. Keep under 60 chars for best SERP display. */
  title: string;
  /** Meta description. Keep between 140-160 chars for best SERP display. */
  description: string;
  /** Canonical URL path (eg. "/about") or absolute ("https://..."). */
  url?: string;
  /** Comma-separated keywords (legacy but still used by some engines). */
  keywords?: string;
  /** Author name. */
  author?: string;
  /** OG image (absolute URL recommended). */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** og:type (website, article, product). */
  type?: 'website' | 'article' | 'product' | 'profile' | 'book';
  /** Page locale. */
  locale?: string;
  /** Overrides for OG. */
  ogTitle?: string;
  ogDescription?: string;
  /** Twitter card overrides. */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  /** Robots directive (defaults to index,follow...). */
  robots?: string;
  /** Article-only fields. */
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  /** hreflang alternates. */
  alternateLocales?: Array<{ hreflang: string; href: string }>;
  /** Whether to mark as noindex (for login, demo, etc.). */
  noindex?: boolean;
  /** @deprecated Prefer `url`. Kept for backwards compatibility with existing callers. */
  ogUrl?: string;
  /** @deprecated Prefer `type`. */
  ogType?: 'website' | 'article' | 'product' | 'profile' | 'book';
}

const SITE_URL = 'https://cleanstacky.com';
const DEFAULT_IMAGE = `${SITE_URL}/CST_LOGO.png`;
const DEFAULT_LOCALE = 'en_IN';
const DEFAULT_TWITTER = '@cleanstacky';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  /** Tracks JSON-LD script ids set via setJsonLd so they can be replaced/cleared. */
  private readonly jsonLdIds = new Set<string>();

  /**
   * Set the full set of SEO tags for the current page. Safe to call on every
   * route navigation — tags are updated in-place, not duplicated.
   */
  setPageMeta(config: SeoConfig): void {
    const absoluteUrl = this.resolveUrl(config.url ?? config.ogUrl);
    const ogTitle = config.ogTitle ?? config.title;
    const ogDescription = config.ogDescription ?? config.description;
    const image = config.image ?? DEFAULT_IMAGE;
    const imageAlt = config.imageAlt ?? config.title;
    const type = config.type ?? config.ogType ?? 'website';
    const locale = config.locale ?? DEFAULT_LOCALE;
    const robots = config.noindex
      ? 'noindex, nofollow'
      : config.robots ?? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    // Title
    this.title.setTitle(config.title);

    // Primary meta
    this.upsert('name', 'description', config.description);
    if (config.keywords) this.upsert('name', 'keywords', config.keywords);
    if (config.author) this.upsert('name', 'author', config.author);
    this.upsert('name', 'robots', robots);
    this.upsert('name', 'googlebot', robots);

    // Open Graph
    this.upsert('property', 'og:title', ogTitle);
    this.upsert('property', 'og:description', ogDescription);
    this.upsert('property', 'og:url', absoluteUrl);
    this.upsert('property', 'og:type', type);
    this.upsert('property', 'og:site_name', 'CleanStacky Technologies');
    this.upsert('property', 'og:locale', locale);
    this.upsert('property', 'og:image', image);
    this.upsert('property', 'og:image:secure_url', image);
    this.upsert('property', 'og:image:alt', imageAlt);
    if (config.imageWidth) this.upsert('property', 'og:image:width', String(config.imageWidth));
    if (config.imageHeight) this.upsert('property', 'og:image:height', String(config.imageHeight));

    // Twitter
    this.upsert('name', 'twitter:card', config.twitterCard ?? 'summary_large_image');
    this.upsert('name', 'twitter:site', config.twitterSite ?? DEFAULT_TWITTER);
    this.upsert('name', 'twitter:creator', config.twitterCreator ?? DEFAULT_TWITTER);
    this.upsert('name', 'twitter:title', ogTitle);
    this.upsert('name', 'twitter:description', ogDescription);
    this.upsert('name', 'twitter:image', image);
    this.upsert('name', 'twitter:image:alt', imageAlt);

    // Article metadata (only when type=article)
    if (type === 'article') {
      if (config.publishedTime) this.upsert('property', 'article:published_time', config.publishedTime);
      if (config.modifiedTime) this.upsert('property', 'article:modified_time', config.modifiedTime);
      if (config.section) this.upsert('property', 'article:section', config.section);
      if (config.author) this.upsert('property', 'article:author', config.author);
      (config.tags ?? []).forEach((tag) =>
        this.meta.addTag({ property: 'article:tag', content: tag }, false),
      );
    }

    // Canonical
    this.setCanonical(absoluteUrl);

    // Alternate hreflang
    if (config.alternateLocales && config.alternateLocales.length > 0) {
      this.setAlternates(config.alternateLocales);
    } else {
      this.setAlternates([
        { hreflang: 'en-in', href: absoluteUrl },
        { hreflang: 'en', href: absoluteUrl },
        { hreflang: 'x-default', href: absoluteUrl },
      ]);
    }
  }

  /**
   * Insert or update a JSON-LD script tag. Passing the same id twice replaces
   * the content of the existing node, so per-route changes don't leak.
   */
  setJsonLd(schema: Record<string, unknown> | Array<Record<string, unknown>>, id = 'jsonld-page'): void {
    const json = JSON.stringify(schema);
    const existing = this.document.getElementById(id);
    if (existing) {
      existing.textContent = json;
      this.jsonLdIds.add(id);
      return;
    }
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = json;
    this.document.head.appendChild(script);
    this.jsonLdIds.add(id);
  }

  /**
   * Convenience: emit a BreadcrumbList JSON-LD from a list of {name, url}.
   */
  setBreadcrumbs(items: Array<{ name: string; url: string }>): void {
    this.setJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: this.resolveUrl(item.url),
        })),
      },
      'jsonld-breadcrumbs',
    );
  }

  /**
   * Convenience: emit a FAQPage JSON-LD.
   */
  setFaq(faqs: Array<{ question: string; answer: string }>, id = 'jsonld-faq'): void {
    this.setJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      id,
    );
  }

  /**
   * Remove dynamic per-page JSON-LD scripts previously registered via setJsonLd.
   * Call this on navigation start before applying new ones to avoid stale data.
   */
  clearDynamicJsonLd(): void {
    const preserve = new Set(['jsonld-page']);
    for (const id of Array.from(this.jsonLdIds)) {
      if (preserve.has(id)) continue;
      const node = this.document.getElementById(id);
      if (node && node.parentNode) node.parentNode.removeChild(node);
      this.jsonLdIds.delete(id);
    }
  }

  // ------------------------- private helpers -------------------------

  private upsert(attr: 'name' | 'property', key: string, value: string): void {
    const selector = `${attr}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: key, content: value } as Record<string, string>, selector);
    } else {
      this.meta.addTag({ [attr]: key, content: value } as Record<string, string>, false);
    }
  }

  private setCanonical(href: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private setAlternates(alternates: Array<{ hreflang: string; href: string }>): void {
    const head = this.document.head;
    head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((node) => node.parentNode?.removeChild(node));
    alternates.forEach(({ hreflang, href }) => {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', this.resolveUrl(href));
      head.appendChild(link);
    });
  }

  private resolveUrl(url?: string): string {
    if (!url) {
      if (isPlatformBrowser(this.platformId)) {
        return this.document.location.href.split('#')[0].split('?')[0];
      }
      return SITE_URL + '/';
    }
    if (/^https?:\/\//i.test(url)) return url;
    const path = url.startsWith('/') ? url : '/' + url;
    return `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
  }
}
