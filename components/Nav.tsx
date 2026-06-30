'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/studio', label: 'Studio' },
    { href: '/quote', label: 'Quote' },
  ];

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-dark/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">

          <Link
            href="/"
            aria-label="7th Creation Studio — Home"
            className="flex items-baseline gap-1 focus-ring rounded-sm"
          >
            {/* REPLACE: swap spans with <img src="/images/logo/7th-creation-logo-light.png" alt="7th Creation Studio" width="160" height="40" /> */}
            <span className="font-heading font-extrabold text-xl text-lightblue tracking-tighter">
              7th<span className="text-cream">Creation</span>
            </span>
            <span className="text-xs font-semibold text-coolgray uppercase tracking-widest ml-1">Studio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-semibold uppercase tracking-widest transition-colors focus-ring rounded-sm ${
                  pathname === href
                    ? 'text-lightblue'
                    : 'text-coolgray hover:text-cream'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href="/quote"
            className="hidden md:inline-flex items-center px-5 py-2.5 bg-blue text-cream text-sm font-bold uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
          >
            Request a Quote
          </Link>

          <button
            className="md:hidden flex flex-col gap-[5px] w-8 h-8 items-center justify-center focus-ring rounded-sm"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span className={`block w-5 h-0.5 bg-cream transition-transform origin-center duration-200 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-cream transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-cream transition-transform origin-center duration-200 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>

        </div>
      </header>

      {/* Mobile nav overlay */}
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-dark flex flex-col justify-center px-8 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col gap-6 mb-10" role="list">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-4xl font-heading font-extrabold tracking-tighter transition-colors focus-ring ${
                  pathname === href ? 'text-lightblue' : 'text-cream hover:text-lightblue'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/quote"
          className="inline-flex items-center justify-center px-6 py-4 bg-blue text-cream text-sm font-bold uppercase tracking-widest hover:bg-lightblue hover:text-dark transition-colors focus-ring"
        >
          Request a Quote
        </Link>
      </nav>
    </>
  );
}
