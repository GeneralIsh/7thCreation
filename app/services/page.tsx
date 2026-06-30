import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Services',
  description:
    '7th Creation Studio offers exhibition & experiential display graphics, environmental graphics, wide-format print production, retail & storefront graphics, vehicle wraps, apparel & DTF, and installation services.',
};

export default function ServicesPage() {
  const primary = SERVICES.filter((s) => !s.secondary);
  const secondary = SERVICES.filter((s) => s.secondary);

  return (
    <div className="bg-cream min-h-screen pt-16">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28">

        <div className="mb-16">
          <p className="section-eyebrow">What We Do</p>
          <h1 className="font-heading font-extrabold text-dark text-5xl lg:text-6xl tracking-tighter mb-6">
            From files to<br />finished install.
          </h1>
          <p className="text-gray text-lg max-w-xl leading-relaxed">
            End-to-end graphics production — design, print, fabricate, and install. We work with agencies, brands, event teams, and production houses across the Bay Area.
          </p>
        </div>

        {/* Primary services grid */}
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

        {/* Secondary / site services — full width */}
        {secondary.map((service) => (
          <div key={service.title} className="bg-charcoal/10 border border-silver p-8 lg:p-10 mb-16">
            <h2 className="font-heading font-extrabold text-dark text-xl lg:text-2xl tracking-tight mb-4">
              {service.title}
            </h2>
            <p className="text-gray text-sm leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>
        ))}

        {/* CTA */}
        <div className="border-t border-silver pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-3">Start a Project</p>
              <h2 className="font-heading font-extrabold text-dark text-4xl lg:text-5xl tracking-tighter mb-4">
                Have a project<br />coming up?
              </h2>
              <p className="text-gray text-base leading-relaxed">
                Send us your specs and we'll put together a quote. Rush production, large-format runs, complex installs — we handle it.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-7 py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-dark hover:text-cream transition-colors focus-ring"
              >
                Request a Quote
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-7 py-4 border border-silver text-dark font-bold text-sm uppercase tracking-widest hover:border-dark hover:bg-dark/5 transition-colors focus-ring"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
