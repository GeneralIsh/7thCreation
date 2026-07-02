import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-charcoal" role="contentinfo">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          <div>
            <Link
              href="/"
              aria-label="7th Creation Studio — Home"
              className="inline-flex items-center gap-2.5 mb-5 focus-ring rounded-sm"
            >
              <Image
                src="/images/logo/icon-light.png"
                alt=""
                width={38}
                height={34}
                className="object-contain flex-shrink-0"
              />
              <span className="font-heading font-extrabold text-lg text-cream tracking-tighter leading-none">
                7th<span className="text-lightblue">Creation</span>
                <span className="block text-[9px] font-semibold text-coolgray uppercase tracking-[0.2em] leading-none mt-0.5">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-coolgray leading-relaxed max-w-xs mb-4">
              Large-format graphics production studio in Oakland, CA. We design, produce, and install graphics built for real spaces.
            </p>
            <p className="text-xs font-bold text-lightblue/60 uppercase tracking-widest">
              Conceptualize. Create. Complete.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="section-eyebrow-light mb-4">Navigate</p>
            <ul className="flex flex-col gap-3" role="list">
              {[
                { href: '/', label: 'Home' },
                { href: '/work', label: 'Work' },
                { href: '/services', label: 'Services' },
                { href: '/studio', label: 'Studio' },
                { href: '/quote', label: 'Request a Quote' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-coolgray hover:text-cream transition-colors focus-ring rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address>
            <p className="section-eyebrow-light mb-4">Contact</p>
            <ul className="flex flex-col gap-3 text-sm text-coolgray" role="list">
              <li>
                <a
                  href="mailto:studio@7thcreation.com"
                  className="hover:text-cream transition-colors focus-ring rounded-sm"
                >
                  studio@7thcreation.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15107073235"
                  className="hover:text-cream transition-colors focus-ring rounded-sm"
                >
                  (510) 707-3235
                </a>
              </li>
              <li className="leading-relaxed">
                95 Linden St<br />
                Oakland, CA 94607
              </li>
            </ul>
          </address>

        </div>

        {/* Instagram — centered */}
        <div className="flex justify-center mb-10">
          <a
            href="https://www.instagram.com/7thcreationstudio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="7th Creation Studio on Instagram"
            className="text-coolgray hover:text-cream transition-colors focus-ring rounded-sm"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <div className="border-t border-charcoal pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-gray">
            &copy; {year} 7th Creation Studio. All rights reserved.
          </p>
          <p className="text-xs text-gray">
            <a
              href="https://interiorbond.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              An Interior Bond Company
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
