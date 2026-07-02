'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  primary: string;
  rest: string[];
  title: string;
}

function SafeImage({ src, alt, fill, sizes, priority, className }: {
  src: string; alt: string; fill?: boolean;
  sizes?: string; priority?: boolean; className?: string;
}) {
  const [error, setError] = useState(false);
  if (error) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export default function ProjectImageGallery({ primary, rest, title }: Props) {
  return (
    <>
      {/* Primary image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark">
        <SafeImage
          src={primary}
          alt={title}
          fill
          priority
          sizes="(max-width: 1320px) 100vw, 1320px"
          className="object-cover"
        />
      </div>

      {/* Secondary images */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-line-dark bg-charcoal mt-px">
          {rest.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] bg-dark">
              <SafeImage
                src={src}
                alt={`${title} — detail ${i + 2}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
