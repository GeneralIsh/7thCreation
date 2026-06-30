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

  return (
    <div>
      {showFilters && (
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter projects by category"
        >
          {FILTER_TAGS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveTag(value)}
              aria-pressed={activeTag === value}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors focus-ring ${
                activeTag === value
                  ? 'bg-blue text-cream'
                  : 'bg-charcoal text-coolgray hover:bg-gray hover:text-cream'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-line bg-silver"
        role="list"
        aria-label="Project work tiles"
      >
        {filtered.map((project, i) => (
          <div key={project.slug} role="listitem">
            <WorkTile project={project} priority={i < 3} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-coolgray text-sm py-16 text-center">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
