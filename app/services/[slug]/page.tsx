import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { serviceLandingPages } from '@/data/serviceLandingPages';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return serviceLandingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = serviceLandingPages.find((item) => item.slug === slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      url: absoluteUrl(`/services/${page.slug}`),
      title: `${page.metaTitle} | ${SITE_NAME}`,
      description: page.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.metaTitle} | ${SITE_NAME}`,
      description: page.metaDescription,
    },
  };
}

export default async function ServiceLandingPage({ params }: Props) {
  const { slug } = await params;
  const page = serviceLandingPages.find((item) => item.slug === slug);

  if (!page) notFound();

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absoluteUrl(`/services/${page.slug}#service`),
    name: page.title,
    description: page.metaDescription,
    provider: { '@id': absoluteUrl('/#business') },
    areaServed: [
      { '@type': 'City', name: 'Oakland' },
      { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
      { '@type': 'State', name: 'California' },
    ],
    url: absoluteUrl(`/services/${page.slug}`),
    mainEntityOfPage: absoluteUrl(`/services/${page.slug}`),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-dark pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <Link
            href="/services"
            className="inline-flex items-center text-xs font-bold text-coolgray uppercase tracking-widest hover:text-cream transition-colors mb-10 focus-ring rounded-sm"
          >
            ← All Services
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr] gap-10 lg:gap-20 items-end">
            <div>
              <p className="section-eyebrow-light mb-4">{page.eyebrow}</p>
              <h1 className="font-heading font-extrabold text-cream text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-6 max-w-4xl">
                {page.h1}
              </h1>
              <p className="text-coolgray text-base lg:text-lg leading-relaxed max-w-2xl">
                {page.intro}
              </p>
            </div>
            <div className="bg-charcoal p-6 lg:p-8">
              <p className="text-xs font-bold text-lightblue uppercase tracking-widest mb-4">
                Fast Quote Info
              </p>
              <p className="text-cream/75 text-sm leading-relaxed mb-6">
                Send dimensions, location, deadline, artwork status, and install needs. We'll help confirm material, production method, and schedule.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center w-full px-6 py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-24" aria-label={`${page.title} details`}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-line-dark bg-charcoal">
            <div className="bg-cream p-6 lg:p-9">
              <h2 className="font-heading font-extrabold text-dark text-2xl tracking-tight mb-5">
                Best for
              </h2>
              <ul className="space-y-3">
                {page.bestFor.map((item) => (
                  <li key={item} className="text-gray text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream p-6 lg:p-9">
              <h2 className="font-heading font-extrabold text-dark text-2xl tracking-tight mb-5">
                Capabilities
              </h2>
              <ul className="space-y-3">
                {page.capabilities.map((item) => (
                  <li key={item} className="text-gray text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-cream p-6 lg:p-9">
              <h2 className="font-heading font-extrabold text-dark text-2xl tracking-tight mb-5">
                Process
              </h2>
              <ol className="space-y-3">
                {page.process.map((item) => (
                  <li key={item} className="text-gray text-sm leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark py-14 lg:py-24" aria-labelledby="faq-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-16">
            <div>
              <p className="section-eyebrow-light mb-3">Questions</p>
              <h2
                id="faq-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter"
              >
                What clients<br />usually ask.
              </h2>
            </div>
            <div className="divide-y divide-charcoal border-y border-charcoal">
              {page.faq.map(({ question, answer }) => (
                <details key={question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5">
                    <h3 className="font-heading font-extrabold text-cream text-lg tracking-tight">
                      {question}
                    </h3>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-xl font-bold text-lightblue transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="text-coolgray text-sm leading-relaxed pb-5 pr-12">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 lg:py-20" aria-label="Start a project">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="section-eyebrow-light mb-3">Oakland, CA Production</p>
            <h2 className="font-heading font-extrabold text-cream text-3xl lg:text-4xl tracking-tighter">
              Need {page.title.toLowerCase()}?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+15107073235"
              className="inline-flex items-center justify-center px-7 py-4 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream hover:bg-cream/5 transition-colors focus-ring"
            >
              Call (510) 707-3235
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-7 py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: absoluteUrl('/services'),
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: page.title,
                item: absoluteUrl(`/services/${page.slug}`),
              },
            ],
          }),
        }}
      />
    </div>
  );
}
