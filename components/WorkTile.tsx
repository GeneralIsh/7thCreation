import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

interface WorkTileProps {
  project: Project;
  priority?: boolean;
}

export default function WorkTile({ project, priority = false }: WorkTileProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block bg-dark overflow-hidden focus-ring"
      aria-label={`View project: ${project.title}`}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover work-tile-bg"
            priority={priority}
          />
        ) : (
          <div className="img-placeholder w-full h-full work-tile-bg" aria-hidden="true" />
        )}
        {/* Dark scrim on hover */}
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
