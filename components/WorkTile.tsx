import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/data/projects';

interface WorkTileProps {
  project: Project;
  priority?: boolean;
  featured?: boolean;
}

export default function WorkTile({ project, priority = false, featured = false }: WorkTileProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block bg-dark overflow-hidden focus-ring"
      aria-label={`View project: ${project.title}`}
    >
      {/* Image area */}
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/9] max-h-[560px]' : 'aspect-[4/3]'}`}>
        {project.images[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes={featured
              ? '(max-width: 768px) 100vw, (max-width: 1320px) 66vw, 880px'
              : '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 440px'
            }
            className="object-cover work-tile-bg"
            priority={priority}
          />
        ) : (
          <div className="img-placeholder w-full h-full work-tile-bg" aria-hidden="true" />
        )}
        {/* Dark scrim on hover */}
        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-350" />
        {/* Featured: title overlay on image */}
        {featured && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent">
            <p className="text-[9px] sm:text-xs text-lightblue/80 uppercase tracking-widest font-semibold mb-1">
              {project.category}
            </p>
            <h3 className="font-heading font-extrabold text-cream text-xl sm:text-3xl lg:text-4xl leading-tight tracking-tighter group-hover:text-lightblue transition-colors duration-200">
              {project.title}
            </h3>
          </div>
        )}
      </div>

      {/* Caption — non-featured only */}
      {!featured && (
        <div className="p-3 sm:p-5">
          <p className="text-[9px] sm:text-xs text-coolgray uppercase tracking-widest font-semibold mb-0.5 truncate">
            {project.category}
          </p>
          <h3 className="font-heading font-extrabold text-cream text-sm sm:text-lg leading-snug tracking-tight group-hover:text-lightblue transition-colors duration-200">
            {project.title}
          </h3>
        </div>
      )}
    </Link>
  );
}
