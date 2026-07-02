import type { Metadata } from 'next';
import { Montserrat, Archivo } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
  metadataBase: new URL('https://www.7thcreation.com'),
  title: {
    default: '7th Creation Studio — Large-Format Graphics, Exhibition Displays & Installation | Oakland, CA',
    template: '%s | 7th Creation Studio',
  },
  description:
    '7th Creation Studio designs, produces, finishes, and installs large-format graphics for exhibitions, experiential displays, branded environments, events, storefronts, vehicles, and signage. Bay Area graphics production studio, Oakland, CA.',
  robots: 'index, follow',
  alternates: { canonical: 'https://www.7thcreation.com/' },
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.7thcreation.com/',
    title: '7th Creation Studio — Large-Format Graphics & Installation | Oakland, CA',
    description:
      'Bay Area graphics production studio. Exhibition graphics, experiential displays, environmental graphics, vehicle wraps, event signage, and installation.',
    siteName: '7th Creation Studio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '7th Creation Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7th Creation Studio — Large-Format Graphics & Installation | Oakland, CA',
    description: 'Bay Area graphics production studio. Exhibition, environmental, vehicle, retail, and large-format print production.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${archivo.variable}`}>
      <body>
        <Nav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
