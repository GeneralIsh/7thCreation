import { CLIENTS } from '@/data/projects';

export default function ClientMarquee() {
  // Duplicate for seamless loop
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section
      className="bg-dark border-t border-charcoal py-10 lg:py-12 overflow-hidden"
      aria-label="Clients and collaborators"
    >
      <p className="section-eyebrow-light text-center mb-8 px-6">
        Clients &amp; Collaborators
      </p>

      {/* Gradient fade masks on left + right edges */}
      <div
        className="marquee-wrap relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="marquee-track flex items-center gap-14 w-max"
          aria-hidden="true"
        >
          {items.map((client, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center h-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={client.name}
                style={{ height: client.h, width: 'auto' }}
                className={`object-contain ${
                  client.darkBg ? 'logo-dark' : 'logo-invert'
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Accessible text list (screen readers only) */}
      <ul className="sr-only" role="list">
        {CLIENTS.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>

      <p className="text-xs text-cream/30 text-center mt-8 px-6">
        <a
          href="https://interiorbond.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cream/60 transition-colors underline underline-offset-2"
        >
          An Interior Bond Company
        </a>
      </p>
    </section>
  );
}
