'use client';

import { useState } from 'react';
import type { Project } from '@/data/projects';
import { FILTER_TAGS } from '@/data/projects';
import WorkTile from './WorkTile';

interface WorkGridProps {
  projects: Project[];
  showFilters?: boolean;
  clickable?: boolean;
}

export default function WorkGrid({ projects, showFilters = false, clickable = true }: WorkGridProps) {
  const [activeTag, setActiveTag] = useState<string>('all');
  const getFilterLabel = (tag: Project['tag']) =>
    FILTER_TAGS.find((filter) => filter.value === tag)?.label ?? tag;

  const filtered = activeTag === 'all'
    ? projects
    : projects.filter((p) => p.tag === activeTag);

  const visibleTiles = activeTag === 'all'
    ? filtered.map((project) => ({ project, imageSrc: project.images[0], imageIndex: 0 }))
    : filtered.flatMap((project) => {
        if (project.images.length === 0) {
          return [{ project, imageSrc: project.images[0], imageIndex: 0 }];
        }

        return project.images.map((imageSrc, imageIndex) => ({
          project,
          imageSrc,
          imageIndex,
        }));
      });

  return (
    <div>
      {showFilters && (
        <div className="relative mb-8">
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

      <div
        className="grid grid-cols-2 lg:grid-cols-3 gap-line-dark bg-charcoal"
        role="list"
        aria-label="Project work tiles"
      >
        {visibleTiles.map(({ project, imageSrc, imageIndex }, i) => (
          <div key={`${project.slug}-${imageIndex}`} role="listitem">
            <WorkTile
              project={project}
              imageSrc={imageSrc}
              imageAlt={imageIndex === 0 ? project.title : `${project.title} detail ${imageIndex + 1}`}
              captionLabel={getFilterLabel(project.tag)}
              priority={i < 3}
              clickable={clickable}
              showCaption
              showCategory={activeTag === 'all'}
              showTitle={activeTag !== 'all'}
              onTileClick={activeTag === 'all' ? () => setActiveTag(project.tag) : undefined}
            />
          </div>
        ))}
      </div>

      {visibleTiles.length === 0 && (
        <p className="text-coolgray text-sm py-16 text-center">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
