'use client';

import { useState } from 'react';
import type { SERVICES } from '@/data/projects';

type Service = (typeof SERVICES)[number];

interface Props {
  services: Service[];
}

export default function MobileServiceAccordion({ services }: Props) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <div className="sm:hidden border-t border-charcoal">
      {services.map((service) => {
        const isOpen = openTitle === service.title;

        return (
          <div key={service.title} className="border-b border-charcoal">
            <button
              type="button"
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left focus-ring rounded-sm"
              onClick={() => setOpenTitle(isOpen ? null : service.title)}
            >
              <span className="font-heading font-extrabold text-cream text-[1.05rem] leading-tight tracking-tight">
                {service.title}
              </span>
              <span
                aria-hidden="true"
                className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-cream/15 text-lightblue transition-colors group-hover:border-lightblue/70 group-hover:text-cream"
              >
                <span className="absolute h-0.5 w-3 bg-current" />
                <span
                  className={`absolute h-3 w-0.5 bg-current transition-transform duration-200 ${
                    isOpen ? 'rotate-90 scale-y-0' : ''
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-12 text-sm leading-relaxed text-cream/55">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
