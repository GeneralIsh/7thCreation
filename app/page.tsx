import Link from 'next/link';
import { SERVICES } from '@/data/projects';
import ClientMarquee from '@/components/ClientMarquee';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroSection />

      {/* ── SERVICES STRIP ── */}
      <section className="bg-dark border-t border-charcoal py-12 lg:py-24" aria-labelledby="services-intro-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">

            <div>
              <p className="section-eyebrow-light">Conceptualize. Create. Complete.</p>
              <h2
                id="services-intro-heading"
                className="font-heading font-extrabold text-cream text-3xl lg:text-4xl tracking-tighter mb-4"
              >
                From files to<br />finished install.
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-bold text-cream/50 uppercase tracking-widest hover:text-cream transition-colors focus-ring rounded-sm"
              >
                All services →
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {SERVICES.filter((s) => !s.secondary).slice(0, 6).map((service) => (
                <div key={service.title}>
                  <h3 className="font-heading font-extrabold text-cream text-base tracking-tight mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <ClientMarquee />

      {/* ── CTA BAND ── */}
      <section className="bg-navy py-14 lg:py-28" aria-labelledby="cta-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
          <p className="section-eyebrow-light mb-4">Get Started</p>
          <h2
            id="cta-heading"
            className="font-heading font-extrabold text-cream text-4xl lg:text-5xl xl:text-6xl tracking-tighter mb-6"
          >
            Ready to build<br />something?
          </h2>
          <p className="text-cream/60 text-base lg:text-lg max-w-xl mx-auto mb-8">
            Send us your project details and we'll get back to you with a quote. Large-format, tight timelines, complex installs — we're set up for it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center px-8 py-5 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
            >
              Request a Quote
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center px-8 py-5 border border-cream/25 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream/60 hover:bg-cream/5 transition-colors focus-ring"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
