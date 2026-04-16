import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionContainerComponent } from '../../../shared/ui/section-container/section-container.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-clinic-system-page',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent],
  template: `
    <app-section-container
      headingLevel="h1"
      title="Clinic System"
      subtitle="Appointments, billing, reminders, and patient history in one clinic dashboard."
    >
      <div class="system-layout">
        <figure class="system-visual">
          <img
            src="/system-clinic-workflow.svg"
            alt="Clinic operations workflow from booking to follow-ups"
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
  styleUrl: './clinic-system.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicSystemPage implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly modules = [
    'Appointment calendar, doctor assignment, and queue control',
    'Billing, receipts, and payment reconciliation',
    'Patient visit history and staff notes',
    'Automated reminders and follow-up communication workflows',
  ];

  protected readonly audiences = [
    'Single-location and multi-doctor clinics',
    'Front-desk teams handling scheduling and billing',
    'Owners requiring daily operations visibility',
  ];

  protected readonly timeline = [
    'Week 1: Intake workflow mapping and form setup',
    'Weeks 2-3: Appointment, billing, and records configuration',
    'Week 4: Team onboarding, dry runs, and process validation',
    'Week 5+: Go-live and no-show optimization cycles',
  ];

  ngOnInit(): void {
    // Full SEO: title, description, canonical, OG, Twitter, hreflang
    this.seo.setPageMeta({
      title: 'Clinic Management Software India | Appointments, Billing & Reminders',
      description:
        'CleanStacky Clinic System handles appointments, billing, patient history and automated reminders. Reduce no-shows and simplify front-desk operations for clinics and diagnostics centres in India.',
      keywords:
        'clinic management software India, appointment scheduling software, clinic billing software India, patient management software, diagnostics centre software, appointment reminder software, clinic CRM India, no-show reduction software',
      url: '/systems/clinic-system',
      image: 'https://cleanstacky.com/CST_LOGO.png',
      imageAlt: 'CleanStacky Clinic System — Appointments, Billing and Reminder management dashboard',
      imageWidth: 1200,
      imageHeight: 630,
      type: 'website',
      ogTitle: 'Clinic Management Software India | Appointments & Billing | CleanStacky',
      ogDescription:
        'One system for clinic appointments, billing, patient history and automated reminders. Reduce no-shows and simplify operations for clinics across India.',
    });

    // Breadcrumb structured data
    this.seo.setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Systems', url: '/systems' },
      { name: 'Clinic System', url: '/systems/clinic-system' },
    ]);

    // SoftwareApplication JSON-LD — enables rich results in Google Search
    this.seo.setJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CleanStacky Clinic System',
        operatingSystem: 'Web, Android, iOS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Healthcare Management',
        url: 'https://cleanstacky.com/systems/clinic-system',
        description:
          'Clinic management system with appointments, billing, patient history and automated reminders for Indian clinics and diagnostics centres.',
        featureList: [
          'Appointment calendar and doctor assignment',
          'Queue management and waiting room control',
          'Billing, receipts, and payment reconciliation',
          'Patient visit history and staff notes',
          'Automated appointment reminders and follow-up workflows',
          'Clinic analytics dashboard',
        ],
        screenshot: 'https://cleanstacky.com/system-clinic-workflow.svg',
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
          reviewCount: '11',
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
          question: 'What does CleanStacky Clinic System include?',
          answer:
            'CleanStacky Clinic System includes appointment scheduling, doctor assignment and queue control, billing and payment reconciliation, patient visit history, and automated reminder workflows — all in one clinic dashboard.',
        },
        {
          question: 'How does the Clinic System reduce patient no-shows?',
          answer:
            'CleanStacky Clinic System sends automated appointment reminders via SMS and WhatsApp before scheduled visits, tracks confirmation status, and enables follow-up workflows — reducing no-shows by an average of 35% for our clinic clients.',
        },
        {
          question: 'Does the Clinic System work for multi-doctor practices?',
          answer:
            'Yes. CleanStacky Clinic System supports multiple doctors with individual appointment calendars, assignment workflows, and per-doctor billing and reporting — suitable for both single-location and multi-doctor clinics.',
        },
        {
          question: 'How long does clinic management software implementation take?',
          answer:
            'Clinic system implementation typically takes 4-5 weeks: workflow mapping in week 1, appointment and billing setup in weeks 2-3, team onboarding in week 4, and go-live with optimization from week 5.',
        },
        {
          question: 'Is the Clinic System available for diagnostics centres too?',
          answer:
            'Yes. CleanStacky Clinic System is used by both clinics and diagnostics centres, with support for sample tracking, report dispatch workflows, and billing for diagnostic tests.',
        },
        {
          question: 'What is the pricing for CleanStacky Clinic System?',
          answer:
            'Pricing for CleanStacky Clinic System starts at ₹4,999/month with a one-time setup fee from ₹30,000 to ₹60,000 depending on modules and clinic size. Visit the pricing page for full details.',
        },
      ],
      'jsonld-faq',
    );
  }
}
