import { RouterOutlet, NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { DemoModalComponent } from './shared/ui/demo-modal/demo-modal.component';
import { SeoService, SeoConfig } from './core/services/seo.service';
import { SessionTimeoutService } from './core/services/session-timeout.service';
import { filter } from 'rxjs/operators';

interface RouteSeoData extends Partial<SeoConfig> {
  /** Route path prefix used to build canonical URL (eg. "/about"). */
  path?: string;
  /** Per-page JSON-LD schema (single). */
  schema?: Record<string, unknown>;
  schemaId?: string;
  /** Multiple schemas if needed. */
  schemas?: Array<{ id: string; data: Record<string, unknown> }>;
  /** Optional breadcrumb list. */
  breadcrumbs?: Array<{ name: string; url: string }>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, DemoModalComponent],
})
export class App {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly sessionTimeout = inject(SessionTimeoutService);

  constructor() {
    this.sessionTimeout.init();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        let active = this.route.firstChild;
        while (active?.firstChild) {
          active = active.firstChild;
        }

        const data = active?.snapshot.data as RouteSeoData | undefined;
        if (!data) return;

        // Clear stale dynamic JSON-LD before applying new ones so we don't
        // leak FAQ or schema data from a previously visited page.
        this.seo.clearDynamicJsonLd();

        // Apply SEO if the route declared title + description.
        if (data.title && data.description) {
          this.seo.setPageMeta({
            title: data.title,
            description: data.description,
            url: data.path ?? data.url,
            keywords: data.keywords,
            image: data.image,
            imageAlt: data.imageAlt,
            type: data.type,
            noindex: data.noindex,
            author: data.author ?? 'CleanStacky Technologies',
            twitterSite: data.twitterSite,
            twitterCreator: data.twitterCreator,
          });
        }

        // Single schema.
        if (data.schema) {
          this.seo.setJsonLd(data.schema, data.schemaId ?? 'jsonld-page');
        }

        // Multiple schemas.
        if (data.schemas) {
          data.schemas.forEach(({ id, data: schemaData }) => this.seo.setJsonLd(schemaData, id));
        }

        // Breadcrumbs.
        if (data.breadcrumbs && data.breadcrumbs.length > 0) {
          this.seo.setBreadcrumbs(data.breadcrumbs);
        }
      });
  }
}
