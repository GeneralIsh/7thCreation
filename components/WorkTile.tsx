'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

interface WorkTileProps {
  project: Project;
  imageSrc?: string;
  imageAlt?: string;
  captionLabel?: string;
  priority?: boolean;
  clickable?: boolean;
  showCaption?: boolean;
  showCategory?: boolean;
  showTitle?: boolean;
  onTileClick?: () => void;
}

export default function WorkTile({
  project,
  imageSrc,
  imageAlt,
  captionLabel,
  priority = false,
  clickable = true,
  showCaption = true,
  showCategory = true,
  showTitle = true,
  onTileClick,
}: WorkTileProps) {
  const [imgError, setImgError] = useState(false);
  const tileImage = imageSrc ?? project.images[0];

  const inner = (
    <>
      {/* Image area — uniform 4/3 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-dark">
        {tileImage && !imgError ? (
          <Image
            src={tileImage}
            alt={imageAlt ?? project.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 440px"
            className="object-contain work-tile-bg"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : null}
        {(clickable || onTileClick) && (
          <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-colors duration-350" />
        )}
      </div>

      {showCaption && (
        <div className="p-3 sm:p-5">
          {showCategory && (
            <p className="text-[10px] sm:text-sm text-cream uppercase tracking-widest font-extrabold leading-tight break-words mb-0.5">
              {captionLabel ?? project.category}
            </p>
          )}
          {showTitle && (
            <h3 className={`font-heading font-extrabold text-cream text-sm sm:text-lg leading-snug tracking-tight ${clickable ? 'group-hover:text-lightblue transition-colors duration-200' : ''}`}>
              {project.title}
            </h3>
          )}
        </div>
      )}
    </>
  );

  if (onTileClick) {
    return (
      <button
        type="button"
        className="group relative block w-full bg-dark overflow-hidden text-left focus-ring"
        aria-label={`Show ${project.category} work`}
        onClick={onTileClick}
      >
        {inner}
      </button>
    );
  }

  if (!clickable) {
    return (
      <div className="relative block bg-dark overflow-hidden">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block bg-dark overflow-hidden focus-ring"
      aria-label={`View project: ${project.title}`}
    >
      {inner}
    </Link>
  );
}
