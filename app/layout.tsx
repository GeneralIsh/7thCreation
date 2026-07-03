import type { Metadata } from 'next';
import { Montserrat, Archivo } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/seo';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '7th Creation Studio — Large-Format Graphics, Exhibition Displays & Installation | Oakland, CA',
    template: '%s | 7th Creation Studio',
  },
  description: DEFAULT_DESCRIPTION,
  robots: 'index, follow',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: '7th Creation Studio — Large-Format Graphics & Installation | Oakland, CA',
    description:
      'Bay Area graphics production studio. Exhibition graphics, experiential displays, environmental graphics, vehicle wraps, event signage, and installation.',
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7th Creation Studio — Large-Format Graphics & Installation | Oakland, CA',
    description: 'Bay Area graphics production studio. Exhibition, environmental, vehicle, retail, and large-format print production.',
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': absoluteUrl('/#business'),
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl('/images/logo/lockup-light.png'),
    description: DEFAULT_DESCRIPTION,
    telephone: '+15107073235',
    email: 'studio@7thcreation.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '95 Linden St',
      addressLocality: 'Oakland',
      addressRegion: 'CA',
      postalCode: '94607',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Oakland' },
      { '@type': 'AdministrativeArea', name: 'Bay Area' },
      { '@type': 'State', name: 'California' },
    ],
    makesOffer: [
      'Large-format graphics production',
      'Exhibition and event graphics',
      'Environmental graphics',
      'Retail and storefront graphics',
      'Vehicle and fleet wraps',
      'DTF apparel and custom print',
      'Graphics installation',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name,
        provider: { '@id': absoluteUrl('/#business') },
        areaServed: 'Oakland and the Bay Area',
      },
    })),
    sameAs: ['https://www.instagram.com/7thcreationstudio/'],
  };

  return (
    <html lang="en" className={`${montserrat.variable} ${archivo.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Nav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
