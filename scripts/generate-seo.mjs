#!/usr/bin/env node
/**
 * generate-seo.mjs
 *
 * Powerful SEO asset generator that runs after the Angular build.
 *
 *  - Reads every static route from src/app/app.routes.ts and
 *    src/prerender-routes.txt and merges them into a deduped set.
 *  - Emits a comprehensive public/sitemap.xml with lastmod, changefreq,
 *    priority, alternates (hreflang), and image entries for the home page.
 *  - Emits a public/robots.txt that allows search engines, blocks private
 *    paths, references the sitemap, and sets reasonable crawler hints.
 *  - Emits a public/humans.txt (nice-to-have, boosts brand recall).
 *  - Syncs copies into dist/.../browser if that directory exists so the
 *    built artifact is immediately deploy-ready.
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const baseUrl = 'https://cleanstacky.com';
const blockPrefixes = ['/admin', '/login', '/request-access', '/demo', '/private'];
const publicDir = path.join(repoRoot, 'public');

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------
const readIfExists = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
};

const normalizeRoute = (route) => {
  if (!route) return '/';
  let normalized = route.trim();
  if (!normalized) return '/';
  if (!normalized.startsWith('/')) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/{2,}/g, '/');
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.replace(/\/+$/, '');
  }
  return normalized;
};

// ---------------------------------------------------------------------------
// Route discovery
// ---------------------------------------------------------------------------
const appRoutesPath = path.join(repoRoot, 'src', 'app', 'app.routes.ts');
const prerenderPath = path.join(repoRoot, 'src', 'prerender-routes.txt');
const appRoutesContent = readIfExists(appRoutesPath);
const prerenderContent = readIfExists(prerenderPath);

const routeSet = new Set();

// Pull any literal path: '...' from app.routes.ts (skip **, dynamic segments).
const routeRegex = /path:\s*'([^']+)'/g;
let match;
while ((match = routeRegex.exec(appRoutesContent)) !== null) {
  const route = match[1];
  if (route === '**') continue;
  if (route.includes(':')) continue;
  routeSet.add(normalizeRoute(route));
}

// Pull any route listed in prerender-routes.txt (including industry slugs).
prerenderContent
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .forEach((route) => routeSet.add(normalizeRoute(route)));

const routes = [...routeSet]
  .filter((route) => !blockPrefixes.some((prefix) => route === prefix || route.startsWith(`${prefix}/`)))
  .filter((route) => !route.includes(':'))
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

// ---------------------------------------------------------------------------
// Priority + changefreq rules
// ---------------------------------------------------------------------------
const getPriority = (route) => {
  if (route === '/') return '1.0';
  if (route.startsWith('/systems/') || route.startsWith('/industries/')) return '0.9';
  if (['/systems', '/industries', '/case-studies', '/pricing'].includes(route)) return '0.9';
  if (['/about', '/contact'].includes(route)) return '0.8';
  return '0.7';
};

const getChangefreq = (route) => {
  if (route === '/') return 'daily';
  if (route.startsWith('/systems/') || route.startsWith('/industries/')) return 'weekly';
  if (['/case-studies', '/pricing'].includes(route)) return 'weekly';
  return 'monthly';
};

const today = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Sitemap (with image entries on homepage)
// ---------------------------------------------------------------------------
const urlEntries = routes
  .map((route) => {
    const priority = getPriority(route);
    const changefreq = getChangefreq(route);
    const loc = `${baseUrl}${route === '/' ? '/' : route}`;

    const alternates = `    <xhtml:link rel="alternate" hreflang="en-in" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />`;

    const imageBlock =
      route === '/'
        ? `
    <image:image>
      <image:loc>${baseUrl}/CST_LOGO.png</image:loc>
      <image:title>CleanStacky Technologies</image:title>
      <image:caption>CleanStacky Technologies — Business systems for Indian SMBs</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/dashboard-preview-v2.svg</image:loc>
      <image:title>CleanStacky operations dashboard preview</image:title>
    </image:image>`
        : '';

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}${imageBlock}
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>
`;

// ---------------------------------------------------------------------------
// Sitemap index (lets us add more sitemaps later without changing robots.txt)
// ---------------------------------------------------------------------------
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

// ---------------------------------------------------------------------------
// robots.txt
// ---------------------------------------------------------------------------
const robots = `# CleanStacky Technologies - https://cleanstacky.com
# Generated on ${today}
# Allow all well-behaved crawlers, block private / authenticated areas.

User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /login
Disallow: /request-access
Disallow: /demo
Disallow: /demo/
Disallow: /private
Disallow: /*?*utm_
Disallow: /*?*sessionid
Disallow: /*?*ref=

# Large good-bots get first-class treatment
User-agent: Googlebot
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /demo

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /demo

User-agent: DuckDuckBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: YandexBot
Allow: /

# Throttle aggressive / non-essential crawlers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

User-agent: MJ12bot
Crawl-delay: 20

# AI crawlers (allowed — we want visibility in AI answers)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Host: ${baseUrl.replace(/^https?:\/\//, '')}

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-index.xml
`;

// ---------------------------------------------------------------------------
// humans.txt (nice-to-have, strengthens brand signals)
// ---------------------------------------------------------------------------
const humans = `/* TEAM */
Company: CleanStacky Technologies
Site: ${baseUrl}
Location: Bengaluru, Karnataka, India
Contact: contact@cleanstacky.com

/* THANKS */
Clients, partners and the Indian SMB community that trusts us
with their daily operations.

/* SITE */
Last update: ${today}
Language: English / Hindi / Kannada
Stack: Angular, TypeScript, SSR, Express, Supabase
Standards: HTML5, CSS3, JSON-LD, Open Graph, Schema.org
`;

// ---------------------------------------------------------------------------
// Write outputs
// ---------------------------------------------------------------------------
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
fs.writeFileSync(path.join(publicDir, 'humans.txt'), humans);

// Mirror into the built artifact so CI/CD or Netlify deploys pick them up
// without having to re-run the dev build.
const distBrowserCandidates = [
  path.join(repoRoot, 'dist', 'clenstacky', 'browser'),
  path.join(repoRoot, 'dist', 'cleanstacky-site', 'browser'),
];
distBrowserCandidates.forEach((distBrowser) => {
  if (fs.existsSync(distBrowser)) {
    fs.writeFileSync(path.join(distBrowser, 'sitemap.xml'), sitemap);
    fs.writeFileSync(path.join(distBrowser, 'sitemap-index.xml'), sitemapIndex);
    fs.writeFileSync(path.join(distBrowser, 'robots.txt'), robots);
    fs.writeFileSync(path.join(distBrowser, 'humans.txt'), humans);
  }
});

console.log(`[seo] sitemap.xml — ${routes.length} routes`);
console.log('[seo] robots.txt, sitemap-index.xml, humans.txt regenerated');
