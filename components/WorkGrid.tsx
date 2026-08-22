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

interface WorkMediaTile {
  project: Project;
  imageSrc?: string;
  imageAlt?: string;
  imageIndex: number;
  titleLabel: string;
  tileKey: string;
  videoSrc?: string;
  videoPoster?: string;
}

export default function WorkGrid({ projects, showFilters = false, clickable = true }: WorkGridProps) {
  const [activeTag, setActiveTag] = useState<string>('all');
  const getFilterLabel = (tag: Project['tag']) =>
    FILTER_TAGS.find((filter) => filter.value === tag)?.label ?? tag;

  const filtered = activeTag === 'all'
    ? FILTER_TAGS
        .filter((filter) => filter.value !== 'all')
        .map((filter) => projects.find((project) => project.tag === filter.value))
        .filter((project): project is Project => Boolean(project))
    : projects.filter((p) => p.tag === activeTag);

  const visibleTiles: WorkMediaTile[] = activeTag === 'all'
    ? filtered.map<WorkMediaTile>((project) => ({
        project,
        imageSrc: project.images[0],
        imageIndex: 0,
        titleLabel: project.title,
        tileKey: `${project.tag}-preview`,
      }))
    : filtered.flatMap<WorkMediaTile>((project) => {
        if (project.images.length === 0) {
          return [{
            project,
            imageSrc: project.images[0],
            imageAlt: project.title,
            imageIndex: 0,
            titleLabel: project.title,
            tileKey: `${project.slug}-empty`,
          }];
        }

        const [primaryImage, ...secondaryImages] = project.images;
        const videoTiles = (project.videos ?? []).map((video, videoIndex) => ({
          project,
          imageSrc: video.tilePoster ?? video.poster,
          imageIndex: videoIndex,
          titleLabel: video.title,
          videoSrc: video.tileMp4 ?? video.mp4,
          videoPoster: video.tilePoster ?? video.poster,
          tileKey: `${project.slug}-video-${videoIndex}`,
        }));

        const imageTiles: WorkMediaTile[] = [
          {
            project,
            imageSrc: primaryImage,
            imageIndex: 0,
            titleLabel: project.title,
            tileKey: `${project.slug}-image-0`,
          },
          ...videoTiles,
          ...secondaryImages.map((imageSrc, imageIndex) => ({
            project,
            imageSrc,
            imageIndex: imageIndex + 1,
            titleLabel: project.title,
            tileKey: `${project.slug}-image-${imageIndex + 1}`,
          })),
        ];

        return imageTiles.map((tile) => ({
          ...tile,
          imageAlt: tile.videoSrc
            ? `${project.title} ${tile.titleLabel}`
            : tile.imageIndex === 0
              ? project.title
              : `${project.title} detail ${tile.imageIndex + 1}`,
        }));
      });

  const tilesWithAlt = visibleTiles.map((tile) => ({
    ...tile,
    imageAlt: tile.imageAlt ?? (
      tile.imageIndex === 0 ? tile.project.title : `${tile.project.title} detail ${tile.imageIndex + 1}`
    ),
  }));

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
        {tilesWithAlt.map(({ project, imageSrc, imageAlt, imageIndex, titleLabel, tileKey, videoSrc, videoPoster }, i) => (
          <div key={tileKey} role="listitem">
            <WorkTile
              project={project}
              imageSrc={imageSrc}
              imageAlt={imageAlt}
              videoSrc={videoSrc}
              videoPoster={videoPoster}
              captionLabel={getFilterLabel(project.tag)}
              titleLabel={titleLabel}
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

      {tilesWithAlt.length === 0 && (
        <p className="text-coolgray text-sm py-16 text-center">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
