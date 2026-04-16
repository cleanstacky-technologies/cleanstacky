import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { UiButtonComponent } from '../../shared/ui/button/ui-button.component';

type IndustryCard = {
  slug: string;
  label: string;
  description: string;
  highlights: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

@Component({
  selector: 'app-industry-page',
  standalone: true,
  imports: [CommonModule, RouterLink, UiButtonComponent],
  templateUrl: './industry.page.html',
  styleUrl: './industry.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryPage implements OnInit {
  protected readonly industries: IndustryCard[] = [
    {
      slug: 'schools',
      label: 'Schools',
      description:
        'Admissions, fee collection, attendance, and parent communication workflows for school operations.',
      highlights: ['Faster fee closure', 'Cleaner admin control', 'Daily reporting visibility'],
    },
    {
      slug: 'clinics',
      label: 'Clinics',
      description:
        'Appointment, billing, and patient communication systems designed for smooth clinic execution.',
      highlights: ['Reduced no-shows', 'Faster front-desk flow', 'Cleaner billing'],
    },
    {
      slug: 'diagnostics-centres',
      label: 'Diagnostics Centres',
      description:
        'Booking, sample tracking, report dispatch, and billing workflows for diagnostics teams.',
      highlights: ['Sample status visibility', 'Faster report release', 'Better daily closure'],
    },
    {
      slug: 'textile-business',
      label: 'Textile Business',
      description: 'Order, stock, dispatch, and follow-up operations for textile businesses.',
      highlights: ['Order-to-dispatch control', 'Stock visibility', 'Less manual coordination'],
    },
    {
      slug: 'b2b-business',
      label: 'B2B Business',
      description:
        'Lead pipeline, proposal, invoicing, and support workflows for B2B teams.',
      highlights: ['Stronger pipeline governance', 'Faster proposal cycles', 'Post-sale visibility'],
    },
    {
      slug: 'b2c-business',
      label: 'B2C Business',
      description:
        'Customer response, order flow, support, and retention operations for B2C businesses.',
      highlights: ['Faster first response', 'Better order control', 'Retention automation'],
    },
    {
      slug: 'any-business-tech-solutions',
      label: 'Any Business (Tech + Solutions)',
      description:
        'Custom ERP, CRM, workflows, dashboards, and automation for any business needing operational systems.',
      highlights: ['Workflow-first implementation', 'Automation-ready operations', 'Role-based dashboards'],
    },
    {
      slug: 'construction',
      label: 'Construction',
      description:
        'Project tracking, billing, contractor management, and site operations systems for construction businesses.',
      highlights: ['Project visibility', 'Faster billing cycles', 'Contractor coordination'],
    },
    {
      slug: 'agriculture',
      label: 'Agriculture',
      description:
        'Order management, distribution tracking, and billing systems for agriculture businesses and farm producers.',
      highlights: ['Better stock visibility', 'Faster dispatch', 'Distribution control'],
    },
    {
      slug: 'services',
      label: 'Services',
      description:
        'Lead management, service scheduling, billing, and customer communication systems for service businesses.',
      highlights: ['Structured workflows', 'Faster response times', 'Clean billing operations'],
    },
  ];

  protected readonly faqs: FaqItem[] = [
    {
      question: 'Can you customize systems for our exact process?',
      answer:
        'Yes. We start with practical modules and customize workflows based on your operations.',
    },
    {
      question: 'Do you support workflow automation?',
      answer:
        'Yes. We implement reminder and alert workflows tied to real operational events.',
    },
    {
      question: 'Can we get web and mobile together?',
      answer: 'Yes. We can deliver web dashboards and mobile workflows as one connected system.',
    },
    {
      question: 'What is the typical implementation timeline?',
      answer:
        'Most phase-one implementations can start in a few weeks depending on scope and readiness.',
    },
    {
      question: 'Do you support integrations?',
      answer:
        'Yes. We integrate with billing, payments, and other operational tools where needed.',
    },
    {
      question: 'Do you provide support after launch?',
      answer:
        'Yes. We continue with fixes, improvements, and iteration based on usage metrics.',
    },
  ];

  protected selectedSlug = '';

  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly openFaqIndexes = new Set<number>();

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = params.get('industry') || '';
      this.selectedSlug = slug;

      const industryMeta: Record<string, { title: string; description: string; ogUrl: string; keywords?: string }> = {
        schools: {
          title: 'School ERP Software India — Admissions, Fees & Attendance | CleanStacky',
          description:
            'Manage admissions, fees, attendance and reporting in one system. Built for Indian schools by CleanStacky Technologies. Faster fee closure and cleaner admin control.',
          keywords:
            'school ERP software India, school fee management software, admissions and attendance software India, school management system, fee collection software India',
          ogUrl: 'https://cleanstacky.com/industries/schools',
        },
        clinics: {
          title: 'Clinic Management Software India — Appointments & Billing | CleanStacky',
          description:
            "Streamline clinic appointments, billing, reminders and patient history with CleanStacky's staff-friendly clinic system. Reduce no-shows and improve daily operations.",
          keywords:
            'clinic management software India, appointment billing reminders software, clinic CRM India, no-show reduction software, appointment scheduling India',
          ogUrl: 'https://cleanstacky.com/industries/clinics',
        },
        'diagnostics-centres': {
          title: 'Diagnostics Centre Management Software India | CleanStacky',
          description:
            'Automate appointment booking, sample tracking, report dispatch, reminders and revenue tracking for diagnostics centres in India. Faster report release and better daily closure.',
          keywords:
            'diagnostics centre software India, pathology booking and billing software, lab operations system India, diagnostics management system, sample tracking software India',
          ogUrl: 'https://cleanstacky.com/industries/diagnostics-centres',
        },
        'textile-business': {
          title: 'Textile Business ERP & CRM India | Order, Stock & Dispatch | CleanStacky',
          description:
            'Structured CRM, order tracking, billing, and inventory systems for textile businesses in India. Order-to-dispatch control with less manual coordination.',
          keywords:
            'textile business ERP India, textile CRM software, garment order inventory software India, textile order management system, fabric business software India',
          ogUrl: 'https://cleanstacky.com/industries/textile-business',
        },
        'b2b-business': {
          title: 'B2B Business CRM & Operations Software India | CleanStacky',
          description:
            'CRM, invoicing, proposal management, and support dashboards for B2B businesses. Stronger pipeline governance and faster proposal cycles for Indian B2B teams.',
          keywords:
            'B2B CRM software India, invoicing and pipeline software India, B2B operations dashboards, B2B lead management software, proposal management software India',
          ogUrl: 'https://cleanstacky.com/industries/b2b-business',
        },
        'b2c-business': {
          title: 'B2C Business Automation & CRM India | WhatsApp & Retail | CleanStacky',
          description:
            'WhatsApp automation, CRM, order management, and operations systems for B2C businesses in India. Faster first response and better customer retention.',
          keywords:
            'B2C CRM software India, retail automation software India, WhatsApp automation B2C businesses, retail operations software, customer retention automation India',
          ogUrl: 'https://cleanstacky.com/industries/b2c-business',
        },
        'any-business-tech-solutions': {
          title: 'Custom ERP & CRM for Any Business India | Tech Solutions | CleanStacky',
          description:
            'Custom ERP, CRM, workflow automation, dashboards and mobile applications for any business needing structured operational systems in India. Workflow-first implementation.',
          keywords:
            'custom ERP India, custom CRM software India, business workflow automation, custom business software India, operational dashboards India, bespoke software development India',
          ogUrl: 'https://cleanstacky.com/industries/any-business-tech-solutions',
        },
        construction: {
          title: 'Construction Business ERP & CRM India | CleanStacky Technologies',
          description:
            'Project tracking, billing, contractor management, and operations systems for construction businesses in India. Cleaner project visibility and faster billing cycles.',
          keywords:
            'construction ERP India, construction project management software, contractor management software India, construction billing software, site operations management India',
          ogUrl: 'https://cleanstacky.com/industries/construction',
        },
        agriculture: {
          title: 'Agriculture Business CRM & Operations Software India | CleanStacky',
          description:
            'Order management, distribution tracking, billing, and operations systems for agriculture businesses and farm producers in India. Better stock visibility and faster dispatch.',
          keywords:
            'agriculture business software India, farm operations management, agri CRM India, agriculture order management, farm produce distribution software India',
          ogUrl: 'https://cleanstacky.com/industries/agriculture',
        },
        services: {
          title: 'Service Business CRM & Operations Software India | CleanStacky',
          description:
            'Lead management, service scheduling, billing, and customer communication systems for service businesses in India. Structured workflows and faster response times.',
          keywords:
            'service business CRM India, service scheduling software, service billing software India, field service management India, service operations software',
          ogUrl: 'https://cleanstacky.com/industries/services',
        },
      };

      const meta = industryMeta[slug] ?? {
        title: 'Industries We Serve — Schools, Clinics, Retail & SMBs | CleanStacky',
        description:
          'CleanStacky builds business systems for schools, clinics, diagnostics centres, textile businesses, B2B and B2C companies in India.',
        keywords:
          'industry software solutions India, school clinic diagnostics CRM ERP India, B2B B2C business systems',
        ogUrl: 'https://cleanstacky.com/industries',
      };

      this.seo.setPageMeta({
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        url: meta.ogUrl,
      });

      // FAQPage structured data — huge SEO win for rich results on industry pages.
      this.seo.setFaq(this.faqs, 'jsonld-industry-faq');

      // Breadcrumb structured data
      const industryRecord = this.industries.find((i) => i.slug === slug);
      const breadcrumbs: Array<{ name: string; url: string }> = [
        { name: 'Home', url: '/' },
        { name: 'Industries', url: '/industries' },
      ];
      if (industryRecord) {
        breadcrumbs.push({ name: industryRecord.label, url: `/industries/${industryRecord.slug}` });

        // Service schema for the specific industry
        this.seo.setJsonLd(
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${industryRecord.label} Business Systems by CleanStacky`,
            description: industryRecord.description,
            serviceType: `${industryRecord.label} ERP and CRM`,
            provider: {
              '@type': 'Organization',
              name: 'CleanStacky Technologies',
              url: 'https://cleanstacky.com',
            },
            areaServed: { '@type': 'Country', name: 'India' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${industryRecord.label} Solutions`,
              itemListElement: industryRecord.highlights.map((highlight) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: highlight },
              })),
            },
          },
          'jsonld-industry-service',
        );
      }
      this.seo.setBreadcrumbs(breadcrumbs);
    });
  }

  protected isSelected(slug: string): boolean {
    return this.selectedSlug === slug;
  }

  protected toggleFaq(index: number): void {
    if (this.openFaqIndexes.has(index)) {
      this.openFaqIndexes.delete(index);
      return;
    }

    this.openFaqIndexes.add(index);
  }

  protected isFaqOpen(index: number): boolean {
    return this.openFaqIndexes.has(index);
  }

  protected trackBySlug(_: number, item: IndustryCard): string {
    return item.slug;
  }

  protected trackByIndex(index: number): number {
    return index;
  }
}
