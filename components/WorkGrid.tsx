'use client';

import { useState } from 'react';
import type { Project } from '@/data/projects';
import { FILTER_TAGS } from '@/data/projects';
import WorkTile from './WorkTile';

interface WorkGridProps {
  projects: Project[];
  showFilters?: boolean;
}

export default function WorkGrid({ projects, showFilters = false }: WorkGridProps) {
  const [activeTag, setActiveTag] = useState<string>('all');

  const filtered = activeTag === 'all'
    ? projects
    : projects.filter((p) => p.tag === activeTag);

  const showFeatured = activeTag === 'all' && filtered.length > 0;
  const featuredProject = showFeatured ? filtered[0] : null;
  const gridProjects = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div>
      {showFilters && (
        <div className="relative mb-8 sm:mb-8">
          <div
            className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap"
            role="group"
            aria-label="Filter projects by category"
          >
            {FILTER_TAGS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActiveTag(value)}
                aria-pressed={activeTag === value}
                className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors focus-ring ${
                  activeTag === value
                    ? 'bg-blue text-cream'
                    : 'bg-charcoal text-coolgray hover:bg-gray hover:text-cream'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-dark to-transparent sm:hidden"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Featured hero tile — full width, above the grid */}
      {featuredProject && (
        <div className="mb-px">
          <WorkTile project={featuredProject} priority featured />
        </div>
      )}

      {/* Uniform grid */}
      {gridProjects.length > 0 && (
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal"
          role="list"
          aria-label="Project work tiles"
        >
          {gridProjects.map((project, i) => (
            <div key={project.slug} role="listitem">
              <WorkTile project={project} priority={!showFeatured && i < 3} />
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-coolgray text-sm py-16 text-center">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
