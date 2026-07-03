import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import WorkGrid from '@/components/WorkGrid';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from 7th Creation Studio — exhibition graphics, environmental graphics, retail storefronts, vehicle wraps, print production, and branded apparel.',
  alternates: { canonical: '/work' },
  openGraph: {
    url: absoluteUrl('/work'),
    title: 'Work | 7th Creation Studio',
    description:
      'Selected exhibition graphics, environmental graphics, storefront graphics, vehicle wraps, print production, and branded apparel projects.',
  },
};

export default function WorkPage() {
  return (
    <div className="bg-dark min-h-screen">

      {/* ── Page header ── */}
      <section className="pt-28 pb-10 lg:pt-40 lg:pb-16">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <p className="section-eyebrow-light mb-4">Portfolio</p>
          <h1 className="font-heading font-extrabold text-cream text-4xl sm:text-5xl lg:text-6xl tracking-tighter">
            Selected Work
          </h1>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <WorkGrid projects={projects} showFilters clickable={false} />
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pb-24 lg:pb-32">
        <p className="text-xs text-cream/20">
          Some work may be completed directly, through partners, or as part of larger event and production teams.
        </p>
      </div>

    </div>
  );
}
