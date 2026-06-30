import Link from 'next/link';
import Image from 'next/image';
import { projects, CLIENTS, SERVICES } from '@/data/projects';

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-end bg-dark pt-16"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* REPLACE: <Image src="/images/hero/hero-main.jpg" alt="" fill className="object-cover opacity-55" priority /> */}
          <div className="img-placeholder w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/10 to-dark/90" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 w-full pb-24 lg:pb-32">
          <div className="max-w-3xl">
            <p className="section-eyebrow-light mb-6">Oakland, CA — Bay Area Graphics Production</p>
            <h1
              id="hero-heading"
              className="font-heading font-extrabold text-cream text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tighter mb-8"
            >
              Graphics built<br />for real spaces.
            </h1>
            <p className="text-lightblue/80 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
              7th Creation Studio designs, produces, and installs wide-format graphics for exhibitions, events, retail, vehicles, and branded environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center px-7 py-4 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
              >
                Request a Quote
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center px-7 py-4 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream hover:bg-cream/5 transition-colors focus-ring"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section className="bg-dark border-t border-charcoal py-20 lg:py-24" aria-labelledby="services-intro-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

            <div>
              <p className="section-eyebrow-light">What We Do</p>
              <h2
                id="services-intro-heading"
                className="font-heading font-extrabold text-cream text-3xl lg:text-4xl tracking-tighter mb-4"
              >
                From files to<br />finished install.
              </h2>
              <Link
                href="/services"
                className="inline-flex items-center text-sm font-bold text-coolgray uppercase tracking-widest hover:text-cream transition-colors focus-ring rounded-sm"
              >
                All services →
              </Link>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SERVICES.filter((s) => !s.secondary).slice(0, 6).map((service) => (
                <div key={service.title}>
                  <h3 className="font-heading font-extrabold text-cream text-base tracking-tight mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-coolgray text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="bg-charcoal py-16 lg:py-20" aria-labelledby="clients-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <p className="section-eyebrow-light text-center mb-8">Clients &amp; Collaborators</p>

          <ul
            className="flex flex-wrap justify-center gap-x-10 gap-y-4"
            role="list"
            aria-label="Clients and collaborators"
          >
            {CLIENTS.map((client) => (
              <li key={client} className="text-coolgray text-sm font-semibold uppercase tracking-widest">
                {client}
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray text-center mt-8 max-w-xl mx-auto">
            Some work may be completed directly, through partners, or as part of larger event and production teams.
          </p>

        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="bg-navy py-20 lg:py-28" aria-labelledby="cta-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
          <p className="section-eyebrow-light mb-4">Get Started</p>
          <h2
            id="cta-heading"
            className="font-heading font-extrabold text-cream text-4xl lg:text-5xl xl:text-6xl tracking-tighter mb-6"
          >
            Ready to build<br />something?
          </h2>
          <p className="text-lightblue/80 text-lg max-w-xl mx-auto mb-10">
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
              className="inline-flex items-center px-8 py-5 border border-cream/30 text-cream font-bold text-sm uppercase tracking-widest hover:border-cream hover:bg-cream/5 transition-colors focus-ring"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
