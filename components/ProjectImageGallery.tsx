'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProjectVideo {
  title: string;
  mp4: string;
  poster: string;
}

interface Props {
  primary: string;
  rest: string[];
  title: string;
  videos?: ProjectVideo[];
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

function FramedImage({ src, alt, priority, sizes }: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <>
      <SafeImage
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="scale-110 object-cover opacity-45 blur-xl"
      />
      <SafeImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
      />
    </>
  );
}

export default function ProjectImageGallery({ primary, rest, title, videos = [] }: Props) {
  return (
    <>
      {/* Primary image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark">
        <FramedImage
          src={primary}
          alt={title}
          priority
          sizes="(max-width: 1320px) 100vw, 1320px"
        />
      </div>

      {/* Secondary images */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-line-dark bg-charcoal mt-px">
          {rest.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] bg-dark">
              <FramedImage
                src={src}
                alt={`${title} — detail ${i + 2}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="mt-px bg-charcoal">
          {videos.map((video) => (
            <section
              key={video.mp4}
              className="grid grid-cols-1 gap-line-dark bg-charcoal lg:grid-cols-[0.72fr_1.28fr]"
            >
              <div className="bg-dark p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
                <p className="section-eyebrow-light mb-3">Video</p>
                <h2 className="font-heading font-extrabold text-cream text-2xl sm:text-3xl tracking-tight">
                  {video.title}
                </h2>
                <p className="text-coolgray text-sm leading-relaxed mt-4 max-w-sm">
                  Compressed install timelapse, optimized for quick loading and a cleaner mobile view.
                </p>
              </div>
              <div className="relative min-h-[560px] overflow-hidden bg-dark sm:min-h-[680px] lg:min-h-[760px]">
                <SafeImage
                  src={video.poster}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="scale-110 object-cover opacity-35 blur-xl"
                />
                <video
                  className="relative z-10 mx-auto block h-[min(82vh,760px)] min-h-[560px] w-auto max-w-full object-contain sm:min-h-[680px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={video.poster}
                >
                  <source src={video.mp4} type="video/mp4" />
                </video>
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
