import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from '../../../shared/ui/section-container/section-container.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-business-crm-page',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent],
  template: `
    <app-section-container
      headingLevel="h1"
      title="Business CRM"
      subtitle="Lead, invoice, support, and dashboard workflows for growing teams."
    >
      <div class="system-layout">
        <figure class="system-visual">
          <img
            src="/system-crm-workflow.svg"
            alt="Business CRM workflow from lead intake to support"
            width="1200"
            height="520"
            loading="eager"
            decoding="async"
          />
        </figure>

        <article class="system-panel">
          <h2>Modules</h2>
          <ul class="detail-list">
            <li *ngFor="let item of modules">{{ item }}</li>
          </ul>
        </article>

        <article class="system-panel">
          <h2>Who It Is For</h2>
          <ul class="detail-list">
            <li *ngFor="let item of audiences">{{ item }}</li>
          </ul>
        </article>

        <article class="system-panel">
          <h2>Implementation Timeline</h2>
          <ol class="timeline-list">
            <li *ngFor="let item of timeline">{{ item }}</li>
          </ol>
        </article>
      </div>
    </app-section-container>
  `,
  styleUrl: './business-crm.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessCrmPage implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly modules = [
    'Lead capture, ownership, and stage-based pipeline tracking',
    'Quotation, invoice, and collection visibility',
    'Support ticket routing with SLA tracking',
    'Operational dashboards for leadership and team execution',
  ];

  protected readonly audiences = [
    'Service businesses with distributed sales teams',
    'Operations heads managing handoffs across teams',
    'Founders requiring clean revenue and support visibility',
  ];

  protected readonly timeline = [
    'Week 1: Sales and support process audit',
    'Weeks 2-3: CRM stages, invoice flow, and SLA setup',
    'Week 4: Team onboarding and acceptance testing',
    'Week 5+: Production rollout with optimization sprints',
  ];

  ngOnInit(): void {
    // Full SEO: title, description, canonical, OG, Twitter, hreflang
    this.seo.setPageMeta({
      title: 'Business CRM India | Leads, Invoices, Support & Automation | CleanStacky',
      description:
        'CleanStacky Business CRM connects leads, quotations, invoicing, support and dashboards into one pipeline. Built for Indian SMBs that want predictable conversion and faster customer response.',
      keywords:
        'business CRM India, lead management software India, invoice software India, sales pipeline software India, small business CRM, support ticketing software India, CRM for SMB India, WhatsApp CRM India',
      url: '/systems/business-crm',
      image: 'https://cleanstacky.com/CST_LOGO.png',
      imageAlt: 'CleanStacky Business CRM — Leads, Invoices and Support pipeline dashboard',
      imageWidth: 1200,
      imageHeight: 630,
      type: 'website',
      ogTitle: 'Business CRM India | Leads, Invoices & Support | CleanStacky',
      ogDescription:
        'One CRM for leads, invoicing, support and dashboards. Built for Indian SMBs that need predictable conversion and faster customer response.',
    });

    // Breadcrumb structured data
    this.seo.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Systems', url: '/systems' },
      { name: 'Business CRM', url: '/systems/business-crm' },
    ]);

    // SoftwareApplication JSON-LD — enables rich results in Google Search
    this.seo.setJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CleanStacky Business CRM',
        operatingSystem: 'Web, Android, iOS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'CRM',
        url: 'https://cleanstacky.com/systems/business-crm',
        description:
          'Business CRM with lead pipeline, invoicing, support ticketing and operational dashboards for Indian SMBs.',
        featureList: [
          'Lead capture, ownership, and stage-based pipeline tracking',
          'Quotation and invoice generation with collection visibility',
          'Support ticket routing with SLA tracking',
          'Automated follow-up and alert workflows',
          'Operational dashboards for leadership and team execution',
        ],
        screenshot: 'https://cleanstacky.com/system-crm-workflow.svg',
        provider: {
          '@type': 'Organization',
          '@id': 'https://cleanstacky.com/#organization',
          name: 'CleanStacky Technologies',
          url: 'https://cleanstacky.com',
        },
        areaServed: { '@type': 'Country', name: 'India' },
        inLanguage: 'en-IN',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: '4999',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          url: 'https://cleanstacky.com/pricing',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '9',
          bestRating: '5',
          worstRating: '1',
        },
      },
      'jsonld-page',
    );

    // FAQ structured data — drives "People Also Ask" rich results
    this.seo.setFaq(
      [
        {
          question: 'What does CleanStacky Business CRM include?',
          answer:
            'CleanStacky Business CRM includes lead capture and stage-based pipeline tracking, quotation and invoice management, support ticket routing with SLA tracking, automated follow-up workflows, and operational dashboards — all in one system for Indian SMBs.',
        },
        {
          question: 'How does CleanStacky CRM improve lead conversion?',
          answer:
            'CleanStacky CRM assigns leads automatically, tracks each stage in the pipeline, triggers follow-up reminders, and gives leadership real-time visibility into the pipeline — resulting in 50% faster first response times for our clients.',
        },
        {
          question: 'Does CleanStacky CRM support invoicing and billing?',
          answer:
            'Yes. CleanStacky Business CRM includes quotation generation, invoice creation, and collection tracking so your sales and finance teams can manage the entire lead-to-payment cycle in one system.',
        },
        {
          question: 'Can the Business CRM integrate with WhatsApp?',
          answer:
            'Yes. CleanStacky CRM supports WhatsApp automation for follow-ups, lead notifications, and support responses — keeping your team and customers connected through familiar channels.',
        },
        {
          question: 'How long does Business CRM implementation take?',
          answer:
            'Business CRM implementation typically takes 4-5 weeks: sales and support process audit in week 1, CRM stages and invoice flow setup in weeks 2-3, team onboarding in week 4, and production rollout from week 5.',
        },
        {
          question: 'What is the pricing for CleanStacky Business CRM?',
          answer:
            'Pricing for CleanStacky Business CRM starts at ₹4,999/month with a one-time setup fee from ₹30,000 to ₹60,000 depending on modules and team size. Visit the pricing page for full details.',
        },
      ],
      'jsonld-faq',
    );
  }
}
