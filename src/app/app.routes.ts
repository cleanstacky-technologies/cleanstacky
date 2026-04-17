import { Routes } from '@angular/router';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DemoComponent } from './pages/demo/demo.component';
import { DistributorDemoComponent } from './pages/distributor-demo/distributor-demo.component';
import { CrmDemoComponent } from './pages/crm-demo/crm-demo.component';
import { TextileDemoComponent } from './pages/textile-demo/textile-demo.component';
import { EcommerceAdminDemoComponent } from './pages/ecommerce-admin-demo/ecommerce-admin-demo.component';
import { EcommerceDemoComponent } from './pages/ecommerce-demo/ecommerce-demo.component';
import { B2cDemoComponent } from './pages/b2c-demo/b2c-demo.component';
import { demoAuthGuard } from './core/guards/demo-auth.guard';
import { adminAuthGuard } from './core/guards/admin-auth.guard';
import { AdminPage } from './pages/admin/admin.page';
import { LoginPage } from './pages/login/login.page';
import { ProtectedDemoPage } from './pages/protected-demo/protected-demo.page';
import { RequestAccessPage } from './pages/request-access/request-access.page';
import { SchoolDemoComponent } from './pages/school-demo/school-demo.component';

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://cleanstacky.com/#organization',
  name: 'CleanStacky Technologies',
  url: 'https://cleanstacky.com',
  logo: 'https://cleanstacky.com/CST_LOGO.png',
};

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    data: {
      title: 'CleanStacky Technologies | ERP, CRM & WhatsApp Automation for Indian SMBs',
      description:
        'CleanStacky builds School ERP, Clinic Management, Business CRM and WhatsApp automation systems for Indian schools, clinics and SMBs. Replace spreadsheets with one clean operating system — Bangalore based, delivered across India.',
      keywords:
        'school ERP software India, clinic management software India, business CRM India, WhatsApp automation India, ERP for SMB, Bangalore software company, CleanStacky Technologies, fee management software, appointment booking software',
      path: '/',
      image: 'https://cleanstacky.com/CST_LOGO.png',
      imageAlt: 'CleanStacky Technologies — Business systems for Indian SMBs',
      schemaId: 'jsonld-home-localbusiness',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://cleanstacky.com/#localbusiness',
        name: 'CleanStacky Technologies',
        url: 'https://cleanstacky.com',
        logo: 'https://cleanstacky.com/CST_LOGO.png',
        image: 'https://cleanstacky.com/CST_LOGO.png',
        telephone: '+91-000-000-0000',
        email: 'contact@cleanstacky.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bengaluru',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          postalCode: '560001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 12.9716,
          longitude: 77.5946,
        },
        areaServed: 'IN',
        priceRange: '₹₹',
      },
      breadcrumbs: [{ name: 'Home', url: '/' }],
    },
  },
  {
    path: 'systems',
    loadComponent: () => import('./pages/systems/systems.page').then((m) => m.SystemsPage),
    data: {
      title: 'Business Systems — ERP, CRM, Clinic, School & Automation | CleanStacky',
      description:
        'Explore CleanStacky business systems: School ERP, Clinic Management, Business CRM, workflow automation, mobile apps and e-commerce websites. Productized, measurable, built for Indian SMBs.',
      keywords:
        'business systems India, ERP software India, CRM software India, workflow automation India, clinic management software, school ERP India, mobile applications for retail, ecommerce websites India',
      path: '/systems',
      schemaId: 'jsonld-systems-collection',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CleanStacky Business Systems',
        url: 'https://cleanstacky.com/systems',
        description: 'Productized ERP, CRM and automation systems for Indian SMBs.',
        isPartOf: { '@id': 'https://cleanstacky.com/#website' },
        about: ORG_SCHEMA,
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Systems', url: '/systems' },
      ],
    },
  },
  {
    path: 'systems/school-erp',
    loadComponent: () =>
      import('./pages/systems/school-erp/school-erp.page').then((m) => m.SchoolErpPage),
    data: {
      title: 'School ERP Software India | Fee, Admission & Attendance Management',
      description:
        'CleanStacky School ERP unifies admissions, fee collection, attendance, parent communication and reporting into one system. Built for Indian schools seeking faster closure and cleaner admin control.',
      keywords:
        'school ERP software India, fee management software India, school admissions software, attendance management software, school management system India, parent communication software',
      path: '/systems/school-erp',
      schemaId: 'jsonld-school-erp',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CleanStacky School ERP',
        operatingSystem: 'Web, Android, iOS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'School Management',
        url: 'https://cleanstacky.com/systems/school-erp',
        description: 'School ERP with admissions, fee collection, attendance and reporting.',
        featureList: [
          'Admissions and student onboarding',
          'Fee collection with receipts and reminders',
          'Attendance and timetable management',
          'Parent communication logs',
          'Reports and compliance exports',
        ],
        provider: ORG_SCHEMA,
        areaServed: 'IN',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
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
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Systems', url: '/systems' },
        { name: 'School ERP', url: '/systems/school-erp' },
      ],
    },
  },
  {
    path: 'systems/clinic-system',
    loadComponent: () =>
      import('./pages/systems/clinic-system/clinic-system.page').then((m) => m.ClinicSystemPage),
    data: {
      title: 'Clinic Management Software India | Appointments, Billing & Reminders',
      description:
        'CleanStacky Clinic System handles appointments, billing, patient history and automated reminders. Reduce no-shows and simplify front-desk operations for clinics and diagnostics centres.',
      keywords:
        'clinic management software India, appointment scheduling software, clinic billing software India, patient management software, diagnostics centre software, appointment reminder software',
      path: '/systems/clinic-system',
      schemaId: 'jsonld-clinic-system',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CleanStacky Clinic System',
        operatingSystem: 'Web, Android, iOS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Healthcare Management',
        url: 'https://cleanstacky.com/systems/clinic-system',
        description: 'Clinic system with appointments, billing, patient history and reminders.',
        featureList: [
          'Appointment scheduling',
          'Billing and invoices',
          'Patient history and records',
          'Automated reminders',
          'Clinic analytics dashboard',
        ],
        provider: ORG_SCHEMA,
        areaServed: 'IN',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
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
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Systems', url: '/systems' },
        { name: 'Clinic System', url: '/systems/clinic-system' },
      ],
    },
  },
  {
    path: 'systems/business-crm',
    loadComponent: () =>
      import('./pages/systems/business-crm/business-crm.page').then((m) => m.BusinessCrmPage),
    data: {
      title: 'Business CRM India | Leads, Invoices, Support & Automation',
      description:
        'CleanStacky Business CRM connects leads, quotations, invoicing, support and dashboards into one pipeline. Built for Indian SMBs that want predictable conversion and response.',
      keywords:
        'business CRM India, lead management software India, invoice software India, sales pipeline software India, small business CRM, support ticketing software India',
      path: '/systems/business-crm',
      schemaId: 'jsonld-business-crm',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'CleanStacky Business CRM',
        operatingSystem: 'Web, Android, iOS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'CRM',
        url: 'https://cleanstacky.com/systems/business-crm',
        description: 'CRM with lead, invoice and support workflows for Indian SMBs.',
        featureList: [
          'Lead capture and pipeline',
          'Quotes and invoices',
          'Task and follow-up automation',
          'Support ticketing',
          'Dashboards and reporting',
        ],
        provider: ORG_SCHEMA,
        areaServed: 'IN',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
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
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Systems', url: '/systems' },
        { name: 'Business CRM', url: '/systems/business-crm' },
      ],
    },
  },
  {
    path: 'industries',
    loadComponent: () => import('./pages/industries/industry.page').then((m) => m.IndustryPage),
    data: {
      title: 'Industries We Serve — Schools, Clinics, Retail & SMBs | CleanStacky',
      description:
        'Industry-focused business systems for schools, clinics, diagnostics centres, textile, B2B and B2C companies across India. CleanStacky ERP, CRM and workflow automation adapts to your operations.',
      keywords:
        'industry software India, school software, clinic software, diagnostics software India, textile ERP India, B2B CRM, B2C automation India',
      path: '/industries',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Industries', url: '/industries' },
      ],
    },
  },
  {
    path: 'industries/:industry',
    loadComponent: () => import('./pages/industries/industry.page').then((m) => m.IndustryPage),
    data: {
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Industries', url: '/industries' },
      ],
    },
  },
  {
    path: 'case-studies',
    loadComponent: () =>
      import('./pages/case-studies/case-studies.page').then((m) => m.CaseStudiesPage),
    data: {
      title: 'ERP & CRM Case Studies India | Schools, Clinics & SMBs | CleanStacky',
      description:
        'Real delivery outcomes from CleanStacky ERP, CRM and workflow automation projects across schools, clinics and SMBs in India. See measurable improvements in operations and conversion.',
      keywords:
        'ERP case studies India, CRM case studies India, school ERP success story, clinic management case study, SMB automation India',
      path: '/case-studies',
      schemaId: 'jsonld-case-studies',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CleanStacky Case Studies',
        url: 'https://cleanstacky.com/case-studies',
        description: 'Outcomes from CleanStacky ERP and automation deliveries.',
        about: ORG_SCHEMA,
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Case Studies', url: '/case-studies' },
      ],
    },
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing.page').then((m) => m.PricingPage),
    data: {
      title: 'ERP, CRM & Automation Pricing India | Transparent Plans | CleanStacky',
      description:
        'Transparent pricing for CleanStacky School ERP, Clinic System, Business CRM and workflow automation. INR pricing with flexible SLA options for Indian SMBs.',
      keywords:
        'ERP pricing India, CRM pricing India, clinic software pricing, school ERP pricing, SMB software plans India',
      path: '/pricing',
      schemaId: 'jsonld-pricing',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'CleanStacky Business Systems',
        description: 'ERP, CRM, clinic and school management systems from CleanStacky.',
        brand: ORG_SCHEMA,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: '4999',
          highPrice: '49999',
          offerCount: '4',
          availability: 'https://schema.org/InStock',
          url: 'https://cleanstacky.com/pricing',
        },
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Pricing', url: '/pricing' },
      ],
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
    data: {
      title: 'About CleanStacky Technologies | Bangalore B2B Software Team',
      description:
        'CleanStacky Technologies is a Bangalore-based B2B software team delivering ERP, CRM and workflow automation systems across India. Meet our mission, team and delivery approach.',
      keywords:
        'about CleanStacky Technologies, Bangalore software company, B2B software team India, ERP development company India',
      path: '/about',
      schemaId: 'jsonld-about',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About CleanStacky Technologies',
        url: 'https://cleanstacky.com/about',
        mainEntity: ORG_SCHEMA,
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ],
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact CleanStacky Technologies | Book a Demo',
      description:
        'Book a demo, ask product questions or partner with CleanStacky. Our Bangalore team responds within one business day for ERP, CRM and workflow automation enquiries.',
      keywords:
        'contact CleanStacky, book ERP demo India, CRM demo India, clinic software enquiry, Bangalore software contact',
      path: '/contact',
      schemaId: 'jsonld-contact',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact CleanStacky Technologies',
        url: 'https://cleanstacky.com/contact',
        about: ORG_SCHEMA,
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' },
      ],
    },
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    data: {
      title: 'No-Show Cost Calculator for Clinics | CleanStacky',
      description:
        'Calculate the revenue lost from clinic no-shows and see how automated reminders reduce that cost. Free interactive calculator from CleanStacky Technologies.',
      keywords:
        'clinic no-show calculator, appointment reminder ROI calculator, no-show revenue loss calculator India',
      path: '/calculator',
      schemaId: 'jsonld-calculator',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Clinic No-Show Cost Calculator',
        url: 'https://cleanstacky.com/calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      },
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Calculator', url: '/calculator' },
      ],
    },
  },
  {
    path: 'request-access',
    component: RequestAccessPage,
    data: {
      title: 'Request Demo Access | CleanStacky Technologies',
      description:
        'Request access to CleanStacky product demos for School ERP, Clinic System and Business CRM.',
      path: '/request-access',
      noindex: true,
    },
  },
  {
    path: 'login',
    component: LoginPage,
    data: {
      title: 'Login | CleanStacky Technologies',
      description: 'Secure login for CleanStacky demo and admin users.',
      path: '/login',
      noindex: true,
    },
  },
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [adminAuthGuard],
    data: {
      title: 'Admin | CleanStacky Technologies',
      description: 'CleanStacky administration.',
      path: '/admin',
      noindex: true,
    },
  },
  {
    path: 'demo',
    component: ProtectedDemoPage,
    canActivate: [demoAuthGuard],
    data: { noindex: true },
  },
  { path: 'demo/clinic', component: DemoComponent, data: { noindex: true } },
  { path: 'demo/calculator', component: CalculatorComponent, data: { noindex: true } },
  { path: 'demo/school', component: SchoolDemoComponent, data: { noindex: true } },
  { path: 'demo/ecommerce', component: EcommerceDemoComponent, data: { noindex: true } },
  { path: 'demo/ecommerce-admin', component: EcommerceAdminDemoComponent, data: { noindex: true } },
  { path: 'demo/distributor', component: DistributorDemoComponent, data: { noindex: true } },
  { path: 'demo/textile', component: TextileDemoComponent, data: { noindex: true } },
  { path: 'demo/crm', component: CrmDemoComponent, data: { noindex: true } },
  { path: 'demo/b2c', component: B2cDemoComponent, data: { noindex: true } },
  {
    path: '**',
    redirectTo: '',
  },
];
