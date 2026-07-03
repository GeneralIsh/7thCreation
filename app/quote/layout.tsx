import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Request a quote from 7th Creation Studio for large-format graphics, vehicle wraps, exhibition displays, retail signage, DTF apparel, and graphics installation in Oakland and the Bay Area.',
  alternates: { canonical: '/quote' },
  openGraph: {
    url: absoluteUrl('/quote'),
    title: 'Request a Quote | 7th Creation Studio',
    description:
      'Send project specs for large-format graphics, vehicle wraps, event displays, storefront graphics, and installation in Oakland and the Bay Area.',
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}

