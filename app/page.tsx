import Link from 'next/link';
import Image from 'next/image';
import { projects, CLIENTS, SERVICES } from '@/data/projects';
import WorkTile from '@/components/WorkTile';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-end bg-dark pt-16"
        aria-labelledby="hero-heading"
      >
        {/* Background image area */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* REPLACE: <Image src="/images/hero/hero-main.jpg" alt="" fill className="object-cover opacity-50" priority /> */}
          <div className="img-placeholder w-full h-full" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/20 to-dark/85" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 lg:px-10 w-full pb-20 lg:pb-28">
          <div className="max-w-3xl">
            <p className="section-eyebrow-light mb-6">Oakland, CA — Bay Area Graphics Production</p>
            <h1
              id="hero-heading"
              className="font-heading font-extrabold text-cream text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tighter mb-8"
            >
              Graphics built<br />
              for real spaces.
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

      {/* ── SELECTED WORK ── */}
      <section id="work" className="bg-dark py-20 lg:py-28" aria-labelledby="work-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="flex items-end justify-between mb-10 gap-6">
            <div>
              <p className="section-eyebrow-light">Selected Work</p>
              <h2
                id="work-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter"
              >
                Built, printed,<br />installed.
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden sm:inline-flex items-center text-sm font-bold text-coolgray uppercase tracking-widest hover:text-cream transition-colors focus-ring rounded-sm shrink-0"
            >
              View all work →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-line bg-silver">
            {featuredProjects.map((project, i) => (
              <WorkTile key={project.slug} project={project} priority={i < 3} />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/work"
              className="inline-flex items-center text-sm font-bold text-coolgray uppercase tracking-widest hover:text-cream transition-colors focus-ring rounded-sm"
            >
              View all work →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section id="services" className="bg-cream py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="section-eyebrow">What We Do</p>
              <h2
                id="services-heading"
                className="font-heading font-extrabold text-dark text-4xl lg:text-5xl tracking-tighter"
              >
                From files to<br />finished install.
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center text-sm font-bold text-blue uppercase tracking-widest hover:text-dark transition-colors focus-ring rounded-sm shrink-0"
            >
              All services →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal">
            {SERVICES.filter((s) => !s.secondary).map((service) => (
              <div key={service.title} className="bg-cream p-8">
                <h3 className="font-heading font-extrabold text-dark text-xl tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-gray text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── STUDIO INTRO ── */}
      <section id="studio" className="bg-dark py-20 lg:py-28" aria-labelledby="studio-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="section-eyebrow-light">The Studio</p>
              <h2
                id="studio-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter mb-6"
              >
                Production you can<br />count on.
              </h2>
              <p className="text-coolgray text-base leading-relaxed mb-6">
                Based out of Oakland's 95 Linden St facility, 7th Creation Studio handles wide-format production from design through delivery. We work on tight timelines, for complex installs, and for clients who need it right the first time.
              </p>
              <p className="text-coolgray text-base leading-relaxed mb-10">
                Our team has worked at arenas, hotels, creator spaces, retail storefronts, transit hubs, and outdoor events across the Bay Area and beyond.
              </p>
              <Link
                href="/studio"
                className="inline-flex items-center px-6 py-3 border border-blue/50 text-lightblue font-bold text-sm uppercase tracking-widest hover:border-lightblue hover:bg-blue/20 transition-colors focus-ring"
              >
                About the Studio →
              </Link>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px]">
              {/* REPLACE: <Image src="/images/studio/studio-production-floor.jpg" alt="7th Creation Studio production floor in Oakland" fill className="object-cover" /> */}
              <div className="img-placeholder w-full h-full" aria-hidden="true" />
            </div>

          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section className="bg-cream py-20 lg:py-24" aria-labelledby="clients-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <p className="section-eyebrow text-center mb-4">Clients & Collaborators</p>
          <h2
            id="clients-heading"
            className="font-heading font-extrabold text-dark text-3xl lg:text-4xl tracking-tighter text-center mb-12"
          >
            Brands that trust<br />the work.
          </h2>

          <ul
            className="flex flex-wrap justify-center gap-x-10 gap-y-4"
            role="list"
            aria-label="Clients and collaborators"
          >
            {CLIENTS.map((client) => (
              <li key={client} className="text-gray text-sm font-semibold uppercase tracking-widest">
                {client}
              </li>
            ))}
          </ul>

          <p className="text-xs text-coolgray text-center mt-10 max-w-xl mx-auto">
            Some work may be completed directly, through partners, or as part of larger event and production teams.
          </p>

        </div>
      </section>

      {/* ── QUOTE CTA BAND ── */}
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
          <Link
            href="/quote"
            className="inline-flex items-center px-8 py-5 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
