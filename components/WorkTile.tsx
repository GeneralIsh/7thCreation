'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

interface WorkTileProps {
  project: Project;
  priority?: boolean;
}

export default function WorkTile({ project, priority = false }: WorkTileProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block bg-dark overflow-hidden focus-ring"
      aria-label={`View project: ${project.title}`}
    >
      {/* Image area — uniform 4/3 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-dark">
        {project.images[0] && !imgError ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 440px"
            className="object-cover work-tile-bg"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : null}
        {/* Hover scrim */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-350" />
      </div>

      {/* Caption */}
      <div className="p-3 sm:p-5">
        <p className="text-[9px] sm:text-xs text-coolgray uppercase tracking-widest font-semibold mb-0.5 truncate">
          {project.category}
        </p>
        <h3 className="font-heading font-extrabold text-cream text-sm sm:text-lg leading-snug tracking-tight group-hover:text-lightblue transition-colors duration-200">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
