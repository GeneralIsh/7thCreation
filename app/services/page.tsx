import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/data/projects';
import FadeIn from '@/components/FadeIn';
import AnimatedServiceGrid from '@/components/AnimatedServiceGrid';
import AnimatedProcessGrid from '@/components/AnimatedProcessGrid';
import AnimatedCalloutGrid from '@/components/AnimatedCalloutGrid';

export const metadata: Metadata = {
  title: 'Services',
  description:
    '7th Creation Studio offers end-to-end large-format graphics production — exhibition displays, environmental graphics, vehicle wraps, retail signage, DTF apparel, and on-site installation. Oakland, CA.',
};

const SUBSTRATES = [
  { name: 'Vinyl', uses: 'Wall graphics, window film, vehicle wraps, floor decals' },
  { name: 'Fabric', uses: 'Tension displays, backdrops, trade show graphics, soft signage' },
  { name: 'Rigid Board', uses: 'Gatorboard, foamcore, PVC, sintra — mounted prints and signage' },
  { name: 'Acrylic & Metal', uses: 'Dimensional letters, lobby signage, premium display graphics' },
  { name: 'Specialty Film', uses: 'Frosted, perforated, clear, chrome, and textured window films' },
  { name: 'DTF Transfer', uses: 'Apparel decoration, branded kits, short-run merch production' },
];

export default function ServicesPage() {
  const primary = SERVICES.filter((s) => !s.secondary);
  const secondary = SERVICES.filter((s) => s.secondary);

  return (
    <div className="min-h-screen">

      {/* ── Page header ── */}
      <section className="bg-dark pt-28 pb-14 lg:pt-40 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn delay={0.05}>
            <p className="section-eyebrow-light mb-4">What We Do</p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h1 className="font-heading font-extrabold text-cream text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-5">
              From files to<br />finished install.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-coolgray text-base max-w-xl leading-relaxed">
              End-to-end graphics production — design, print, and install. We work with agencies, brands, event teams, and production houses across the Bay Area and beyond.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Services grid ── */}
      <section className="bg-cream py-12 lg:py-24" aria-label="Services list">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          {/* Mobile: accordion (no animation needed) */}
          <div className="sm:hidden divide-y divide-silver border-t border-silver border-b mb-1.5">
            {[...primary, ...secondary].map((service) => (
              <details key={service.title} className="group">
                <summary className="flex items-center justify-between cursor-pointer py-4 list-none gap-3">
                  <h2 className="font-heading font-extrabold text-dark text-base tracking-tight leading-snug">
                    {service.title}
                  </h2>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-blue font-bold text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-gray text-sm leading-relaxed pb-4 pr-8">
                  {service.description}
                </p>
              </details>
            ))}
          </div>

          {/* Desktop: animated grid */}
          <AnimatedServiceGrid primary={primary} secondary={secondary} />

        </div>
      </section>

      {/* ── How we work ── */}
      <section className="bg-dark py-14 lg:py-28" aria-labelledby="process-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="mb-10 lg:mb-16">
              <p className="section-eyebrow-light mb-3">How We Work</p>
              <h2
                id="process-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter"
              >
                Simple process.<br />Clean execution.
              </h2>
            </div>
          </FadeIn>
          <AnimatedProcessGrid />
        </div>
      </section>

      {/* ── Substrates & materials ── */}
      <section className="bg-cream py-14 lg:py-28" aria-labelledby="substrates-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">

            <FadeIn from="left" className="lg:sticky lg:top-24">
              <p className="section-eyebrow mb-3">Materials</p>
              <h2
                id="substrates-heading"
                className="font-heading font-extrabold text-dark text-4xl tracking-tighter mb-4"
              >
                We work with the right substrate for the job.
              </h2>
              <p className="text-gray text-sm leading-relaxed">
                Material selection affects durability, finish, install method, and cost. We'll spec the right substrate based on your environment, timeline, and budget — not just what's easiest to print.
              </p>
            </FadeIn>

            <FadeIn from="right" className="lg:col-span-2">
              <div className="divide-y divide-silver border-t border-silver border-b">
                {SUBSTRATES.map(({ name, uses }) => (
                  <div key={name} className="grid grid-cols-5 gap-4 py-5 items-start">
                    <div className="col-span-2">
                      <p className="font-heading font-extrabold text-dark text-base tracking-tight">{name}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-gray text-sm leading-relaxed">{uses}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Rush & volume callout ── */}
      <section className="bg-charcoal py-10 lg:py-16" aria-label="Rush and volume production">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <AnimatedCalloutGrid />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-navy py-14 lg:py-24" aria-labelledby="services-cta-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <FadeIn>
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
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
