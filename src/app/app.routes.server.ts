import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Known industry slugs used for prerendering /industries/:industry.
 * Keeping this list in sync with app.routes.ts and the IndustryPage data
 * means every industry page is served as static HTML with its own title,
 * description, canonical URL, and JSON-LD — hugely improving crawlability.
 */
const INDUSTRY_SLUGS = [
  'schools',
  'clinics',
  'diagnostics-centres',
  'textile-business',
  'b2b-business',
  'b2c-business',
  'any-business-tech-solutions',
  'construction',
  'agriculture',
  'services',
];

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'systems', renderMode: RenderMode.Prerender },
  { path: 'systems/school-erp', renderMode: RenderMode.Prerender },
  { path: 'systems/clinic-system', renderMode: RenderMode.Prerender },
  { path: 'systems/business-crm', renderMode: RenderMode.Prerender },
  { path: 'industries', renderMode: RenderMode.Prerender },
  {
    path: 'industries/:industry',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return INDUSTRY_SLUGS.map((industry) => ({ industry }));
    },
  },
  { path: 'case-studies', renderMode: RenderMode.Prerender },
  { path: 'pricing', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'calculator', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
