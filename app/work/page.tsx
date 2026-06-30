import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import WorkGrid from '@/components/WorkGrid';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects from 7th Creation Studio — exhibition graphics, environmental graphics, retail storefronts, vehicle wraps, print production, and branded apparel.',
};

export default function WorkPage() {
  return (
    <div className="bg-dark min-h-screen">

      {/* ── Page header ── */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <p className="section-eyebrow-light">Portfolio</p>
          <h1 className="font-heading font-extrabold text-cream text-5xl lg:text-6xl tracking-tighter">
            Selected Work
          </h1>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <WorkGrid projects={projects} showFilters />
        </div>
      </section>

    </div>
  );
}
