import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Services',
  description:
    '7th Creation Studio offers exhibition & experiential display graphics, environmental graphics, large-format print production, retail & storefront graphics, vehicle wraps, apparel & DTF, and installation services.',
};

export default function ServicesPage() {
  const primary = SERVICES.filter((s) => !s.secondary);
  const secondary = SERVICES.filter((s) => s.secondary);

  return (
    <div className="min-h-screen">

      {/* ── Page header (dark, consistent with other pages) ── */}
      <section className="bg-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <p className="section-eyebrow-light">What We Do</p>
          <h1 className="font-heading font-extrabold text-cream text-5xl lg:text-6xl tracking-tighter mb-6">
            From files to<br />finished install.
          </h1>
          <p className="text-coolgray text-lg max-w-xl leading-relaxed">
            End-to-end graphics production — design, print, and install. We work with agencies, brands, event teams, and production houses across the Bay Area.
          </p>
        </div>
      </section>

      {/* ── Primary services ── */}
      <section className="bg-cream py-20 lg:py-24" aria-label="Services list">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal mb-1.5">
            {primary.map((service) => (
              <div key={service.title} className="bg-cream p-8 lg:p-10">
                <h2 className="font-heading font-extrabold text-dark text-xl lg:text-2xl tracking-tight mb-4">
                  {service.title}
                </h2>
                <p className="text-gray text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Installation / secondary — full width */}
          {secondary.map((service) => (
            <div key={service.title} className="bg-charcoal/8 border border-silver p-8 lg:p-10">
              <h2 className="font-heading font-extrabold text-dark text-xl lg:text-2xl tracking-tight mb-4">
                {service.title}
              </h2>
              <p className="text-gray text-sm leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy py-20 lg:py-24" aria-labelledby="services-cta-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow-light mb-3">Start a Project</p>
              <h2
                id="services-cta-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter mb-4"
              >
                Have a project<br />coming up?
              </h2>
              <p className="text-coolgray text-base leading-relaxed">
                Send us your specs and we'll put together a quote. Rush production, large-format runs, complex installs — we handle it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-7 py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
              >
                Request a Quote
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-7 py-4 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream hover:bg-cream/5 transition-colors focus-ring"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
