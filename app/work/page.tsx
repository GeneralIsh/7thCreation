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
    <div className="bg-dark min-h-screen pt-16">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28">

        <div className="mb-12">
          <p className="section-eyebrow-light">Portfolio</p>
          <h1 className="font-heading font-extrabold text-cream text-5xl lg:text-6xl tracking-tighter">
            Selected Work
          </h1>
        </div>

        <WorkGrid projects={projects} showFilters />

      </div>
    </div>
  );
}
