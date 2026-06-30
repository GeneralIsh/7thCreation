import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    '7th Creation Studio is a Bay Area wide-format graphics production studio in Oakland, CA. We produce, finish, and install graphics for exhibitions, events, retail, and branded environments.',
};

const capabilities = [
  { label: 'Wide-Format Print', detail: 'Banners, decals, rigid panels, fabric, specialty substrates' },
  { label: 'Vehicle Graphics', detail: 'Full wraps, partial wraps, fleet decals, transit layouts' },
  { label: 'Environmental Graphics', detail: 'Wall graphics, window vinyl, floor decals, interior/exterior' },
  { label: 'Exhibition Displays', detail: 'Trade show, event displays, sponsor walls, branded arches' },
  { label: 'DTF & Apparel', detail: 'Direct-to-film transfers, merch decoration, branded kits' },
  { label: 'Site Installation', detail: 'High-access installs, event installs, site checks, removal' },
];

const fieldItems = [
  { stat: 'Bay Area', label: 'Based in Oakland, CA' },
  { stat: 'Bay Area +', label: 'Regional and travel installs' },
  { stat: '7 categories', label: 'Of wide-format production' },
  { stat: 'Turnkey', label: 'From files to finished install' },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen pt-16">

      {/* ── Studio intro ── */}
      <section className="bg-dark py-20 lg:py-28" aria-labelledby="studio-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="section-eyebrow-light">The Studio</p>
              <h1
                id="studio-heading"
                className="font-heading font-extrabold text-cream text-5xl lg:text-6xl tracking-tighter mb-6"
              >
                Production built<br />for the field.
              </h1>
              <p className="text-coolgray text-base leading-relaxed mb-5">
                7th Creation Studio is a Bay Area wide-format graphics production studio based at 95 Linden St, Oakland, CA. We work with brands, agencies, event teams, and production companies to produce and install graphics that hold up in real spaces.
              </p>
              <p className="text-coolgray text-base leading-relaxed mb-5">
                From large-format print runs to complex multi-day installs, we operate on tight timelines and deliver clean results. Our team has worked at arenas, hospitality venues, creator spaces, retail storefronts, and outdoor events across the Bay Area and beyond.
              </p>
              <p className="text-coolgray text-base leading-relaxed">
                We're equipped for rush production, high-volume runs, and installations that need to look right on opening day.
              </p>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[520px]">
              {/* REPLACE: <Image src="/images/studio/studio-production-floor.jpg" alt="7th Creation Studio production floor" fill className="object-cover" /> */}
              <div className="img-placeholder w-full h-full" aria-hidden="true" />
            </div>

          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="bg-cream py-20 lg:py-28" aria-labelledby="capabilities-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="mb-12">
            <p className="section-eyebrow">Capabilities</p>
            <h2
              id="capabilities-heading"
              className="font-heading font-extrabold text-dark text-4xl lg:text-5xl tracking-tighter"
            >
              What the studio<br />can do.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal">
            {capabilities.map(({ label, detail }) => (
              <div key={label} className="bg-cream p-8">
                <h3 className="font-heading font-extrabold text-dark text-xl tracking-tight mb-2">
                  {label}
                </h3>
                <p className="text-gray text-sm leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Field experience ── */}
      <section className="bg-dark py-20 lg:py-28" aria-labelledby="field-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <p className="section-eyebrow-light">Field Experience</p>
              <h2
                id="field-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter mb-6"
              >
                We've installed<br />in the field.
              </h2>
              <p className="text-coolgray text-base leading-relaxed mb-5">
                We don't just print it and ship it. Our team shows up on-site to make sure the install is done right — whether it's a tradeshow booth, a hotel lobby, a storefront takeover, or a large-scale event activation.
              </p>
              <p className="text-coolgray text-base leading-relaxed mb-10">
                We've worked at venues and events with tight access windows, multi-day installs, high-traffic timelines, and last-minute production changes. We know how to adapt on-site and deliver clean results under pressure.
              </p>
              <Link
                href="/quote"
                className="inline-flex items-center px-6 py-3 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
              >
                Start a Project
              </Link>
            </div>

            <div>
              {/* Field image */}
              <div className="relative aspect-[4/3] mb-3">
                {/* REPLACE: <Image src="/images/studio/field-install.jpg" alt="7th Creation Studio team on-site installation" fill className="object-cover" /> */}
                <div className="img-placeholder w-full h-full" aria-hidden="true" />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-line bg-silver">
                {fieldItems.map(({ stat, label }) => (
                  <div key={label} className="bg-dark p-6">
                    <p className="font-heading font-extrabold text-lightblue text-2xl tracking-tight mb-1">
                      {stat}
                    </p>
                    <p className="text-coolgray text-xs uppercase tracking-widest font-semibold">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Contact block ── */}
      <section className="bg-navy py-20 lg:py-28" aria-labelledby="contact-heading">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="section-eyebrow-light mb-4">Get in Touch</p>
              <h2
                id="contact-heading"
                className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter"
              >
                Let's talk<br />production.
              </h2>
            </div>

            <address className="flex flex-col gap-4">
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
              <p className="text-coolgray text-base">
                95 Linden St, Oakland, CA 94607
              </p>
              <div className="pt-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center px-6 py-3 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
                >
                  Request a Quote
                </Link>
              </div>
            </address>

          </div>
        </div>
      </section>

    </div>
  );
}
