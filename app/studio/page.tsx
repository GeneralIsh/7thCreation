import type { Metadata } from 'next';
import Link from 'next/link';
import { absoluteUrl } from '@/lib/seo';
import FadeIn from '@/components/FadeIn';
import {
  StatsBar,
  CapabilitiesGrid,
  ClientsWorkedList,
  ClientLogoStrip,
  EcosystemLinks,
} from '@/components/AnimatedStudioSections';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    '7th Creation Studio is a Bay Area large-format graphics production studio based in Oakland, CA. We design, produce, and install graphics for exhibitions, events, retail environments, and branded spaces.',
  alternates: { canonical: '/studio' },
  openGraph: {
    url: absoluteUrl('/studio'),
    title: 'Studio | 7th Creation Studio',
    description:
      'Bay Area large-format graphics production studio based in Oakland, CA, built for exhibition, event, retail, and branded environment installs.',
  },
};

export default function StudioPage() {
  return (
    <div className="min-h-screen pt-16">

      {/* ── Hero intro ── */}
      <section className="bg-dark pt-12 pb-14 lg:py-28" aria-labelledby="studio-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            <div>
              <FadeIn delay={0.05}>
                <p className="section-eyebrow-light mb-4">The Studio</p>
              </FadeIn>
              <FadeIn delay={0.12}>
                <h1
                  id="studio-heading"
                  className="font-heading font-extrabold text-cream text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-6"
                >
                  Production built<br />for the field.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-coolgray text-sm lg:text-base leading-relaxed mb-4">
                  7th Creation Studio is a large-format graphics production studio based in Oakland, CA. We design, produce, and install graphics that hold up in real spaces — arenas, hotels, retail storefronts, event venues, and branded environments.
                </p>
                <p className="text-coolgray text-sm lg:text-base leading-relaxed mb-4">
                  We operate on tight timelines and deliver clean results. Our team has executed at major venues and events across the Bay Area and beyond — from single-day installs to multi-location production runs.
                </p>
                <p className="text-coolgray text-sm lg:text-base leading-relaxed mb-8">
                  We're the operational production arm of the{' '}
                  <a href="https://interiorbond.com" target="_blank" rel="noopener noreferrer" className="text-lightblue hover:text-cream transition-colors">
                    Interior Bond
                  </a>{' '}
                  ecosystem — built to execute at the intersection of design and real-world fabrication.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/quote"
                    className="inline-flex items-center px-6 py-3 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
                  >
                    Start a Project
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center px-6 py-3 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream/60 hover:bg-cream/5 transition-colors focus-ring"
                  >
                    See Our Work
                  </Link>
                </div>
              </FadeIn>
            </div>

            <FadeIn from="right" delay={0.15}>
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[560px]">
                <div className="img-placeholder w-full h-full" aria-hidden="true" />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-charcoal" aria-label="Studio at a glance">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <StatsBar />
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="bg-cream py-14 lg:py-28" aria-labelledby="capabilities-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mb-10 lg:mb-16">
              <p className="section-eyebrow mb-3">Capabilities</p>
              <h2
                id="capabilities-heading"
                className="font-heading font-extrabold text-dark text-4xl lg:text-5xl tracking-tighter"
              >
                What the studio<br />can produce.
              </h2>
            </div>
          </FadeIn>
          <CapabilitiesGrid />
        </div>
      </section>

      {/* ── Field experience ── */}
      <section className="bg-dark py-14 lg:py-28" aria-labelledby="field-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">

            <FadeIn from="left">
              <div>
                <p className="section-eyebrow-light mb-3">Field Experience</p>
                <h2
                  id="field-heading"
                  className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter mb-6"
                >
                  We don't just<br />print and ship.
                </h2>
                <p className="text-coolgray text-sm lg:text-base leading-relaxed mb-4">
                  Our team shows up on-site to make sure the install is done right. Whether it's a tradeshow booth, a hotel lobby, a storefront takeover, or a large-scale event activation — we treat the install like a production.
                </p>
                <p className="text-coolgray text-sm lg:text-base leading-relaxed mb-6">
                  Tight access windows. Multi-day installs. High-traffic timelines. Last-minute production changes. We've navigated all of it and delivered clean results under pressure.
                </p>

                <div className="mb-8">
                  <p className="text-xs font-bold text-coolgray uppercase tracking-widest mb-4">
                    Clients We've Worked With
                  </p>
                  <ClientsWorkedList />
                </div>

                <Link
                  href="/quote"
                  className="inline-flex items-center px-6 py-3 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
                >
                  Start a Project
                </Link>
              </div>
            </FadeIn>

            <FadeIn from="right">
              <div>
                <div className="relative aspect-[4/3] mb-3">
                  <div className="img-placeholder w-full h-full" aria-hidden="true" />
                </div>
                <div className="relative aspect-[16/9]">
                  <div className="img-placeholder w-full h-full" aria-hidden="true" />
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Client logo strip ── */}
      <section className="bg-cream py-12 lg:py-20" aria-label="Clients">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <p className="section-eyebrow mb-8 text-center">Trusted By</p>
          </FadeIn>
          <ClientLogoStrip />
        </div>
      </section>

      {/* ── Interior Bond ecosystem ── */}
      <section className="bg-navy py-12 lg:py-20" aria-labelledby="ecosystem-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            <FadeIn from="left">
              <div>
                <p className="section-eyebrow-light mb-3">Part of Interior Bond</p>
                <h2
                  id="ecosystem-heading"
                  className="font-heading font-extrabold text-cream text-3xl lg:text-4xl tracking-tighter mb-4"
                >
                  Production that connects to the bigger picture.
                </h2>
                <p className="text-coolgray text-sm leading-relaxed">
                  7th Creation Studio is the fabrication and production arm of the{' '}
                  <a href="https://interiorbond.com" target="_blank" rel="noopener noreferrer" className="text-lightblue hover:text-cream transition-colors">
                    Interior Bond
                  </a>{' '}
                  creative ecosystem — a network of studios and platforms at the intersection of design, media, and experiential production. Our work doesn't stop at the print floor.
                </p>
              </div>
            </FadeIn>
            <EcosystemLinks />
          </div>
        </div>
      </section>

      {/* ── Contact block ── */}
      <section className="bg-dark py-14 lg:py-28" aria-labelledby="contact-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <p className="section-eyebrow-light mb-4">Get in Touch</p>
                <h2
                  id="contact-heading"
                  className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter mb-4"
                >
                  Let's talk<br />production.
                </h2>
                <p className="text-coolgray text-sm leading-relaxed">
                  Have a project, a deadline, or just a question about what's possible? Reach out directly or use the quote form and we'll get back to you fast.
                </p>
              </div>

              <address className="flex flex-col gap-5 not-italic">
                <a
                  href="mailto:studio@7thcreation.com"
                  className="text-lightblue text-lg font-semibold hover:text-cream transition-colors focus-ring rounded-sm"
                >
                  studio@7thcreation.com
                </a>
                <a
                  href="tel:+15107073235"
                  className="text-lightblue text-lg font-semibold hover:text-cream transition-colors focus-ring rounded-sm"
                >
                  (510) 707-3235
                </a>
                <p className="text-coolgray text-base">95 Linden St, Oakland, CA 94607</p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/quote"
                    className="inline-flex items-center px-6 py-3 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
                  >
                    Request a Quote
                  </Link>
                  <a
                    href="https://www.instagram.com/7thcreationstudio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream/60 hover:bg-cream/5 transition-colors focus-ring"
                  >
                    Instagram
                  </a>
                </div>
              </address>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
