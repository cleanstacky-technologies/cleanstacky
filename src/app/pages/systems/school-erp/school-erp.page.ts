import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from '../../../shared/ui/section-container/section-container.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-school-erp-page',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent],
  template: `
    <app-section-container
      headingLevel="h1"
      title="School ERP"
      subtitle="Admissions, fees, attendance, receipts and reports in one integrated workflow."
    >
      <div class="system-layout">
        <figure class="system-visual">
          <img
            src="/system-school-workflow.svg"
            alt="School ERP workflow from admission to reporting"
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
  styleUrl: './school-erp.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolErpPage implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly modules = [
    'Admission tracking, seat allocation, and application review',
    'Fee plans, invoices, receipts, and overdue follow-up',
    'Attendance, transport, and role-based staff operations',
    'Finance, closure, and management reporting dashboards',
  ];

  protected readonly audiences = [
    'School groups with multi-grade fee operations',
    'Principals and administrators managing daily closures',
    'Accounts teams requiring reliable reconciliation',
  ];

  protected readonly timeline = [
    'Week 1: Process discovery and data mapping',
    'Weeks 2-3: Module setup and workflow configuration',
    'Week 4: Data migration, role training, and pilot run',
    'Week 5+: Go-live support and continuous improvements',
  ];

  ngOnInit(): void {
    // Full SEO: title, description, canonical, OG, Twitter, hreflang
    this.seo.setPageMeta({
      title: 'School ERP Software India | Fee, Admission & Attendance Management',
      description:
        'CleanStacky School ERP unifies admissions, fee collection, attendance, parent communication and reporting into one system. Built for Indian schools seeking faster closure and cleaner admin control.',
      keywords:
        'school ERP software India, fee management software India, school admissions software, attendance management software, school management system India, parent communication software, school fee collection India',
      url: '/systems/school-erp',
      image: 'https://cleanstacky.com/CST_LOGO.png',
      imageAlt: 'CleanStacky School ERP — Admissions, Fees and Attendance management dashboard',
      imageWidth: 1200,
      imageHeight: 630,
      type: 'website',
      ogTitle: 'School ERP Software India | Fee, Admission & Attendance | CleanStacky',
      ogDescription:
        'One system for school admissions, fee collection, attendance and reporting. Built for Indian schools. Faster fee closure and cleaner admin control.',
    });

    // Breadcrumb structured data
    this.seo.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Systems', url: '/systems' },
      { name: 'School ERP', url: '/systems/school-erp' },
    ]);

    // SoftwareApplication JSON-LD — enables rich results in Google Search
    this.seo.setJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CleanStacky School ERP',
        operatingSystem: 'Web, Android, iOS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'School Management System',
        url: 'https://cleanstacky.com/systems/school-erp',
        description:
          'School ERP with admissions, fee collection, attendance and reporting for Indian schools.',
        featureList: [
          'Admissions and student onboarding',
          'Fee collection with receipts and automated reminders',
          'Attendance and timetable management',
          'Parent communication and notification logs',
          'Management reporting and compliance exports',
        ],
        screenshot: 'https://cleanstacky.com/system-school-workflow.svg',
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
          ratingValue: '4.9',
          reviewCount: '14',
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
          question: 'What does CleanStacky School ERP include?',
          answer:
            'CleanStacky School ERP includes admissions tracking, fee collection with receipts and reminders, attendance and timetable management, parent communication logs, and management reporting dashboards — all in one system.',
        },
        {
          question: 'How long does it take to implement the School ERP?',
          answer:
            'Most school ERP implementations are completed in 4-5 weeks: process discovery and data mapping in week 1, module setup in weeks 2-3, data migration and training in week 4, and go-live support from week 5 onwards.',
        },
        {
          question: 'Can the School ERP handle multiple grades and fee structures?',
          answer:
            'Yes. CleanStacky School ERP supports multi-grade fee plans, class-wise attendance, and role-based access for staff and administrators across different departments.',
        },
        {
          question: 'Is the School ERP available on mobile?',
          answer:
            'Yes. CleanStacky School ERP works on web browsers and is accessible on Android and iOS devices for field staff and administrators who need mobile access.',
        },
        {
          question: 'What is the pricing for CleanStacky School ERP?',
          answer:
            'Pricing for CleanStacky School ERP starts at ₹4,999/month with a one-time setup fee ranging from ₹30,000 to ₹60,000 depending on modules and number of users. Visit our pricing page for full details.',
        },
      ],
      'jsonld-faq',
    );
  }
}
