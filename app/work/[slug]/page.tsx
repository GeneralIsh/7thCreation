import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.scope,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const [primary, ...rest] = project.images;

  return (
    <div className="bg-dark min-h-screen pt-16">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-28">

        {/* Back nav */}
        <Link
          href="/work"
          className="inline-flex items-center text-xs font-bold text-coolgray uppercase tracking-widest hover:text-cream transition-colors mb-12 focus-ring rounded-sm"
        >
          ← All Work
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="section-eyebrow-light mb-2">{project.category}</p>
          <h1 className="font-heading font-extrabold text-cream text-4xl lg:text-5xl tracking-tighter mb-6">
            {project.title}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
            <div>
              <p className="text-xs font-bold text-coolgray uppercase tracking-widest mb-2">Scope</p>
              <p className="text-cream/80 text-sm leading-relaxed">{project.scope}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-coolgray uppercase tracking-widest mb-2">Production</p>
              <p className="text-cream/80 text-sm leading-relaxed">{project.production}</p>
              {project.note && (
                <p className="text-coolgray text-xs mt-2 italic">{project.note}</p>
              )}
            </div>
          </div>
        </div>

        {/* Primary image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {primary ? (
            <Image
              src={primary}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1320px) 100vw, 1320px"
            />
          ) : (
            <div className="img-placeholder w-full h-full" aria-hidden="true" />
          )}
        </div>

        {/* Secondary images */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-line-dark bg-charcoal mt-px">
            {rest.map((src, i) => (
              <div key={src} className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt={`${project.title} — detail ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 pt-12 border-t border-charcoal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-coolgray text-sm mb-1">Have a similar project?</p>
            <p className="text-cream font-bold text-lg">We can produce and install it.</p>
          </div>
          <Link
            href="/quote"
            className="inline-flex items-center px-6 py-3 bg-blue text-cream font-bold text-sm uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring shrink-0"
          >
            Request a Quote
          </Link>
        </div>

      </div>
    </div>
  );
}
