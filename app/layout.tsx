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
  title: {
    default: '7th Creation Studio — Wide-Format Graphics, Exhibition Displays & Installation | Oakland, CA',
    template: '%s | 7th Creation Studio',
  },
  description:
    '7th Creation Studio designs, produces, finishes, and installs wide-format graphics for exhibitions, experiential displays, branded environments, events, storefronts, vehicles, and signage. Bay Area graphics production studio, Oakland, CA.',
  robots: 'index, follow',
  alternates: { canonical: 'https://www.7thcreation.com/' },
  openGraph: {
    type: 'website',
    url: 'https://www.7thcreation.com/',
    title: '7th Creation Studio — Wide-Format Graphics & Installation | Oakland, CA',
    description:
      'Bay Area graphics production studio. Exhibition graphics, experiential displays, environmental graphics, vehicle wraps, event signage, and installation.',
    siteName: '7th Creation Studio',
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
