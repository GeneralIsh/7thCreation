import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { absoluteUrl } from '@/lib/seo';

const staticRoutes = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/work', priority: 0.8 },
  { path: '/studio', priority: 0.75 },
  { path: '/quote', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: updated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

